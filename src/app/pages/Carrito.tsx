import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import {
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Truck,
  Tag,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

// Ecuador: envío gratis a partir de $40 USD, costo de envío $3.50
const FREE_SHIPPING_THRESHOLD = 40;
const SHIPPING_COST = 3.50;

export function Carrito() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, iva, itemCount } =
    useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const discount = couponApplied ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const baseImponible = subtotal - discount;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = baseImponible + iva + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "FLORENCIA10") {
      setCouponApplied(true);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-sm">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2
            className="text-stone-800 mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}
          >
            ¡Pedido confirmado!
          </h2>
          <p className="text-stone-500 leading-relaxed mb-6">
            Tu pedido ha sido recibido. Pronto recibirás un mensaje de
            confirmación con los detalles de tu entrega en Quito.
          </p>
          <p className="text-rose-500 text-2xl mb-6">🌹</p>
          <Link
            to="/"
            className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full transition-colors text-sm inline-block"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
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
        </div>
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
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 shadow-sm flex gap-4"
              >
                <Link to={`/producto/${item.id}`}>
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
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
                    {/* Quantity controls */}
                    <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 hover:bg-stone-50 transition-colors text-stone-600 text-lg"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 border-x border-stone-200 text-sm min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
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
              </div>
            ))}

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="text-sm text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 size={14} /> Vaciar carrito
            </button>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={16} className="text-rose-400" />
                <span className="text-sm text-stone-600">Cupón de descuento</span>
              </div>
              {couponApplied ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 flex items-center gap-2">
                  <CheckCircle size={15} />
                  Cupón FLORENCIA10 aplicado — 10% de descuento
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Ej: FLORENCIA10"
                    className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              )}
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-stone-800 mb-4">Resumen del pedido</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal ({itemCount} productos)</span>
                  <span>${subtotal.toFixed(2)} USD</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Descuento (10%)</span>
                    <span>−${discount.toFixed(2)} USD</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Base imponible</span>
                  <span>${baseImponible.toFixed(2)} USD</span>
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
                      <span className="text-emerald-600">Gratis</span>
                    ) : (
                      `$${shipping.toFixed(2)} USD`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-stone-400">
                    Agrega ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} USD más para envío gratis
                  </p>
                )}
                <div className="border-t border-stone-100 pt-3 flex justify-between">
                  <span className="text-stone-800">Total</span>
                  <div className="text-right">
                    <div className="text-rose-700" style={{ fontSize: "1.2rem", fontFamily: "Georgia, serif" }}>
                      ${finalTotal.toFixed(2)}
                    </div>
                    <div className="text-xs text-stone-400">USD</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOrderPlaced(true)}
                className="w-full mt-4 bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl transition-colors text-sm"
              >
                Finalizar pedido 🌹
              </button>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-stone-400">
                <span>💳 Pago seguro</span>
                <span>🔒 Datos protegidos</span>
              </div>
            </div>

            {/* Shipping note */}
            <div className="bg-rose-50 rounded-2xl p-4 text-sm text-stone-600 border border-rose-100">
              <div className="flex items-start gap-2">
                <Truck size={16} className="text-rose-400 mt-0.5 shrink-0" />
                <p>
                  Entregas el mismo día para pedidos realizados antes de las{" "}
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
