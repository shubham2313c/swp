import React from 'react';
import { MapPin, Clock, ArrowRight, ShieldCheck, Car, Sparkles } from 'lucide-react';
import { POPULAR_ROUTES } from '../data/routeData';
import { PopularRoute } from '../types/travel';

interface PopularRoutesProps {
  onSelectRoute: (destination: string) => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({ onSelectRoute }) => {
  return (
    <section id="routes" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Frequent Highway Routes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Popular Routes from Badlapur East
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Transparent estimated starting fares from Badlapur East to major Maharashtra hubs, airports, and spiritual destinations. Click any route to pre-fill your booking!
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {POPULAR_ROUTES.map((route: PopularRoute) => (
            <div
              key={route.id}
              className="bg-slate-950 rounded-2xl border border-slate-800 p-5 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Distance & Time */}
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800/80">
                  <span className="font-bold text-amber-400">{route.distanceKm} KM</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {route.approxDuration}
                  </span>
                </div>

                {/* Route Names */}
                <div className="mt-3">
                  <span className="text-[11px] text-slate-500 uppercase font-semibold">Origin</span>
                  <div className="text-xs text-slate-300 font-medium">{route.from}</div>

                  <div className="my-2 border-l-2 border-amber-500/40 pl-3 py-1">
                    <span className="text-[11px] text-slate-500 uppercase font-semibold">Destination</span>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {route.to}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    {route.popularFor}
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Sedan (Dzire):</span>
                    <strong className="text-white">₹{route.startingPriceDzire.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Ertiga (7-Seat):</span>
                    <strong className="text-white">₹{route.startingPriceErtiga.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Innova Crysta:</span>
                    <strong className="text-amber-400">₹{route.startingPriceInnova.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectRoute(route.to)}
                className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-amber-500 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <span>Select This Route</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
