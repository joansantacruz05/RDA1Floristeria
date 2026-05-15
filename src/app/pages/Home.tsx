import { Link } from "react-router";
import { motion } from "motion/react";
import { img5, img10 } from "../data/localImages";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { Truck, Heart, ShieldCheck, Flower2 } from "lucide-react";

const featuredProducts = products.filter((p) => p.badge).slice(0, 4);

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, staggerChildren: 0.1 },
};

export function Home() {
  return (
    <div>
      {/* HERO BANNER */}
      <motion.section
        className="relative text-white py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img5})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/85 via-rose-800/80 to-rose-950/90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            className="text-6xl mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            🌹
          </motion.div>
          <h1
            className="mb-4"
            style={{ fontFamily: "Georgia, serif", fontSize: "3rem" }}
          >
            Ana Victoria
          </h1>
          <motion.p
            className="text-rose-100 text-xl mb-2"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Creando Emociones
          </motion.p>
          <motion.p
            className="text-rose-200 max-w-xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Flores frescas de fincas ecuatorianas de exportación, entregadas con amor en Quito y los valles.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
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
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURED PRODUCTS */}
      <motion.section className="py-20 bg-stone-50" {...fadeUp}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-rose-600 text-sm tracking-wide uppercase block mb-2 font-medium">
              Lo más pedido
            </span>
            <h2
              className="text-stone-800"
              style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem" }}
            >
              <Flower2 size={28} className="inline text-rose-400 mr-2 -mt-1" />
              Productos destacados
            </h2>
            <p className="text-stone-500 mt-2">
              Los favoritos de nuestros clientes para ocasiones especiales
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/ramos"
              className="inline-flex items-center gap-2 border border-rose-300 text-rose-600 hover:bg-rose-50 px-6 py-3 rounded-full text-sm transition-colors"
            >
              Ver todos los productos →
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* WHY CHOOSE US */}
      <motion.section className="py-20 bg-white" {...fadeUp}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-rose-600 text-sm tracking-wide uppercase block mb-2 font-medium">
              ¿Por qué elegirnos?
            </span>
            <h2
              className="text-stone-800"
              style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem" }}
            >
              <Flower2 size={28} className="inline text-rose-400 mr-2 -mt-1" />
              La mejor experiencia floral
            </h2>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                bg: "bg-rose-50",
                border: "border-rose-100",
                iconBg: "bg-rose-100",
                iconColor: "text-rose-600",
                Icon: Truck,
                title: "Envío el mismo día",
                desc: "Entregas gratuitas en Quito y los valles. Pide antes de las 12:00 pm y recíbelo el mismo día.",
              },
              {
                bg: "bg-emerald-50",
                border: "border-emerald-100",
                iconBg: "bg-emerald-100",
                iconColor: "text-emerald-600",
                Icon: ShieldCheck,
                title: "Frescura garantizada",
                desc: "Flores de fincas ecuatorianas de exportación. Si no están perfectas, te las cambiamos.",
              },
              {
                bg: "bg-amber-50",
                border: "border-amber-100",
                iconBg: "bg-amber-100",
                iconColor: "text-amber-600",
                Icon: Heart,
                title: "Hecho con amor",
                desc: "Cada arreglo es diseñado artesanalmente con dedicación y cariño para hacer tu momento especial.",
              },
            ].map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.title}
                  className={`${item.bg} rounded-2xl p-8 text-center ${item.border}`}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <div className={`w-14 h-14 ${item.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={28} className={item.iconColor} />
                  </div>
                  <h3 className="text-stone-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* ABOUT SECTION */}
      <motion.section
        className="py-20 bg-gradient-to-br from-rose-50 via-amber-50/30 to-rose-50"
        {...fadeUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <motion.img
                src={img10}
                alt="Ana Victoria Floristería en Quito"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="text-rose-600 text-sm tracking-wide uppercase mb-3 block font-medium">
                Sobre nosotros
              </span>
              <h2
                className="text-stone-800 mb-4"
                style={{ fontFamily: "Georgia, serif", fontSize: "2rem" }}
              >
                <Flower2 size={26} className="inline text-rose-400 mr-2 -mt-1" />
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
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-20 bg-gradient-to-br from-emerald-700 to-emerald-800 text-white"
        {...fadeUp}
      >
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
      </motion.section>
    </div>
  );
}