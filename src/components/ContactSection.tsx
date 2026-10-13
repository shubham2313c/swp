import React, { useState } from 'react';
import { 
  MapPin, Phone, MessageSquare, Mail, Clock, Send, 
  CheckCircle2, Sparkles, Navigation 
} from 'lucide-react';
import { PHONE_NUMBER, FORMATTED_PHONE, createWhatsAppUrl } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Send directly via WhatsApp to 7039350555
    const msg = `*Quick Inquiry from Website:*\n*Name:* ${name}\n*Phone:* ${phone}\n*Message:* ${message || 'Please contact me regarding cab booking.'}`;
    window.open(createWhatsAppUrl(msg), '_blank');
    setSentSuccess(true);
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Badlapur East Headquarters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact & Visit Our Office
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Have a question or looking for customized tour package rates? Call us anytime or chat with our booking desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Office Address</h4>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    <strong>Swapnil Tours and Travels</strong><br />
                    Near Badlapur East Railway Station / Katrap Highway Road,<br />
                    Badlapur East, Thane District, Maharashtra — 421503
                  </p>
                  <p className="text-xs text-amber-400 mt-2 font-medium">
                    Serving Badlapur, Ambernath, Ulhasnagar, Kalyan & Thane
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Direct Phone & Bookings</h4>
                  <p className="text-sm text-slate-300 mt-1">
                    Call our 24/7 Hotline anytime:
                  </p>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="inline-block mt-2 text-xl font-black text-amber-400 hover:underline"
                  >
                    {FORMATTED_PHONE}
                  </a>
                  <p className="text-xs text-slate-400 mt-1">Direct support with dispatch owner</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Instant WhatsApp Desk</h4>
                  <p className="text-sm text-slate-300 mt-1">
                    Fastest way to get quotes & booking confirmations:
                  </p>
                  <a
                    href={createWhatsAppUrl('Hello Swapnil Tours, I need assistance with cab booking.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp: 7039350555</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Operating Hours:</span>
              </span>
              <strong className="text-emerald-400">24 Hours / 7 Days a Week</strong>
            </div>

          </div>

          {/* Right Column: Interactive Map & Quick Message */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Embedded Responsive Interactive Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-64 sm:h-72 relative">
              <iframe
                title="Swapnil Tours and Travels Badlapur Location"
                src="https://maps.google.com/maps?q=Badlapur%20East%20Thane%20Maharashtra&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter invert contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 p-2.5 rounded-xl text-xs text-white backdrop-blur-sm shadow-lg">
                <p className="font-bold text-amber-400">Swapnil Tours and Travels</p>
                <p className="text-[11px] text-slate-300">Badlapur East, Thane, Maharashtra</p>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-2">Send an Instant Message to 7039350555</h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill this quick note and we will reply to you on WhatsApp or call you back within minutes.
              </p>

              {sentSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Message initiated via WhatsApp! Our team is on standby to assist you.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Your Travel Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Where do you want to travel from Badlapur? (e.g. Pune cab for 4 people on Friday morning)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry (Forward to WhatsApp 7039350555)</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
