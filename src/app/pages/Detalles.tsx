import { useState } from "react";
import { motion } from "motion/react";
import { img6 } from "../data/localImages";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { SlidersHorizontal, Flower2 } from "lucide-react";

const detallesProducts = products.filter((p) => p.category === "detalles");

const sortOptions = [
  { value: "default", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
];

const occasions = ["Todos", "Bodas", "Cumpleaños", "Decoración", "Regalo"];

export function Detalles() {
  const [sort, setSort] = useState("default");
  const [occasion, setOccasion] = useState("Todos");

  const filteredByOccasion = occasion === "Todos"
    ? detallesProducts
    : detallesProducts.filter((p) => p.occasion === occasion);

  const sortedProducts = [...filteredByOccasion].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero banner */}
      <motion.div
        className="relative py-16 overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img6})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-emerald-800/70 to-stone-900/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            className="text-5xl mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            🌸
          </motion.div>
          <h1
            className="text-white mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "2.8rem" }}
          >
            <Flower2 size={32} className="inline text-emerald-200 mr-2 -mt-1" />
            Detalles Florales
          </h1>
          <p className="text-emerald-100 max-w-lg mx-auto leading-relaxed">
            Arreglos especiales, cajas florales y plantas pensadas para sorprender. Cada detalle con nuestro toque personal.
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Occasion filter pills */}
        <motion.div
          className="flex gap-2 flex-wrap mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {occasions.map((occ) => (
            <button
              key={occ}
              onClick={() => setOccasion(occ)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                occasion === occ
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-rose-300"
              }`}
            >
              {occ}
            </button>
          ))}
        </motion.div>

        {/* Filters bar */}
        <motion.div
          className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="text-sm text-stone-600">
            {sortedProducts.length} detalles disponibles
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
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          initial="hidden"
          animate="show"
        >
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Why add-ons */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2
              className="text-stone-800"
              style={{ fontFamily: "Georgia, serif", fontSize: "2rem" }}
            >
              <Flower2 size={26} className="inline text-rose-400 mr-2 -mt-1" />
              ¿Por qué agregar un detalle extra?
            </h2>
            <p className="text-stone-500 mt-2">
              Haz que tu regalo sea aún más especial con estos complementos
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { icon: "🧸", title: "Osito de Felpa", desc: "El compañero perfecto para abrazar" },
              { icon: "🎈", title: "Globo Metálico", desc: "Un toque brillante y festivo" },
              { icon: "🍫", title: "Bombones Ferrero", desc: "Dulzura que complementa las flores" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-stone-100"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="text-stone-800 mb-1">{item.title}</h4>
                <p className="text-sm text-stone-500">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Highlight cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-gradient-to-br from-rose-100 to-rose-50 rounded-2xl p-8 border border-rose-200"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="text-stone-800 mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Listo para regalar
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Todos nuestros arreglos vienen listos para entregar. Si quieres, podemos incluir una tarjeta con tu mensaje personal.
            </p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl p-8 border border-emerald-200"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl mb-3">🚚</div>
            <h3 className="text-stone-800 mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Envío el mismo día
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Si pides antes del mediodía, te lo llevamos el mismo día en Quito. Sin complicaciones, sin costos extra.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
