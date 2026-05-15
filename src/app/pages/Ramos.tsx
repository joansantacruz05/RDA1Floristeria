import { useState } from "react";
import { motion } from "motion/react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { SlidersHorizontal, Flower2 } from "lucide-react";

const ramoProducts = products.filter((p) => p.category === "ramos");

const sortOptions = [
  { value: "default", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
];

export function Ramos() {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...ramoProducts].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero banner */}
      <motion.div
        className="bg-gradient-to-br from-rose-100 via-rose-50 to-stone-50 py-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="text-5xl mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            💐
          </motion.div>
          <h1
            className="text-stone-800 mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "2.8rem" }}
          >
            <Flower2 size={32} className="inline text-rose-400 mr-2 -mt-1" />
            Ramos de Flores
          </h1>
          <p className="text-stone-600 max-w-lg mx-auto leading-relaxed">
            Cada ramo está hecho a mano con flores frescas del día. Te garantizamos que llegarán hermosos a tu destino en Quito.
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters bar */}
        <motion.div
          className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="text-sm text-stone-600">
            {sortedProducts.length} ramos disponibles
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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

        {/* Tips section */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-rose-50 to-emerald-50 rounded-2xl p-8 border border-rose-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-stone-800 mb-6 text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Tips para que tus flores duren más 🌹
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "💧",
                title: "Agua fresca todos los días",
                desc: "Cambia el agua cada día y corta los tallos en diagonal. Así absorben mejor.",
              },
              {
                icon: "🌡️",
                title: "Lugar fresco",
                desc: "Ponlos en un lugar fresco y evita que les dé el sol directo. Les encanta el fresquito.",
              },
              {
                icon: "✂️",
                title: "Corta al llegar",
                desc: "Cuando recibas tu ramo, corta 2cm de cada tallo. Es como darles un refresh.",
              },
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
              >
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <h4 className="text-stone-800 mb-1">{tip.title}</h4>
                  <p className="text-sm text-stone-600">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
