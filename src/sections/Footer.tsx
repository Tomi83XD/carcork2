import { motion } from 'framer-motion';
import { Bus, Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';

const footerLinks = {
  servicios: [
    { label: 'Pasajes', href: '#' },
    { label: 'Encomiendas', href: '#' },
    { label: 'Viajes Especiales', href: '#' },
    { label: 'Turismo', href: '#' },
  ],
  empresa: [
    { label: 'Sobre Nosotros', href: '#' },
    { label: 'Nuestra Flota', href: '#flota' },
    { label: 'Trabajá con Nosotros', href: '#' },
    { label: 'Prensa', href: '#' },
  ],
  ayuda: [
    { label: 'Preguntas Frecuentes', href: '#faq' },
    { label: 'Términos y Condiciones', href: '#' },
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Contacto', href: '#contacto' },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#inicio"
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                <Bus className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black italic tracking-tighter text-white">
                  Car<span className="text-red-500">Cor</span>
                </span>
                <p className="text-xs text-slate-400 tracking-widest uppercase">
                  Transporte Premium
                </p>
              </div>
            </motion.a>
            <p className="text-slate-400 mb-6 max-w-sm">
              Conectando Córdoba y Villa Carlos Paz con el mejor servicio de transporte desde 2009. 
              Tu comodidad y seguridad son nuestra prioridad.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Ayuda</h4>
            <ul className="space-y-3">
              {footerLinks.ayuda.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} CarCor S.R.L. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
              Términos
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-40"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
