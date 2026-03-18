import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: '¿Con cuánto tiempo de anticipación debo presentarme?',
    answer: 'Te recomendamos estar 10 a 15 minutos antes de la hora de salida en la plataforma indicada. Esto te permitirá abordar con tranquilidad, ubicar tu asiento y asegurar que tu equipaje esté correctamente guardado en la bodega.',
  },
  {
    question: '¿Qué equipaje puedo llevar?',
    answer: 'Podés llevar un bolso de mano en cabina (máximo 5kg) y una valija o bolso grande en la bodega (máximo 20kg) sin cargo extra. Si necesitás llevar más equipaje, podés contratar bulto adicional por un costo extra de $1.500 por pieza.',
  },
  {
    question: '¿Se puede viajar con mascotas?',
    answer: 'Por disposición de seguridad, no se permite viajar con mascotas a bordo, a excepción de perros guía de asistencia con su respectivo certificado. Las mascotas pueden viajar en la bodeta en jaulas homologadas contratando servicio de encomienda.',
  },
  {
    question: '¿Dónde retiro mis encomiendas?',
    answer: 'Las encomiendas se retiran exclusivamente en las boleterías habilitadas presentando DNI y número de guía. En Córdoba Capital: Terminal Nueva, Boletería 80 (de 8 a 19hs). En Villa Carlos Paz: Terminal, Boletería 3 (de 6 a 22hs).',
  },
  {
    question: '¿Puedo cancelar o cambiar mi pasaje?',
    answer: 'Sí, podés cancelar o cambiar tu pasaje hasta 2 horas antes de la salida programada. Los cambios están sujetos a disponibilidad. Las cancelaciones realizadas con más de 24hs de anticipación tienen reembolso del 100%; entre 2 y 24hs, 50% de reembolso.',
  },
  {
    question: '¿Hay descuentos para estudiantes o jubilados?',
    answer: 'Sí, ofrecemos un 15% de descuento para estudiantes con credencial vigente y jubilados/pensionados. El descuento aplica de lunes a jueves, excepto feriados. No es combinable con otras promociones.',
  },
  {
    question: '¿Las unidades tienen baño?',
    answer: 'Las unidades Semi Cama y Ejecutivo cuentan con baño químico a bordo. Las unidades Diferencial hacen parada intermedia en el trayecto para que los pasajeros puedan usar servicios.',
  },
  {
    question: '¿Cómo funciona el servicio de encomiendas?',
    answer: 'Podés enviar paquetes entre nuestras terminales con entrega el mismo día. El costo varía según peso y dimensiones. Ofrecemos tracking en tiempo real y seguro incluido hasta $50.000. Para envíos mayores, consultá por nuestro servicio premium.',
  },
];

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold rounded-full mb-4"
          >
            Preguntas Frecuentes
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Todo lo que necesitás <span className="text-blue-600">saber</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Respuestas a las consultas más comunes antes de viajar.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? 'border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    openIndex === index ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <span className={`font-bold transition-colors ${
                    openIndex === index ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={`w-5 h-5 transition-colors ${
                    openIndex === index ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 pt-0">
                      <div className="pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ¿No encontraste lo que buscabas?
          </p>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Contactanos
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
