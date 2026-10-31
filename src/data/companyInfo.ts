export const COMPANY_INFO = {
  name: "REYFLUX ENTERPRISES LIMITED",
  tagline: "The Flow of Quality Products...",
  taglineAlt: "100% Natural Organic Foodstuffs & POS Financial Services",
  phones: ["09064153934", "07068581710"],
  whatsappPhone: "2349064153934",
  secondaryWhatsappPhone: "2347068581710",
  address: "Second Gate by Yaro College Road, Adjacent Alheri Plaza, Suleja, Niger State",
  landmark: "Adjacent Alheri Plaza, Suleja",
  city: "Suleja",
  state: "Niger State",
  flyerImagePath: "/assets/aistudio/image_6b1c0bf2.png",
  highlights: [
    "100% Natural Organic Palm Oil",
    "Zero Preservatives & Zero Added Colours",
    "Fresh Garri & High-Quality Cassava Flour",
    "Instant POS Cash Withdrawal & Transfer Services",
    "Doorstep Delivery to Any Location Nationwide"
  ],
  deliveryNotes: "We are available for delivery to any location even to your doorstep.",
  workingHours: {
    weekdays: "7:30 AM - 8:30 PM",
    saturday: "8:00 AM - 8:30 PM",
    sunday: "12:00 PM - 6:30 PM"
  }
};

export function createWhatsAppUrl(message: string, phone = COMPANY_INFO.whatsappPhone) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
