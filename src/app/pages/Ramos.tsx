import { useState } from "react";
import { useSupabaseProducts } from "../context/SupabaseContext";
import { ProductCard } from "../components/ProductCard";
import { SlidersHorizontal, Flower2, Droplets, Thermometer, Scissors } from "lucide-react";
import { motion } from "motion/react";

const sortOptions = [
  { value: "default", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
];

const heroBg =
  "https://images.unsplash.com/photo-1490750967868-88df5691cc5c?auto=format&fit=crop&w=1400&q=80";

export function Ramos() {
  const { products } = useSupabaseProducts();
  const [sort, setSort] = useState("default");

  const ramoProducts = products.filter((p) => p.category === "ramos");

  const sortedProducts = [...ramoProducts].sort((a, b) => {
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
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/60 via-rose-800/50 to-stone-900/70" />
        <div className="relative text-center px-4">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Flower2 size={36} className="text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-white mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "2.8rem" }}
          >
            Ramos de Flores
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-rose-100 max-w-lg mx-auto leading-relaxed"
          >
            Cada ramo está hecho a mano con flores frescas del día. Te garantizamos que llegarán hermosos a tu destino en Quito.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
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
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Tips section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-gradient-to-br from-rose-50 to-emerald-50 rounded-2xl p-8 border border-rose-100"
        >
          <h3
            className="text-stone-800 mb-6 text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Tips para que tus flores duren más
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Droplets,
                title: "Agua fresca todos los días",
                desc: "Cambia el agua cada día y corta los tallos en diagonal. Así absorben mejor.",
              },
              {
                icon: Thermometer,
                title: "Lugar fresco",
                desc: "Ponlos en un lugar fresco y evita que les dé el sol directo. Les encanta el fresquito.",
              },
              {
                icon: Scissors,
                title: "Corta al llegar",
                desc: "Cuando recibas tu ramo, corta 2cm de cada tallo. Es como darles un refresh.",
              },
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
                  <tip.icon size={18} className="text-rose-600" />
                </div>
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
