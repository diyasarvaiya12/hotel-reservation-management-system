'use client';

import { BookingDetail, Customer, PaymentMethod } from '@/types';
import { HOTELS_DATA, calculateBookingPrice } from '@/data/mockData';

const STORAGE_KEY = 'hrms_current_booking';
const CONFIRMED_BOOKING_KEY = 'hrms_latest_confirmed_booking';

export const DEFAULT_BOOKING: BookingDetail = {
  bookingId: 'HRMS-BK-782194',
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
    fullName: 'Aditya Sharma',
    email: 'aditya.sharma@example.com',
    phone: '+91 98201 12345',
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
    return updated;
  } catch (err) {
    console.error('Failed to save booking', err);
    return { ...DEFAULT_BOOKING, ...booking };
  }
}

export function saveConfirmedBooking(booking: BookingDetail): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONFIRMED_BOOKING_KEY, JSON.stringify(booking));
  } catch (err) {
    console.error('Failed to save confirmed booking', err);
  }
}

export function getConfirmedBooking(): BookingDetail {
  if (typeof window === 'undefined') return DEFAULT_BOOKING;
  try {
    const raw = localStorage.getItem(CONFIRMED_BOOKING_KEY);
    if (!raw) return getStoredBooking();
    return JSON.parse(raw);
  } catch (err) {
    return getStoredBooking();
  }
}
