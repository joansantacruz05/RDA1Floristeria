import { Link } from "react-router";
import { ArrowRight, Truck, Shield, Clock, Gift, Sparkles } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { img1, img2, img3, img4, img5, img6, img7, img8, img9, img10 } from "../data/localImages";
import { motion } from "motion/react";

const heroImage = img4;

const featuredProducts = products.slice(0, 4);
const galleryGrid = [img1, img2, img3, img4, img5, img6];

const flowerStrip = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const categories = [
  {
    title: "Ramos de Flores",
    description: "Frescos, bonitos y hechos con cariño",
    link: "/ramos",
    emoji: "💐",
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-600",
  },
  {
    title: "Detalles Florales",
    description: "Arreglos especiales para momentos únicos",
    link: "/detalles",
    emoji: "🌸",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-600",
  },
  {
    title: "Pedidos Especiales",
    description: "Creamos el arreglo que imaginas",
    link: "/pedidos-especiales",
    emoji: "✨",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-600",
  },
];

const benefits = [
  { icon: Truck, title: "Envío el mismo día", desc: "Si pides antes del mediodía" },
  { icon: Shield, title: "Flores frescas", desc: "O te devolvemos tu dinero" },
  { icon: Clock, title: "Abierto 7 días", desc: "Incluyendo domingos y festivos" },
  { icon: Gift, title: "Envoltorio bonito", desc: "Sin costo adicional" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export function Home() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/65 via-stone-900/45 to-stone-900/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles size={17} className="text-rose-300" />
              <span className="text-rose-200 text-sm tracking-wide">
                Flores con alma · Quito, Ecuador
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white mb-5"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
                lineHeight: 1.2,
                fontWeight: 400,
              }}
            >
              Hacemos que tus momentos{" "}
              <span className="text-rose-300">florezcan</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-stone-200 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Cada ramo cuenta una historia. Trabajamos con flores frescas y mucho amor para crear arreglos que te hagan sonreír.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/ramos"
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-7 py-3.5 rounded-full transition-all text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Ver Ramos <ArrowRight size={16} />
              </Link>
              <Link
                to="/pedidos-especiales"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/30 px-7 py-3.5 rounded-full transition-all text-sm hover:-translate-y-0.5"
              >
                Pedido Personalizado
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFITS BAR */}
      <section className="bg-gradient-to-r from-rose-700 to-rose-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-rose-500/50 rounded-full flex items-center justify-center shrink-0">
                  <b.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">{b.title}</p>
                  <p className="text-xs text-rose-100">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOWER IMAGE STRIP */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-rose-600 text-sm tracking-wide uppercase font-medium mb-2"
          >
            Nuestra colección
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-stone-800"
            style={{ fontFamily: "Georgia, serif", fontSize: "2rem" }}
          >
            Flores para cada momento
          </motion.h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 px-4 sm:px-8 scrollbar-hide">
          {flowerStrip.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="shrink-0 w-48 h-56 rounded-2xl overflow-hidden shadow-md cursor-pointer"
            >
              <img
                src={img}
                alt={`Flor ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-stone-800 mb-3"
              style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem" }}
            >
              ¿Qué necesitas hoy?
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="text-stone-600 max-w-md mx-auto"
            >
              Te ayudamos a encontrar las flores perfectas para cada ocasión
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link
                  to={cat.link}
                  className={`group block ${cat.bg} rounded-2xl p-8 border ${cat.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <motion.div
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {cat.emoji}
                  </motion.div>
                  <h3 className="text-stone-800 mb-2">{cat.title}</h3>
                  <p className="text-stone-600 text-sm mb-4">{cat.description}</p>
                  <span className={`inline-flex items-center gap-1 ${cat.text} text-sm group-hover:gap-2 transition-all font-medium`}>
                    Explorar <ArrowRight size={15} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2
                className="text-stone-800 mb-2"
                style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem" }}
              >
                Favoritos del mes
              </h2>
              <p className="text-stone-600">
                Los arreglos que más han enamorado este mes
              </p>
            </motion.div>
            <Link
              to="/ramos"
              className="hidden sm:flex items-center gap-1 text-rose-600 hover:text-rose-700 text-sm transition-colors font-medium"
            >
              Ver todo <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA DE FOTOS REALES */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-rose-600 text-sm tracking-wide uppercase mb-2 block font-medium">
              Nuestra florería
            </span>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-stone-800 mb-3"
              style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem" }}
            >
              Hecho con amor, aquí en Quito
            </motion.h2>
            <p className="text-stone-600 max-w-md mx-auto">
              Cada arreglo que ves es real, hecho por nuestras manos. Así de bonito te llega a ti.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryGrid.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 ${
                  i === 0 ? "md:row-span-2" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`AnaVictoria - arreglo ${i + 1}`}
                  className={`w-full object-cover hover:scale-105 transition-transform duration-500 ${
                    i === 0 ? "h-64 md:h-full" : "h-48 md:h-52"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/ramos"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-7 py-3.5 rounded-full transition-colors text-sm shadow-md hover:-translate-y-0.5"
            >
              Ver todos nuestros arreglos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-amber-50/30 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg"
            >
              <img
                src={img10}
                alt="Nuestra florería en Quito"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-rose-600 text-sm tracking-wide uppercase mb-3 block font-medium">
                Sobre nosotros
              </span>
              <h2
                className="text-stone-800 mb-4"
                style={{ fontFamily: "Georgia, serif", fontSize: "2rem" }}
              >
                Flores hechas con amor,<br />
                desde el corazón del Ecuador
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                AnaVictoria nació con la pasión de llevar alegría a través de las flores. Hoy somos un equipo pequeño pero con mucho corazón, trabajando cada día desde Quito para traer alegría a través de las flores.
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                Ecuador es uno de los mayores productores de flores del mundo, y nosotros trabajamos directamente con los cultivadores locales para que cada flor llegue fresquísima a tu puerta. Porque sabemos que detrás de cada pedido hay una emoción, un mensaje, un momento importante.
              </p>
              <Link
                to="/pedidos-especiales"
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full transition-colors text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Crear mi pedido especial <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl mb-4"
          >
            🌷
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-white mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "2rem" }}
          >
            No te pierdas nada
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-stone-400 mb-8"
          >
            Recibe tips de cuidado, descuentos especiales y las novedades de la temporada
          </motion.p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="tu@correo.com"
              className="flex-1 px-4 py-3 rounded-full bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-rose-500 text-sm"
            />
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full transition-colors text-sm whitespace-nowrap font-medium shadow-lg hover:-translate-y-0.5"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
