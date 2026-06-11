import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Truck,
  CheckCircle,
  Copy,
  MessageCircle,
  LogIn,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const FREE_SHIPPING_THRESHOLD = 40;
const SHIPPING_COST = 3.50;
const IVA_RATE = 0.15;

const BANK_INFO = {
  banco: "Banco Pichincha",
  tipo: "Cuenta de Ahorros",
  numero: "2205678901",
  titular: "AnaVictoria Flores S.A.S.",
  ci: "1792345678001",
  email: "pagos@anavictoria.ec",
};

export function Carrito() {
  const { items, removeFromCart, updateQuantity, clearCart, total, itemCount } =
    useCart();
  const { user, saveOrder } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const iva = Math.round(total * IVA_RATE * 100) / 100;
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = total + iva + shipping;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const whatsappText = encodeURIComponent(
    `Hola AnaVictoria! Acabo de realizar una transferencia por $${finalTotal.toFixed(2)} USD para mi pedido. Te envío el comprobante. 🌹`
  );

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 260 }}
            className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle size={34} className="text-emerald-500" />
          </motion.div>
          <h2
            className="text-stone-800 mb-2 text-center"
            style={{ fontFamily: "Georgia, serif", fontSize: "1.7rem" }}
          >
            ¡Pedido recibido!
          </h2>
          <p className="text-stone-500 text-sm text-center mb-6">
            Para confirmar tu pedido realiza la transferencia por{" "}
            <strong className="text-rose-600">${finalTotal.toFixed(2)} USD</strong>{" "}
            a la siguiente cuenta y envíanos el comprobante por WhatsApp.
          </p>

          {/* Bank details */}
          <div className="bg-stone-50 rounded-2xl p-5 mb-5 space-y-3 border border-stone-100">
            <h3
              className="text-stone-700 mb-3 flex items-center gap-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              🏦 Datos para la transferencia
            </h3>
            {[
              { label: "Banco", value: BANK_INFO.banco },
              { label: "Tipo de cuenta", value: BANK_INFO.tipo },
              { label: "Número de cuenta", value: BANK_INFO.numero, copyable: true },
              { label: "Titular", value: BANK_INFO.titular },
              { label: "RUC", value: BANK_INFO.ci, copyable: true },
              { label: "Monto exacto", value: `$${finalTotal.toFixed(2)} USD`, highlight: true },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between text-sm">
                <span className="text-stone-500 w-36 shrink-0">{row.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${row.highlight ? "text-rose-600 text-base" : "text-stone-800"}`}>
                    {row.value}
                  </span>
                  {row.copyable && (
                    <button
                      onClick={() => copyToClipboard(row.value, row.label)}
                      className="text-stone-400 hover:text-rose-500 transition-colors"
                      title="Copiar"
                    >
                      {copied === row.label ? (
                        <CheckCircle size={14} className="text-emerald-500" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/593991234567?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl transition-colors text-sm font-medium mb-3 shadow-md hover:-translate-y-0.5"
          >
            <MessageCircle size={18} />
            Enviar comprobante por WhatsApp
          </a>
          <p className="text-xs text-stone-400 text-center mb-5">
            Tu pedido se confirma al recibir el comprobante de pago ✅
          </p>

          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 border border-stone-200 text-stone-600 hover:bg-stone-50 py-3 rounded-xl transition-colors text-sm"
          >
            Seguir comprando
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <div className="text-7xl mb-6">🛒</div>
          <h2
            className="text-stone-800 mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}
          >
            Tu carrito está vacío
          </h2>
          <p className="text-stone-500 mb-8">
            ¡Explora nuestra colección y encuentra las flores perfectas para ti!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/ramos"
              className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full transition-colors text-sm"
            >
              Ver Ramos
            </Link>
            <Link
              to="/detalles"
              className="bg-white border border-rose-300 text-rose-600 hover:bg-rose-50 px-6 py-3 rounded-full transition-colors text-sm"
            >
              Ver Detalles
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="flex items-center gap-1 text-stone-500 hover:text-rose-500 transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Seguir comprando
          </Link>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-rose-500" />
            <h1 className="text-stone-800" style={{ fontSize: "1.4rem" }}>
              Mi Carrito ({itemCount} {itemCount === 1 ? "producto" : "productos"})
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl p-5 shadow-sm flex gap-4"
                >
                  <Link to={`/producto/${item.id}`}>
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to={`/producto/${item.id}`}
                          className="text-stone-800 hover:text-rose-600 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        {item.badge && (
                          <span className="text-xs text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors shrink-0 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-stone-400 mt-1 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-stone-50 transition-colors text-stone-600 text-lg"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 border-x border-stone-200 text-sm min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-stone-50 transition-colors text-stone-600 text-lg"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-rose-700" style={{ fontFamily: "Georgia, serif" }}>
                        ${(item.price * item.quantity).toFixed(2)}{" "}
                        <span className="text-stone-400 text-xs font-sans">USD</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={clearCart}
              className="text-sm text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 size={14} /> Vaciar carrito
            </button>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >
              <h3 className="text-stone-800 mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Resumen del pedido
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal ({itemCount} productos)</span>
                  <span>${total.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>IVA (15%)</span>
                  <span>${iva.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span className="flex items-center gap-1">
                    <Truck size={14} className="text-rose-400" />
                    Envío
                  </span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-600">Gratis 🎉</span>
                    ) : (
                      `$${shipping.toFixed(2)} USD`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-stone-400 bg-rose-50 rounded-lg p-2">
                    Agrega <strong>${(FREE_SHIPPING_THRESHOLD - total).toFixed(2)} USD</strong> más para envío gratis
                  </p>
                )}
                <div className="border-t border-stone-100 pt-3 flex justify-between">
                  <span className="text-stone-800 font-medium">Total (IVA incluido)</span>
                  <div className="text-right">
                    <div className="text-rose-700" style={{ fontSize: "1.2rem", fontFamily: "Georgia, serif" }}>
                      ${finalTotal.toFixed(2)}
                    </div>
                    <div className="text-xs text-stone-400">USD</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                    return;
                  }
                  saveOrder({
                    items: items.map((item) => ({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: item.quantity,
                      image: item.image,
                    })),
                    total: finalTotal,
                  });
                  clearCart();
                  setOrderPlaced(true);
                }}
                className="w-full mt-5 bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl transition-all text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg shadow-md"
              >
                Confirmar y ver datos de pago 🌹
              </button>
            </motion.div>

            {/* Payment method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100"
            >
              <h4 className="text-stone-700 text-sm font-medium mb-3 flex items-center gap-2">
                🏦 Método de pago
              </h4>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-stone-600 leading-relaxed">
                <p className="font-medium text-amber-700 mb-1">Transferencia bancaria</p>
                <p>Al confirmar tu pedido te mostraremos los datos bancarios. Luego envías el comprobante por WhatsApp y listo.</p>
              </div>
            </motion.div>

            {/* Shipping note */}
            <div className="bg-rose-50 rounded-2xl p-4 text-sm text-stone-600 border border-rose-100">
              <div className="flex items-start gap-2">
                <Truck size={16} className="text-rose-400 mt-0.5 shrink-0" />
                <p>
                  Entregas el mismo día para pedidos antes de las{" "}
                  <strong>12:00 pm</strong> en Quito y área metropolitana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
