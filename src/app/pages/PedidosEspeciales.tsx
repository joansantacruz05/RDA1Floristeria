import { useState } from "react";
import {
  CheckCircle,
  Calendar,
  Palette,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";

const occasions = [
  "Boda",
  "Cumpleaños",
  "Aniversario",
  "Baby Shower",
  "Graduación",
  "Día de la madre",
  "Corporativo",
  "Funeral",
  "Otro",
];

const budgetRanges = [
  { value: "10-30", label: "$10 - $30" },
  { value: "30-60", label: "$30 - $60" },
  { value: "60-100", label: "$60 - $100" },
  { value: "100+", label: "Más de $100" },
];

const flowerTypes = [
  "Rosas", "Girasoles", "Lirios", "Orquídeas", "Tulipanes",
  "Margaritas", "Lavanda", "Peonías", "Mixto", "Sin preferencia",
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

export function PedidosEspeciales() {
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-lg">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2
            className="text-stone-800 mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem" }}
          >
            ¡Recibido!
          </h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            Gracias, <strong>{form.nombre}</strong>. Ya tenemos tu solicitud y en máximo 2 horas te llamamos para coordinar todo.
          </p>
          <div className="bg-rose-50 rounded-xl p-4 mb-6 text-sm text-stone-600 border border-rose-100">
            📧 Revisa tu correo <strong>{form.email}</strong> para la confirmación
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
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
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full transition-colors text-sm shadow-md"
          >
            Hacer otro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-rose-100 via-rose-50 to-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">✨</div>
          <h1
            className="text-stone-800 mb-3"
            style={{ fontFamily: "Georgia, serif", fontSize: "2.8rem" }}
          >
            Pedidos Especiales
          </h1>
          <p className="text-stone-600 max-w-lg mx-auto leading-relaxed">
            ¿Tienes una idea en mente? Cuéntanos y creamos el arreglo perfecto para tu ocasión especial en Ecuador.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar info */}
          <div className="space-y-6">
            {/* Process */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
              <h3 className="text-stone-800 mb-4" style={{ fontFamily: "Georgia, serif" }}>
                ¿Cómo funciona?
              </h3>
              <div className="space-y-4">
                {[
                  { num: "1", icon: MessageCircle, title: "Cuéntanos tu idea", desc: "Llena el formulario con lo que tienes en mente." },
                  { num: "2", icon: Phone, title: "Te llamamos", desc: "En 2 horas máximo te contactamos al +593 para afinar detalles." },
                  { num: "3", icon: Palette, title: "Lo creamos", desc: "Nuestro equipo diseña tu arreglo con todo el amor." },
                  { num: "4", icon: Calendar, title: "Lo entregamos", desc: "Llega puntual el día que necesites en Quito." },
                ].map((step) => (
                  <div key={step.num} className="flex gap-3">
                    <div className="w-8 h-8 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center text-sm shrink-0 font-medium">
                      {step.num}
                    </div>
                    <div>
                      <p className="text-sm text-stone-800">{step.title}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
              <h3 className="text-stone-800 mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Clientes felices
              </h3>
              <div className="space-y-4">
                {testimonials.map((t) => (
                  <div key={t.name} className="border-b border-stone-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={12} className="text-amber-400" fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-xs text-stone-400">{t.event}</span>
                    </div>
                    <p className="text-xs text-stone-600 italic mb-1">"{t.text}"</p>
                    <p className="text-xs text-stone-700">{t.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 space-y-6"
            >
              <h2
                className="text-stone-800 mb-6"
                style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem" }}
              >
                Cuéntanos sobre tu pedido
              </h2>

              {/* Personal info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-stone-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({ ...form, nombre: e.target.value })
                    }
                    placeholder="Tu nombre"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-stone-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.telefono}
                    onChange={(e) =>
                      setForm({ ...form, telefono: e.target.value })
                    }
                    placeholder="+593 99 000 0000"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-stone-700 mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@correo.com"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>

              {/* Event info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-stone-700 mb-1">
                    Ocasión *
                  </label>
                  <select
                    required
                    value={form.ocasion}
                    onChange={(e) =>
                      setForm({ ...form, ocasion: e.target.value })
                    }
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 transition-colors bg-white text-stone-700"
                  >
                    <option value="">Selecciona una ocasión</option>
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-stone-700 mb-1">
                    Fecha del evento *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.fecha}
                    onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 transition-colors"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm text-stone-700 mb-2">
                  Presupuesto aproximado (USD)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {budgetRanges.map((range) => (
                    <button
                      key={range.value}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, presupuesto: range.value })
                      }
                      className={`text-sm px-4 py-3 rounded-xl border transition-colors text-left ${
                        form.presupuesto === range.value
                          ? "border-rose-500 bg-rose-50 text-rose-700"
                          : "border-stone-200 text-stone-600 hover:border-rose-300"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flower types */}
              <div>
                <label className="block text-sm text-stone-700 mb-2">
                  Flores preferidas{" "}
                  <span className="text-stone-400">(puedes elegir varias)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {flowerTypes.map((flower) => (
                    <button
                      key={flower}
                      type="button"
                      onClick={() => handleFlowerToggle(flower)}
                      className={`text-sm px-3 py-2 rounded-full border transition-colors ${
                        form.flores.includes(flower)
                          ? "border-rose-600 bg-rose-600 text-white"
                          : "border-stone-200 text-stone-600 hover:border-rose-300"
                      }`}
                    >
                      {flower}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm text-stone-700 mb-1">
                  Colores preferidos{" "}
                  <span className="text-stone-400">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={form.colorPreferido}
                  onChange={(e) =>
                    setForm({ ...form, colorPreferido: e.target.value })
                  }
                  placeholder="ej: tonos pastel, blancos y verdes..."
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-stone-700 mb-1">
                  Descripción de tu pedido *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.descripcion}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                  placeholder="Cuéntanos lo que necesitas: ¿qué estilo te gusta? ¿para quién es? ¿tienes alguna idea en mente?..."
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl transition-colors text-sm font-medium shadow-md"
              >
                Enviar mi pedido especial ✨
              </button>

              <p className="text-center text-xs text-stone-500">
                Al enviar, aceptas que nos contactemos contigo para coordinar los detalles de tu pedido.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
