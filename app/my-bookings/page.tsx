'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  getBookingsByUserId, 
  cancelBooking, 
  updateBooking 
} from '@/utils/storage';
import { BookingDetail } from '@/types';
import { 
  CalendarCheck, 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  BedDouble, 
  ArrowLeft, 
  Building, 
  Printer, 
  XCircle, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ShieldCheck,
  Tag
} from 'lucide-react';

function MyBookingsContent() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const [bookings, setBookings] = useState<BookingDetail[]>([]);
  const [mounted, setMounted] = useState(false);

  // Modal states for View Details and Modify Booking
  const [viewBooking, setViewBooking] = useState<BookingDetail | null>(null);
  const [modifyingBooking, setModifyingBooking] = useState<BookingDetail | null>(null);

  // Modify form inputs
  const [newCheckIn, setNewCheckIn] = useState('');
  const [newCheckOut, setNewCheckOut] = useState('');
  const [newGuests, setNewGuests] = useState(2);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const loadUserBookings = () => {
    if (user) {
      const data = getBookingsByUserId(user.id);
      setBookings(data);
    } else {
      setBookings([]);
    }
  };

  useEffect(() => {
    loadUserBookings();
    setMounted(true);
  }, [user]);

  const handleCancel = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this reservation? The booking will remain in your history as CANCELLED.')) {
      const updated = cancelBooking(bookingId);
      if (updated) {
        loadUserBookings();
        setActionSuccessMsg(`Booking ${bookingId} has been successfully cancelled.`);
        setTimeout(() => setActionSuccessMsg(''), 3000);
      }
    }
  };

  const handleOpenModify = (b: BookingDetail) => {
    setModifyingBooking(b);
    setNewCheckIn(b.checkInDate);
    setNewCheckOut(b.checkOutDate);
    setNewGuests(b.guests);
  };

  const handleSaveModify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modifyingBooking) return;

    // Calculate nights
    const d1 = new Date(newCheckIn);
    const d2 = new Date(newCheckOut);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    const safeNights = diff > 0 ? diff : 1;

    const updated = updateBooking(modifyingBooking.bookingId, {
      checkInDate: newCheckIn,
      checkOutDate: newCheckOut,
      guests: newGuests,
      numberOfNights: safeNights,
    });

    if (updated) {
      loadUserBookings();
      setModifyingBooking(null);
      setActionSuccessMsg(`Booking ${modifyingBooking.bookingId} modified successfully.`);
      setTimeout(() => setActionSuccessMsg(''), 3000);
    }
  };

  if (!mounted) {
    return (
      <div className="py-20 text-center text-stone-400">
        <div className="w-8 h-8 border-2 border-[#8C6D46] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading your bookings...</p>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="py-20 px-4 max-w-md mx-auto text-center space-y-4 text-stone-900">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#8C6D46] border border-amber-200 flex items-center justify-center mx-auto">
          <CalendarCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900">Sign In to View Reservations</h2>
        <p className="text-xs text-stone-500">
          Your booking history is securely isolated per user account. Please sign in to view your bookings.
        </p>
        <Link
          href="/login?redirect=/my-bookings"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs shadow-sm transition-all"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8 animate-fadeIn text-stone-900">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/hotels"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Hotels Catalog</span>
        </Link>
        <span className="text-xs text-stone-500">
          Logged in as <strong className="text-stone-900">{user.name}</strong> ({user.email})
        </span>
      </div>

      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D46]">
          Guest Account Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
          My Reservations & Booking History
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Showing {bookings.length} persistent reservation{bookings.length === 1 ? '' : 's'} registered to your profile.
        </p>
      </div>

      {/* Notification banner */}
      {actionSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="space-y-5">
          {bookings.map((b) => {
            const isCancelled = b.reservationStatus === 'CANCELLED';

            return (
              <div
                key={b.bookingId}
                className={`bg-white border rounded-3xl p-6 sm:p-8 transition-all shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between ${
                  isCancelled ? 'border-stone-200 opacity-80' : 'border-stone-200/90 hover:border-[#8C6D46]/40 hover:shadow-md'
                }`}
              >
                {/* Left: Hotel & Room Info */}
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <img
                    src={b.hotelImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'}
                    alt={b.hotelName}
                    className="w-full sm:w-36 h-28 object-cover rounded-2xl shrink-0 border border-stone-200"
                  />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-200">
                        Ref: {b.bookingId}
                      </span>
                      {isCancelled ? (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                          CANCELLED
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          CONFIRMED
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-stone-900 leading-tight">
                      {b.hotelName}
                    </h3>

                    <p className="text-xs text-stone-600 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8C6D46]" />
                      <span>{b.hotelCity}</span>
                      <span>•</span>
                      <BedDouble className="w-3.5 h-3.5 text-[#8C6D46]" />
                      <span>{b.roomTypeName}</span>
                      {b.roomNumber && <span className="font-mono text-stone-500 font-semibold">(Room #{b.roomNumber})</span>}
                    </p>

                    <p className="text-xs text-stone-600 flex items-center gap-3 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        {b.checkInDate} → {b.checkOutDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-stone-400" />
                        {b.guests} Guests ({b.numberOfNights} Nights)
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right: Price & Interactive Buttons */}
                <div className="flex flex-col md:items-end justify-between self-stretch md:self-auto border-t md:border-t-0 pt-4 md:pt-0 border-stone-100 gap-4">
                  <div className="md:text-right">
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 block font-medium">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-stone-900">
                      ₹{b.grandTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">
                      Booked on {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* View Details Modal */}
                    <button
                      onClick={() => setViewBooking(b)}
                      className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all border border-stone-200 cursor-pointer"
                    >
                      View Details
                    </button>

                    {/* Modify and Cancel buttons active only if not cancelled */}
                    {!isCancelled && (
                      <>
                        <button
                          onClick={() => handleOpenModify(b)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#8C6D46] text-xs font-semibold transition-all border border-amber-200 cursor-pointer flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Modify</span>
                        </button>

                        <button
                          onClick={() => handleCancel(b.bookingId)}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-all border border-rose-200 cursor-pointer flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          <span>Cancel</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 px-4 bg-white border border-stone-200 rounded-3xl shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <CalendarCheck className="w-8 h-8 text-[#8C6D46]" />
          </div>
          <h3 className="text-xl font-bold text-stone-900">No Reservations Found</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            You do not have any bookings registered to your account yet. Browse our verified luxury properties to make your first reservation.
          </p>
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs shadow-sm transition-all"
          >
            Explore Hotels
          </Link>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {viewBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-stone-900">
            <button
              onClick={() => setViewBooking(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-stone-200 pb-4 mb-5">
              <span className="text-[10px] uppercase font-bold text-[#8C6D46] tracking-wider block mb-0.5">
                Reservation Voucher Details
              </span>
              <h3 className="text-xl font-bold text-stone-900">
                Booking Reference: {viewBooking.bookingId}
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 text-sm block">{viewBooking.hotelName}</span>
                <p className="text-stone-600">{viewBooking.hotelCity} • Suite: {viewBooking.roomTypeName}</p>
                {viewBooking.roomNumber && <p className="font-mono text-stone-700">Room Unit: #{viewBooking.roomNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block mb-0.5">Check-In Date</span>
                  <span className="font-bold text-stone-900">{viewBooking.checkInDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block mb-0.5">Check-Out Date</span>
                  <span className="font-bold text-stone-900">{viewBooking.checkOutDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block mb-0.5">Guests & Duration</span>
                  <span className="font-bold text-stone-900">{viewBooking.guests} Guests • {viewBooking.numberOfNights} Nights</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block mb-0.5">Status</span>
                  <span className={`font-bold ${viewBooking.reservationStatus === 'CANCELLED' ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {viewBooking.reservationStatus}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Room Charges:</span>
                  <span>₹{viewBooking.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>GST Taxes (12%):</span>
                  <span>+₹{viewBooking.tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Direct Discount:</span>
                  <span>-₹{viewBooking.discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-1.5 border-t border-stone-200 text-sm">
                  <span>Total Paid:</span>
                  <span className="text-[#8C6D46]">₹{viewBooking.grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setViewBooking(null);
                    window.print();
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Details</span>
                </button>
                <button
                  onClick={() => setViewBooking(null)}
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODIFY BOOKING MODAL */}
      {modifyingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-stone-900">
            <button
              onClick={() => setModifyingBooking(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-stone-200 pb-4 mb-5">
              <span className="text-[10px] uppercase font-bold text-[#8C6D46] tracking-wider block mb-0.5">
                Modify Reservation
              </span>
              <h3 className="text-xl font-bold text-stone-900">
                Booking: {modifyingBooking.bookingId}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">{modifyingBooking.hotelName}</p>
            </div>

            <form onSubmit={handleSaveModify} className="space-y-4 text-xs">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  New Check-In Date
                </label>
                <input
                  type="date"
                  required
                  value={newCheckIn}
                  onChange={(e) => setNewCheckIn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  New Check-Out Date
                </label>
                <input
                  type="date"
                  required
                  value={newCheckOut}
                  min={newCheckIn}
                  onChange={(e) => setNewCheckOut(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Number of Guests
                </label>
                <select
                  value={newGuests}
                  onChange={(e) => setNewGuests(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={5}>5 Guests</option>
                  <option value={6}>6 Guests</option>
                </select>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModifyingBooking(null)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-stone-400">
        <div className="w-8 h-8 border-2 border-[#8C6D46] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading reservations...</p>
      </div>
    }>
      <MyBookingsContent />
    </Suspense>
  );
}
