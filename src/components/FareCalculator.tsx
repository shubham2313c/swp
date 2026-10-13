import React, { useState } from 'react';
import { Calculator, Car, Navigation, IndianRupee, MessageSquare, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { FLEET_CARS } from '../data/fleetData';
import { POPULAR_ROUTES } from '../data/routeData';
import { PHONE_NUMBER, createWhatsAppUrl } from '../utils/whatsapp';

interface FareCalculatorProps {
  onApplyCalculation: (carId: string) => void;
}

export const FareCalculator: React.FC<FareCalculatorProps> = ({ onApplyCalculation }) => {
  const [selectedCarId, setSelectedCarId] = useState<string>('maruti-dzire');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('badlapur-mumbai-airport');
  const [useCustomKm, setUseCustomKm] = useState<boolean>(false);
  const [customKm, setCustomKm] = useState<number>(150);
  const [tripKind, setTripKind] = useState<'oneway' | 'round1' | 'round2' | 'round3'>('round1');

  const selectedCar = FLEET_CARS.find(c => c.id === selectedCarId) || FLEET_CARS[0];
  const selectedRoute = POPULAR_ROUTES.find(r => r.id === selectedRouteId) || POPULAR_ROUTES[0];

  // Calculate distance
  const baseOneWayKm = useCustomKm ? customKm : selectedRoute.distanceKm;

  let totalBillableKm = 0;
  let driverDays = 1;

  if (tripKind === 'oneway') {
    // One way billing incorporates dead mileage return back to Badlapur base
    totalBillableKm = Math.max(100, Math.round(baseOneWayKm * 1.8));
    driverDays = 1;
  } else if (tripKind === 'round1') {
    totalBillableKm = Math.max(selectedCar.pricing.minKmOutstation, baseOneWayKm * 2);
    driverDays = 1;
  } else if (tripKind === 'round2') {
    totalBillableKm = Math.max(selectedCar.pricing.minKmOutstation * 2, baseOneWayKm * 2);
    driverDays = 2;
  } else {
    // 3 days
    totalBillableKm = Math.max(selectedCar.pricing.minKmOutstation * 3, baseOneWayKm * 2);
    driverDays = 3;
  }

  const runningCost = totalBillableKm * selectedCar.pricing.outstationPerKm;
  const driverCost = driverDays * selectedCar.pricing.driverAllowancePerDay;
  const totalEstimatedCost = runningCost + driverCost;

  const quoteWhatsAppUrl = createWhatsAppUrl(
    `Hello Swapnil Tours! 🚖\nI used your Fare Calculator for:\n- Car: ${selectedCar.name}\n- Route: ${useCustomKm ? `${customKm} Kms` : `${selectedRoute.from} to ${selectedRoute.to}`}\n- Duration: ${tripKind === 'oneway' ? 'One Way' : `${driverDays} Day(s) Round Trip`}\n- Estimated Quote: ₹${totalEstimatedCost.toLocaleString('en-IN')}\n\nPlease confirm availability and finalize the booking.`
  );

  return (
    <section id="calculator" className="py-20 bg-slate-900 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Instant Outstation Fare Estimator
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Calculate your journey fare with zero hidden surprises. Test different vehicles and trip durations originating from Badlapur East.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="max-w-4xl mx-auto bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="space-y-6">
              
              {/* Select Car */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>1. Select Vehicle</span>
                  <span className="text-amber-400 text-[11px]">₹{selectedCar.pricing.outstationPerKm}/km</span>
                </label>
                <select
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {FLEET_CARS.map(car => (
                    <option key={car.id} value={car.id}>
                      {car.name} ({car.seats} Seats) — ₹{car.pricing.outstationPerKm}/km
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Route or Custom Km */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    2. Select Route / Distance
                  </label>
                  <button
                    type="button"
                    onClick={() => setUseCustomKm(!useCustomKm)}
                    className="text-xs text-amber-400 hover:underline font-semibold"
                  >
                    {useCustomKm ? 'Choose Pre-Set Route' : 'Enter Custom Km'}
                  </button>
                </div>

                {!useCustomKm ? (
                  <select
                    value={selectedRouteId}
                    onChange={(e) => setSelectedRouteId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {POPULAR_ROUTES.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.to} ({r.distanceKm} km one-way)
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>One-Way Distance: {customKm} km</span>
                      <span>Total Round: {customKm * 2} km</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={800}
                      step={10}
                      value={customKm}
                      onChange={(e) => setCustomKm(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Trip Duration Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  3. Trip Duration & Pattern
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setTripKind('oneway')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      tripKind === 'oneway'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                        : 'border-slate-800 bg-slate-900 text-slate-300'
                    }`}
                  >
                    One-Way Drop
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripKind('round1')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      tripKind === 'round1'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                        : 'border-slate-800 bg-slate-900 text-slate-300'
                    }`}
                  >
                    Same-Day Return
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripKind('round2')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      tripKind === 'round2'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                        : 'border-slate-800 bg-slate-900 text-slate-300'
                    }`}
                  >
                    2 Days (1 Night)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripKind('round3')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      tripKind === 'round3'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                        : 'border-slate-800 bg-slate-900 text-slate-300'
                    }`}
                  >
                    3 Days (2 Nights)
                  </button>
                </div>
              </div>

            </div>

            {/* Results Output Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-7 rounded-2xl border border-amber-500/30 flex flex-col justify-between space-y-6">
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                    Estimated Bill Breakdown
                  </span>
                  <span className="text-xs text-slate-400">Badlapur Base</span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Selected Vehicle:</span>
                    <strong className="text-white">{selectedCar.name}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Billable Distance:</span>
                    <strong className="text-white">{totalBillableKm} KM</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Running Charge ({totalBillableKm} km × ₹{selectedCar.pricing.outstationPerKm}):</span>
                    <span className="text-white">₹{runningCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Driver Allowance ({driverDays} Day × ₹{selectedCar.pricing.driverAllowancePerDay}):</span>
                    <span className="text-white">₹{driverCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                    <span>Tolls & Parking:</span>
                    <span>As per actual FASTag</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">Total Estimated Fare</span>
                    <div className="text-3xl font-black text-amber-400">
                      ₹{totalEstimatedCost.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-1 rounded">
                    Best Rate Guaranteed
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => onApplyCalculation(selectedCar.id)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Book This Vehicle Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={quoteWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Quote to WhatsApp (7039350555)</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
