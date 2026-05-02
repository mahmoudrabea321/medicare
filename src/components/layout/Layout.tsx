import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MessageCircle } from "lucide-react";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${import.meta.env.VITE_CLINIC_WHATSAPP || "201000000000"}`} 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-400 text-slate-900 p-4 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all hover:-translate-y-1 z-50 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-500/30 group"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold group-hover:mr-3 group-hover:block hidden md:block">
          دردش معنا!
        </span>
      </a>
    </div>
  );
}
