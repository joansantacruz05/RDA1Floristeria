import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Flower2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      navigate("/cuenta");
    } else {
      setError("Correo o contraseña incorrectos. Verifica tus datos.");
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
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <Flower2 size={26} className="text-white" />
          </div>
          <h1 className="text-stone-800 mb-1" style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}>
            Bienvenida de vuelta
          </h1>
          <p className="text-stone-500 text-sm">Inicia sesión en tu cuenta AnaVictoria</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-stone-600 mb-1.5 font-medium">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-stone-600 mb-1.5 font-medium">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
                className="w-full border border-stone-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
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

          <div className="text-right -mt-1">
            <Link
              to="/recuperar"
              className="text-xs text-rose-500 hover:text-rose-600 transition-colors font-medium"
            >
              ¿Olvidaste tu contraseña?
            </Link>
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
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-stone-500 text-sm">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-rose-600 hover:text-rose-700 font-medium transition-colors">
              Regístrate gratis
            </Link>
          </p>
          <Link
            to="/"
            className="flex items-center justify-center gap-1 text-stone-400 hover:text-stone-600 text-xs transition-colors"
          >
            <ArrowLeft size={13} /> Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
