import { Link } from "react-router-dom";
import { HeartPulse, Mail, MapPin, Phone, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse text-white mb-6">
              <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <HeartPulse size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">{import.meta.env.VITE_CLINIC_NAME || "ميد كير"}</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              نقدم رعاية طبية استثنائية لعائلتك بأكملها. يضمن فريقنا من الأطباء المعتمدين والمرافق الحديثة أفضل علاج.
            </p>
            <div className="flex items-center space-x-2 space-x-reverse text-white pt-2">
              <Phone size={18} className="text-blue-400"/>
              <span className="font-semibold text-lg" dir="ltr">{import.meta.env.VITE_CLINIC_PHONE || "+1 (800) 123-4567"}</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center">
              روابط سريعة
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 text-slate-400 transition-colors">من نحن</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 text-slate-400 transition-colors">خدماتنا</Link></li>
              <li><Link to="/doctors" className="hover:text-blue-400 text-slate-400 transition-colors">ابحث عن طبيب</Link></li>
              <li><Link to="/book" className="hover:text-blue-400 text-slate-400 transition-colors">احجز موعداً</Link></li>
              <li><Link to="/testimonials" className="hover:text-blue-400 text-slate-400 transition-colors">تقييمات المرضى</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">خدماتنا</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services/primary-care" className="hover:text-blue-400 text-slate-400 transition-colors">الرعاية الأولية</Link></li>
              <li><Link to="/services/pediatrics" className="hover:text-blue-400 text-slate-400 transition-colors">طب الأطفال</Link></li>
              <li><Link to="/services/cardiology" className="hover:text-blue-400 text-slate-400 transition-colors">أمراض القلب</Link></li>
              <li><Link to="/services/dermatology" className="hover:text-blue-400 text-slate-400 transition-colors">الأمراض الجلدية</Link></li>
              <li><Link to="/services/dental" className="hover:text-blue-400 text-slate-400 transition-colors">العناية بالأسنان</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">اتصل بنا</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3 space-x-reverse">
                <MapPin size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <span>123 شارع الصحة، الحي الطبي<br />نيويورك، نيويورك 10001</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <a href={`mailto:${import.meta.env.VITE_CLINIC_EMAIL || "info@medcare.com"}`} className="hover:text-white transition-colors">{import.meta.env.VITE_CLINIC_EMAIL || "info@medcare.com"}</a>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <MessageSquare size={18} className="text-blue-500 shrink-0" />
                <a href={`https://wa.me/${import.meta.env.VITE_CLINIC_WHATSAPP || "201000000000"}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">دعم واتساب</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} {import.meta.env.VITE_CLINIC_NAME || "ميد كير"}. جميع الحقوق محفوظة.</p>
          <div className="flex space-x-4 space-x-reverse mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">شروط الخدمة</a>
            <a href="#" className="hover:text-white transition-colors">التوافق مع HIPAA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
