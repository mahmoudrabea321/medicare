import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, ChevronLeft, ArrowLeft, ArrowRight, Calendar, Clock, User, HeartPulse, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null, // No auth implementation yet but structure is ready
      email: null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const SERVICES = [
  { id: "general", name: "فحص عام", icon: HeartPulse },
  { id: "dental", name: "العناية بالأسنان", icon: HeartPulse },
  { id: "pediatrics", name: "طب الأطفال", icon: HeartPulse },
  { id: "cardiology", name: "أمراض القلب", icon: HeartPulse },
  { id: "dermatology", name: "الأمراض الجلدية", icon: HeartPulse },
];

const DOCTORS = [
  { id: "dr-jenkins", name: "د. سارة جنكينز", spec: "طبيبة قلب", service: "cardiology" },
  { id: "dr-chen", name: "د. مايكل تشن", spec: "طبيب أطفال", service: "pediatrics" },
  { id: "dr-davis", name: "د. إيميلي ديفيس", spec: "طبيبة جلدية", service: "dermatology" },
  { id: "dr-smith", name: "د. روبرت سميث", spec: "العناية العامة", service: "general" },
  { id: "dr-williams", name: "د. آنا ويليامز", spec: "طبيبة أسنان", service: "dental" },
  { id: "any", name: "أي طبيب متاح", spec: "سنقوم بتعيين أفضل طبيب", service: "any" }
];

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "04:00 PM"
];

