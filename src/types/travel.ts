export type TripType = 'outstation_round' | 'outstation_oneway' | 'local_rental' | 'airport_transfer' | 'package_tour';

export interface Vehicle {
  id: string;
  name: string;
  tagline: string;
  category: 'sedan' | 'suv' | 'luxury' | 'tempo';
  categoryLabel: string;
  image: string;
  seats: number;
  luggage: number;
  fuelType: string;
  hasAC: boolean;
  features: string[];
  pricing: {
    local8h80k: number;
    extraKmLocal: number;
    extraHourLocal: number;
    outstationPerKm: number;
    minKmOutstation: number;
    driverAllowancePerDay: number;
    airportDropBadlapur: number;
  };
  popularFor: string;
  badge?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  startingPrice: number;
  vehicleIncluded: string;
  image: string;
  popular: boolean;
  highlights: string[];
  itinerarySummary: string;
  recommendedFor: string;
}

export interface PopularRoute {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  approxDuration: string;
  startingPriceDzire: number;
  startingPriceErtiga: number;
  startingPriceInnova: number;
  popularFor: string;
}

export interface BookingDetails {
  id: string;
  bookingDate: string;
  tripType: TripType;
  vehicleId: string;
  vehicleName: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  passengers: number;
  specialRequests?: string;
  estimatedFare: number;
  fareBreakdownText: string;
  status: 'Confirmed' | 'Pending Callback' | 'Completed';
  createdAt: string;
}
