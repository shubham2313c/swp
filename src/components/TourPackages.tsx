import React from 'react';
import { Compass, Clock, Check, MessageSquare, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/packageData';
import { TourPackage } from '../types/travel';
import { createWhatsAppUrl, generatePackageInquiryWhatsAppMessage, PHONE_NUMBER } from '../utils/whatsapp';

interface TourPackagesProps {
  onSelectPackage: (packageTitle: string) => void;
}

export const TourPackages: React.FC<TourPackagesProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Curated Pilgrimages & Getaways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Popular Tour Packages from Badlapur
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Hassle-free divine darshans, serene hill stations, and coastal retreats. We handle the routes, temple timings, parking, and comfortable travel so you and your family can cherish the moments.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOUR_PACKAGES.map((pkg: TourPackage) => {
            const packageWhatsAppUrl = createWhatsAppUrl(
              generatePackageInquiryWhatsAppMessage(pkg.title)
            );

            return (
              <div
                key={pkg.id}
                className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Image with Duration Banner */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-700 flex items-center gap-1.5 backdrop-blur-sm">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.duration}</span>
                    </div>

                    {pkg.popular && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded shadow">
                        Bestseller
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">
                        Starting from
                      </span>
                      <div className="text-2xl font-black text-white">
                        ₹{pkg.startingPrice.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-normal text-slate-300">/ package</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">{pkg.subtitle}</p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                        Package Highlights
                      </span>
                      {pkg.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Itinerary Summary */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300">
                      <strong className="text-amber-300 block mb-0.5">Route Plan:</strong>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{pkg.itinerarySummary}</p>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span className="text-slate-500">Ideal For:</span>
                      <span className="text-slate-200 font-medium">{pkg.recommendedFor}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => onSelectPackage(pkg.title)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <span>Book This Tour Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={packageWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-700/20 hover:bg-emerald-600/30 border border-emerald-600/40 text-emerald-300 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire Custom Itinerary via WhatsApp</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
