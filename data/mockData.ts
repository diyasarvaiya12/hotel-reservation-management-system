import { Hotel, RoomType, Room, BookingDetail } from '@/types';

export const HOTELS_DATA: Hotel[] = [
  {
    id: 'hotel-mumbai-taj-aurora',
    name: 'The Grand Aurora Palace',
    tagline: 'Iconic Arabian Sea waterfront luxury & timeless heritage',
    description: 'Perched overlooking the iconic Marine Drive in Mumbai, The Grand Aurora Palace offers legendary hospitality, bespoke butler services, world-class fine dining, and serene coastal views that redefine metropolitan luxury.',
    address: 'Apollo Bunder, Colaba, Marine Drive',
    city: 'Mumbai',
    state: 'Maharashtra',
    rating: 4.9,
    reviewsCount: 1420,
    starCategory: 5,
    startingPrice: 14500,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Infinity Pool',
      'High-Speed Wi-Fi',
      'Luxury Spa & Wellness',
      'Fine Dining Restaurant',
      '24/7 Room Service',
      'Valet Parking',
      'Sea View Balconies',
      'Fitness Center & Yoga',
    ],
    featured: true,
    contact: {
      phone: '+91 22 6665 3300',
      email: 'reservations@aurorapalace.com',
      receptionHours: '24 Hours / 7 Days',
    },
    roomTypes: [
      {
        id: 'rt-mumbai-deluxe',
        hotelId: 'hotel-mumbai-taj-aurora',
        name: 'Deluxe Heritage City Room',
        capacity: 2,
        bedType: '1 King Bed or 2 Twin Beds',
        sizeSqFt: 420,
        basePrice: 14500,
        description: 'Spacious room boasting rich teakwood accents, classic Indian aesthetics, high-speed connectivity, and picturesque Mumbai skyline vistas.',
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['King Bed', 'Free Wi-Fi', 'Smart TV', 'Marble Bath', 'Espresso Machine', 'Mini Bar'],
        rooms: [
          { id: 'room-101', roomNumber: '101', roomTypeId: 'rt-mumbai-deluxe', hotelId: 'hotel-mumbai-taj-aurora', status: 'AVAILABLE', floor: 1 },
          { id: 'room-102', roomNumber: '102', roomTypeId: 'rt-mumbai-deluxe', hotelId: 'hotel-mumbai-taj-aurora', status: 'AVAILABLE', floor: 1 },
          { id: 'room-103', roomNumber: '103', roomTypeId: 'rt-mumbai-deluxe', hotelId: 'hotel-mumbai-taj-aurora', status: 'BOOKED', floor: 1 },
          { id: 'room-104', roomNumber: '104', roomTypeId: 'rt-mumbai-deluxe', hotelId: 'hotel-mumbai-taj-aurora', status: 'MAINTENANCE', floor: 1 },
        ],
      },
      {
        id: 'rt-mumbai-ocean-suite',
        hotelId: 'hotel-mumbai-taj-aurora',
        name: 'Royal Ocean Sea-Facing Suite',
        capacity: 3,
        bedType: '1 California King Bed',
        sizeSqFt: 750,
        basePrice: 26000,
        description: 'Breathtaking 180-degree Arabian Sea panorama, private living lounge, walk-in closet, soaking bathtub, and dedicated butler attendance.',
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Arabian Sea View', 'Private Lounge', 'Butler Service', 'Soaking Tub', 'Breakfast Included', 'Cocktail Hour'],
        rooms: [
          { id: 'room-201', roomNumber: '201', roomTypeId: 'rt-mumbai-ocean-suite', hotelId: 'hotel-mumbai-taj-aurora', status: 'AVAILABLE', floor: 2 },
          { id: 'room-202', roomNumber: '202', roomTypeId: 'rt-mumbai-ocean-suite', hotelId: 'hotel-mumbai-taj-aurora', status: 'AVAILABLE', floor: 2 },
          { id: 'room-203', roomNumber: '203', roomTypeId: 'rt-mumbai-ocean-suite', hotelId: 'hotel-mumbai-taj-aurora', status: 'BOOKED', floor: 2 },
        ],
      },
    ],
  },
  {
    id: 'hotel-goa-azure-resort',
    name: 'Azure Palms Beach & Lagoon Resort',
    tagline: 'Private white-sand beach sanctuary nestled in coastal serenity',
    description: 'Immerse in tropical bliss along Candolim Beach. Featuring lush palm groves, swim-up lagoon bars, beachfront seafood pavilions, and wellness yoga pavilions designed for ultimate rejuvenation.',
    address: 'Sinquerim Fort Road, Candolim Beach',
    city: 'Goa',
    state: 'Goa',
    rating: 4.8,
    reviewsCount: 1890,
    starCategory: 5,
    startingPrice: 9800,
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Private Beach Access',
      'Lagoon Pool & Bar',
      'Ayurvedic Spa',
      'Sunset Beach Shack',
      'Water Sports Desk',
      'Free Breakfast Buffet',
      'Bicycle Rentals',
      'Airport Shuttle',
    ],
    featured: true,
    contact: {
      phone: '+91 832 249 8000',
      email: 'goa.escapes@azurepalms.com',
      receptionHours: '24 Hours / 7 Days',
    },
    roomTypes: [
      {
        id: 'rt-goa-garden-cottage',
        hotelId: 'hotel-goa-azure-resort',
        name: 'Tropical Garden Villa Cottage',
        capacity: 2,
        bedType: '1 Queen Bed',
        sizeSqFt: 480,
        basePrice: 9800,
        description: 'Charming Portuguese-inspired villa surrounded by lush flora, private sit-out deck, open-to-sky shower, and hammock.',
        images: [
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Garden Patio', 'Open Sky Shower', 'Complimentary Breakfast', 'Mini Fridge', 'Wi-Fi'],
        rooms: [
          { id: 'room-villa-1', roomNumber: 'V-01', roomTypeId: 'rt-goa-garden-cottage', hotelId: 'hotel-goa-azure-resort', status: 'AVAILABLE', floor: 1 },
          { id: 'room-villa-2', roomNumber: 'V-02', roomTypeId: 'rt-goa-garden-cottage', hotelId: 'hotel-goa-azure-resort', status: 'AVAILABLE', floor: 1 },
          { id: 'room-villa-3', roomNumber: 'V-03', roomTypeId: 'rt-goa-garden-cottage', hotelId: 'hotel-goa-azure-resort', status: 'BOOKED', floor: 1 },
        ],
      },
      {
        id: 'rt-goa-beach-plunge',
        hotelId: 'hotel-goa-azure-resort',
        name: 'Oceanfront Villa with Private Plunge Pool',
        capacity: 4,
        bedType: '2 King Beds',
        sizeSqFt: 920,
        basePrice: 21500,
        description: 'Direct barefoot walk onto the sands, private heated plunge pool, sundeck loungers, and sunset views over the Arabian Sea.',
        images: [
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Private Pool', 'Direct Beach Access', 'Cocktails On Arrival', 'Personal Sun Deck', 'Bathtub'],
        rooms: [
          { id: 'room-plunge-101', roomNumber: 'P-101', roomTypeId: 'rt-goa-beach-plunge', hotelId: 'hotel-goa-azure-resort', status: 'AVAILABLE', floor: 1 },
          { id: 'room-plunge-102', roomNumber: 'P-102', roomTypeId: 'rt-goa-beach-plunge', hotelId: 'hotel-goa-azure-resort', status: 'BOOKED', floor: 1 },
        ],
      },
    ],
  },
  {
    id: 'hotel-delhi-imperial-manor',
    name: 'The Imperial Monarch Lutyens',
    tagline: 'Diplomatic enclave grandeur & colonial regal elegance',
    description: 'Situated in the historic heart of New Delhi near Connaught Place and India Gate. Boasting museum-grade art collections, Italian marble hallways, French patisserie, and presidential suites.',
    address: '1 Janpath Lane, Connaught Place District',
    city: 'Delhi',
    state: 'Delhi NCR',
    rating: 4.9,
    reviewsCount: 1650,
    starCategory: 5,
    startingPrice: 12200,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Heritage Architecture',
      'Art Deco Bar',
      'Heated Outdoor Pool',
      'Executive Boardrooms',
      'Michelin-Curated Dining',
      'Concierge Chauffeur Service',
      'High-Speed Wi-Fi',
      'Full-Service Spa',
    ],
    featured: true,
    contact: {
      phone: '+91 11 4111 6000',
      email: 'stay@imperialmonarch.in',
      receptionHours: '24 Hours / 7 Days',
    },
    roomTypes: [
      {
        id: 'rt-delhi-heritage-room',
        hotelId: 'hotel-delhi-imperial-manor',
        name: 'Heritage Royal Chamber',
        capacity: 2,
        bedType: '1 King Bed',
        sizeSqFt: 510,
        basePrice: 12200,
        description: 'Adorned with high ceilings, archival lithographs, hand-woven carpets, and an Italian marble bathroom with deep tub.',
        images: [
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Marble Bathroom', 'Heritage Balcony', 'High Ceilings', 'Free Wi-Fi', 'Coffee Machine'],
        rooms: [
          { id: 'room-delhi-301', roomNumber: '301', roomTypeId: 'rt-delhi-heritage-room', hotelId: 'hotel-delhi-imperial-manor', status: 'AVAILABLE', floor: 3 },
          { id: 'room-delhi-302', roomNumber: '302', roomTypeId: 'rt-delhi-heritage-room', hotelId: 'hotel-delhi-imperial-manor', status: 'MAINTENANCE', floor: 3 },
        ],
      },
      {
        id: 'rt-delhi-viceroy-suite',
        hotelId: 'hotel-delhi-imperial-manor',
        name: 'Viceroy Presidential Suite',
        capacity: 4,
        bedType: '2 King Beds',
        sizeSqFt: 1100,
        basePrice: 32000,
        description: 'Sumptuous suite with private dining hall for 8 guests, master lounge, dressing boudoir, and personalized butler support.',
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Private Dining Hall', 'Dedicated Butler', 'Executive Lounge Pass', 'Chauffeur Transfer'],
        rooms: [
          { id: 'room-delhi-401', roomNumber: '401', roomTypeId: 'rt-delhi-viceroy-suite', hotelId: 'hotel-delhi-imperial-manor', status: 'AVAILABLE', floor: 4 },
        ],
      },
    ],
  },
  {
    id: 'hotel-bangalore-gardenia-skye',
    name: 'Skye Gardenia Ultra Heights',
    tagline: 'Modern tech-integrated hospitality in the Garden City',
    description: 'Located in the vibrant center of Bengaluru near UB City and Cubbon Park. Features state-of-the-art smart rooms, rooftop infinity pool, micro-brewery, and sustainable green architectural credentials.',
    address: 'Residency Road, Ashok Nagar, UB City Enclave',
    city: 'Bangalore',
    state: 'Karnataka',
    rating: 4.7,
    reviewsCount: 1150,
    starCategory: 5,
    startingPrice: 8900,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Smart Automation Rooms',
      'Rooftop Skyline Pool',
      'Micro-brewery & Lounge',
      'High-Speed Fiber Wi-Fi',
      'EV Charging Stations',
      'Modern Fitness Center',
      'Co-Working Pods',
    ],
    featured: true,
    contact: {
      phone: '+91 80 4911 2000',
      email: 'stay@skyegardenia.com',
      receptionHours: '24 Hours / 7 Days',
    },
    roomTypes: [
      {
        id: 'rt-blr-executive-smart',
        hotelId: 'hotel-bangalore-gardenia-skye',
        name: 'Executive Tech Smart Studio',
        capacity: 2,
        bedType: '1 King Bed',
        sizeSqFt: 440,
        basePrice: 8900,
        description: 'iPad room automation, acoustic noise-insulation, ergonomic work station, and ergonomic Herman Miller seating.',
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Smart Automation', 'Ergonomic Desk', 'High-Speed Wi-Fi', 'Skyline View'],
        rooms: [
          { id: 'room-blr-501', roomNumber: '501', roomTypeId: 'rt-blr-executive-smart', hotelId: 'hotel-bangalore-gardenia-skye', status: 'AVAILABLE', floor: 5 },
          { id: 'room-blr-502', roomNumber: '502', roomTypeId: 'rt-blr-executive-smart', hotelId: 'hotel-bangalore-gardenia-skye', status: 'AVAILABLE', floor: 5 },
        ],
      },
      {
        id: 'rt-blr-panoramic-penthouse',
        hotelId: 'hotel-bangalore-gardenia-skye',
        name: 'Panoramic Sky Penthouse',
        capacity: 3,
        bedType: '1 King Bed + 1 Daybed',
        sizeSqFt: 880,
        basePrice: 18500,
        description: 'Floor-to-ceiling glass windows overlooking Cubbon Park greens, open sky terrace, whirlpool spa bath, and mini cocktail bar.',
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Private Terrace', 'Whirlpool Tub', 'Panoramic City View', 'Complimentary Cocktails'],
        rooms: [
          { id: 'room-blr-1801', roomNumber: '1801', roomTypeId: 'rt-blr-panoramic-penthouse', hotelId: 'hotel-bangalore-gardenia-skye', status: 'AVAILABLE', floor: 18 },
        ],
      },
    ],
  },
  {
    id: 'hotel-pune-sahyadri-haven',
    name: 'The Sahyadri Haven & Country Club',
    tagline: 'Quiet hill-crest tranquility & golf luxury in Pune',
    description: 'Set amidst undulating Sahyadri valley greens in Koregaon Park / Oxford Valley Pune. Enjoy pure mountain air, championship golf, wellness organic dining, and peaceful retreats.',
    address: 'Koregaon Park Annexe, Near Oxford Hills',
    city: 'Pune',
    state: 'Maharashtra',
    rating: 4.7,
    reviewsCount: 890,
    starCategory: 5,
    startingPrice: 7500,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      '9-Hole Golf Greens',
      'Infinity Valley Pool',
      'Organic Farm Dining',
      'Horse Riding Trails',
      'Spa & Detox Pavilion',
      'Tennis & Badminton Courts',
      'Complimentary Wi-Fi',
    ],
    featured: false,
    contact: {
      phone: '+91 20 6711 5500',
      email: 'reception@sahyadrihaven.com',
      receptionHours: '24 Hours / 7 Days',
    },
    roomTypes: [
      {
        id: 'rt-pune-valley-suite',
        hotelId: 'hotel-pune-sahyadri-haven',
        name: 'Valley View Deluxe Room',
        capacity: 2,
        bedType: '1 Queen Bed',
        sizeSqFt: 460,
        basePrice: 7500,
        description: 'Serene forest and valley view balcony, custom wooden furnishings, herbal teas, and rain shower bath.',
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Valley View', 'Private Balcony', 'Herbal Bar', 'Free Wi-Fi', 'Breakfast'],
        rooms: [
          { id: 'room-pune-101', roomNumber: '101', roomTypeId: 'rt-pune-valley-suite', hotelId: 'hotel-pune-sahyadri-haven', status: 'AVAILABLE', floor: 1 },
          { id: 'room-pune-102', roomNumber: '102', roomTypeId: 'rt-pune-valley-suite', hotelId: 'hotel-pune-sahyadri-haven', status: 'OUT_OF_SERVICE', floor: 1 },
        ],
      },
      {
        id: 'rt-pune-golf-chalet',
        hotelId: 'hotel-pune-sahyadri-haven',
        name: 'Fairway Golf Chalet',
        capacity: 4,
        bedType: '2 Queen Beds',
        sizeSqFt: 820,
        basePrice: 14000,
        description: 'Overlooking the greens, standalone chalet privacy, private BBQ lawn, and complimentary buggy privileges.',
        images: [
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Golf Course View', 'Private Lawn', 'Buggy Access', 'Living Area'],
        rooms: [
          { id: 'room-pune-ch-01', roomNumber: 'C-01', roomTypeId: 'rt-pune-golf-chalet', hotelId: 'hotel-pune-sahyadri-haven', status: 'AVAILABLE', floor: 1 },
        ],
      },
    ],
  },
];

