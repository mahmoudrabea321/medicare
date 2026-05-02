import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, Phone, ShieldCheck, Star, Clock, MapPin, 
  Stethoscope, Heart, Activity, Baby, ArrowRight,
  CheckCircle2, Users, Award, Smile
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: ""
  });

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd pass this data via state or context to the booking page
    navigate("/book", { state: formData });
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#020617] pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/5 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-600/5 blur-[100px]"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1 rounded-full mb-6 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">العيادة مفتوحة الآن • 25 أخصائي متاح</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                رعاية استثنائية <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">تبدأ من هنا.</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                اكتشف التميز الطبي مع التشخيصات ذات المستوى العالمي والنهج المخصص لصحة عائلتك.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/book" className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center transition-all shadow-lg shadow-blue-500/10 hover:bg-slate-200">
                  <Calendar className="ml-2" size={20} />
                  احجز موعداً
                </Link>
                <a href={`tel:${import.meta.env.VITE_CLINIC_PHONE || "+18001234567"}`} className="bg-transparent border border-slate-700 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center transition-all hover:bg-slate-900">
                  <Phone className="ml-2 text-blue-400" size={20} />
                  اتصل الآن
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-6 mb-10 max-w-md">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <p className="text-3xl font-bold text-white">15k+</p>
                  <p className="text-[10px] text-slate-500 uppercase mt-1 tracking-widest font-bold">مرضى عالجناهم</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <p className="text-3xl font-bold text-white">98%</p>
                  <p className="text-[10px] text-slate-500 uppercase mt-1 tracking-widest font-bold">نسبة الرضا</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <p className="text-3xl font-bold text-white">25+</p>
                  <p className="text-[10px] text-slate-500 uppercase mt-1 tracking-widest font-bold">سنوات خبرة</p>
                </div>
              </div>

              <div className="flex items-center gap-4 grayscale opacity-40">
                <span className="text-xs uppercase font-bold tracking-widest text-slate-500">معتمد من:</span>
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold text-white">JCI</div>
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold text-white">HIPAA</div>
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold text-white">CDC</div>
              </div>
            </div>

            {/* Quick Booking Form */}
            <div className="lg:col-span-5 w-full flex justify-end">
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative w-full max-w-md">
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white text-xs px-4 py-2 rounded-lg font-bold shadow-lg shadow-blue-600/20" dir="rtl">
                  متاح في نفس اليوم
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">احجز موعداً</h3>
                <p className="text-sm text-slate-400 mb-6">احجز موعدك في أقل من 60 ثانية.</p>
                
                <form onSubmit={handleQuickBook} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">الاسم الكامل</label>
                      <input 
                        type="text" 
                        required
                        placeholder="أحمد محمد" 
                        className="w-full bg-slate-800 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">رقم الهاتف</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="05xxxx xxxx"
                        dir="ltr"
                        className="w-full bg-slate-800 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 text-right"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">اختر الخدمة</label>
                    <select 
                      required
                      className="w-full bg-slate-800 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-300"
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="" disabled>تحديد خدمة...</option>
                      <option value="general">فحص عام</option>
                      <option value="dental">العناية بالأسنان</option>
                      <option value="pediatrics">طب الأطفال</option>
                      <option value="cardiology">أمراض القلب</option>
                      <option value="dermatology">الأمراض الجلدية</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">التاريخ المفضل</label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-slate-800 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-300 color-scheme-dark"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98] mt-2">
                    تأكيد الموعد
                  </button>
                  <p className="text-center text-[10px] text-slate-500 mt-4 font-medium">
                    بياناتك محمية بموجب لوائح التوافق مع HIPAA.
                  </p>
                </form>
              </div>
            </div>

          </div>

          {/* Bottom Strip: Mini-Services */}
          <div className="mt-16 border-t border-slate-800 pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="flex gap-4 items-center group">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-500 group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Modern Equipment</p>
                <p className="text-xs text-slate-500">Latest FDA-approved tech</p>
              </div>
            </div>
            <div className="flex gap-4 items-center group">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
                <Stethoscope className="w-5 h-5 text-blue-500 group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Expert Team</p>
                <p className="text-xs text-slate-500">Board certified MDs</p>
              </div>
            </div>
            <div className="flex gap-4 items-center group">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
                <Phone className="w-5 h-5 text-blue-500 group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">WhatsApp Support</p>
                <p className="text-xs text-slate-500">Direct chat assistance</p>
              </div>
            </div>
            <div className="flex gap-4 items-center group">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors shrink-0">
                <Clock className="w-5 h-5 text-blue-500 group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Flexible Hours</p>
                <p className="text-xs text-slate-500">Mon–Sun 8am–10pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW */}
      <section className="py-20 bg-[#020617]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Medical Services</h2>
            <p className="text-slate-400 text-lg">Comprehensive healthcare solutions tailored to your needs, delivered by experts using state-of-the-art technology.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart size={32}/>, title: "Cardiology", desc: "Expert heart care, from routine checkups to advanced diagnostics." },
              { icon: <Smile size={32}/>, title: "Dental Care", desc: "Complete dental services for healthy and beautiful smiles." },
              { icon: <Baby size={32}/>, title: "Pediatrics", desc: "Compassionate care for infants, children, and adolescents." },
              { icon: <Activity size={32}/>, title: "General Care", desc: "Preventative care and treatments for everyday health." }
            ].map((srv, idx) => (
              <div key={idx} className="group p-8 rounded-2xl border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all duration-300 bg-slate-900 flex flex-col h-full shadow-lg shadow-black/20">
                <div className="w-16 h-16 bg-blue-900/30 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {srv.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{srv.title}</h3>
                <p className="text-slate-400 mb-6 flex-grow">{srv.desc}</p>
                <Link to="/services" className="text-blue-400 font-semibold flex items-center hover:text-blue-300 transition-colors">
                  Learn More <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center font-bold text-white border-b-2 border-blue-500 pb-1 hover:text-blue-400 hover:border-blue-400 transition-colors">
              View all 15+ specialized services <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US & STATS */}
      <section className="py-20 bg-blue-900/10 border-y border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white" preserveAspectRatio="none">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">لماذا يختار المرضى ميد كير</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                نحن نجمع بين التميز الطبي والنهج الإنساني العميق. منذ اللحظة التي تدخل فيها، يكرس فريقنا جهوده لتزويدك بتجربة شفاء مريحة وفعالة وناجحة.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "أطباء معتمدون",
                  "معدات طبية حديثة",
                  "خدمة سريعة وفعالة",
                  "أسعار معقولة وتأمين",
                  "دعم طوارئ على مدار الساعة",
                  "معايير نظافة صارمة"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle2 className="text-emerald-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span className="font-medium text-slate-200">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { num: "15k+", label: "مرضى عالجناهم", icon: <Users className="text-blue-400 mb-4" size={32}/> },
                { num: "50+", label: "أطباء خبراء", icon: <Stethoscope className="text-blue-400 mb-4" size={32}/> },
                { num: "25+", label: "سنوات خبرة", icon: <Award className="text-blue-400 mb-4" size={32}/> },
                { num: "100%", label: "رضا المرضى", icon: <Heart className="text-blue-400 mb-4" size={32}/> },
              ].map((stat, idx) => (
                <div key={idx} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center hover:bg-slate-800/80 transition-all shadow-xl shadow-black/20">
                  <div className="flex justify-center">{stat.icon}</div>
                  <div className="text-4xl font-extrabold mb-2 text-white">{stat.num}</div>
                  <div className="text-slate-500 font-bold tracking-wider uppercase text-[10px]">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. DOCTORS SECTION */}
      <section className="py-20 bg-[#020617]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">تعرف على المتخصصين لدينا</h2>
              <p className="text-slate-400 text-lg">فريق الخبراء لدينا مدرب تدريباً عالياً وملتزم بتقديم أعلى مستوى من الرعاية.</p>
            </div>
            <Link to="/doctors" className="hidden md:inline-flex items-center text-blue-400 font-bold hover:text-blue-300 transition-colors">
              عرض جميع الأطباء <ArrowRight className="mr-2 w-4 h-4 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "د. سارة جنكينز", spec: "طبيبة قلب", exp: "15 سنة", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&q=80" },
              { name: "د. مايكل تشن", spec: "طبيب أطفال", exp: "12 سنة", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&q=80" },
              { name: "د. إيميلي ديفيس", spec: "طبيبة جلدية", exp: "10 سنوات", img: "https://images.unsplash.com/photo-1594824436998-ef220b2f32a8?w=400&h=400&fit=crop&q=80" }
            ].map((doc, idx) => (
              <div key={idx} className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl shadow-black/20 border border-slate-800 group hover:border-slate-700 transition-colors">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold text-blue-400 mb-1 uppercase tracking-widest">{doc.spec}</div>
                  <h3 className="text-xl font-bold mb-1 text-white">{doc.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">خبرة {doc.exp}</p>
                  <Link to="/book" className="w-full block text-center bg-slate-800 border border-slate-700 text-white font-medium py-3 rounded-xl hover:bg-blue-600 hover:border-blue-600 transition-all font-bold text-sm shadow-md">
                    احجز مع هذا الطبيب
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/doctors" className="inline-flex items-center text-blue-400 font-bold border-b-2 border-blue-500 pb-1">
              عرض جميع الأطباء <ArrowRight className="mr-2 w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">ماذا يقول مرضانا</h2>
            <p className="text-slate-400 text-lg">لا تأخذ كلمتنا فقط. اقرأ قصص المرضى الذين ساعدناهم.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "كان فريق ميد كير سريع الاستجابة ومهنياً للغاية. كان حجز الموعد سلساً، والرعاية التي تلقيتها من الدرجة الأولى.", author: "أماندا ر.", service: "العناية بالأسنان" },
              { text: "آخذ أطفالي إلى د. تشن منذ سنوات. دائماً ما يجعلهم يشعرون بالراحة، وبيئة العيادة الجديدة رائعة.", author: "ديفيد ت.", service: "طب الأطفال" },
              { text: "مرفق حديث للغاية! جئت في حالة طوارئ وتمت معاينتي على الفور تقريباً. أوصي بخدماتهم بشدة.", author: "إليانور ف.", service: "طوارئ" }
            ].map((review, idx) => (
              <div key={idx} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl shadow-black/20 hover:-translate-y-1 transition-transform">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-yellow-400" fill="currentColor" />)}
                </div>
                <p className="text-slate-300 italic mb-6">"{review.text}"</p>
                <div>
                  <div className="font-bold text-lg text-white">{review.author}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">مريض {review.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INSURANCE LOGOS (MOCKED) */}
      <section className="py-12 border-b border-slate-800 bg-[#020617]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">شركاء التأمين المعتمدون</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Using text placeholders instead of images for reliability */}
            <div className="text-2xl font-bold text-slate-700 hover:text-slate-400 transition-colors cursor-default">BlueCross</div>
            <div className="text-2xl font-black text-slate-700 hover:text-slate-400 transition-colors cursor-default">Aetna.</div>
            <div className="text-2xl font-bold text-slate-700 hover:text-slate-400 transition-colors cursor-default italic">Cigna</div>
            <div className="text-2xl font-bold text-slate-700 hover:text-slate-400 transition-colors cursor-default tracking-tighter">UnitedHealth</div>
            <div className="text-2xl font-bold text-slate-700 hover:text-slate-400 transition-colors cursor-default font-serif">Medicare</div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mt-20 -mr-20 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full -mb-20 -ml-20 blur-2xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">هل أنت مستعد لإعطاء الأولوية لصحتك؟</h2>
          <p className="text-blue-100 text-xl mb-10">
            احجز موعدك اليوم واحصل على الرعاية التي تستحقها. جدولة سريعة، أطباء خبراء، وبدون وقت انتظار.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/book" className="bg-white hover:bg-slate-100 text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-black/10 hover:-translate-y-0.5">
              احجز زيارتك اليوم
            </Link>
            <a href={`https://wa.me/${import.meta.env.VITE_CLINIC_WHATSAPP || "201000000000"}`} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center">
              راسلنا على واتساب
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
