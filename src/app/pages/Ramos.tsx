import { useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

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
      <div className="bg-gradient-to-br from-rose-100 via-rose-50 to-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">💐</div>
          <h1
            className="text-stone-800 mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "2.8rem" }}
          >
            Ramos de Flores
          </h1>
          <p className="text-stone-600 max-w-lg mx-auto leading-relaxed">
            Cada ramo está hecho a mano con flores frescas del día. Te garantizamos que llegarán hermosos a tu destino en Quito.
          </p>
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
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Tips section */}
        <div className="mt-16 bg-gradient-to-br from-rose-50 to-emerald-50 rounded-2xl p-8 border border-rose-100">
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
            ].map((tip) => (
              <div key={tip.title} className="flex gap-3">
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <h4 className="text-stone-800 mb-1">{tip.title}</h4>
                  <p className="text-sm text-stone-600">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
