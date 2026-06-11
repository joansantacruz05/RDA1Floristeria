import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Flower2, ArrowLeft, Mail, KeyRound, Eye, EyeOff, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { enviarCorreoRecuperacion, actualizarPassword } from "@/lib/supabase-service";

export function RecuperarContrasena() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"email" | "nueva" | "enviado">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("av_recovery_hash");
    if (saved && saved.includes("access_token") && saved.includes("type=recovery")) {
      setMode("nueva");
    }
  }, []);

  const handleEnviarCorreo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const base = `${window.location.origin}${window.location.pathname}`;
      await enviarCorreoRecuperacion(email, base);
      setMode("enviado");
    } catch (err: any) {
      setError(err.message || "Error al enviar el correo. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarPassword = async (e: React.FormEvent) => {
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
              <p className="text-stone-500 text-sm">Te enviaremos un enlace para restablecer tu contraseña</p>
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
                ¡Listo!
              </h1>
              <p className="text-stone-500 text-sm">
                {password
                  ? "Tu contraseña se actualizó correctamente."
                  : "Revisa tu correo electrónico y sigue el enlace para restablecer tu contraseña."}
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
              {loading ? "Enviando..." : "Enviar enlace de recuperación"}
            </button>
          </form>
        )}

        {mode === "nueva" && (
          <form onSubmit={handleCambiarPassword} className="space-y-4">
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
