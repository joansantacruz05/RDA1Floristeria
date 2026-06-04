import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { LogOut, Package, Star, ChevronDown, ChevronUp, Clock, CheckCircle, Truck, Shield, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth, Order, Review } from "../context/AuthContext";
import { actualizarPassword } from "@/lib/supabase-service";

const statusLabels: Record<Order["status"], { label: string; color: string; icon: React.ElementType }> = {
  pendiente: { label: "Pendiente de confirmación", color: "text-amber-600 bg-amber-50 border-amber-200", icon: Clock },
  confirmado: { label: "Confirmado", color: "text-blue-600 bg-blue-50 border-blue-200", icon: CheckCircle },
  entregado: { label: "Entregado", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: Truck },
};

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange?.(s)}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => onChange && setHover(0)}
          disabled={!onChange}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={20}
            fill={(hover || value) >= s ? "#f43f5e" : "none"}
            className={(hover || value) >= s ? "text-rose-500" : "text-stone-300"}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewForm({ orderId, onSave }: { orderId: string; onSave: (rating: number, comment: string) => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { setError("Selecciona una calificación."); return; }
    if (comment.trim().length < 10) { setError("Escribe al menos 10 caracteres."); return; }
    onSave(rating, comment.trim());
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="mt-4 bg-rose-50 border border-rose-100 rounded-2xl p-5 space-y-3"
    >
      <p className="text-sm font-medium text-stone-700">¿Cómo fue tu experiencia?</p>
      <StarRating value={rating} onChange={setRating} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Cuéntanos cómo llegaron las flores, qué tan rápido fue la entrega..."
        rows={3}
        className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-rose-400 resize-none"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button
        type="submit"
        className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-xl text-sm transition-colors"
      >
        Publicar reseña
      </button>
    </motion.form>
  );
}

function OrderCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { hasReviewedOrder, getOrderReviews, addReview } = useAuth();
  const reviewed = hasReviewedOrder(order.id);
  const orderReviews = getOrderReviews(order.id);
  const StatusIcon = statusLabels[order.status].icon;

  const handleSaveReview = (rating: number, comment: string) => {
    addReview({
      orderId: order.id,
      productId: order.items[0]?.id || 0,
      productName: order.items.map((i) => i.name).join(", "),
      rating,
      comment,
    });
    setShowReviewForm(false);
  };

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between p-5 hover:bg-stone-50 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
            <img src={order.items[0]?.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-stone-800 text-sm font-medium line-clamp-1">
              {order.items.map((i) => i.name).join(", ")}
            </p>
            <p className="text-stone-400 text-xs mt-0.5">
              {new Date(order.date).toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" })}
              {" · "}${order.total.toFixed(2)} USD
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${statusLabels[order.status].color}`}>
            <StatusIcon size={12} />
            {statusLabels[order.status].label}
          </span>
          {open ? <ChevronUp size={16} className="text-stone-400" /> : <ChevronDown size={16} className="text-stone-400" />}
        </div>
      </button>

      {/* Detail */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-stone-100 px-5 pb-5 pt-4 overflow-hidden"
          >
            <div className="space-y-3 mb-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-stone-700 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-stone-400">×{item.quantity}</p>
                  </div>
                  <p className="text-sm text-stone-700 shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-4">
              {reviewed ? (
                <div>
                  <p className="text-sm text-stone-500 mb-3 font-medium">Tu reseña:</p>
                  {orderReviews.map((r: Review) => (
                    <div key={r.id} className="bg-stone-50 rounded-xl p-4">
                      <StarRating value={r.rating} />
                      <p className="text-sm text-stone-600 mt-2 italic">"{r.comment}"</p>
                      <p className="text-xs text-stone-400 mt-1">
                        {new Date(r.date).toLocaleDateString("es-EC")}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="flex items-center gap-2 text-rose-600 hover:text-rose-700 text-sm font-medium transition-colors"
                  >
                    <Star size={16} />
                    {showReviewForm ? "Cancelar" : "Dejar una reseña"}
                  </button>
                  <AnimatePresence>
                    {showReviewForm && (
                      <ReviewForm orderId={order.id} onSave={handleSaveReview} />
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Account() {
  const { user, orders, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"pedidos" | "resenas" | "seguridad">("pedidos");
  const { reviews } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg("");
    setPasswordError("");
    if (newPassword.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }
    setChangingPassword(true);
    try {
      await actualizarPassword(newPassword);
      setPasswordMsg("Contraseña actualizada correctamente.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordError(err.message || "Error al cambiar la contraseña.");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 text-xl font-bold shadow-sm">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-stone-800" style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem" }}>
                Hola, {user.name.split(" ")[0]}
              </h1>
              <p className="text-stone-500 text-sm">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-stone-500 hover:text-red-500 text-sm transition-colors border border-stone-200 hover:border-red-200 px-3 py-2 rounded-xl"
          >
            <LogOut size={15} />
            Cerrar sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white border border-stone-100 rounded-2xl p-1.5 shadow-sm w-fit">
          {[
            { key: "pedidos", label: "Mis pedidos", icon: Package },
            { key: "resenas", label: "Mis reseñas", icon: Star },
            { key: "seguridad", label: "Seguridad", icon: Shield },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                tab === t.key
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "pedidos" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-100">
                <div className="text-5xl mb-4">📦</div>
                <p className="text-stone-600 mb-2" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>
                  Aún no tienes pedidos
                </p>
                <p className="text-stone-400 text-sm mb-5">Tus pedidos aparecerán aquí cuando hagas una compra</p>
                <Link
                  to="/ramos"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-full text-sm transition-colors inline-block"
                >
                  Ver flores
                </Link>
              </div>
            ) : (
              orders.map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </div>
        )}

        {tab === "seguridad" && (
          <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-stone-800 font-medium mb-4">Cambiar contraseña</h2>
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-sm">
              <div>
                <label className="block text-sm text-stone-600 mb-1.5 font-medium">Nueva contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-rose-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-stone-600 mb-1.5 font-medium">Confirmar contraseña</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la contraseña"
                  required
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400"
                />
              </div>
              {passwordMsg && (
                <p className="text-emerald-600 text-sm bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">{passwordMsg}</p>
              )}
              {passwordError && (
                <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">{passwordError}</p>
              )}
              <button
                type="submit"
                disabled={changingPassword}
                className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60"
              >
                {changingPassword ? "Actualizando..." : "Actualizar contraseña"}
              </button>
            </form>
          </div>
        )}

        {tab === "resenas" && (
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-100">
                <div className="text-5xl mb-4">⭐</div>
                <p className="text-stone-600 mb-2" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>
                  Aún no tienes reseñas
                </p>
                <p className="text-stone-400 text-sm">Después de recibir un pedido podrás dejar tu opinión</p>
              </div>
            ) : (
              reviews.map((r: Review) => (
                <div key={r.id} className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-stone-700 mb-1">{r.productName}</p>
                      <StarRating value={r.rating} />
                    </div>
                    <p className="text-xs text-stone-400">
                      {new Date(r.date).toLocaleDateString("es-EC", { day: "numeric", month: "long" })}
                    </p>
                  </div>
                  <p className="text-sm text-stone-600 italic">"{r.comment}"</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
