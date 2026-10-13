import React from 'react';
import { Car, Phone, MessageSquare, MapPin, Mail, ShieldCheck, Heart } from 'lucide-react';
import { PHONE_NUMBER, FORMATTED_PHONE, createWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-black text-white tracking-tight">
                  SWAPNIL <span className="text-amber-400 font-light">TOURS</span>
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                  & Travels · Badlapur East (Thane)
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Your trusted partner for 24x7 cab services, Mumbai airport transfers, outstation car rental, and customized Maharashtra tour packages from Badlapur East, Thane. Clean cabs, verified drivers, transparent billing.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Near Station / Katrap Road, Badlapur East, Thane - 421503</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${PHONE_NUMBER}`} className="hover:text-amber-400 font-bold">
                  {FORMATTED_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={createWhatsAppUrl('Hello Swapnil Tours')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 font-bold"
                >
                  WhatsApp: 7039350555
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#booking" className="hover:text-amber-400 transition-colors">Book Cab Online</a></li>
              <li><a href="#cars" className="hover:text-amber-400 transition-colors">Cars Fleet & Pricing</a></li>
              <li><a href="#calculator" className="hover:text-amber-400 transition-colors">Fare Calculator</a></li>
              <li><a href="#packages" className="hover:text-amber-400 transition-colors">Tour Packages</a></li>
              <li><a href="#routes" className="hover:text-amber-400 transition-colors">Popular Routes</a></li>
              <li><a href="#why-us" className="hover:text-amber-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact Office</a></li>
            </ul>
          </div>

          {/* Our Fleet */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Our Fleet</h4>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Maruti Suzuki Dzire AC</span> · 4 Seater</li>
              <li><span className="text-slate-300">Toyota Etios / Aura</span> · 4 Seater</li>
              <li><span className="text-slate-300">Maruti Ertiga Hybrid</span> · 7 Seater</li>
              <li><span className="text-slate-300">Toyota Innova Crysta</span> · Premium 7</li>
              <li><span className="text-slate-300">Toyota Fortuner SUV</span> · VIP 6</li>
              <li><span className="text-slate-300">Tempo Traveller</span> · 13 to 20 Seater</li>
            </ul>
          </div>

          {/* Services & Tours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Key Services</h4>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Mumbai Airport Drop & Pickup (24/7)</span></li>
              <li><span className="text-slate-300">Badlapur to Pune Cab Service</span></li>
              <li><span className="text-slate-300">Ashtavinayak Darshan 3-Day Package</span></li>
              <li><span className="text-slate-300">Shirdi & Shani Shingnapur Tour</span></li>
              <li><span className="text-slate-300">Mahabaleshwar & Lonavala Getaways</span></li>
              <li><span className="text-slate-300">Wedding & Event Luxury Car Rental</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Swapnil Tours and Travels. All rights reserved. Badlapur East, Thane, Maharashtra.
          </div>
          <div className="flex items-center gap-4">
            <span>24x7 Cab Dispatch: <strong className="text-slate-300">7039350555</strong></span>
            <span>·</span>
            <span>Government FASTag Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
