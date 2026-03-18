import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Wind, Usb, Snowflake } from 'lucide-react';

// 1. IMPORTAMOS LAS IMÁGENES COMO VARIABLES ACÁ ARRIBA
import colectivo1 from '../assets/colectivo1.jpeg';
import colectivo3 from '../assets/colectivo3.jpeg';
import asientos from '../assets/asientos.jpeg';

const fleet = [
  {
    id: 1,
    type: 'Semi Cama',
    image: colectivo1, // 2. USAMOS LA VARIABLE SIN COMILLAS
    features: [
      { icon: Star, label: 'Asientos reclinables' },
      { icon: Wind, label: 'Aire acondicionado' },
      { icon: Usb, label: 'Puertos USB' },
      { icon: Snowflake, label: 'Calefacción' },
    ],
  },
  {
    id: 2,
    type: 'Diferencial',
    image: colectivo3, // 2. USAMOS LA VARIABLE SIN COMILLAS
    features: [
      { icon: Star, label: 'Asientos ergonómicos' },
      { icon: Wind, label: 'Climatización' },
      { icon: Usb, label: 'WiFi gratis' },
      { icon: Snowflake, label: 'TV a bordo' },
    ],
  },
  {
    id: 3,
    type: 'Ejecutivo',
    image: asientos, // 2. USAMOS LA VARIABLE SIN COMILLAS
    features: [
      { icon: Star, label: 'Asientos de cuero' },
      { icon: Wind, label: 'Aire acondicionado' },
      { icon: Usb, label: 'Cargador USB' },
      { icon: Snowflake, label: 'Baño a bordo' },
    ],
  },
];

export function FleetSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % fleet.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + fleet.length) % fleet.length);

  const currentVehicle = fleet[currentIndex];

  return (
    <section id="flota" className="py-16 md:py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-bold rounded-full mb-4">
            Nuestra Flota
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Confort y seguridad en <span className="text-blue-600">cada viaje</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-50 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-700">
            {/* Image Container */}
            <div className="relative h-64 sm:h-80 md:h-[450px] overflow-hidden">
              <motion.img
                key={currentVehicle.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={currentVehicle.image}
                alt="Bus CarCor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Badge (Semi Cama, etc) */}
              <div className="absolute top-6 left-6">
                <span className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-2xl ${
                  currentVehicle.type === 'Semi Cama' ? 'bg-amber-500 text-white' : 
                  currentVehicle.type === 'Diferencial' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                }`}>
                  {currentVehicle.type}
                </span>
              </div>
            </div>

            {/* Features (Lo único que queda abajo) */}
            <div className="p-6 md:p-10 bg-gray-50 dark:bg-slate-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentVehicle.features.map((feature, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-700/50 rounded-2xl border border-gray-100 dark:border-slate-600">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-[12px] font-bold text-gray-700 dark:text-gray-300 text-center leading-tight">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={prevSlide} className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-md hover:bg-blue-50 dark:hover:bg-slate-700 transition-all">
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex gap-2">
              {fleet.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${currentIndex === i ? 'bg-blue-600 w-8' : 'bg-gray-300 dark:bg-gray-600 w-2'}`} />
              ))}
            </div>
            <button onClick={nextSlide} className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-md hover:bg-blue-50 dark:hover:bg-slate-700 transition-all">
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}