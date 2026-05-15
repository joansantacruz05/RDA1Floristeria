import { Link } from "react-router";
import { motion } from "motion/react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useState } from "react";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/producto/${product.id}`} className="group block">
      <motion.div
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-stone-100 hover:border-rose-200"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs px-2.5 py-1 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {/* Wishlist */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              setWished(!wished);
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            whileTap={{ scale: 0.8 }}
          >
            <Heart
              size={15}
              className={wished ? "text-rose-500" : "text-stone-400"}
              fill={wished ? "currentColor" : "none"}
            />
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4">
          {/* Tags */}
          <div className="flex gap-1 flex-wrap mb-2">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-stone-800 mb-1 truncate">{product.name}</h3>
          <p className="text-sm text-stone-600 line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star size={14} className="text-amber-400" fill="currentColor" />
            <span className="text-sm text-stone-700">{product.rating}</span>
            <span className="text-xs text-stone-400">({product.reviews})</span>
          </div>

          {/* Price + Add */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg text-rose-700" style={{ fontFamily: "Georgia, serif" }}>
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-stone-400 ml-1">USD</span>
              <span className="text-[10px] text-stone-400 block">IVA incl.</span>
            </div>
            <motion.button
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-colors duration-200 ${
                added
                  ? "bg-emerald-500 text-white"
                  : "bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
              }`}
              whileTap={{ scale: 0.9 }}
              animate={added ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <ShoppingCart size={15} />
              {added ? "¡Listo!" : "Añadir"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
