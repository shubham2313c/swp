import React from 'react';
import { ShieldCheck, Clock, UserCheck, Banknote, Sparkles, PhoneCall, Award, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Clock,
      title: 'Punctual Doorstep Pickup',
      description: 'Your driver arrives 10 minutes prior to scheduled departure at your home or society in Badlapur East/West.'
    },
    {
      icon: Banknote,
      title: '100% Transparent Rates',
      description: 'Zero hidden fees, zero night surge extortion, and clear receipted billing for toll and driver allowance.'
    },
    {
      icon: UserCheck,
      title: 'Verified & Courteous Chauffeurs',
      description: 'Background checked drivers with 8+ years highway experience, well-versed in ghat driving and safety protocols.'
    },
    {
      icon: Sparkles,
      title: 'Spotless & Chilled AC Cabs',
      description: 'Cars undergo regular interior detailing, ozone sanitation, AC servicing, and pleasant interior fragrance.'
    },
    {
      icon: PhoneCall,
      title: '24/7 Dispatch Desk & Support',
      description: 'Direct owner involvement and immediate phone/WhatsApp support at 7039350555, even for midnight airport calls.'
    },
    {
      icon: HeartHandshake,
      title: 'Family & Pilgrim Friendly',
      description: 'Patient drivers willing to accommodate senior citizen tea halts, temple queues, and luggage assistance.'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Badlapur’s Trusted Travel Partner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Travelers Choose Swapnil Tours
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Over a decade of trusted journeys across Maharashtra with thousands of safe rides and delighted families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{r.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{r.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Local presence stat counter */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">15,000+</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Successful Trips Completed</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">25+</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Fleet Vehicles in Service</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">4.9 ★</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Google & Local Rating</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">24/7</div>
            <div className="text-xs text-slate-300 font-semibold mt-1">Live Human Support</div>
          </div>
        </div>

      </div>
    </section>
  );
};
