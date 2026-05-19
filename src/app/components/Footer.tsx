import { Link } from "react-router";
import { Flower2, Instagram, Facebook, Phone, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-rose-600 rounded-full flex items-center justify-center">
                <Flower2 size={19} className="text-white" />
              </div>
              <span className="text-xl text-white" style={{ fontFamily: "Georgia, serif" }}>
                AnaVictoria
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-400 mb-4">
              Flores frescas con entrega el mismo día en Quito. Cada ramo lo hacemos con amor para que quien lo recibe se sienta especial.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-stone-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-stone-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white mb-4">Nuestros productos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ramos" className="hover:text-rose-400 transition-colors">Ramos de Flores</Link></li>
              <li><Link to="/detalles" className="hover:text-rose-400 transition-colors">Detalles Florales</Link></li>
              <li><Link to="/pedidos-especiales" className="hover:text-rose-400 transition-colors">Pedidos Especiales</Link></li>
              <li><Link to="/carrito" className="hover:text-rose-400 transition-colors">Mi Carrito</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white mb-4">Info útil</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-rose-400 transition-colors">Nuestra historia</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Cómo enviamos</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Preguntas frecuentes</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Hablemos</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-rose-400 shrink-0" />
                <span>+593 99 762 0099</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-rose-400 shrink-0" />
                <span>paola.villamarin@hotmail.com</span>
              </li>
            </ul>
            <div className="mt-4 text-xs text-stone-500">
              Lun – Sáb: 8am – 7pm<br />
              Dom: 9am – 3pm
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 text-center text-xs text-stone-500">
          <p className="flex items-center justify-center gap-1">
            © 2026 AnaVictoria. Hecho con <Heart size={12} className="text-rose-500" fill="currentColor" /> en Ecuador.
          </p>
        </div>
      </div>
    </footer>
  );
}
