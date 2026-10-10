'use client';

import { BookingDetail, Customer, PaymentMethod } from '@/types';
import { HOTELS_DATA, calculateBookingPrice } from '@/data/mockData';
import { 
  createBooking, 
  getBookingsByUserId, 
  getCurrentUser, 
  getDraftBooking, 
  setDraftBooking,
  clearDraftBooking 
} from '@/utils/storage';

const STORAGE_KEY = 'hrms_current_booking';
const CONFIRMED_BOOKING_KEY = 'hrms_latest_confirmed_booking';

export const DEFAULT_BOOKING: BookingDetail = {
  id: 'BOOK001',
  bookingId: 'BOOK001',
  userId: 'user_dia_001',
  hotelId: HOTELS_DATA[0].id,
  hotelName: HOTELS_DATA[0].name,
  hotelCity: HOTELS_DATA[0].city,
  hotelImage: HOTELS_DATA[0].images[0],
  roomTypeId: HOTELS_DATA[0].roomTypes[0].id,
  roomTypeName: HOTELS_DATA[0].roomTypes[0].name,
  roomId: HOTELS_DATA[0].roomTypes[0].rooms[0].id,
  roomNumber: HOTELS_DATA[0].roomTypes[0].rooms[0].roomNumber,
  checkInDate: '2026-10-15',
  checkOutDate: '2026-10-18',
  guests: 2,
  numberOfNights: 3,
  roomPricePerNight: HOTELS_DATA[0].roomTypes[0].basePrice,
  subtotal: HOTELS_DATA[0].roomTypes[0].basePrice * 3,
  tax: Math.round(HOTELS_DATA[0].roomTypes[0].basePrice * 3 * 0.12),
  discount: Math.round(HOTELS_DATA[0].roomTypes[0].basePrice * 3 * 0.05),
  grandTotal: Math.round(HOTELS_DATA[0].roomTypes[0].basePrice * 3 * 1.07),
  customer: {
    fullName: 'Dia Sarvaiya',
    email: 'dia@gmail.com',
    phone: '9876543210',
    address: '42 Marine Drive, Nariman Point, Mumbai',
    specialRequests: 'High floor room facing ocean requested if available.',
  },
  reservationStatus: 'PENDING',
  paymentStatus: 'PENDING',
  createdAt: '2026-10-15T12:00:00.000Z',
};

export function getStoredBooking(): BookingDetail {
  if (typeof window === 'undefined') return DEFAULT_BOOKING;
  try {
    const draft = getDraftBooking();
    if (draft) return { ...DEFAULT_BOOKING, ...draft };

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BOOKING;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse stored booking', err);
    return DEFAULT_BOOKING;
  }
}

export function saveBooking(booking: Partial<BookingDetail>): BookingDetail {
  if (typeof window === 'undefined') return { ...DEFAULT_BOOKING, ...booking };
  try {
    const current = getStoredBooking();
    const updated = { ...current, ...booking };

    // Recalculate price if nights or basePrice changed
    if (booking.numberOfNights !== undefined || booking.roomPricePerNight !== undefined) {
      const nights = updated.numberOfNights || 1;
      const base = updated.roomPricePerNight || 5000;
      const calc = calculateBookingPrice(base, nights);
      updated.subtotal = calc.subtotal;
      updated.tax = calc.tax;
      updated.discount = calc.discount;
      updated.grandTotal = calc.grandTotal;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setDraftBooking(updated);
    return updated;
  } catch (err) {
    console.error('Failed to save booking', err);
    return { ...DEFAULT_BOOKING, ...booking };
  }
}

/**
 * Saves confirmed booking into hrms_bookings array linked to current user
 */
export function saveConfirmedBooking(booking: BookingDetail): BookingDetail {
  if (typeof window === 'undefined') return booking;
  try {
    const user = getCurrentUser();
    const finalUserId = booking.userId || user?.id || 'guest_user';

    const saved = createBooking({
      ...booking,
      userId: finalUserId,
      reservationStatus: 'CONFIRMED',
      paymentStatus: 'SUCCESSFUL',
    });

    localStorage.setItem(CONFIRMED_BOOKING_KEY, JSON.stringify(saved));
    clearDraftBooking();
    return saved;
  } catch (err) {
    console.error('Failed to save confirmed booking', err);
    return booking;
  }
}

/**
 * Retrieves latest confirmed booking for the current user or fallback
 */
export function getConfirmedBooking(): BookingDetail {
  if (typeof window === 'undefined') return DEFAULT_BOOKING;
  try {
    const user = getCurrentUser();
    if (user) {
      const userBookings = getBookingsByUserId(user.id);
      if (userBookings.length > 0) {
        return userBookings[0]; // Most recent
      }
    }

    const raw = localStorage.getItem(CONFIRMED_BOOKING_KEY);
    if (raw) return JSON.parse(raw);

    return getStoredBooking();
  } catch (err) {
    return getStoredBooking();
  }
}
