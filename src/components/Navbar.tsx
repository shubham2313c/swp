import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, Menu, X, Car, BookmarkCheck } from 'lucide-react';
import { FORMATTED_PHONE, PHONE_NUMBER, createWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  onOpenMyBookings: () => void;
  bookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMyBookings, bookingCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const quickWhatsAppUrl = createWhatsAppUrl(
    'Hello Swapnil Tours and Travels! I need to inquire about cab booking from Badlapur.'
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Banner with Badlapur location & 24/7 Hotline */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 text-xs font-semibold py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Badlapur East, Thane, Maharashtra
            </span>
            <span className="hidden sm:inline text-amber-900">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              24/7 Cab Service & Airport Transfers
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-1 hover:underline font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              Call: {FORMATTED_PHONE}
            </a>
            <span className="text-amber-900">|</span>
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Instant
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Car className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                <span>SWAPNIL</span>
                <span className="text-amber-400 font-light">TOURS</span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                & Travels · Badlapur East (Thane)
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#booking" className="hover:text-amber-400 transition-colors">
              Book Cab
            </a>
            <a href="#cars" className="hover:text-amber-400 transition-colors">
              Our Cars & Rates
            </a>
            <a href="#calculator" className="hover:text-amber-400 transition-colors">
              Fare Calculator
            </a>
            <a href="#packages" className="hover:text-amber-400 transition-colors">
              Tour Packages
            </a>
            <a href="#routes" className="hover:text-amber-400 transition-colors">
              Popular Routes
            </a>
            <a href="#why-us" className="hover:text-amber-400 transition-colors">
              Why Us
            </a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">
              Contact
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenMyBookings}
              className="relative px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-200 hover:text-white transition-all flex items-center gap-1.5"
              title="View your booked cabs"
            >
              <BookmarkCheck className="w-4 h-4 text-amber-400" />
              <span>My Bookings</span>
              {bookingCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {bookingCount}
                </span>
              )}
            </button>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="px-4 py-2.5 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <a
              href="#booking"
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Book Online</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenMyBookings}
              className="p-2 text-slate-300 hover:text-white"
              title="My Bookings"
            >
              <BookmarkCheck className="w-5 h-5 text-amber-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900 text-amber-400"
            >
              Book Cab Online
            </a>
            <a
              href="#cars"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900 text-slate-200"
            >
              Our Cars & Rates
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900 text-slate-200"
            >
              Fare Calculator
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900 text-slate-200"
            >
              Tour Packages (Shirdi, Ashtavinayak)
            </a>
            <a
              href="#routes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900 text-slate-200"
            >
              Popular Routes
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900 text-slate-200"
            >
              Why Choose Swapnil Tours
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-900 text-slate-200"
            >
              Contact & Badlapur Address
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="w-full py-3 text-center text-sm font-bold rounded-lg bg-slate-800 text-white flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Call Now: {FORMATTED_PHONE}
            </a>
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-center text-sm font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp: 7039350555
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
