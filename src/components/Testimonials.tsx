import React from 'react';
import { Star, Quote, CheckCircle2, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Rohan Deshmukh',
      location: 'Katrap, Badlapur East',
      trip: 'Badlapur to Mumbai International Airport (T2)',
      text: 'I had an early morning 4 AM international flight. Swapnil Tours driver was outside my building at 1:15 AM sharp without me needing to call twice. The Dzire was sparkling clean and the ride was completely stress-free. Saved their number in speed dial!',
      rating: 5,
      date: 'Recent Trip'
    },
    {
      name: 'Pooja & Sachin Kulkarni',
      location: 'Shirgaon, Badlapur East',
      trip: 'Ashtavinayak Darshan 3-Days (Innova Crysta)',
      text: 'Booked an Innova Crysta for our parents for the complete 8 Ganpati yatra. The chauffeur Nilesh was exceptionally respectful, helped my mother who has knee trouble, and knew all temple aarti timings. Truly outstanding service.',
      rating: 5,
      date: 'Family Pilgrimage'
    },
    {
      name: 'Dr. Amit Varma',
      location: 'Gandhi Chowk, Badlapur East',
      trip: 'Badlapur to Pune Hinjewadi Round-Trip',
      text: 'Fair and completely transparent billing with zero bargaining nonsense. Sent them a WhatsApp message on 7039350555 and had driver details within 5 minutes. Best cab service in Badlapur without any doubt.',
      rating: 5,
      date: 'Business Travel'
    },
    {
      name: 'Sunil Shinde',
      location: 'Ambernath East / Badlapur',
      trip: 'Shirdi & Shani Shingnapur (Ertiga 7-Seater)',
      text: 'Comfortable family road trip. AC was super chilling in the heat, music system kept the kids entertained, and the driver drove very safely on the highway. Highly recommend Swapnil Tours and Travels.',
      rating: 5,
      date: 'Family Road Trip'
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved by Badlapur & Thane Families
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Real feedback from neighbors and travelers who rely on Swapnil Tours and Travels for safe journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-4">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{rev.location}</span>
                </div>
                <div className="text-[10px] text-amber-400/90 font-medium mt-1">
                  {rev.trip}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
