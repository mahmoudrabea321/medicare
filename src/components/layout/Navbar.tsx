import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HeartPulse, Menu, X, Phone, Calendar } from "lucide-react";
import { cn } from "../../lib/utils";

const navLinks = [
  { name: "الرئيسية", path: "/" },
  { name: "من نحن", path: "/about" },
  { name: "خدماتنا", path: "/services" },
  { name: "أطبائنا", path: "/doctors" },
  { name: "اتصل بنا", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#020617]/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-2 text-xs md:text-sm hidden md:block">
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
          <p className="font-medium tracking-wide uppercase">طوارئ على مدار الساعة: <span className="font-bold text-blue-400 mr-1" dir="ltr">{import.meta.env.VITE_CLINIC_PHONE || "+1 (800) 123-4567"}</span></p>
          <div className="flex space-x-6 space-x-reverse">
            <Link to="/faq" className="hover:text-white transition-colors">الأسئلة الشائعة</Link>
            <Link to="/blog" className="hover:text-white transition-colors">المدونة الصحية</Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <HeartPulse size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">{import.meta.env.VITE_CLINIC_NAME || "ميد كير"}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12 space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === link.path ? "text-white border-b-2 border-blue-500 pb-1" : "text-slate-400 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <a href={`tel:${import.meta.env.VITE_CLINIC_PHONE || "+18001234567"}`} className="flex items-center space-x-2 space-x-reverse text-slate-400 hover:text-white font-medium transition-colors">
              <Phone size={18} />
              <span className="text-sm">اتصل الآن</span>
            </a>
            <Link
              to="/book"
              className="bg-white text-slate-950 px-6 py-2.5 rounded-full font-bold text-sm flex items-center hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/10"
            >
              <Calendar size={18} className="ml-2" />
              احجز موعداً
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#020617] absolute w-full left-0 shadow-2xl">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "block text-base font-medium py-2 border-b border-slate-800/50",
                  location.pathname === link.path ? "text-blue-500" : "text-slate-300"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setIsOpen(false)}
              className="bg-blue-600 text-white w-full text-center py-3 rounded-lg font-bold mt-4 flex items-center justify-center shadow-lg shadow-blue-600/30"
            >
              <Calendar size={18} className="ml-2" />
              احجز موعداً
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
