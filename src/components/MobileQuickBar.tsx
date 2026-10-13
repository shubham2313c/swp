import React from 'react';
import { Phone, MessageSquare, Car } from 'lucide-react';
import { PHONE_NUMBER, FORMATTED_PHONE, createWhatsAppUrl } from '../utils/whatsapp';

interface MobileQuickBarProps {
  onBookClick: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onBookClick }) => {
  const whatsAppUrl = createWhatsAppUrl(
    'Hello Swapnil Tours! I need a cab from Badlapur. Please share current rates and availability.'
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 p-2 sm:hidden shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 border border-slate-800 text-white active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[11px] font-bold">Call Now</span>
        </a>

        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 text-white font-bold active:scale-95 transition-transform shadow-md shadow-emerald-600/30"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[11px]">WhatsApp</span>
        </a>

        <button
          onClick={onBookClick}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black active:scale-95 transition-transform shadow-md shadow-amber-500/20"
        >
          <Car className="w-4 h-4 mb-0.5" />
          <span className="text-[11px]">Book Cab</span>
        </button>
      </div>
    </div>
  );
};
