import React, { useState, useEffect } from 'react';
import { 
  Car, Calendar, Clock, MapPin, Users, Phone, User, 
  MessageSquare, ShieldCheck, CheckCircle2, ChevronRight, 
  Sparkles, Info, Plane, Luggage, Navigation
} from 'lucide-react';
import { FLEET_CARS, POPULAR_LOCATIONS } from '../data/fleetData';
import { BookingDetails, TripType, Vehicle } from '../types/travel';
import { PHONE_NUMBER, FORMATTED_PHONE, generateBookingWhatsAppMessage, createWhatsAppUrl } from '../utils/whatsapp';

interface BookingFormProps {
  selectedCarId?: string;
  onBookingSuccess: (booking: BookingDetails) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ selectedCarId, onBookingSuccess }) => {
  const [tripType, setTripType] = useState<TripType>('outstation_round');
  const [vehicleId, setVehicleId] = useState<string>(selectedCarId || 'maruti-dzire');
  
  // Trip details
  const [pickupLocation, setPickupLocation] = useState<string>('Badlapur East (Home / Office)');
  const [customPickup, setCustomPickup] = useState<string>('');
  const [dropLocation, setDropLocation] = useState<string>('Pune (Expressway)');
  const [customDrop, setCustomDrop] = useState<string>('');
  
  // Today date helper
  const today = new Date().toISOString().split('T')[0];
  const [pickupDate, setPickupDate] = useState<string>(today);
  const [pickupTime, setPickupTime] = useState<string>('06:00');
  const [returnDate, setReturnDate] = useState<string>(today);
  
  // Local rental package duration
  const [localPackage, setLocalPackage] = useState<'8h80k' | '12h120k'>('8h80k');

  // Customer info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(3);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  // Validation error
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Update selected car when prop changes
  useEffect(() => {
    if (selectedCarId) {
      setVehicleId(selectedCarId);
    }
  }, [selectedCarId]);

  const currentVehicle: Vehicle = FLEET_CARS.find(c => c.id === vehicleId) || FLEET_CARS[0];

  // Calculate estimated fare
  const calculateEstimatedFare = (): { fare: number; breakdown: string } => {
    const v = currentVehicle;
    if (tripType === 'airport_transfer') {
      const fare = v.pricing.airportDropBadlapur;
      return {
        fare,
        breakdown: `Fixed Mumbai Airport Transfer package for ${v.name} from Badlapur East.`
      };
    }

    if (tripType === 'local_rental') {
      if (localPackage === '8h80k') {
        return {
          fare: v.pricing.local8h80k,
          breakdown: `Local 8 Hours / 80 Kms package. Extra km @ ₹${v.pricing.extraKmLocal}/km, extra hr @ ₹${v.pricing.extraHourLocal}/hr.`
        };
      } else {
        // 12h / 120km
        const fare = Math.round(v.pricing.local8h80k * 1.4);
        return {
          fare,
          breakdown: `Local 12 Hours / 120 Kms package. Extra km @ ₹${v.pricing.extraKmLocal}/km, extra hr @ ₹${v.pricing.extraHourLocal}/hr.`
        };
      }
    }

    if (tripType === 'outstation_oneway') {
      // Estimated 150 km baseline
      let kmEstimate = 150;
      const lowerDrop = (customDrop || dropLocation).toLowerCase();
      if (lowerDrop.includes('pune')) kmEstimate = 140;
      else if (lowerDrop.includes('shirdi')) kmEstimate = 220;
      else if (lowerDrop.includes('nashik')) kmEstimate = 160;
      else if (lowerDrop.includes('mahabaleshwar')) kmEstimate = 250;
      else if (lowerDrop.includes('lonavala')) kmEstimate = 85;
      else if (lowerDrop.includes('alibaug')) kmEstimate = 120;
      else if (lowerDrop.includes('goa')) kmEstimate = 560;

      const fare = Math.round(kmEstimate * v.pricing.outstationPerKm * 1.35); // includes return toll/dry run
      return {
        fare,
        breakdown: `One-way estimated fare (~${kmEstimate} km) for ${v.name} @ ₹${v.pricing.outstationPerKm}/km.`
      };
    }

    // Outstation round trip (min 300km per day or duration)
    let days = 1;
    if (returnDate && pickupDate) {
      const d1 = new Date(pickupDate).getTime();
      const d2 = new Date(returnDate).getTime();
      const diffDays = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
      days = Math.max(1, diffDays);
    }
    const minKm = days * v.pricing.minKmOutstation;
    const baseKmCost = minKm * v.pricing.outstationPerKm;
    const driverCost = days * v.pricing.driverAllowancePerDay;
    const total = baseKmCost + driverCost;

    return {
      fare: total,
      breakdown: `${days} Day(s) Round Trip (${minKm} km min @ ₹${v.pricing.outstationPerKm}/km + ₹${driverCost} Driver allowance).`
    };
  };

  const { fare: estimatedFare, breakdown: fareBreakdown } = calculateEstimatedFare();

  const handleBookingSubmit = (e: React.FormEvent, sendToWhatsAppDirectly: boolean = false) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for driver coordination');
      return;
    }

    const effectivePickup = customPickup.trim() || pickupLocation;
    const effectiveDrop = tripType === 'local_rental' 
      ? `Badlapur / Mumbai City Usage (${localPackage === '8h80k' ? '8 Hr / 80 Km' : '12 Hr / 120 Km'})`
      : (customDrop.trim() || dropLocation);

    const bookingId = `STT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingDetails = {
      id: bookingId,
      bookingDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      tripType,
      vehicleId: currentVehicle.id,
      vehicleName: currentVehicle.name,
      pickupLocation: effectivePickup,
      dropLocation: effectiveDrop,
      pickupDate,
      pickupTime,
      returnDate: tripType === 'outstation_round' ? returnDate : undefined,
      customerName: customerName.trim(),
      customerPhone: cleanPhone,
      customerEmail: customerEmail.trim() || undefined,
      passengers,
      specialRequests: specialRequests.trim() || undefined,
      estimatedFare,
      fareBreakdownText: fareBreakdown,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    // Save to local storage for persistence & "My Bookings" lookup
    try {
      const existingStr = localStorage.getItem('swapnil_tours_bookings');
      const existing: BookingDetails[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('swapnil_tours_bookings', JSON.stringify([newBooking, ...existing]));
    } catch (err) {
      console.warn('Storage save error', err);
    }

    // Trigger parent success modal
    onBookingSuccess(newBooking);

    // If requested, open WhatsApp right away in new tab
    if (sendToWhatsAppDirectly) {
      const waMsg = generateBookingWhatsAppMessage({
        bookingId: newBooking.id,
        customerName: newBooking.customerName,
        customerPhone: newBooking.customerPhone,
        tripType: newBooking.tripType,
        vehicleName: newBooking.vehicleName,
        pickupLocation: newBooking.pickupLocation,
        dropLocation: newBooking.dropLocation,
        pickupDate: newBooking.pickupDate,
        pickupTime: newBooking.pickupTime,
        returnDate: newBooking.returnDate,
        passengers: newBooking.passengers,
        estimatedFare: newBooking.estimatedFare,
        specialRequests: newBooking.specialRequests
      });
      window.open(createWhatsAppUrl(waMsg), '_blank');
    }
  };

  return (
    <section id="booking" className="py-16 bg-slate-900 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Cab Booking · Badlapur East</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Book Your Cab in Under 60 Seconds
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Select your journey, choose from our certified sanitized fleet, get an upfront transparent fare, and get immediate driver confirmation via WhatsApp or phone.
          </p>
        </div>

        {/* The Main Booking Card */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Trip Type Segmented Tabs */}
          <div className="bg-slate-900/90 p-2 border-b border-slate-800">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setTripType('outstation_round')}
                className={`px-3 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  tripType === 'outstation_round'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>Outstation Round</span>
              </button>

              <button
                type="button"
                onClick={() => setTripType('outstation_oneway')}
                className={`px-3 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  tripType === 'outstation_oneway'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                <span>Outstation One-Way</span>
              </button>

              <button
                type="button"
                onClick={() => setTripType('airport_transfer')}
                className={`px-3 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  tripType === 'airport_transfer'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Plane className="w-4 h-4" />
                <span>Mumbai Airport Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setTripType('local_rental')}
                className={`px-3 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  tripType === 'local_rental'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Local City Hourly</span>
              </button>
            </div>
          </div>

          <form onSubmit={(e) => handleBookingSubmit(e, false)} className="p-5 sm:p-8 space-y-6">
            
            {/* Row 1: Pickup & Drop Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Pickup Location */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pickup Location (Badlapur & Surrounding)</span>
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {POPULAR_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-slate-900 text-white">
                      {loc}
                    </option>
                  ))}
                  <option value="custom" className="bg-slate-900 text-white">+ Enter Custom Doorstep Address</option>
                </select>

                {pickupLocation === 'custom' && (
                  <input
                    type="text"
                    required
                    placeholder="Enter full society / landmark address in Badlapur..."
                    value={customPickup}
                    onChange={(e) => setCustomPickup(e.target.value)}
                    className="w-full mt-2 bg-slate-900 border border-amber-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                )}
              </div>

              {/* Drop / Destination */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {tripType === 'airport_transfer'
                      ? 'Airport Terminal'
                      : tripType === 'local_rental'
                      ? 'Rental Package Duration'
                      : 'Destination City / Place'}
                  </span>
                </label>

                {tripType === 'airport_transfer' ? (
                  <select
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Mumbai Airport T2 (International / Domestic CSMIA)">Mumbai Airport T2 (CSMIA International / Domestic)</option>
                    <option value="Mumbai Airport T1 (Santacruz Domestic)">Mumbai Airport T1 (Santacruz Domestic)</option>
                    <option value="Airport Pickup -> Drop to Badlapur East">Arrival Pickup at Airport (Driver waits with name board) → Badlapur</option>
                  </select>
                ) : tripType === 'local_rental' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLocalPackage('8h80k')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center transition-all ${
                        localPackage === '8h80k'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                          : 'border-slate-800 bg-slate-900 text-slate-300'
                      }`}
                    >
                      <span className="text-sm font-extrabold">8 Hours / 80 Km</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">Standard City package</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocalPackage('12h120k')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center transition-all ${
                        localPackage === '12h120k'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                          : 'border-slate-800 bg-slate-900 text-slate-300'
                      }`}
                    >
                      <span className="text-sm font-extrabold">12 Hours / 120 Km</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">Full day city & business</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <select
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Pune City (Hinjewadi / Station / Viman Nagar)">Pune City (Hinjewadi / Station)</option>
                      <option value="Shirdi Saibaba Temple & Samadhi">Shirdi Saibaba Temple</option>
                      <option value="Mahabaleshwar & Panchgani">Mahabaleshwar & Panchgani</option>
                      <option value="Lonavala / Khandala">Lonavala / Khandala</option>
                      <option value="Nashik / Trimbakeshwar">Nashik / Trimbakeshwar Jyotirlinga</option>
                      <option value="Alibaug / Kashid Beach">Alibaug / Kashid Beach</option>
                      <option value="Ashtavinayak Circuit Yatra">Ashtavinayak Circuit Yatra</option>
                      <option value="Goa (Panjim / Calangute / Margao)">Goa (Panjim / Calangute)</option>
                      <option value="Thane / Mumbai City">Thane / Mumbai City Central</option>
                      <option value="custom">+ Other Destination</option>
                    </select>

                    {dropLocation === 'custom' && (
                      <input
                        type="text"
                        required
                        placeholder="Enter your destination city / village / landmark..."
                        value={customDrop}
                        onChange={(e) => setCustomDrop(e.target.value)}
                        className="w-full mt-2 bg-slate-900 border border-amber-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    )}
                  </>
                )}
              </div>

            </div>

            {/* Row 2: Dates and Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pickup Date</span>
                </label>
                <input
                  type="date"
                  min={today}
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 [color-scheme:dark]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pickup Time</span>
                </label>
                <input
                  type="time"
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 [color-scheme:dark]"
                />
              </div>

              {tripType === 'outstation_round' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Return Date</span>
                  </label>
                  <input
                    type="date"
                    min={pickupDate || today}
                    required
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 [color-scheme:dark]"
                  />
                </div>
              )}
            </div>

            {/* Row 3: Vehicle Selection with Live Interactive Preview */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  <span>Choose Your Vehicle</span>
                </label>
                <span className="text-xs text-amber-400">All vehicles 100% sanitized with AC</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {FLEET_CARS.map((car) => {
                  const isSelected = car.id === vehicleId;
                  return (
                    <button
                      key={car.id}
                      type="button"
                      onClick={() => {
                        setVehicleId(car.id);
                        if (car.seats < passengers) {
                          setPassengers(car.seats);
                        }
                      }}
                      className={`relative p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/15 ring-1 ring-amber-500'
                          : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800/80'
                      }`}
                    >
                      <div>
                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-800 mb-2 relative">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover"
                          />
                          {car.badge && (
                            <span className="absolute top-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                              {car.badge.split(' ')[0]}
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{car.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <Users className="w-3 h-3 text-amber-400" />
                          <span>{car.seats} Seats</span>
                        </p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-800/80">
                        <span className="text-xs font-black text-amber-400">
                          ₹{car.pricing.outstationPerKm}/km
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 4: Passengers & Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Your Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swapnil Patil"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>WhatsApp / Phone *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Number of Passengers</span>
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {Array.from({ length: currentVehicle.seats }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} Passenger{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Luggage className="w-3.5 h-3.5 text-amber-400" />
                  <span>Special Note / Flight No.</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flight 6E 214, Child on board"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

            </div>

            {/* Error banner if any */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Live Transparent Pricing Summary Box */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Estimated Transparent Fare</span>
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-white">
                    ₹{estimatedFare.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400">
                    *Approximate Base Fare for {currentVehicle.name}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {fareBreakdown}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                {/* Instant WhatsApp Booking Button */}
                <button
                  type="button"
                  onClick={(e) => handleBookingSubmit(e, true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Book via WhatsApp Now</span>
                </button>

                {/* Standard Online Voucher Confirmation */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Generate Booking Voucher</span>
                </button>
              </div>
            </div>

            {/* Booking Policies / Reassurance */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Zero advance booking fee for local trips
              </span>
              <span>Fastag, State Tax & Parking as per actual government receipts</span>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="text-amber-400 hover:underline font-bold"
              >
                Need Help? Call {FORMATTED_PHONE}
              </a>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
};
