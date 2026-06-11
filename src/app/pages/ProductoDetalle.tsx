import { useParams, Link, useNavigate } from "react-router";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Heart,
  Truck,
  Shield,
  ChevronRight,
  User,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { obtenerResenasProducto } from "@/lib/supabase-service";
import type { ResenaPublica } from "@/lib/supabase-service";

export function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [resenas, setResenas] = useState<ResenaPublica[]>([]);
  const [cargandoResenas, setCargandoResenas] = useState(true);

  useEffect(() => {
    (async () => {
      setCargandoResenas(true);
      const data = await obtenerResenasProducto(product.id);
      setResenas(data);
      setCargandoResenas(false);
    })();
  }, [product.id]);

  const product = products.find((p) => p.id === Number(id));
  const related = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 3);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-stone-500">Producto no encontrado</p>
        <Link
          to="/"
          className="text-rose-500 hover:text-rose-600 flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryLabel =
    product.category === "ramos" ? "Ramos" : "Detalles Florales";
  const categoryPath =
    product.category === "ramos" ? "/ramos" : "/detalles";

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-stone-400">
            <Link to="/" className="hover:text-rose-500 transition-colors">
              Inicio
            </Link>
            <ChevronRight size={14} />
            <Link
              to={categoryPath}
              className="hover:text-rose-500 transition-colors"
            >
              {categoryLabel}
            </Link>
            <ChevronRight size={14} />
            <span className="text-stone-600 truncate max-w-xs">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-stone-500 hover:text-rose-500 text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-square shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Category + Wishlist */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-rose-500 text-sm">{categoryLabel}</span>
              <button
                onClick={() => setWished(!wished)}
                className="flex items-center gap-1 text-sm text-stone-500 hover:text-rose-500 transition-colors"
              >
                <Heart
                  size={18}
                  fill={wished ? "currentColor" : "none"}
                  className={wished ? "text-rose-500" : ""}
                />
                {wished ? "Guardado" : "Guardar"}
              </button>
            </div>

            <h1
              className="text-stone-800 mb-3"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "2rem",
                lineHeight: 1.3,
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.round(product.rating)
                        ? "text-amber-400"
                        : "text-stone-200"
                    }
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-sm text-stone-600">{product.rating}</span>
              <span className="text-sm text-stone-400">
                ({product.reviews} reseñas)
              </span>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-4">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-rose-600 bg-rose-50 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="bg-rose-50 rounded-2xl p-5 mb-6">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-rose-700"
                  style={{ fontSize: "2rem", fontFamily: "Georgia, serif" }}
                >
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-stone-400 text-sm">USD</span>
              </div>
              <p className="text-sm text-stone-500 mt-1">
                Precio incluye empaque artesanal y tarjeta personalizada
              </p>
            </div>

            {/* Description */}
            <p className="text-stone-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-stone-600">Cantidad:</span>
              <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-stone-50 transition-colors text-stone-600"
                >
                  −
                </button>
                <span className="px-4 py-2 border-x border-stone-200 text-sm min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-stone-50 transition-colors text-stone-600"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-stone-400">
                Subtotal:{" "}
                <span className="text-stone-700">
                  ${(product.price * quantity).toFixed(2)} USD
                </span>
              </span>
            </div>

            {/* Add to cart */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl transition-all text-sm ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-rose-500 hover:bg-rose-600 text-white"
                }`}
              >
                <ShoppingCart size={18} />
                {added ? "¡Añadido al carrito!" : "Añadir al carrito"}
              </button>
              <Link
                to="/carrito"
                className="px-6 py-4 rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50 transition-colors text-sm flex items-center"
              >
                Comprar ya
              </Link>
            </div>

            {/* Guarantees */}
            <div className="space-y-3 border-t border-stone-100 pt-6">
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Truck size={16} className="text-rose-400 shrink-0" />
                <span>Envío gratuito en pedidos mayores a $40.00 USD en Quito</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Shield size={16} className="text-rose-400 shrink-0" />
                <span>Frescura garantizada o te devolvemos tu dinero</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reseñas de clientes */}
        <div className="mt-20">
          <h2
            className="text-stone-800 mb-8"
            style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}
          >
            Reseñas de clientes
          </h2>

          {cargandoResenas ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-stone-400 text-sm">Cargando reseñas...</p>
            </div>
          ) : resenas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-100">
              <MessageSquare size={40} className="text-stone-300 mx-auto mb-3" />
              <p className="text-stone-600 mb-1" style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem" }}>
                Aún no hay reseñas
              </p>
              <p className="text-stone-400 text-sm">Sé el primero en dejar tu opinión después de recibir tu pedido</p>
            </div>
          ) : (
            <div className="space-y-4">
              {resenas.map((r) => (
                <div key={r.id} className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
                        <User size={15} className="text-rose-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-stone-700">{r.cliente_nombre}</p>
                        <p className="text-xs text-stone-400">
                          {new Date(r.creado_en).toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          fill={s <= r.calificacion ? "#f43f5e" : "none"}
                          className={s <= r.calificacion ? "text-rose-500" : "text-stone-200"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">"{r.comentario}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2
              className="text-stone-800 mb-8"
              style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}
            >
              También te puede gustar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}