export const POPULAR_DESTINATIONS = [
  {
    city: 'Mumbai',
    tagline: 'The City of Dreams & Coastal Splendor',
    hotelsCount: '48+ Luxury Properties',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
  },
  {
    city: 'Goa',
    tagline: 'Sun, Golden Sand & Tropical Resorts',
    hotelsCount: '65+ Beach Retreats',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
  },
  {
    city: 'Delhi',
    tagline: 'Heritage, Regal Palaces & Capital Charm',
    hotelsCount: '52+ Heritage Hotels',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
  },
  {
    city: 'Bangalore',
    tagline: 'Garden Enclaves & High-Tech Luxury',
    hotelsCount: '39+ Smart Hotels',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
  },
  {
    city: 'Pune',
    tagline: 'Mist-Covered Hills & Peaceful Club Stays',
    hotelsCount: '28+ Valley Stays',
    image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=800&q=80',
  },
];

// Helper functions
export function getHotelById(id: string): Hotel | undefined {
  return HOTELS_DATA.find((h) => h.id === id);
}

export function getRoomTypeById(hotelId: string, roomTypeId: string): RoomType | undefined {
  const hotel = getHotelById(hotelId);
  return hotel?.roomTypes.find((rt) => rt.id === roomTypeId);
}

export function findRoomTypeAcrossHotels(roomTypeId: string): { hotel: Hotel; roomType: RoomType } | undefined {
  for (const hotel of HOTELS_DATA) {
    const roomType = hotel.roomTypes.find((rt) => rt.id === roomTypeId);
    if (roomType) {
      return { hotel, roomType };
    }
  }
  return undefined;
}

export function calculateBookingPrice(basePrice: number, nights: number) {
  const safeNights = Math.max(1, nights);
  const subtotal = basePrice * safeNights;
  const tax = Math.round(subtotal * 0.12); // 12% GST / Luxury Hospitality Tax
  const discount = Math.round(subtotal * 0.05); // 5% online direct booking discount
  const grandTotal = subtotal + tax - discount;
  return { subtotal, tax, discount, grandTotal, nights: safeNights };
}
