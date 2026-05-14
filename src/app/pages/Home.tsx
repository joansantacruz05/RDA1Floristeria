import { Link } from "react-router";
import { img10 } from "../data/localImages";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { Truck, Heart, ShieldCheck } from "lucide-react";

const featuredProducts = products.filter((p) => p.badge).slice(0, 4);

export function Home() {
  return (
    <div>
      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-rose-600 via-rose-500 to-rose-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🌹</div>
          <h1
            className="mb-4"
            style={{ fontFamily: "Georgia, serif", fontSize: "3rem" }}
          >
            Ana Victoria
          </h1>
          <p className="text-rose-100 text-xl mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Creando Emociones
          </p>
          <p className="text-rose-200 max-w-xl mx-auto mb-8 leading-relaxed">
            Flores frescas de fincas ecuatorianas de exportación, entregadas con amor en Quito y los valles.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/ramos"
              className="bg-white text-rose-700 hover:bg-rose-50 px-8 py-3 rounded-full text-sm font-medium transition-colors shadow-lg"
            >
              Ver Ramos
            </Link>
            <Link
              to="/detalles"
              className="border border-rose-200 text-white hover:bg-rose-600 px-8 py-3 rounded-full text-sm transition-colors"
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-rose-600 text-sm tracking-wide uppercase block mb-2 font-medium">
              Lo más pedido
            </span>
            <h2
              className="text-stone-800"
              style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem" }}
            >
              Productos destacados
            </h2>
            <p className="text-stone-500 mt-2">
              Los favoritos de nuestros clientes para ocasiones especiales
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/ramos"
              className="inline-flex items-center gap-2 border border-rose-300 text-rose-600 hover:bg-rose-50 px-6 py-3 rounded-full text-sm transition-colors"
            >
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-rose-600 text-sm tracking-wide uppercase block mb-2 font-medium">
              ¿Por qué elegirnos?
            </span>
            <h2
              className="text-stone-800"
              style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem" }}
            >
              La mejor experiencia floral
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-rose-50 rounded-2xl p-8 text-center border border-rose-100">
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={28} className="text-rose-600" />
              </div>
              <h3 className="text-stone-800 mb-2">Envío el mismo día</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Entregas gratuitas en Quito y los valles. Pide antes de las 12:00 pm y recíbelo el mismo día.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-8 text-center border border-emerald-100">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={28} className="text-emerald-600" />
              </div>
              <h3 className="text-stone-800 mb-2">Frescura garantizada</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Flores de fincas ecuatorianas de exportación. Si no están perfectas, te las cambiamos.
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-8 text-center border border-amber-100">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={28} className="text-amber-600" />
              </div>
              <h3 className="text-stone-800 mb-2">Hecho con amor</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Cada arreglo es diseñado artesanalmente con dedicación y cariño para hacer tu momento especial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-amber-50/30 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
              <img
                src={img10}
                alt="Ana Victoria Floristería en Quito"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-rose-600 text-sm tracking-wide uppercase mb-3 block font-medium">
                Sobre nosotros
              </span>
              <h2
                className="text-stone-800 mb-4"
                style={{ fontFamily: "Georgia, serif", fontSize: "2rem" }}
              >
                Ana Victoria · Creando Emociones<br />
                <span className="text-rose-600 text-xl">desde el corazón del Ecuador</span>
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                La única manera de vivir es hacerlo todo con amor. Por eso cada arreglo que creamos lleva ese sentimiento único que solo las flores pueden transmitir.
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                Nuestros productos están elaborados con flores de fincas ecuatorianas de exportación, garantizando la mejor calidad y frescura. Hacemos entregas a domicilio sin recargo en Quito y los valles — agenda la fecha de tu entrega con anticipación.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/593997895649"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full transition-colors text-sm shadow-lg hover:shadow-xl"
                >
                  Escríbenos al 099-789-5649
                </a>
                <Link
                  to="/pedidos-especiales"
                  className="inline-flex items-center gap-2 border border-rose-300 text-rose-600 hover:bg-rose-50 px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Pedido personalizado
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="mb-4"
            style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem" }}
          >
            ¿Listo para sorprender?
          </h2>
          <p className="text-emerald-100 max-w-lg mx-auto mb-8 leading-relaxed">
            Haz tu pedido hoy y recíbelo el mismo día en Quito. Flores frescas, amor eterno.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/ramos"
              className="bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-3 rounded-full text-sm font-medium transition-colors shadow-lg"
            >
              Comprar ahora
            </Link>
            <a
              href="https://wa.me/593997895649"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-emerald-200 text-white hover:bg-emerald-600 px-8 py-3 rounded-full text-sm transition-colors"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}