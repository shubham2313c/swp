export const PHONE_NUMBER = '7039350555';
export const FORMATTED_PHONE = '+91 7039350555';
export const WHATSAPP_NUMBER = '917039350555';

export function createWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function generateBookingWhatsAppMessage(params: {
  bookingId: string;
  customerName: string;
  customerPhone: string;
  tripType: string;
  vehicleName: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  passengers: number;
  estimatedFare: number;
  specialRequests?: string;
}): string {
  const tripTypeLabels: Record<string, string> = {
    outstation_round: 'Outstation Round Trip',
    outstation_oneway: 'Outstation One Way',
    local_rental: 'Local City Rental (8h/80km)',
    airport_transfer: 'Mumbai Airport Transfer',
    package_tour: 'Special Tour Package',
  };

  const lines = [
    `*NEW CAB BOOKING REQUEST* 🚖`,
    `*Swapnil Tours and Travels, Badlapur East*`,
    `--------------------------------------`,
    `*Booking ID:* ${params.bookingId}`,
    `*Customer:* ${params.customerName}`,
    `*Phone:* ${params.customerPhone}`,
    `*Trip Type:* ${tripTypeLabels[params.tripType] || params.tripType}`,
    `*Car Selected:* ${params.vehicleName}`,
    `*Pickup Location:* ${params.pickupLocation}`,
    `*Drop Location:* ${params.dropLocation}`,
    `*Pickup Date:* ${params.pickupDate}`,
    `*Pickup Time:* ${params.pickupTime}`,
  ];

  if (params.returnDate) {
    lines.push(`*Return Date:* ${params.returnDate}`);
  }

  lines.push(`*Passengers:* ${params.passengers}`);
  lines.push(`*Estimated Fare:* ₹${params.estimatedFare.toLocaleString('en-IN')}`);

  if (params.specialRequests) {
    lines.push(`*Special Request:* ${params.specialRequests}`);
  }

  lines.push(`--------------------------------------`);
  lines.push(`Please confirm cab availability and driver details. Thank you!`);

  return lines.join('\n');
}

export function generateCarInquiryWhatsAppMessage(carName: string): string {
  return [
    `Hello Swapnil Tours and Travels! 🚖`,
    `I am looking to book *${carName}* from Badlapur East.`,
    `Please share availability and current best rates.`,
  ].join('\n');
}

export function generatePackageInquiryWhatsAppMessage(packageTitle: string): string {
  return [
    `Hello Swapnil Tours and Travels! 🙏`,
    `I am interested in booking your *${packageTitle}* package from Badlapur.`,
    `Please share the customized itinerary, vehicle options, and complete pricing.`,
  ].join('\n');
}
