/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingForm } from './components/BookingForm';
import { FleetSection } from './components/FleetSection';
import { FareCalculator } from './components/FareCalculator';
import { TourPackages } from './components/TourPackages';
import { PopularRoutes } from './components/PopularRoutes';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { MobileQuickBar } from './components/MobileQuickBar';
import { BookingVoucherModal } from './components/BookingVoucherModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { BookingDetails } from './types/travel';

export default function App() {
  const [selectedCarId, setSelectedCarId] = useState<string>('maruti-dzire');
  const [activeVoucher, setActiveVoucher] = useState<BookingDetails | null>(null);
  const [myBookings, setMyBookings] = useState<BookingDetails[]>([]);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);

  // Load saved bookings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('swapnil_tours_bookings');
      if (saved) {
        setMyBookings(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to read bookings from storage', e);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSuccess = (newBooking: BookingDetails) => {
    setActiveVoucher(newBooking);
    setMyBookings(prev => [newBooking, ...prev]);
  };

  const handleSelectCarToBook = (carId: string) => {
    setSelectedCarId(carId);
    scrollToSection('booking');
  };

  const handleApplyCalculation = (carId: string) => {
    setSelectedCarId(carId);
    scrollToSection('booking');
  };

  const handleSelectPackage = (_packageTitle: string) => {
    scrollToSection('booking');
  };

  const handleSelectRoute = (_destination: string) => {
    scrollToSection('booking');
  };

  const handleClearBookings = () => {
    localStorage.removeItem('swapnil_tours_bookings');
    setMyBookings([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header Navbar */}
      <Navbar
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingCount={myBookings.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          onScrollToBooking={() => scrollToSection('booking')}
          onScrollToCars={() => scrollToSection('cars')}
        />

        {/* Featured Booking Form (Best Booking Form) */}
        <BookingForm
          selectedCarId={selectedCarId}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* Fleet & Rates Section */}
        <FleetSection
          onSelectCarToBook={handleSelectCarToBook}
        />

        {/* Interactive Fare Calculator */}
        <FareCalculator
          onApplyCalculation={handleApplyCalculation}
        />

        {/* Popular Tour Packages */}
        <TourPackages
          onSelectPackage={handleSelectPackage}
        />

        {/* Popular Routes from Badlapur */}
        <PopularRoutes
          onSelectRoute={handleSelectRoute}
        />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Customer Testimonials */}
        <Testimonials />

        {/* FAQs */}
        <FAQSection />

        {/* Office Contact, Phone, Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Help Desk */}
      <WhatsAppFloating />

      {/* Mobile Sticky Quick Action Bar (Call / WhatsApp / Book) */}
      <MobileQuickBar
        onBookClick={() => scrollToSection('booking')}
      />

      {/* Booking Voucher Receipt Modal */}
      <BookingVoucherModal
        booking={activeVoucher}
        onClose={() => setActiveVoucher(null)}
      />

      {/* My Bookings History Modal */}
      <MyBookingsModal
        bookings={myBookings}
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        onSelectBooking={(b) => setActiveVoucher(b)}
        onClearBookings={handleClearBookings}
      />

    </div>
  );
}
