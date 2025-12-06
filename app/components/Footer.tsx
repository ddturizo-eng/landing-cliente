'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white py-12 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              HC Efectos
            </h3>
            <p className="text-gray-400 mb-4">
              Transformando eventos en experiencias inolvidables con pirotecnia
              y efectos especiales de primera clase.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-pink-500 transition"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  className="text-gray-400 hover:text-pink-500 transition"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#efectos"
                  className="text-gray-400 hover:text-pink-500 transition"
                >
                  Efectos
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  className="text-gray-400 hover:text-pink-500 transition"
                >
                  Galería
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Pirotecnia</li>
              <li className="text-gray-400">Reveleaciones</li>
              <li className="text-gray-400">Ventury</li>
              <li className="text-gray-400">Proyecciones</li>
              <li className="text-gray-400">Fuentes frias</li>
              <li className="text-gray-400">Niebla baja</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <i className="fas fa-phone text-pink-500"></i>
                <a href="tel:+573137431884" className="hover:text-pink-500 transition">
                  +57 313 743 1884
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <i className="fas fa-envelope text-pink-500"></i>
                <a href="mailto:hcefectos1@gmail.com" className="hover:text-pink-500 transition">
                  hcefectos1@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <i className="fas fa-map-marker-alt text-pink-500"></i>
                <span>Valledupar, Colombia</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-4 mt-4">
             
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Dali Devs. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-pink-500 transition">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}