import { Link } from "react-router";
import { Flower2, Instagram, Facebook, MapPin, Phone, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-rose-600 rounded-full flex items-center justify-center">
                <Flower2 size={19} className="text-white" />
              </div>
              <span className="text-xl text-white" style={{ fontFamily: "Georgia, serif" }}>
                Ana Victoria
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-400 mb-1 italic">
              "Creando Emociones"
            </p>
            <p className="text-sm leading-relaxed text-stone-400 mb-4">
              Nuestros productos están elaborados con flores de fincas ecuatorianas de exportación.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/anavictoria.flor" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-stone-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/anavictoria.flor" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-stone-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">Nuestros productos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ramos" className="hover:text-rose-400 transition-colors">Ramos de Flores</Link></li>
              <li><Link to="/detalles" className="hover:text-rose-400 transition-colors">Detalles Florales</Link></li>
              <li><Link to="/pedidos-especiales" className="hover:text-rose-400 transition-colors">Pedidos Especiales</Link></li>
              <li><Link to="/carrito" className="hover:text-rose-400 transition-colors">Mi Carrito</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Acompaña tu regalo</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>🧸 Osito de felpa — $18.00</li>
              <li>🎈 Globo metálico — $2.00</li>
              <li>🏷️ Rótulo con mensaje — $2.00</li>
              <li>🍫 Bombones — $10.00</li>
              <li>💌 Mensaje en botella — $2.50</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Hablemos</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-rose-400 mt-0.5 shrink-0" />
                <span>Quito y los valles, Ecuador</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-rose-400 shrink-0" />
                <a href="https://wa.me/593997895649" className="hover:text-rose-400 transition-colors">
                  099-789-5649
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-rose-400 shrink-0" />
                <a href="mailto:anavictoria.conamor@gmail.com" className="hover:text-rose-400 transition-colors">
paola.villamarin@hotmail.com
                </a>
              </li>
            </ul>
            <div className="mt-4 text-xs text-stone-500">
              Entrega a domicilio sin recargo<br />
              Quito y los valles
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 text-center text-xs text-stone-500">
          <p className="flex items-center justify-center gap-1">
            © 2026 Ana Victoria · Creando Emociones. Hecho con <Heart size={12} className="text-rose-500" fill="currentColor" /> en Ecuador.
          </p>
        </div>
      </div>
    </footer>
  );
}