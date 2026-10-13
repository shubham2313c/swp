import React from 'react';
import { X, BookmarkCheck, MessageSquare, Phone, Car, Calendar, MapPin, ChevronRight, Trash2 } from 'lucide-react';
import { BookingDetails } from '../types/travel';
import { PHONE_NUMBER, createWhatsAppUrl, generateBookingWhatsAppMessage } from '../utils/whatsapp';

interface MyBookingsModalProps {
  bookings: BookingDetails[];
  isOpen: boolean;
  onClose: () => void;
  onSelectBooking: (b: BookingDetails) => void;
  onClearBookings: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  bookings,
  isOpen,
  onClose,
  onSelectBooking,
  onClearBookings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Your Cab Reservations</h3>
              <p className="text-xs text-slate-400">Stored on your device for quick reference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {bookings.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Car className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No active bookings found</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Once you submit a booking using our form, your confirmation voucher and history will appear here.
              </p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 tracking-wider">{b.id}</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    {b.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-white">
                  <span className="font-bold">{b.vehicleName}</span>
                  <span className="text-amber-300 font-extrabold">₹{b.estimatedFare.toLocaleString('en-IN')}</span>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{b.pickupDate} at {b.pickupTime} hrs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate">{b.pickupLocation} → {b.dropLocation}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      onSelectBooking(b);
                      onClose();
                    }}
                    className="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <span>View Voucher Receipt</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={createWhatsAppUrl(
                      generateBookingWhatsAppMessage({
                        bookingId: b.id,
                        customerName: b.customerName,
                        customerPhone: b.customerPhone,
                        tripType: b.tripType,
                        vehicleName: b.vehicleName,
                        pickupLocation: b.pickupLocation,
                        dropLocation: b.dropLocation,
                        pickupDate: b.pickupDate,
                        pickupTime: b.pickupTime,
                        returnDate: b.returnDate,
                        passengers: b.passengers,
                        estimatedFare: b.estimatedFare,
                        specialRequests: b.specialRequests,
                      })
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-emerald-600/30 text-emerald-300 border border-emerald-600/40 text-[11px] font-bold flex items-center gap-1 hover:bg-emerald-600/50"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookings.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={onClearBookings}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 text-[11px]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="text-amber-400 font-bold hover:underline"
            >
              Hotline: {PHONE_NUMBER}
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
