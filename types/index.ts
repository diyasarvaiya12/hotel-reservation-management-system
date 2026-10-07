export type Role = 'CUSTOMER' | 'ADMIN' | 'HOTEL_STAFF';

export type RoomStatus = 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE' | 'OUT_OF_SERVICE';

export type ReservationStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'CANCELLED' 
  | 'CHECKED_IN' 
  | 'CHECKED_OUT' 
  | 'NO_SHOW';

export type PaymentStatus = 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'REFUNDED';

export type PaymentMethod = 
  | 'CREDIT_CARD' 
  | 'DEBIT_CARD' 
  | 'UPI' 
  | 'NET_BANKING' 
  | 'WALLET' 
  | 'CASH';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  specialRequests?: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  roomTypeId: string;
  hotelId: string;
  status: RoomStatus;
  floor: number;
}

export interface RoomType {
  id: string;
  hotelId: string;
  name: string;
  capacity: number;
  bedType: string;
  sizeSqFt: number;
  basePrice: number;
  description: string;
  images: string[];
  amenities: string[];
  rooms: Room[];
}

export interface Hotel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  state: string;
  rating: number;
  reviewsCount: number;
  starCategory: number;
  startingPrice: number;
  images: string[];
  amenities: string[];
  featured: boolean;
  contact: {
    phone: string;
    email: string;
    receptionHours: string;
  };
  roomTypes: RoomType[];
}

export interface BookingDetail {
  bookingId: string;
  hotelId: string;
  hotelName: string;
  hotelCity: string;
  hotelImage: string;
  roomTypeId: string;
  roomTypeName: string;
  roomId?: string;
  roomNumber?: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  numberOfNights: number;
  roomPricePerNight: number;
  subtotal: number;
  tax: number;
  discount: number;
  grandTotal: number;
  customer: Customer;
  reservationStatus: ReservationStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  createdAt: string;
}

export interface Reservation extends BookingDetail {}

export interface Payment {
  transactionId: string;
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt: string;
}
