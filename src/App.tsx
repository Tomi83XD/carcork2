import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

// Hooks
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';

// Components
import { Navbar } from '@/components/Navbar';
import { ToastContainer } from '@/components/ToastContainer';

// Sections
import { HeroSection } from '@/sections/HeroSection';
import { ResultsSection } from '@/sections/ResultsSection';
import { FeaturesSection } from '@/sections/FeaturesSection';
import { FleetSection } from '@/sections/FleetSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { FAQSection } from '@/sections/FAQSection';
import { ContactSection } from '@/sections/ContactSection';
import { Footer } from '@/sections/Footer';

function App() {
  const { theme, toggleTheme, mounted } = useTheme();
  const { toasts, addToast, removeToast } = useToast();
  
  // Search states
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchData, setSearchData] = useState({
    origen: 'Villa Carlos Paz',
    destino: 'Córdoba Capital',
    pasajeros: 1,
    fecha: new Date().toISOString().split('T')[0],
  });

  // WhatsApp popup state
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  // Handle search - solo muestra horarios, sin funcionalidad de reserva
  const handleSearch = (origen: string, destino: string, pasajeros: number, fecha: string) => {
    setIsSearching(true);
    setSearchData({ origen, destino, pasajeros, fecha });
    
    // Simula carga de búsqueda
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
      addToast(`Mostrando horarios disponibles`, 'success');
      
      // Scroll a resultados
      setTimeout(() => {
        document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1200);
  };

  // Handle contact form - solo muestra mensaje de éxito
  const handleContactSubmit = () => {
    addToast('Mensaje enviado correctamente', 'success');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onRemove={removeToast} />

        {/* Navigation */}
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        {/* Main Content */}
        <main>
          {/* Hero with Search */}
          <HeroSection onSearch={handleSearch} isLoading={isSearching} />

          {/* Search Results */}
          <div id="resultados">
            <ResultsSection
              origen={searchData.origen}
              destino={searchData.destino}
              pasajeros={searchData.pasajeros}
              fecha={searchData.fecha}
              isVisible={showResults}
            />
          </div>

          {/* Features */}
          <FeaturesSection />

          {/* Fleet */}
          <FleetSection />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* FAQ */}
          <FAQSection />

          {/* Contact */}
          <ContactSection onSubmit={handleContactSubmit} />
        </main>

        {/* Footer */}
        <Footer />

        {/* WhatsApp Floating Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            onClick={() => setShowWhatsApp(!showWhatsApp)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center transition-colors"
          >
            <AnimatePresence mode="wait">
              {showWhatsApp ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <MessageCircle className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* WhatsApp Popup */}
          <AnimatePresence>
            {showWhatsApp && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="absolute bottom-16 right-0 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="bg-green-500 p-4">
                  <h4 className="text-white font-bold">¡Hola! 👋</h4>
                  <p className="text-green-100 text-sm">¿En qué podemos ayudarte?</p>
                </div>
                <div className="p-4 space-y-3">
                  <a
                    href="https://wa.me/5493514236190?text=Hola!%20Quiero%20consultar%20horarios%20disponibles"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-4 py-3 bg-gray-50 dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl text-sm font-medium transition-colors"
                  >
                    🚌 Consultar horarios
                  </a>
                  <a
                    href="https://wa.me/5493514236190?text=Hola!%20Tengo%20una%20consulta%20sobre%20encomiendas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-4 py-3 bg-gray-50 dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl text-sm font-medium transition-colors"
                  >
                    📦 Consultar encomiendas
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
