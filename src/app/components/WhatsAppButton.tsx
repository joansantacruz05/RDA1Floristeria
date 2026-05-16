import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "593991234567";
const WHATSAPP_MESSAGE = "¡Hola! Me gustaría hacer un pedido de flores 🌸";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="bg-white rounded-2xl shadow-xl border border-stone-100 p-4 w-72"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.541 5.875L.057 23.516a.5.5 0 00.61.61l5.64-1.484A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.5-5.241-1.374l-.376-.214-3.896 1.025 1.025-3.895-.214-.376A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-800">AnaVictoria</p>
                  <p className="text-xs text-green-500">● En línea</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 mb-3 text-sm text-stone-600 leading-relaxed">
              ¡Hola! 👋 ¿En qué te puedo ayudar? Escríbenos por WhatsApp y te atendemos al instante.
            </div>
            <button
              onClick={handleOpen}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              Abrir WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? { rotate: 0 } : { rotate: 0 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.541 5.875L.057 23.516a.5.5 0 00.61.61l5.64-1.484A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.5-5.241-1.374l-.376-.214-3.896 1.025 1.025-3.895-.214-.376A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.span
          className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </div>
  );
}
