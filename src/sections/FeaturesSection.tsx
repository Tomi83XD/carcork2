import { motion } from 'framer-motion';
import { Package, Users, Wifi, Zap, Shield, Clock } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: Package,
    title: 'Encomiendas Express',
    description: 'Envíos seguros y rápidos entre Córdoba y Villa Carlos Paz. Entrega el mismo día con tracking en tiempo real.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Users,
    title: 'Viajes Especiales',
    description: 'Alquiler de unidades para turismo, eventos, viajes de estudio o corporativos con choferes profesionales.',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    icon: Wifi,
    title: 'WiFi Gratis a Bordo',
    description: 'Mantente conectado durante todo el viaje con nuestra red WiFi de alta velocidad sin costo adicional.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Zap,
    title: 'Puertos USB',
    description: 'Cada asiento cuenta con puertos USB para que nunca te quedes sin batería en tu dispositivo.',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: Shield,
    title: 'Máxima Seguridad',
    description: 'Unidades con GPS, cámaras de seguridad y conductores certificados para tu tranquilidad.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Clock,
    title: 'Puntualidad Garantizada',
    description: '98% de nuestros viajes salen a la hora programada. Tu tiempo es valioso para nosotros.',
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="servicios" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            Nuestros Servicios
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Más que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">transporte</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Soluciones integrales diseñadas para hacer tu viaje más cómodo, seguro y placentero.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-800 h-full overflow-hidden">
                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 text-transparent bg-clip-text bg-gradient-to-br ${feature.color}`} style={{
                    stroke: 'url(#gradient-' + index + ')'
                  }} />
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={feature.color.includes('blue') ? '#3B82F6' : feature.color.includes('red') ? '#EF4444' : feature.color.includes('green') ? '#22C55E' : feature.color.includes('amber') ? '#F59E0B' : feature.color.includes('purple') ? '#A855F7' : '#06B6D4'} />
                        <stop offset="100%" stopColor={feature.color.includes('blue') ? '#2563EB' : feature.color.includes('red') ? '#DC2626' : feature.color.includes('green') ? '#16A34A' : feature.color.includes('amber') ? '#D97706' : feature.color.includes('purple') ? '#9333EA' : '#0891B2'} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow */}
                <motion.div
                  className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
