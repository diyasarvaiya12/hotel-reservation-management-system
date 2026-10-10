'use client';

import { User, BookingDetail } from '@/types';
import { HOTELS_DATA, calculateBookingPrice } from '@/data/mockData';

export const STORAGE_KEYS = {
  USERS: 'hrms_users',
  CURRENT_USER: 'hrms_current_user',
  BOOKINGS: 'hrms_bookings',
  DRAFT_BOOKING: 'hrms_draft_booking',
} as const;

// Default initial demo users (only used if hrms_users does not exist in localStorage)
const INITIAL_DEMO_USERS: User[] = [
  {
    id: 'user_dia_001',
    name: 'Dia Sarvaiya',
    email: 'dia@gmail.com',
    password: '123456',
    phone: '9876543210',
    role: 'CUSTOMER',
    createdAt: '2026-10-01T10:00:00.000Z',
  },
  {
    id: 'user_rahul_002',
    name: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    password: '123456',
    phone: '9820011223',
    role: 'CUSTOMER',
    createdAt: '2026-10-02T11:00:00.000Z',
  },
];

// Default initial demo bookings (only used if hrms_bookings does not exist in localStorage)
const INITIAL_DEMO_BOOKINGS: BookingDetail[] = [
  {
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
      specialRequests: 'High floor ocean-facing room requested.',
    },
    reservationStatus: 'CONFIRMED',
    paymentStatus: 'SUCCESSFUL',
    paymentMethod: 'CREDIT_CARD',
    createdAt: '2026-10-03T14:30:00.000Z',
  },
];

/**
 * Initialize localStorage defaults ONLY if keys do not already exist.
 * Preserves all existing user records, current user, and booking history.
 */
export function initializeStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_DEMO_USERS));
    }

    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_DEMO_BOOKINGS));
    }
  } catch (error) {
    console.error('Failed to initialize localStorage:', error);
  }
}

// ==========================================
// USER STORAGE OPERATIONS
// ==========================================

export function getUsers(): User[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_USERS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_DEMO_USERS));
      return INITIAL_DEMO_USERS;
    }
    return JSON.parse(data) || [];
  } catch (e) {
    console.error('Error reading users from storage:', e);
    return [];
  }
}

export function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users to storage:', e);
  }
}

export function findUserByEmail(email: string): User | undefined {
  const users = getUsers();
  const cleanEmail = email.trim().toLowerCase();
  return users.find((u) => u.email.trim().toLowerCase() === cleanEmail);
}

export function getUserById(userId: string): User | undefined {
  const users = getUsers();
  return users.find((u) => u.id === userId);
}

export function registerUser(userData: {
  name: string;
  email: string;
  password?: string;
  phone?: string;
}): { success: boolean; user?: User; error?: string } {
  const cleanEmail = userData.email.trim().toLowerCase();
  const cleanName = userData.name.trim();

  if (!cleanName) {
    return { success: false, error: 'Full name is required.' };
  }
  if (!cleanEmail) {
    return { success: false, error: 'Email address is required.' };
  }

  const existing = findUserByEmail(cleanEmail);
  if (existing) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const newUser: User = {
    id: 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    name: cleanName,
    email: cleanEmail,
    password: userData.password || '123456',
    phone: userData.phone?.trim() || '',
    role: 'CUSTOMER',
    createdAt: new Date().toISOString(),
  };

  const users = getUsers();
  users.push(newUser);
  saveUsers(users);

  // Automatically set as current user upon registration
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

export function loginUser(
  email: string,
  password?: string
): { success: boolean; user?: User; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  const user = findUserByEmail(cleanEmail);

  if (!user) {
    return { success: false, error: 'Invalid email or password.' };
  }

  // Demo password verification
  if (password && user.password && user.password !== password) {
    return { success: false, error: 'Invalid email or password.' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading current user:', e);
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      // Store clean user profile in hrms_current_user
      const sessionUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role || 'CUSTOMER',
      };
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  } catch (e) {
    console.error('Error setting current user:', e);
  }
}

/**
 * Logout clears only hrms_current_user.
 * CRITICAL: Keeps hrms_users and hrms_bookings completely intact.
 */
export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } catch (e) {
    console.error('Error logging out user:', e);
  }
}

export function updateUser(userId: string, partial: Partial<User>): User | null {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return null;

  users[index] = { ...users[index], ...partial };
  saveUsers(users);

  // Also sync with current user if active
  const current = getCurrentUser();
  if (current && current.id === userId) {
    setCurrentUser(users[index]);
  }

  return users[index];
}

// ==========================================
// BOOKING STORAGE OPERATIONS
// ==========================================

