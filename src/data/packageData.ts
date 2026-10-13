import { TourPackage } from '../types/travel';

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'ashtavinayak-tour',
    title: 'Complete Ashtavinayak Darshan',
    subtitle: 'Sacred pilgrimage covering all 8 ancient Ganesha temples',
    duration: '2 Nights / 3 Days',
    startingPrice: 12500,
    vehicleIncluded: 'Dzire / Ertiga / Innova options',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    popular: true,
    highlights: [
      'Doorstep pickup from Badlapur East/West & Thane',
      'All 8 Temples: Mayureshwar, Siddhivinayak, Ballaleshwar, Varadvinayak, Chintamani, Girijatmaj, Vighnahar, Mahaganapati',
      'Chauffeur well-versed in temple timings & Aarti schedules',
      'Flexible stops for elderly family members'
    ],
    itinerarySummary: 'Day 1: Badlapur -> Varadvinayak (Mahad) -> Ballaleshwar (Pali) -> Theur -> Night stay. Day 2: Siddhatek -> Morgaon -> Night stay. Day 3: Lenyadri -> Ozar -> Ranjangaon -> Return to Badlapur.',
    recommendedFor: 'Devotional families, Senior citizens, Group yatras'
  },
  {
    id: 'shirdi-shani-package',
    title: 'Shirdi Saibaba & Shani Shingnapur',
    subtitle: 'Blissful divine darshan with seamless highway travel',
    duration: 'Same Day or 1N / 2D',
    startingPrice: 6500,
    vehicleIncluded: 'AC Sedan / Ertiga',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f4439c23?auto=format&fit=crop&w=800&q=80',
    popular: true,
    highlights: [
      'Early morning pickup from Badlapur (via Samruddhi Mahamarg)',
      'VIP Kakad Aarti or Noon Aarti coordination',
      'Visit Shirdi Samadhi Mandir, Dwarkamai, Gurusthan',
      'Excursion to Shani Shingnapur temple before return'
    ],
    itinerarySummary: 'Direct smooth ride via modern highway route, minimal fatigue, clean highway food halts.',
    recommendedFor: 'Devotees, Weekend family road trip'
  },
  {
    id: 'mahabaleshwar-panchgani',
    title: 'Mahabaleshwar & Panchgani Hill Escape',
    subtitle: 'Crisp mountain air, strawberry farms & panoramic viewpoints',
    duration: '2 Nights / 3 Days',
    startingPrice: 8800,
    vehicleIncluded: 'Ertiga / Innova Crysta',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    popular: true,
    highlights: [
      'Arthur Seat, Wilson Point, Elephant’s Head Point',
      'Venna Lake boating & local bazaar visit',
      'Fresh Mapro Garden strawberry & cream experience',
      'Panchgani Table Land & Sydney Point'
    ],
    itinerarySummary: 'Badlapur to Mahabaleshwar scenic mountain ascent, 2 days of customized sightseeing, comfortable return journey.',
    recommendedFor: 'Couples, Summer holidays, Nature lovers'
  },
  {
    id: 'lonavala-khandala-oneday',
    title: 'Lonavala & Khandala Scenic Getaway',
    subtitle: 'Misty hills, waterfalls, chikki tasting & Tiger Point',
    duration: '1 Day Weekend Trip',
    startingPrice: 3600,
    vehicleIncluded: 'Swift Dzire AC',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    popular: false,
    highlights: [
      'Badlapur to Lonavala in just 1.5 - 2 hours',
      'Tiger’s Leap, Lion’s Point, Bhushi Dam visit',
      'Karla Caves & Ekvira Devi Darshan',
      'Famous Maganlal Chikki shopping halt'
    ],
    itinerarySummary: 'Morning 7 AM pickup, full day sightseeing in the Sahyadris, relaxed return by 9 PM to your doorstep.',
    recommendedFor: 'Quick friends weekend, One-day recharge'
  },
  {
    id: 'alibaug-beach-escape',
    title: 'Alibaug, Nagaon & Kashid Coastal Tour',
    subtitle: 'Sun-kissed beaches, fresh Konkani cuisine & sea forts',
    duration: '1 Night / 2 Days',
    startingPrice: 5800,
    vehicleIncluded: 'AC Sedan / MPV',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    popular: false,
    highlights: [
      'Varsoli & Nagaon water sports',
      'Historic Murud-Janjira sea fort ferry boat visit',
      'Scenic coastal coastal drive with sunset stops',
      'Authentic fresh Malvani / Konkani seafood spots'
    ],
    itinerarySummary: 'Badlapur to Alibaug coastal highway, overnight stay near white sand beaches, return with serene memories.',
    recommendedFor: 'Beach bums, Friends & Family holidays'
  },
  {
    id: 'trimbakeshwar-nashik',
    title: 'Nashik & Trimbakeshwar Jyotirlinga',
    subtitle: 'Spiritual Jyotirlinga Abhishek + Sula Vineyards visit',
    duration: '1 Night / 2 Days',
    startingPrice: 6200,
    vehicleIncluded: 'AC Dzire / Ertiga',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    popular: false,
    highlights: [
      'Trimbakeshwar 10th Jyotirlinga Darshan & Kushavarta Tirtha',
      'Panchavati, Kalaram Temple & Sita Gufa',
      'World-famous Sula Vineyards wine tasting tour',
      'Muktidham and Godavari Ghat sunset'
    ],
    itinerarySummary: 'Early morning start via Kasara Ghat, divine darshan, leisurely evening winery visit, next day return.',
    recommendedFor: 'Pilgrimage + Leisure blend'
  }
];
