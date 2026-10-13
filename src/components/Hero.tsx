import React from 'react';
import { Phone, MessageSquare, ShieldCheck, MapPin, Star, Award, Sparkles, ArrowRight } from 'lucide-react';
import { PHONE_NUMBER, FORMATTED_PHONE, createWhatsAppUrl } from '../utils/whatsapp';

interface HeroProps {
  onScrollToBooking: () => void;
  onScrollToCars: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToBooking, onScrollToCars }) => {
  const heroWhatsAppUrl = createWhatsAppUrl(
    'Hello Swapnil Tours and Travels! I want to book a cab from Badlapur East. Please provide details and pricing.'
  );

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Background glow and subtle ambient pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & High-Conversion CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Location & Trust Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Headquartered in Badlapur East, Thane (Serving Entire Maharashtra)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Premium Cabs & Tours from{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                Badlapur East
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Reliable, clean, and sanitized AC cars for your Mumbai Airport drop, outstation trips, Ashtavinayak Darshan, Shirdi, Pune, and family vacations. Experienced local drivers with transparent, fixed pricing and zero surprise charges.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToBooking}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Book Your Cab Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={heroWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {PHONE_NUMBER}</span>
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm sm:text-base transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Doorstep Badlapur Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sanitized Chilled AC Cabs</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Verified Chauffeurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                <span>4.9 / 5 Customer Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>24/7 Dispatch Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">₹0</span>
                <span>No Hidden Surge Pricing</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card with Featured Vehicle & Quick Rates */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-5 sm:p-6 shadow-2xl">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                    Official Fleet Dispatch
                  </span>
                  <h3 className="text-lg font-bold text-white">Popular Starting Rates</h3>
                </div>
                <button
                  onClick={onScrollToCars}
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold"
                >
                  View All Cars →
                </button>
              </div>

              {/* Vehicle preview image with overlay */}
              <div className="relative my-4 rounded-xl overflow-hidden aspect-video bg-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
                  alt="Swapnil Tours and Travels Fleet"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs text-slate-300">Maruti Suzuki Dzire AC</p>
                    <p className="text-sm font-bold text-amber-300">Local 8h/80km: ₹1,800</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-amber-500 text-slate-950 font-extrabold text-[11px]">
                    ₹11 / KM Outstation
                  </span>
                </div>
              </div>

              {/* Quick Route Rate Badges */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">✈️</span>
                    <span className="text-slate-200 font-medium">Badlapur ⇄ Mumbai Airport (T1/T2)</span>
                  </div>
                  <span className="font-bold text-amber-400">from ₹1,899</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">🏙️</span>
                    <span className="text-slate-200 font-medium">Badlapur ⇄ Pune (Expressway)</span>
                  </div>
                  <span className="font-bold text-amber-400">from ₹2,499</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">🙏</span>
                    <span className="text-slate-200 font-medium">Badlapur ⇄ Shirdi Temple Round-Trip</span>
                  </div>
                  <span className="font-bold text-amber-400">from ₹4,200</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">⛰️</span>
                    <span className="text-slate-200 font-medium">Badlapur ⇄ Lonavala / Khandala</span>
                  </div>
                  <span className="font-bold text-amber-400">from ₹2,100</span>
                </div>
              </div>

              {/* Fast Instant Support Footer inside Card */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Direct Hotline: <strong className="text-white">7039350555</strong></span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Drivers Available Now
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
