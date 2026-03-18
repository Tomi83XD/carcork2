import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRightLeft, Calendar, Users, ChevronDown, Sparkles, Minus, Plus } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (origen: string, destino: string, pasajeros: number, fecha: string) => void;
  isLoading: boolean;
}

const ciudades = [
  { value: 'Villa Carlos Paz', label: 'Villa Carlos Paz', provincia: 'Córdoba' },
  { value: 'Córdoba Capital', label: 'Córdoba Capital', provincia: 'Córdoba' },
];

export function HeroSection({ onSearch, isLoading }: HeroSectionProps) {
  const [origen, setOrigen] = useState('Villa Carlos Paz');
  const [destino, setDestino] = useState('Córdoba Capital');
  const [pasajeros, setPasajeros] = useState(1);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [isOrigenOpen, setIsOrigenOpen] = useState(false);
  const [isDestinoOpen, setIsDestinoOpen] = useState(false);

  const invertirRuta = () => {
    const tempOrigen = origen;
    setOrigen(destino);
    setDestino(tempOrigen);
  };

  const handleOrigenChange = (nuevoOrigen: string) => {
    setOrigen(nuevoOrigen);
    if (destino === nuevoOrigen) {
      setDestino(nuevoOrigen === 'Villa Carlos Paz' ? 'Córdoba Capital' : 'Villa Carlos Paz');
    }
    setIsOrigenOpen(false);
  };

  const handleDestinoChange = (nuevoDestino: string) => {
    setDestino(nuevoDestino);
    if (origen === nuevoDestino) {
      setOrigen(nuevoDestino === 'Villa Carlos Paz' ? 'Córdoba Capital' : 'Villa Carlos Paz');
    }
    setIsDestinoOpen(false);
  };

  const handleSearch = () => {
    onSearch(origen, destino, pasajeros, fecha);
  };

  // ACTUALIZADO: Precio a $5600
  const precioPorPasajero = 5600;
  const total = precioPorPasajero * pasajeros;

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8 md:mb-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-200 text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Buscador Oficial #1 en Córdoba</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
          >
            Viajá sin{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                vueltas.
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-3 bg-red-500/30 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto mb-8 md:mb-10"
          >
            Consultá los horarios en tiempo real y asegurá tu lugar en la boletería.
          </motion.p>
        </div>

        {/* Search Card - Glassmorphism */}
        <motion.div
          id="buscador"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-blue-500 to-red-500 rounded-3xl blur opacity-30 animate-pulse" />
          
          <div className="relative bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-4 md:p-6 shadow-2xl">
            
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_auto_auto] gap-3 items-center">
              {/* Origen */}
              <div className="relative">
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1.5">
                  Origen
                </label>
                <button
                  onClick={() => setIsOrigenOpen(!isOrigenOpen)}
                  className="w-full flex items-center gap-3 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors"
                >
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-white font-semibold truncate">{origen}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-blue-300 transition-transform ${isOrigenOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOrigenOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50"
                    >
                      {ciudades.map((ciudad) => (
                        <button
                          key={ciudad.value}
                          onClick={() => handleOrigenChange(ciudad.value)}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{ciudad.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Swap Button */}
              <div className="flex items-end pb-1">
                <motion.button
                  onClick={invertirRuta}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
                  title="Invertir origen y destino"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Destino */}
              <div className="relative">
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1.5">
                  Destino
                </label>
                <button
                  onClick={() => setIsDestinoOpen(!isDestinoOpen)}
                  className="w-full flex items-center gap-3 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors"
                >
                  <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-white font-semibold truncate">{destino}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-blue-300 transition-transform ${isDestinoOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isDestinoOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50"
                    >
                      {ciudades.map((ciudad) => (
                        <button
                          key={ciudad.value}
                          onClick={() => handleDestinoChange(ciudad.value)}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{ciudad.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Fecha */}
              <div className="relative">
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1.5">
                  Fecha
                </label>
                <div className="flex items-center gap-3 px-4 py-4 bg-white/5 border border-white/10 rounded-xl">
                  <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="bg-transparent text-white font-semibold outline-none w-full [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>

              {/* Pasajeros - Desktop */}
              <div className="relative">
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1.5">
                  Pasajeros
                </label>
                <div className="flex items-center gap-2 px-3 py-3 bg-white/5 border border-white/10 rounded-xl">
                  <Users className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <button
                    onClick={() => setPasajeros(Math.max(1, pasajeros - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-bold w-8 text-center">{pasajeros}</span>
                  <button
                    onClick={() => setPasajeros(Math.min(10, pasajeros + 1))}
                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <motion.button
                  onClick={handleSearch}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Buscando...
                    </span>
                  ) : (
                    'Ver Horarios'
                  )}
                </motion.button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              {/* Origen */}
              <div className="relative">
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1.5">
                  Origen
                </label>
                <button
                  onClick={() => setIsOrigenOpen(!isOrigenOpen)}
                  className="w-full flex items-center gap-3 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors"
                >
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-white font-semibold">{origen}</span>
                  <ChevronDown className={`w-4 h-4 text-blue-300 ml-auto transition-transform ${isOrigenOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOrigenOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50"
                    >
                      {ciudades.map((ciudad) => (
                        <button
                          key={ciudad.value}
                          onClick={() => handleOrigenChange(ciudad.value)}
                          className="w-full px-4 py-4 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{ciudad.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Swap Button Mobile */}
              <div className="flex justify-center">
                <motion.button
                  onClick={invertirRuta}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg"
                  title="Invertir origen y destino"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Destino */}
              <div className="relative">
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1.5">
                  Destino
                </label>
                <button
                  onClick={() => setIsDestinoOpen(!isDestinoOpen)}
                  className="w-full flex items-center gap-3 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors"
                >
                  <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-white font-semibold">{destino}</span>
                  <ChevronDown className={`w-4 h-4 text-blue-300 ml-auto transition-transform ${isDestinoOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isDestinoOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50"
                    >
                      {ciudades.map((ciudad) => (
                        <button
                          key={ciudad.value}
                          onClick={() => handleDestinoChange(ciudad.value)}
                          className="w-full px-4 py-4 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{ciudad.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1.5">
                  Fecha
                </label>
                <div className="flex items-center gap-3 px-4 py-4 bg-white/5 border border-white/10 rounded-xl">
                  <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="bg-transparent text-white font-semibold outline-none w-full [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>

              {/* Pasajeros - Mobile */}
              <div>
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-1.5">
                  Pasajeros
                </label>
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-semibold">Cantidad</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => setPasajeros(Math.max(1, pasajeros - 1))}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg text-white transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                    <span className="text-white font-bold text-xl w-8 text-center">{pasajeros}</span>
                    <motion.button
                      onClick={() => setPasajeros(Math.min(10, pasajeros + 1))}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg text-white transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Search Button Mobile */}
              <motion.button
                onClick={handleSearch}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Buscando...
                  </span>
                ) : (
                  'Ver Horarios'
                )}
              </motion.button>
            </div>

            {/* Price Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between"
            >
              <span className="text-sm text-blue-200">Precio por pasajero</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-white">${total.toLocaleString()}</span>
                <span className="text-sm text-blue-300">ARS</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}