import { useState } from "react";
import { useSupabaseProducts } from "../context/SupabaseContext";
import { ProductCard } from "../components/ProductCard";
import { SlidersHorizontal, Gift, Truck, Flower2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const sortOptions = [
  { value: "default", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
];

const occasions = ["Todos", "Bodas", "Cumpleaños", "Decoración", "Regalo"];

const heroBg =
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1400&q=80";

export function Detalles() {
  const { products } = useSupabaseProducts();
  const [sort, setSort] = useState("default");
  const [occasion, setOccasion] = useState("Todos");

  const detallesProducts = products.filter((p) => p.category === "detalles");

  const filteredProducts =
    occasion === "Todos"
      ? detallesProducts
      : detallesProducts.filter((p) =>
          p.tags.some(
            (tag) =>
              tag.toLowerCase() === occasion.toLowerCase() ||
              tag.toLowerCase().includes(occasion.toLowerCase().replace(/s$/, ""))
          )
        );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero banner con imagen */}
      <div className="relative h-72 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/55 via-emerald-800/45 to-stone-900/70" />
        <div className="relative text-center px-4">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-5xl mb-4"
          >
            🌸
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-white mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "2.8rem" }}
          >
            Detalles Florales
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-emerald-100 max-w-lg mx-auto leading-relaxed"
          >
            Arreglos especiales, cajas florales y plantas pensadas para sorprender. Cada detalle con nuestro toque personal.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Occasion filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 flex-wrap mb-6"
        >
          {occasions.map((occ) => (
            <motion.button
              key={occ}
              onClick={() => setOccasion(occ)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                occasion === occ
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-rose-300"
              }`}
            >
              {occ}
            </motion.button>
          ))}
        </motion.div>

        {/* Filters bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
          <p className="text-sm text-stone-600">
            <motion.span
              key={sortedProducts.length}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {sortedProducts.length}{" "}
              {sortedProducts.length === 1 ? "detalle" : "detalles"} disponibles
              {occasion !== "Todos" && (
                <span className="ml-1 text-rose-500">· {occasion}</span>
              )}
            </motion.span>
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-stone-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:border-rose-400"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {sortedProducts.length > 0 ? (
            <motion.div
              key={occasion + sort}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sortedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-stone-400"
            >
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flower2 size={32} className="text-rose-400" />
            </div>
              <p className="text-lg">No hay detalles para "{occasion}" aún</p>
              <button
                onClick={() => setOccasion("Todos")}
                className="mt-4 text-rose-500 text-sm hover:underline"
              >
                Ver todos los detalles
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Highlight cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-rose-100 to-rose-50 rounded-2xl p-8 border border-rose-200"
          >
            <div className="w-12 h-12 bg-rose-200 rounded-2xl flex items-center justify-center mb-3">
              <Gift size={22} className="text-rose-600" />
            </div>
            <h3
              className="text-stone-800 mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Listo para regalar
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Todos nuestros arreglos vienen listos para entregar. Si quieres, podemos incluir una tarjeta con tu mensaje personal.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl p-8 border border-emerald-200"
          >
            <div className="w-12 h-12 bg-emerald-200 rounded-2xl flex items-center justify-center mb-3">
              <Truck size={22} className="text-emerald-600" />
            </div>
            <h3
              className="text-stone-800 mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Envío el mismo día
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Si pides antes del mediodía, te lo llevamos el mismo día en Quito. Sin complicaciones, sin costos extra.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
