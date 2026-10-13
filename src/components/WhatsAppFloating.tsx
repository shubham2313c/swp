import React, { useState } from 'react';
import { MessageSquare, X, Phone, CheckCircle2, ChevronRight, Send } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_NUMBER, createWhatsAppUrl } from '../utils/whatsapp';

export const WhatsAppFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const quickChips = [
    'Airport Drop rate from Badlapur',
    'Pune cab fare enquiry',
    'Ashtavinayak Darshan 3-Day package',
    'Need 7-Seater Ertiga / Innova',
  ];

  const handleSendCustom = (textToSend?: string) => {
    const finalMsg = textToSend || userMsg || 'Hello Swapnil Tours, I need assistance with cab booking.';
    window.open(createWhatsAppUrl(finalMsg), '_blank');
    setUserMsg('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Popover Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-700" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Swapnil Tours & Travels</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span>Badlapur East</span> · <span className="text-emerald-200">Online 24/7</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-black/20 text-white transition-colors"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-900/90 space-y-3 text-xs">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-sm text-slate-200 shadow-sm border border-slate-700/60 leading-relaxed">
              Namaste! 🙏 Welcome to <strong>Swapnil Tours and Travels</strong>, Badlapur East.
              <br /><br />
              How can we help your journey today? Pick a quick option below or type your message for instant assistance on <strong>{PHONE_NUMBER}</strong>.
            </div>

            {/* Quick chips */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase font-bold text-slate-400">Quick Inquiries:</p>
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendCustom(chip)}
                  className="w-full text-left p-2 rounded-lg bg-slate-950 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-600/50 text-slate-300 hover:text-white transition-all flex items-center justify-between text-xs group"
                >
                  <span>{chip}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendCustom()}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleSendCustom()}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0"
                aria-label="Send message on WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Call link at bottom */}
          <div className="p-2.5 bg-slate-950 border-t border-slate-800 text-center text-[11px] text-slate-400 flex items-center justify-around">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="text-amber-400 hover:underline font-bold flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              Direct Call: {PHONE_NUMBER}
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button with pulsing ring */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 sm:p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center focus:outline-none"
        aria-label="Chat with Swapnil Tours on WhatsApp"
      >
        {/* Pulsing beacon */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping group-hover:opacity-75 pointer-events-none" />
        
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />

        <span className="sr-only">WhatsApp Chat</span>
        
        {/* Tooltip on hover */}
        {!isOpen && (
          <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 border border-slate-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-lg pointer-events-none">
            Chat on WhatsApp · 7039350555
          </span>
        )}
      </button>
    </div>
  );
};
