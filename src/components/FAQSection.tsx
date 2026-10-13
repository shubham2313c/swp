import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How early should I book my cab from Badlapur East?',
      a: 'For Mumbai Airport drops or outstation tours (Pune, Shirdi, Mahabaleshwar), booking 6 to 12 hours in advance is recommended to ensure your preferred vehicle. For emergency or urgent rides, call or WhatsApp us directly at 7039350555 and we can often dispatch within 20–30 minutes across Badlapur, Ambernath, and Ulhasnagar.'
    },
    {
      q: 'Are tolls, state taxes, and parking included in the base fare?',
      a: 'Base fares include vehicle rental, fuel, and chauffeur charges. Tolls (FASTag), parking charges, and interstate border entry taxes (if crossing Maharashtra to Goa or Gujarat) are paid as per actual computerized receipts so you never overpay.'
    },
    {
      q: 'Do you operate 24/7 for late-night and 3 AM airport drops?',
      a: 'Yes, absolutely! We operate 24 hours a day, 7 days a week, 365 days a year. Our drivers are assigned in advance for late night/early morning airport runs so you can sleep peacefully knowing your cab is guaranteed on time.'
    },
    {
      q: 'What payment modes are accepted by Swapnil Tours?',
      a: 'We accept all popular Indian payment modes including Google Pay (GPay), PhonePe, Paytm, BHIM UPI, Net Banking / NEFT, and Cash directly to the driver upon trip completion.'
    },
    {
      q: 'Can I book a cab for multi-day pilgrimage tours like Ashtavinayak?',
      a: 'Yes! We specialize in custom multi-day pilgrimages including Ashtavinayak Darshan (2N/3D or 3N/4D), Shirdi & Shani Shingnapur, Trimbakeshwar Jyotirlinga, and Kolhapur Mahalaxmi. Our drivers know the best temple darshan schedules, clean highway dhabas, and senior-citizen friendly rest stops.'
    },
    {
      q: 'How and when will I receive driver and car details?',
      a: 'As soon as you book online or via WhatsApp (7039350555), your booking is registered. Vehicle number, driver name, and driver contact number will be messaged to you on WhatsApp 2 to 3 hours prior to your scheduled journey time.'
    }
  ];

  return (
    <section className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Everything you need to know about booking with Swapnil Tours and Travels.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:text-amber-400 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <span className="p-1 rounded-lg bg-slate-800 text-amber-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