export default function BookAppointment() {
  const location = useLocation();
  const initialState = location.state || {};

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    service: initialState.service || "",
    doctor: "",
    date: initialState.date || "",
    time: "",
    name: initialState.name || "",
    phone: initialState.phone || "",
    email: "",
    notes: ""
  });

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filteredDoctors = DOCTORS.filter(d => d.id === "any" || d.service === formData.service || formData.service === "");

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const path = "appointments";
    try {
      await addDoc(collection(db, path), {
        patientName: formData.name,
        patientPhone: formData.phone,
        patientEmail: formData.email,
        notes: formData.notes,
        serviceId: formData.service,
        doctorId: formData.doctor,
        date: formData.date,
        time: formData.time,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      nextStep();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
      setError("حدث خطأ أثناء حفظ موعدك. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If initial state had service and date, pre-select and move if needed. 
  // For simplicity, we just pre-fill data and let user see it.

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-white mb-2">احجز موعدك</h1>
          <p className="text-slate-400">حجز سريع وآمن عبر الإنترنت</p>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-4 py-10 max-w-3xl">
        
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-800 z-0 rounded-full"></div>
            <div className={"absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 z-0 transition-all duration-300 rounded-full"} style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
            
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors border-2",
                  step === s ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30" : 
                  step > s ? "bg-blue-600 border-blue-600 text-white" : "bg-slate-900 border-slate-700 text-slate-500"
                )}>
                  {step > s ? <CheckCircle2 size={20} /> : s}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-4 px-2" dir="rtl">
            <span className="text-right">الخدمة</span>
            <span className="text-center">الطبيب</span>
            <span className="text-center">التاريخ والوقت</span>
            <span className="text-center">التفاصيل</span>
            <span className="text-left">تأكيد</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900 rounded-3xl shadow-xl shadow-black/20 border border-slate-800 overflow-hidden">
          
          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">اختر الخدمة</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map(srv => (
                  <button
                    key={srv.id}
                    onClick={() => { updateForm("service", srv.id); nextStep(); }}
                    className={cn(
                      "flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all hover:scale-[1.02]",
                      formData.service === srv.id ? "border-blue-500 bg-blue-900/20 text-blue-400" : "border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300"
                    )}
                  >
                    <srv.icon size={32} className={cn("mb-3", formData.service === srv.id ? "text-blue-400" : "text-slate-500")} />
                    <span className="font-bold">{srv.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: DOCTOR */}
          {step === 2 && (
            <div className="p-8">
               <button onClick={prevStep} className="flex items-center text-sm font-medium text-slate-400 hover:text-white mb-6 transition-colors group">
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" /> رجوع
              </button>
              <h2 className="text-2xl font-bold text-white mb-6">اختر طبيباً</h2>
              <div className="space-y-4">
                {filteredDoctors.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => { updateForm("doctor", doc.id); nextStep(); }}
                    className={cn(
                      "w-full flex items-center p-4 rounded-2xl border-2 transition-all text-right hover:scale-[1.01]",
                      formData.doctor === doc.id ? "border-blue-500 bg-blue-900/20" : "border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                    )}
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-800 text-blue-400 flex items-center justify-center ml-4 shrink-0 border border-slate-700">
                      <User size={24} />
                    </div>
                    <div className="flex-grow text-right">
                      <div className="font-bold text-white text-lg">{doc.name}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{doc.spec}</div>
                    </div>
                    <ChevronLeft size={20} className="text-slate-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {step === 3 && (
            <div className="p-8">
              <button onClick={prevStep} className="flex items-center text-sm font-medium text-slate-400 hover:text-white mb-6 transition-colors group">
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" /> رجوع
              </button>
              <h2 className="text-2xl font-bold text-white mb-6">اختر التاريخ والوقت</h2>
              
              <div className="mb-8">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center">
                  <Calendar size={14} className="ml-2" /> تحديد التاريخ
                </label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full sm:w-1/2 p-4 rounded-xl bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-white color-scheme-dark"
                  value={formData.date}
                  onChange={e => updateForm("date", e.target.value)}
                />
              </div>

              {formData.date && (
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center">
                    <Clock size={14} className="ml-2" /> الأوقات المتاحة
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TIME_SLOTS.map(time => (
                      <button
                        key={time}
                        onClick={() => { updateForm("time", time); nextStep(); }}
                        className={cn(
                          "py-3 rounded-xl border-2 text-sm font-bold transition-all focus:outline-none",
                          formData.time === time ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "border-slate-800 bg-slate-800 hover:bg-slate-700 text-slate-300"
                        )}
                        dir="ltr"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: PERSONAL DETAILS */}
          {step === 4 && (
            <form onSubmit={submitBooking} className="p-8">
              <button type="button" onClick={prevStep} className="flex items-center text-sm font-medium text-slate-400 hover:text-white mb-6 transition-colors group">
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" /> رجوع
              </button>
              <h2 className="text-2xl font-bold text-white mb-6">بياناتك الشخصية</h2>
              
              <div className="space-y-5">
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium">
                    {error}
                  </div>
                )}
                <div>
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1 block">الاسم الكامل</label>
                  <input 
                    type="text" required
                    className="w-full p-4 rounded-xl bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500"
                    value={formData.name} onChange={e => updateForm("name", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1 block">رقم الهاتف</label>
                    <input 
                      type="tel" required
                      dir="ltr"
                      className="w-full p-4 rounded-xl bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 text-right"
                      value={formData.phone} onChange={e => updateForm("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1 block">البريد الإلكتروني</label>
                    <input 
                      type="email" required
                      className="w-full p-4 rounded-xl bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500"
                      value={formData.email} onChange={e => updateForm("email", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1 block">أي ملاحظات طبية أو أعراض؟ (اختياري)</label>
                  <textarea 
                    rows={3}
                    className="w-full p-4 rounded-xl bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 resize-none"
                    value={formData.notes} onChange={e => updateForm("notes", e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 w-full sm:w-auto flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="ml-2 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : (
                    "مراجعة وتأكيد الحجز"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: CONFIRMATION */}
          {step === 5 && (
            <div className="p-8 text-center py-16">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">تم تأكيد الموعد!</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                شكراً لك، {formData.name}. موعدك لـ <strong className="text-white">{SERVICES.find(s => s.id === formData.service)?.name || "الخدمة"}</strong> في <strong className="text-white" dir="ltr">{formData.date ? new Date(formData.date).toLocaleDateString() : ""}</strong> الساعة <strong className="text-white" dir="ltr">{formData.time}</strong> تم تأكيده.
              </p>
              
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-right max-w-md mx-auto mb-8 shadow-xl shadow-black/20">
                <h4 className="font-bold text-white mb-4 border-b border-slate-700 pb-4">ملخص الحجز</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">المريض:</span>
                    <span className="font-medium text-white">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">الطبيب:</span>
                    <span className="font-medium text-white">{DOCTORS.find(d => d.id === formData.doctor)?.name || "أي طبيب متاح"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">التاريخ والوقت:</span>
                    <span className="font-medium text-white" dir="ltr">{formData.date} - {formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">الهاتف:</span>
                    <span className="font-medium text-white" dir="ltr">{formData.phone}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-500 mb-8 font-medium">لقد أرسلنا بريداً إلكترونياً ورسالة نصية قصيرة لتأكيد حجزك على تفاصيل الاتصال الخاصة بك.</p>
              
              <Link to="/" className="inline-block bg-slate-800 border-2 border-slate-700 text-white hover:bg-slate-700 hover:border-slate-600 font-bold px-8 py-4 rounded-xl transition-all">
                العودة للرئيسية
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
