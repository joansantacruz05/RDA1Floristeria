import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ShoppingCart, Flower2, Menu, X, Phone } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/ramos", label: "Ramos" },
    { to: "/detalles", label: "Detalles Florales" },
    { to: "/pedidos-especiales", label: "Pedidos Especiales" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-rose-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-rose-700 to-rose-600 text-white text-center py-2 text-sm">
        <span className="flex items-center justify-center gap-2">
          <Phone size={13} />
          ¿Necesitas ayuda? Escríbenos al: +593 99 123 4567 · Quito, Ecuador
        </span>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-rose-600 rounded-full flex items-center justify-center group-hover:bg-rose-700 transition-colors shadow-sm">
              <Flower2 size={19} className="text-white" />
            </div>
            <div>
              <span className="text-xl text-rose-700" style={{ fontFamily: "Georgia, serif" }}>
                Flor
              </span>
              <span className="text-xl text-stone-700" style={{ fontFamily: "Georgia, serif" }}>
                encia
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm transition-colors pb-1 ${
                  isActive(link.to)
                    ? "text-rose-600"
                    : "text-stone-600 hover:text-rose-500"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Cart + mobile menu */}
          <div className="flex items-center gap-3">
            <Link
              to="/carrito"
              className="relative p-2 rounded-full hover:bg-rose-50 transition-colors"
            >
              <ShoppingCart size={22} className="text-stone-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 rounded-full hover:bg-rose-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} className="text-stone-700" /> : <Menu size={22} className="text-stone-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-rose-100 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 text-sm border-b border-rose-50 last:border-0 ${
                isActive(link.to) ? "text-rose-600" : "text-stone-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
