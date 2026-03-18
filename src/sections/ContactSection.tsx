import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Mail, Phone, Send, Clock, CheckCircle } from 'lucide-react';

interface ContactSectionProps {
  onSubmit: () => void;
}

export function ContactSection({ onSubmit }: ContactSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula envío
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit();
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-white dark:bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-bold rounded-full mb-4"
          >
            Contacto
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Estamos para <span className="text-red-600">ayudarte</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            ¿Tenés alguna consulta? Escribinos y te responderemos a la brevedad.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="bg-gray-50 dark:bg-slate-800 rounded-3xl p-6 md:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-900 dark:text-white"
                      placeholder="Escribí tu consulta acá..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar mensaje
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-5"
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Dirección</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Blvd. Pte. Gral. Juan Domingo Perón 660<br />
                  Córdoba, Argentina
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-5">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Teléfono</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  +54 351 423-6190<br />
                  WhatsApp disponible
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-5">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  info@car-cor.com.ar
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Horarios</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lun-Sab: 5:40 - 23:00<br />
                  Dom: 7:30 - 00:00
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700 h-56">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.606708687701!2d-64.1758110243403!3d-31.42493397425785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a28e7eb88629%3A0xc3ce18decf17af9a!2sTerminal%20de%20%C3%93mnibus%20C%C3%B3rdoba%20(T1)!5e0!3m2!1ses-419!2sar!4v1710718045610!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación CarCor"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