export function getBookings(): BookingDetail[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_BOOKINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_DEMO_BOOKINGS));
      return INITIAL_DEMO_BOOKINGS;
    }
    const parsed: BookingDetail[] = JSON.parse(raw) || [];
    // Deduplicate existing localStorage records by bookingId / id to keep store clean
    const seen = new Set<string>();
    const deduplicated = parsed.filter((b) => {
      const key = b.bookingId || b.id;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (deduplicated.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(deduplicated));
    }
    return deduplicated;
  } catch (e) {
    console.error('Error reading bookings:', e);
    return [];
  }
}

export function saveBookings(bookings: BookingDetail[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.error('Error saving bookings:', e);
  }
}

/**
 * Creates and saves a new booking associated with a specific userId.
 * Updates in-place if a booking with the same ID already exists.
 */
export function createBooking(
  bookingData: Omit<BookingDetail, 'id' | 'bookingId'> & { id?: string; bookingId?: string }
): BookingDetail {
  const allBookings = getBookings();
  const targetId = bookingData.bookingId || bookingData.id;

  // Prevent duplicate keys by updating existing entry if booking ID matches
  if (targetId) {
    const existingIndex = allBookings.findIndex(
      (b) => b.bookingId === targetId || b.id === targetId
    );
    if (existingIndex !== -1) {
      allBookings[existingIndex] = {
        ...allBookings[existingIndex],
        ...bookingData,
        id: targetId,
        bookingId: targetId,
      };
      saveBookings(allBookings);
      return allBookings[existingIndex];
    }
  }

  // Generate unique sequential or random ID like BOOK001, BOOK002...
  const count = allBookings.length + 1;
  const generatedId =
    targetId ||
    `BOOK${String(count).padStart(3, '0')}_${Math.floor(100 + Math.random() * 900)}`;

  const newBooking: BookingDetail = {
    ...bookingData,
    id: generatedId,
    bookingId: generatedId,
    createdAt: new Date().toISOString(),
  };

  allBookings.unshift(newBooking); // Newest booking first
  saveBookings(allBookings);

  return newBooking;
}

/**
 * Strictly filters bookings by userId so users can NEVER see another user's bookings.
 */
export function getBookingsByUserId(userId: string): BookingDetail[] {
  if (!userId) return [];
  const allBookings = getBookings();
  const userBookings = allBookings.filter((b) => b.userId === userId);
  const seen = new Set<string>();
  return userBookings.filter((b) => {
    const key = b.bookingId || b.id;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getBookingById(bookingId: string): BookingDetail | undefined {
  const allBookings = getBookings();
  return allBookings.find((b) => b.bookingId === bookingId || b.id === bookingId);
}

/**
 * Updates an existing booking (e.g. modify dates or guests) without creating duplicates.
 */
export function updateBooking(
  bookingId: string,
  updates: Partial<BookingDetail>
): BookingDetail | null {
  const allBookings = getBookings();
  const index = allBookings.findIndex((b) => b.bookingId === bookingId || b.id === bookingId);
  if (index === -1) return null;

  const current = allBookings[index];
  const updated: BookingDetail = {
    ...current,
    ...updates,
    bookingId: current.bookingId, // preserve original booking ID
    userId: current.userId, // preserve user ownership
  };

  // If nights or room price changed, recalculate
  if (updates.numberOfNights !== undefined || updates.roomPricePerNight !== undefined) {
    const calc = calculateBookingPrice(
      updated.roomPricePerNight,
      updated.numberOfNights
    );
    updated.subtotal = calc.subtotal;
    updated.tax = calc.tax;
    updated.discount = calc.discount;
    updated.grandTotal = calc.grandTotal;
  }

  allBookings[index] = updated;
  saveBookings(allBookings);

  return updated;
}

/**
 * Cancels a booking by updating reservationStatus to CANCELLED.
 * Does NOT delete the booking from localStorage so it remains in history.
 */
export function cancelBooking(bookingId: string): BookingDetail | null {
  return updateBooking(bookingId, { reservationStatus: 'CANCELLED' });
}

// ==========================================
// DRAFT BOOKING STORAGE OPERATIONS
// (Preserves selected room during login flow)
// ==========================================

export function getDraftBooking(): Partial<BookingDetail> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFT_BOOKING);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function setDraftBooking(draft: Partial<BookingDetail>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.DRAFT_BOOKING, JSON.stringify(draft));
  } catch (e) {
    console.error('Error saving draft booking:', e);
  }
}

export function clearDraftBooking(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.DRAFT_BOOKING);
  } catch (e) {
    console.error('Error clearing draft booking:', e);
  }
}
