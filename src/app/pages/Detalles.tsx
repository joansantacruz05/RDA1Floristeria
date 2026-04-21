import { useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

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

  const sortedProducts = [...detallesProducts].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-emerald-100 via-emerald-50 to-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🌸</div>
          <h1
            className="text-stone-800 mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "2.8rem" }}
          >
            Detalles Florales
          </h1>
          <p className="text-stone-600 max-w-lg mx-auto leading-relaxed">
            Arreglos especiales, cajas florales y plantas pensadas para sorprender. Cada detalle con nuestro toque personal.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Occasion filter pills */}
        <div className="flex gap-2 flex-wrap mb-6">
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
        </div>

        {/* Filters bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
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
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Highlight cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-rose-100 to-rose-50 rounded-2xl p-8 border border-rose-200">
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="text-stone-800 mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Listo para regalar
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Todos nuestros arreglos vienen listos para entregar. Si quieres, podemos incluir una tarjeta con tu mensaje personal.
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl p-8 border border-emerald-200">
            <div className="text-3xl mb-3">🚚</div>
            <h3 className="text-stone-800 mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Envío el mismo día
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Si pides antes del mediodía, te lo llevamos el mismo día en Quito. Sin complicaciones, sin costos extra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
