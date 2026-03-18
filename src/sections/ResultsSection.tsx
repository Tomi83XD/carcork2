import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Armchair, Info, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Horario {
  id: number;
  salida: string;
  llegada: string;
  servicio: 'Común' | 'Diferencial' | 'Semi Cama';
  precio: number;
}

interface ResultsSectionProps {
  origen: string;
  destino: string;
  pasajeros: number;
  fecha: string;
  isVisible: boolean;
}

const servicioConfig = {
  'Común': { color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', icon: null },
  'Diferencial': { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', icon: Star },
  'Semi Cama': { color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', icon: Star },
};

export function ResultsSection({ origen, destino, pasajeros, fecha, isVisible }: ResultsSectionProps) {
  const [showInfo, setShowInfo] = useState<number | null>(null);

  // Generador dinámico de horarios (cada 20 min)
  const generarHorarios = (fechaBuscada: string) => {
    const horarios: Horario[] = [];
    const hoy = new Date().toISOString().split('T')[0];
    const esHoy = fechaBuscada === hoy;

    const ahora = new Date();
    // Si es hoy, filtra desde la hora actual. Si es futuro, arranca a las 05:00 AM
    const minutosReferencia = esHoy ? ahora.getHours() * 60 + ahora.getMinutes() : 5 * 60;

    let idContador = 1;

    // Asumimos que los servicios operan de 05:00 a 23:40
    for (let hora = 5; hora <= 23; hora++) {
      for (let min = 0; min < 60; min += 20) {
        const minutosActuales = hora * 60 + min;

        // Si la hora del bondi es mayor a la hora de referencia y no mostramos más de 5
        if (minutosActuales >= minutosReferencia && horarios.length < 5) {
          const salida = `${hora.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
          const llegada = `${(hora + 1).toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`; // 1 hora de viaje

          // Alternar servicios visualmente
          const servicio = idContador % 3 === 0 ? 'Diferencial' : 'Común';

          horarios.push({
            id: idContador,
            salida,
            llegada,
            servicio: servicio as any,
            precio: 5600
          });
        }
        idContador++;
      }
    }
    return horarios;
  };

  const horariosAMostrar = generarHorarios(fecha);

  const fechaFormateada = new Date(fecha + 'T00:00:00').toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 -mt-8 px-4 pb-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-100 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative flex h-3 w-3"
                      >
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                      </motion.span>
                      <h2 className="text-xl font-black text-gray-900 dark:text-white">
                        Próximas Salidas
                      </h2>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {origen} <span className="mx-1">→</span> {destino}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">
                      {fechaFormateada} • {pasajeros} {pasajeros === 1 ? 'pasajero' : 'pasajeros'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>

              {/* Horarios List */}
              <div className="divide-y divide-gray-100 dark:divide-slate-700">
                {horariosAMostrar.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Ya no hay más servicios por hoy.</p>
                    <p className="text-sm text-gray-400 mt-2">Los viajes se retoman mañana a partir de las 05:00 AM.</p>
                  </div>
                ) : (
                  horariosAMostrar.map((horario, index) => {
                    const config = servicioConfig[horario.servicio];
                    const Icon = config.icon;
                    const isInfoOpen = showInfo === horario.id;

                    return (
                      <motion.div
                        key={horario.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          {/* Times */}
                          <div className="flex items-center gap-4 sm:gap-6">
                            <div className="text-center min-w-[60px]">
                              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider mb-0.5">Salida</p>
                              <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{horario.salida}</p>
                            </div>
                            
                            <div className="hidden sm:flex flex-col items-center">
                              <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-0.5">1h 00m</span>
                              <div className="w-16 h-0.5 bg-gray-200 dark:bg-gray-700 relative">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
                              </div>
                            </div>

                            <div className="text-center min-w-[60px]">
                              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider mb-0.5">Llegada</p>
                              <p className="text-xl sm:text-2xl font-bold text-gray-500 dark:text-gray-400">{horario.llegada}</p>
                            </div>
                          </div>

                          {/* Service Type */}
                          <div className="flex items-center gap-3 sm:ml-auto">
                            <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${config.color}`}>
                              {Icon && <Icon className="w-3 h-3" />}
                              {horario.servicio}
                            </span>
                          </div>

                          {/* Price & Info */}
                          <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-gray-100 dark:border-slate-700 pt-3 sm:pt-0">
                            <div className="text-right">
                              <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                                ${(horario.precio * pasajeros).toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500">
                                ${horario.precio.toLocaleString()} c/u
                              </p>
                            </div>

                            <motion.button
                              onClick={() => setShowInfo(showInfo === horario.id ? null : horario.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-1 px-3 py-2 border-2 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors text-sm font-medium"
                            >
                              <Info className="w-4 h-4" />
                              {isInfoOpen ? 'Menos' : 'Info'}
                              {isInfoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </motion.button>
                          </div>
                        </div>

                        {/* Info Panel */}
                        <AnimatePresence>
                          {isInfoOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Terminal de salida</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                                      {origen === 'Villa Carlos Paz' ? 'Terminal VCP - Andén 3' : 'Terminal Nueva Córdoba - Andén 80'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Armchair className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Comodidades</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">A/C, calefacción, WiFi, USB</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Frecuencia</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">Salidas cada 20 minutos</p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700">
                <p className="text-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Mostrando los próximos horarios (salidas cada 20 min) • Precio final por {pasajeros} pasajero(s)
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}