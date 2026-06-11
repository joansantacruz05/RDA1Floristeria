import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Flower2, ArrowLeft, Mail, KeyRound, Eye, EyeOff, CheckCircle, User } from "lucide-react";
import { motion } from "motion/react";
import { enviarCorreoRecuperacion, actualizarPassword } from "@/lib/supabase-service";
import { supabase } from "@/lib/supabase";

const USERS_KEY = "av_users";

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getLocalUsers(): Record<string, any> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function setLocalUsers(users: Record<string, any>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function RecuperarContrasena() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"email" | "nueva" | "enviado" | "local">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("av_recovery_hash");
    if (saved && (saved === "true" || (saved.includes("access_token") && saved.includes("type=recovery")))) {
      setMode("nueva");
    }
  }, []);

  const handleEnviarCorreo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.toLowerCase().trim();

    const localUsers = getLocalUsers();
    if (localUsers[cleanEmail]) {
      sessionStorage.setItem("av_reset_email", cleanEmail);
      setMode("local");
      return;
    }

    setLoading(true);
    try {
      await enviarCorreoRecuperacion(cleanEmail);
      setMode("enviado");
    } catch {
      setMode("enviado");
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarPasswordLocal = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    const resetEmail = sessionStorage.getItem("av_reset_email");
    if (!resetEmail) {
      setError("No se encontró la cuenta. Vuelve a intentarlo.");
      return;
    }
    const users = getLocalUsers();
    if (!users[resetEmail]) {
      setError("La cuenta ya no existe. Regístrate de nuevo.");
      return;
    }
    const newHash = await hashPassword(password);
    users[resetEmail].passwordHash = newHash;
    setLocalUsers(users);
    sessionStorage.removeItem("av_reset_email");
    setMode("enviado");
  };

  const handleCambiarPasswordSupabase = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setLoading(true);
    try {
      await actualizarPassword(password);
      sessionStorage.removeItem("av_recovery_hash");
      setMode("enviado");
    } catch (err: any) {
      setError(err.message || "Error al actualizar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-stone-50 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <Flower2 size={26} className="text-white" />
          </div>

          {mode === "email" && (
            <>
              <h1 className="text-stone-800 mb-1" style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}>
                Recuperar contraseña
              </h1>
              <p className="text-stone-500 text-sm">Ingresa tu correo y te ayudaremos a recuperar tu cuenta</p>
            </>
          )}

          {mode === "local" && (
            <>
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={26} className="text-amber-500" />
              </div>
              <h1 className="text-stone-800 mb-1" style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}>
                Cuenta local encontrada
              </h1>
              <p className="text-stone-500 text-sm">Escribe tu nueva contraseña para {email}</p>
            </>
          )}

          {mode === "nueva" && (
            <>
              <h1 className="text-stone-800 mb-1" style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}>
                Nueva contraseña
              </h1>
              <p className="text-stone-500 text-sm">Escribe tu nueva contraseña</p>
            </>
          )}

          {mode === "enviado" && (
            <>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={34} className="text-emerald-500" />
              </div>
              <h1 className="text-stone-800 mb-2" style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}>
                {password ? "Contraseña actualizada" : "Correo enviado"}
              </h1>
              <p className="text-stone-500 text-sm">
                {password
                  ? "Tu contraseña se actualizó correctamente. Ya puedes iniciar sesión."
                  : "Si el correo existe en nuestra base de datos, recibirás un enlace para restablecer tu contraseña."}
              </p>
            </>
          )}
        </div>

        {mode === "email" && (
          <form onSubmit={handleEnviarCorreo} className="space-y-4">
            <div>
              <label className="block text-sm text-stone-600 mb-1.5 font-medium">Correo electrónico</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="w-full border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl transition-all text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Verificando..." : "Recuperar contraseña"}
            </button>
          </form>
        )}

        {(mode === "local" || mode === "nueva") && (
          <form onSubmit={mode === "local" ? handleCambiarPasswordLocal : handleCambiarPasswordSupabase} className="space-y-4">
            <div>
              <label className="block text-sm text-stone-600 mb-1.5 font-medium">Nueva contraseña</label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  className="w-full border border-stone-200 rounded-xl pl-10 pr-11 py-3 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-stone-600 mb-1.5 font-medium">Confirmar contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repite tu contraseña"
                required
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl transition-all text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Actualizando..." : "Actualizar contraseña"}
            </button>
          </form>
        )}

        {mode === "enviado" && (
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl transition-all text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-4"
          >
            Volver a iniciar sesión
          </button>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="flex items-center justify-center gap-1 text-stone-400 hover:text-stone-600 text-xs transition-colors"
          >
            <ArrowLeft size={13} /> Volver a iniciar sesión
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
