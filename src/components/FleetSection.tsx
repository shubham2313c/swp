import React, { useState } from 'react';
import { 
  Users, Luggage, Wind, Fuel, ShieldCheck, Check, 
  ArrowRight, MessageSquare, Phone, IndianRupee, Sparkles 
} from 'lucide-react';
import { FLEET_CARS } from '../data/fleetData';
import { Vehicle } from '../types/travel';
import { PHONE_NUMBER, createWhatsAppUrl, generateCarInquiryWhatsAppMessage } from '../utils/whatsapp';

interface FleetSectionProps {
  onSelectCarToBook: (carId: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectCarToBook }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'sedan' | 'suv' | 'luxury' | 'tempo'>('all');

  const filteredFleet = activeCategory === 'all'
    ? FLEET_CARS
    : FLEET_CARS.filter(car => car.category === activeCategory);

  return (
    <section id="cars" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Verified Fleet & Transparent Rates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cars for Every Journey & Budget
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            From budget-friendly sedans for airport runs to premium 7-seater Innova Crystas and group Tempo Travellers. Every vehicle is thoroughly washed, sanitized, AC checked, and driven by courteous experienced chauffeurs.
          </p>

          {/* Interactive Category Filter Controls (Clean Segmented Design) */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Vehicles ({FLEET_CARS.length})
            </button>
            <button
              onClick={() => setActiveCategory('sedan')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeCategory === 'sedan'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Sedans (Dzire / Etios)
            </button>
            <button
              onClick={() => setActiveCategory('suv')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeCategory === 'suv'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Family MPVs (Ertiga 7-Seater)
            </button>
            <button
              onClick={() => setActiveCategory('luxury')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeCategory === 'luxury'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Luxury (Innova Crysta / Fortuner)
            </button>
            <button
              onClick={() => setActiveCategory('tempo')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeCategory === 'tempo'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Tempo Travellers (13-20 Seater)
            </button>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((car: Vehicle) => {
            const carWhatsAppUrl = createWhatsAppUrl(
              generateCarInquiryWhatsAppMessage(car.name)
            );

            return (
              <div
                key={car.id}
                className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Car Image Container with Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />

                  {car.badge && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded-md shadow-md">
                      {car.badge}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                    <span className="bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-700/60 font-semibold">
                      {car.categoryLabel}
                    </span>
                    <span className="bg-emerald-950/80 text-emerald-300 backdrop-blur-sm px-2.5 py-1 rounded-md border border-emerald-800/60 font-bold flex items-center gap-1">
                      <Wind className="w-3 h-3" />
                      Chilled AC
                    </span>
                  </div>
                </div>

                {/* Car Information Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  
                  <div>
                    {/* Title & Tagline */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{car.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">{car.tagline}</p>
                      </div>
                    </div>

                    {/* Spec Indicators (Clean text without pill abuse) */}
                    <div className="mt-4 grid grid-cols-3 gap-2 py-3 border-y border-slate-800 text-xs text-slate-300 text-center">
                      <div className="flex flex-col items-center justify-center p-1">
                        <Users className="w-4 h-4 text-amber-400 mb-1" />
                        <span className="font-bold text-white">{car.seats} Seats</span>
                        <span className="text-[10px] text-slate-500">Max Guests</span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-1 border-x border-slate-800">
                        <Luggage className="w-4 h-4 text-amber-400 mb-1" />
                        <span className="font-bold text-white">{car.luggage} Bags</span>
                        <span className="text-[10px] text-slate-500">Luggage Space</span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-1">
                        <Fuel className="w-4 h-4 text-amber-400 mb-1" />
                        <span className="font-bold text-white">{car.fuelType.split(' ')[0]}</span>
                        <span className="text-[10px] text-slate-500">Fuel Type</span>
                      </div>
                    </div>

                    {/* Pricing Matrix */}
                    <div className="mt-5 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Outstation Rate:</span>
                        <span className="text-sm font-black text-amber-400">
                          ₹{car.pricing.outstationPerKm} / km
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Local 8h / 80km:</span>
                        <span className="font-bold text-white">
                          ₹{car.pricing.local8h80k.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Airport Drop (Badlapur):</span>
                        <span className="font-bold text-emerald-400">
                          ₹{car.pricing.airportDropBadlapur.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                        <span>Extra: ₹{car.pricing.extraKmLocal}/km · ₹{car.pricing.extraHourLocal}/hr</span>
                        <span>Driver: ₹{car.pricing.driverAllowancePerDay}/day</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="mt-4 space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Vehicle Highlights
                      </span>
                      {car.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => onSelectCarToBook(car.id)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-500/15 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Book {car.name.split(' ')[0]} Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={carWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-lg bg-emerald-700/30 hover:bg-emerald-600/40 border border-emerald-600/40 text-emerald-300 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Call Agent</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Fleet Bottom Notice */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900 border border-slate-800 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Need a customized luxury car for a wedding or delegation?</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              We also arrange specialized BMW, Audi, and decorated wedding cars upon advance notice in Badlapur & Thane.
            </p>
          </div>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shrink-0 hover:bg-amber-400 transition-colors"
          >
            Inquire Special Vehicles: {PHONE_NUMBER}
          </a>
        </div>

      </div>
    </section>
  );
};
