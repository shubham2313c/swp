import React from 'react';
import { 
  X, CheckCircle2, MessageSquare, Phone, Printer, 
  MapPin, Calendar, Clock, Car, Users, User, Share2, Sparkles 
} from 'lucide-react';
import { BookingDetails } from '../types/travel';
import { PHONE_NUMBER, FORMATTED_PHONE, createWhatsAppUrl, generateBookingWhatsAppMessage } from '../utils/whatsapp';

interface BookingVoucherModalProps {
  booking: BookingDetails | null;
  onClose: () => void;
}

export const BookingVoucherModal: React.FC<BookingVoucherModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const whatsAppUrl = createWhatsAppUrl(
    generateBookingWhatsAppMessage({
      bookingId: booking.id,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      tripType: booking.tripType,
      vehicleName: booking.vehicleName,
      pickupLocation: booking.pickupLocation,
      dropLocation: booking.dropLocation,
      pickupDate: booking.pickupDate,
      pickupTime: booking.pickupTime,
      returnDate: booking.returnDate,
      passengers: booking.passengers,
      estimatedFare: booking.estimatedFare,
      specialRequests: booking.specialRequests,
    })
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 p-5 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-black">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-900">
                Official Booking Voucher
              </span>
              <h3 className="text-xl font-black text-slate-950 leading-tight">
                Swapnil Tours and Travels
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950/20 hover:bg-slate-950/40 text-slate-950 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voucher Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-100">
          
          {/* Booking ID and Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Booking Reference ID</span>
              <div className="text-xl font-black text-amber-400 tracking-wider">
                {booking.id}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Booking Status</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Confirmed & Queued
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Passenger Details</span>
              <p className="font-bold text-white text-sm">{booking.customerName}</p>
              <p className="text-slate-300">Phone: +91 {booking.customerPhone}</p>
              <p className="text-slate-400">Total Guests: {booking.passengers} Person(s)</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Vehicle Reserved</span>
              <p className="font-bold text-amber-400 text-sm">{booking.vehicleName}</p>
              <p className="text-slate-300">AC Cab with verified chauffeur</p>
              <p className="text-slate-400">Dispatch Base: Badlapur East</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Pickup Schedule</span>
              <p className="font-bold text-white text-sm">
                {new Date(booking.pickupDate).toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
              <p className="text-slate-300">Time: {booking.pickupTime} hrs</p>
              {booking.returnDate && (
                <p className="text-amber-300">Return Date: {booking.returnDate}</p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Fare Estimate</span>
              <p className="text-2xl font-black text-emerald-400">
                ₹{booking.estimatedFare.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-slate-400">{booking.fareBreakdownText}</p>
            </div>

          </div>

          {/* Locations Route */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Pickup Point</span>
                <p className="text-xs text-white font-semibold">{booking.pickupLocation}</p>
              </div>
            </div>

            <div className="border-l-2 border-dashed border-slate-700 ml-2 pl-4 py-1" />

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Destination</span>
                <p className="text-xs text-white font-semibold">{booking.dropLocation}</p>
              </div>
            </div>

            {booking.specialRequests && (
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                <span className="font-bold text-slate-300">Special Note:</span> {booking.specialRequests}
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send to WhatsApp (7039350555)</span>
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Hotline to Confirm</span>
              </a>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <button
                onClick={handlePrint}
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
              
              <button
                onClick={onClose}
                className="hover:text-amber-400 font-bold underline"
              >
                Done / Back to Website
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
