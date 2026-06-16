import { useState } from "react";
import {
  CheckCircle,
  Calendar,
  Palette,
  MessageCircle,
  Phone,
  Star,
  ChevronLeft,
  ChevronRight,
  Send,
  User,
  Mail,
  Smartphone,
  Sparkles,
  Heart,
  ArrowLeft,
  Flower2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { submitSpecialOrder } from "@/lib/supabase-service";

const heroBg =
  "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1400&q=80";

const occasions = [
  { value: "Boda", emoji: "💒" },
  { value: "Cumpleaños", emoji: "🎂" },
  { value: "Aniversario", emoji: "💍" },
  { value: "Baby Shower", emoji: "👶" },
  { value: "Graduación", emoji: "🎓" },
  { value: "Día de la madre", emoji: "🌷" },
  { value: "Corporativo", emoji: "💼" },
  { value: "Funeral", emoji: "🕊️" },
  { value: "Otro", emoji: "✨" },
];

const budgetRanges = [
  { value: "10-30", label: "$10 - $30" },
  { value: "30-60", label: "$30 - $60" },
  { value: "60-100", label: "$60 - $100" },
  { value: "100+", label: "Más de $100" },
];

const flowerTypes = [
  { name: "Rosas", color: "bg-red-100 text-red-700 border-red-200" },
  { name: "Girasoles", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { name: "Lirios", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { name: "Orquídeas", color: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200" },
  { name: "Tulipanes", color: "bg-pink-100 text-pink-700 border-pink-200" },
  { name: "Margaritas", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { name: "Lavanda", color: "bg-violet-100 text-violet-700 border-violet-200" },
  { name: "Peonías", color: "bg-rose-100 text-rose-700 border-rose-200" },
  { name: "Mixto", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { name: "Sin preferencia", color: "bg-stone-100 text-stone-700 border-stone-200" },
];

const testimonials = [
  {
    name: "Valeria Andrade",
    event: "Boda",
    text: "Los arreglos de mi boda fueron absolutamente mágicos. Superaron todas mis expectativas y mis invitados me preguntaron dónde los conseguí.",
    rating: 5,
  },
  {
    name: "Santiago Mora",
    event: "Cumpleaños",
    text: "Pedí un arreglo sorpresa y fue perfecto. Mi mamá lloró de emoción al recibirlo. ¡Los recomiendo al 100%!",
    rating: 5,
  },
  {
    name: "Daniela Reyes",
    event: "Corporativo",
    text: "Decoraron nuestro evento empresarial de forma elegante y profesional. Entregaron todo a tiempo y con mucho cuidado.",
    rating: 5,
  },
];

const steps = [
  { num: 1, title: "Tus datos", icon: User },
  { num: 2, title: "Tu pedido", icon: Flower2 },
  { num: 3, title: "Revisar", icon: Heart },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 max-w-md mx-auto mb-10">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: current === i ? 1 : current > i ? 0.9 : 0.85,
                backgroundColor: current >= i ? "rgb(225 29 72)" : "rgb(214 211 209)",
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm"
            >
              {current > i ? (
                <CheckCircle size={18} />
              ) : (
                <s.icon size={16} />
              )}
            </motion.div>
            <span
              className={`text-xs mt-1.5 font-medium ${
                current === i ? "text-rose-600" : current > i ? "text-emerald-600" : "text-stone-400"
              }`}
            >
              {s.title}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-0.5 w-12 sm:w-20 mx-2 rounded-full ${
              current > i ? "bg-rose-500" : "bg-stone-200"
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

function AnimatedInput({ label, icon: Icon, ...props }: any) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <label className="block text-sm text-stone-700 mb-1.5 font-medium">{label}</label>
      <div className={`relative rounded-xl border-2 transition-all ${
        focused ? "border-rose-400 shadow-sm shadow-rose-100" : "border-stone-200"
      }`}>
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
            <Icon size={17} />
          </div>
        )}
        <input
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent rounded-xl px-4 py-3 text-sm focus:outline-none ${Icon ? "pl-10" : ""}`}
        />
      </div>
    </div>
  );
}

export function PedidosEspeciales() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ocasion: "",
    fecha: "",
    presupuesto: "",
    flores: [] as string[],
    descripcion: "",
    colorPreferido: "",
  });

  const handleFlowerToggle = (flower: string) => {
    setForm((prev) => ({
      ...prev,
      flores: prev.flores.includes(flower)
        ? prev.flores.filter((f) => f !== flower)
        : [...prev.flores, flower],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await submitSpecialOrder({
        nombre_contacto: form.nombre,
        email_contacto: form.email,
        telefono_contacto: form.telefono,
        ocasion: form.ocasion,
        fecha_evento: form.fecha,
        presupuesto: form.presupuesto,
        flores_preferidas: form.flores.length > 0 ? form.flores : undefined,
        colores: form.colorPreferido || undefined,
        descripcion: form.descripcion,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error al guardar pedido especial:", err);
      setError("Ocurrió un error al enviar tu pedido. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const canGoNext = () => {
    if (step === 0) return form.nombre && form.email && form.telefono;
    if (step === 1) return form.ocasion && form.fecha && form.descripcion;
    return true;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-rose-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl border border-rose-100 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 250 }}
            className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-stone-800 mb-2"
            style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}
          >
            ¡Pedido Recibido! 🎉
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-stone-600 leading-relaxed mb-2"
          >
            Gracias, <strong>{form.nombre}</strong>. Ya tenemos tu solicitud.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-stone-500 text-sm mb-6"
          >
            En máximo <strong>2 horas</strong> te llamamos para coordinar todo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl p-4 mb-6 text-sm text-stone-600 border border-rose-100"
          >
            <div className="flex items-center gap-2 mb-1">
              <Mail size={14} className="text-rose-500" />
              <span className="font-medium text-stone-700">Revisa tu correo</span>
            </div>
            <span className="text-rose-600 font-semibold">{form.email}</span>
            <p className="text-xs text-stone-400 mt-1">Te enviaremos la confirmación</p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              setForm({
                nombre: "",
                email: "",
                telefono: "",
                ocasion: "",
                fecha: "",
                presupuesto: "",
                flores: [],
                descripcion: "",
                colorPreferido: "",
              });
            }}
            className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full transition-all text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Hacer otro pedido
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      {/* Hero */}
      <div className="relative h-64 sm:h-72 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/60 via-rose-900/50 to-stone-900/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08)_0%,_transparent_70%)]" />
        <div className="relative text-center px-4">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-5xl mb-3"
          >
            ✨
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-white mb-2"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Pedidos Especiales
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-amber-100/90 max-w-lg mx-auto leading-relaxed text-sm sm:text-base"
          >
            ¿Tienes una idea en mente? Cuéntanos y creamos el arreglo perfecto para tu ocasión.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Steps indicator */}
        <StepIndicator current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6 lg:order-last">
            {/* Process */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100"
            >
              <h3 className="text-stone-800 mb-4 flex items-center gap-2" style={{ fontFamily: "Georgia, serif" }}>
                <Sparkles size={18} className="text-rose-500" />
                ¿Cómo funciona?
              </h3>
              <div className="space-y-5">
                {[
                  { num: "1", icon: MessageCircle, title: "Cuéntanos tu idea", desc: "Llena el formulario con lo que tienes en mente." },
                  { num: "2", icon: Phone, title: "Te llamamos", desc: "En 2 horas máximo te contactamos al +593 para afinar detalles." },
                  { num: "3", icon: Palette, title: "Lo creamos", desc: "Nuestro equipo diseña tu arreglo con todo el amor." },
                  { num: "4", icon: Calendar, title: "Lo entregamos", desc: "Llega puntual el día que necesites en Quito." },
                ].map((s, i) => (
                  <div key={s.num} className="flex gap-3 group">
                    <div className="relative">
                      <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-full flex items-center justify-center text-sm shrink-0 font-medium shadow-sm">
                        {s.num}
                      </div>
                      {i < 3 && (
                        <div className="absolute top-9 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-rose-100" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-stone-800 font-medium">{s.title}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials carousel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100"
            >
              <h3 className="text-stone-800 mb-4 flex items-center gap-2" style={{ fontFamily: "Georgia, serif" }}>
                <Heart size={16} className="text-rose-500" />
                Clientes felices
              </h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
                      <Star key={i} size={13} className="text-amber-400" fill="currentColor" />
                    ))}
                    <span className="text-xs text-stone-400 ml-1">{testimonials[testimonialIndex].event}</span>
                  </div>
                  <p className="text-sm text-stone-600 italic leading-relaxed mb-2">
                    "{testimonials[testimonialIndex].text}"
                  </p>
                  <p className="text-sm text-stone-700 font-medium">
                    — {testimonials[testimonialIndex].name}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-1.5 mt-4 justify-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === testimonialIndex ? "w-6 bg-emerald-500" : "w-2 bg-stone-200"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-100">
              <AnimatePresence mode="wait">
                {/* Step 1: Contact info */}
                {step === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                        <User size={20} className="text-rose-600" />
                      </div>
                      <div>
                        <h2 className="text-stone-800" style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem" }}>
                          Tus datos de contacto
                        </h2>
                        <p className="text-stone-500 text-sm">Para que podamos comunicarnos contigo</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <AnimatedInput
                        label="Nombre completo *"
                        icon={User}
                        type="text"
                        required
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        placeholder="Tu nombre"
                      />
                      <AnimatedInput
                        label="Correo electrónico *"
                        icon={Mail}
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="tu@correo.com"
                      />
                      <AnimatedInput
                        label="Teléfono *"
                        icon={Smartphone}
                        type="tel"
                        required
                        value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                        placeholder="+593 99 000 0000"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Order details */}
                {step === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                        <Flower2 size={20} className="text-rose-600" />
                      </div>
                      <div>
                        <h2 className="text-stone-800" style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem" }}>
                          Detalles de tu pedido
                        </h2>
                        <p className="text-stone-500 text-sm">Cuéntanos qué necesitas</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      {/* Occasion */}
                      <div>
                        <label className="block text-sm text-stone-700 mb-2 font-medium">Ocasión *</label>
                        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                          {occasions.map((occ) => (
                            <button
                              key={occ.value}
                              type="button"
                              onClick={() => setForm({ ...form, ocasion: occ.value })}
                              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 transition-all text-sm ${
                                form.ocasion === occ.value
                                  ? "border-rose-500 bg-rose-50 text-rose-700 shadow-sm"
                                  : "border-stone-200 text-stone-600 hover:border-rose-200 hover:bg-rose-50/30"
                              }`}
                            >
                              <span className="text-xl">{occ.emoji}</span>
                              <span className="text-xs font-medium">{occ.value}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Date and budget */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-stone-700 mb-1.5 font-medium">Fecha del evento *</label>
                          <div className="relative">
                            <Calendar size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                              type="date"
                              required
                              value={form.fecha}
                              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                              className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:border-rose-400 focus:shadow-sm focus:shadow-rose-100 transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-stone-700 mb-1.5 font-medium">Presupuesto (USD)</label>
                          <div className="grid grid-cols-2 gap-2">
                            {budgetRanges.map((range) => (
                              <button
                                key={range.value}
                                type="button"
                                onClick={() => setForm({ ...form, presupuesto: range.value })}
                                className={`text-sm py-3 rounded-xl border-2 transition-all ${
                                  form.presupuesto === range.value
                                    ? "border-rose-500 bg-rose-50 text-rose-700 shadow-sm"
                                    : "border-stone-200 text-stone-600 hover:border-rose-200"
                                }`}
                              >
                                {range.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Flower types */}
                      <div>
                        <label className="block text-sm text-stone-700 mb-2 font-medium">
                          Flores preferidas <span className="text-stone-400 font-normal">(elige varias)</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {flowerTypes.map((f) => (
                            <button
                              key={f.name}
                              type="button"
                              onClick={() => handleFlowerToggle(f.name)}
                              className={`text-sm px-3.5 py-2 rounded-full border-2 transition-all ${
                                form.flores.includes(f.name)
                                  ? f.color + " shadow-sm font-medium"
                                  : "border-stone-200 text-stone-500 hover:border-stone-300"
                              }`}
                            >
                              {f.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Colors */}
                      <div>
                        <label className="block text-sm text-stone-700 mb-1.5 font-medium">
                          Colores preferidos <span className="text-stone-400 font-normal">(opcional)</span>
                        </label>
                        <div className="relative">
                          <Palette size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            value={form.colorPreferido}
                            onChange={(e) => setForm({ ...form, colorPreferido: e.target.value })}
                            placeholder="ej: tonos pastel, blancos y verdes..."
                            className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:border-rose-400 transition-all"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm text-stone-700 mb-1.5 font-medium">Descripción *</label>
                        <textarea
                          required
                          rows={4}
                          value={form.descripcion}
                          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                          placeholder="Cuéntanos qué necesitas: ¿qué estilo te gusta? ¿para quién es? ¿tienes alguna idea en mente?..."
                          className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 focus:shadow-sm focus:shadow-rose-100 transition-all resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review */}
                {step === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                        <Heart size={20} className="text-rose-600" />
                      </div>
                      <div>
                        <h2 className="text-stone-800" style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem" }}>
                          Revisa tu pedido
                        </h2>
                        <p className="text-stone-500 text-sm">¿Todo está bien?</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-rose-50 to-stone-50 rounded-2xl p-5 border border-rose-100">
                        <h3 className="text-sm font-medium text-stone-700 mb-3 flex items-center gap-2">
                          <User size={14} className="text-rose-500" />
                          Datos de contacto
                        </h3>
                        <div className="space-y-2 text-sm">
                          {[
                            { label: "Nombre", value: form.nombre },
                            { label: "Email", value: form.email },
                            { label: "Teléfono", value: form.telefono },
                          ].map((d) => (
                            <div key={d.label} className="flex justify-between">
                              <span className="text-stone-500">{d.label}</span>
                              <span className="text-stone-800 font-medium">{d.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-emerald-50 to-stone-50 rounded-2xl p-5 border border-emerald-100">
                        <h3 className="text-sm font-medium text-stone-700 mb-3 flex items-center gap-2">
                          <Flower2 size={14} className="text-emerald-500" />
                          Detalles del pedido
                        </h3>
                        <div className="space-y-2 text-sm">
                          {[
                            { label: "Ocasión", value: form.ocasion },
                            { label: "Fecha del evento", value: form.fecha },
                            { label: "Presupuesto", value: form.presupuesto ? `$${form.presupuesto}` : "Sin especificar" },
                            { label: "Flores", value: form.flores.length > 0 ? form.flores.join(", ") : "Sin preferencia" },
                            { label: "Colores", value: form.colorPreferido || "Sin especificar" },
                          ].map((d) => (
                            <div key={d.label} className="flex justify-between">
                              <span className="text-stone-500">{d.label}</span>
                              <span className="text-stone-800 font-medium text-right max-w-[60%]">{d.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-5 border border-stone-100">
                        <h3 className="text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                          <MessageCircle size={14} className="text-rose-500" />
                          Descripción
                        </h3>
                        <p className="text-sm text-stone-600 leading-relaxed italic bg-stone-50 rounded-xl p-3">
                          "{form.descripcion}"
                        </p>
                      </div>

                      {error && (
                        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 border border-red-100">
                          {error}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
                <div>
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-1.5 text-stone-500 hover:text-rose-600 transition-colors text-sm font-medium px-4 py-2 rounded-xl hover:bg-rose-50"
                    >
                      <ChevronLeft size={16} />
                      Atrás
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
                <div>
                  {step < 2 ? (
                    <button
                      type="button"
                      disabled={!canGoNext()}
                      onClick={() => setStep(step + 1)}
                      className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 disabled:bg-stone-300 text-white px-6 py-3 rounded-xl transition-all text-sm font-medium shadow-md hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed"
                    >
                      Siguiente
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white px-8 py-3 rounded-xl transition-all text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mi pedido
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <p className="text-center text-xs text-stone-400 mt-4">
                Al enviar, aceptas que nos contactemos contigo para coordinar los detalles de tu pedido.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}