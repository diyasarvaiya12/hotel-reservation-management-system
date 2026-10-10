'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { findRoomTypeAcrossHotels, calculateBookingPrice } from '@/data/mockData';
import { saveBooking } from '@/lib/bookingStorage';
import { useAuth } from '@/context/AuthContext';
import { 
  Building, 
  Users, 
  BedDouble, 
  Maximize2, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles,
  Lock
} from 'lucide-react';

function RoomAvailabilityContent() {
  const params = useParams();
  const router = useRouter();
  const roomTypeId = params?.id as string;
  const { isLoggedIn, user } = useAuth();

  const match = findRoomTypeAcrossHotels(roomTypeId);
  const hotel = match?.hotel;
  const roomType = match?.roomType;

  // Stay parameters state
  const [checkInDate, setCheckInDate] = useState('2026-10-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-18');
  const [guests, setGuests] = useState(2);

  // Available rooms in this roomType
  const initialSelectedRoom = roomType?.rooms.find((r) => r.status === 'AVAILABLE');
  const [selectedRoomId, setSelectedRoomId] = useState<string>(initialSelectedRoom?.id || '');

  // Calculate nights
  const numberOfNights = useMemo(() => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  }, [checkInDate, checkOutDate]);

  // Pricing calculation
  const pricing = useMemo(() => {
    return calculateBookingPrice(roomType?.basePrice || 10000, numberOfNights);
  }, [roomType?.basePrice, numberOfNights]);

  const selectedRoomObj = roomType?.rooms.find((r) => r.id === selectedRoomId);

  const handleReserve = () => {
    if (!hotel || !roomType) return;

    // Save booking state
    saveBooking({
      bookingId: 'HRMS-BK-' + Math.floor(100000 + Math.random() * 900000),
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelCity: hotel.city,
      hotelImage: hotel.images[0],
      roomTypeId: roomType.id,
      roomTypeName: roomType.name,
      roomId: selectedRoomObj?.id || roomType.rooms[0].id,
      roomNumber: selectedRoomObj?.roomNumber || roomType.rooms[0].roomNumber,
      checkInDate,
      checkOutDate,
      guests,
      numberOfNights,
      roomPricePerNight: roomType.basePrice,
      subtotal: pricing.subtotal,
      tax: pricing.tax,
      discount: pricing.discount,
      grandTotal: pricing.grandTotal,
      customer: user ? {
        fullName: user.name,
        email: user.email,
        phone: '+91 98201 12345',
        address: '42 Marine Drive, Nariman Point, Mumbai',
        specialRequests: '',
      } : undefined,
      reservationStatus: 'PENDING',
      paymentStatus: 'PENDING',
    });

    // Check login state as per flow requirements:
    // If NOT logged in -> Navigate to Login / Register page, then return to /booking
    // If logged in -> Directly navigate to /booking
    if (!isLoggedIn) {
      router.push('/login?redirect=/booking');
    } else {
      router.push('/booking');
    }
  };

  if (!hotel || !roomType) {
    return (
      <div className="py-24 px-4 text-center max-w-xl mx-auto text-stone-600">
        <Building className="w-16 h-16 text-[#8C6D46] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Room Type Not Found</h2>
        <p className="text-sm text-stone-500 mb-6">
          The requested suite category does not exist or may have been updated.
        </p>
        <Link
          href="/hotels"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hotels</span>
        </Link>
      </div>
    );
  }

  const hasAvailableRooms = roomType.rooms.some((r) => r.status === 'AVAILABLE');

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10 animate-fadeIn text-stone-900">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href={`/hotels/${hotel.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {hotel.name}</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
            {hotel.city} Destination
          </span>
          <span className="text-xs text-stone-500 font-medium">
            Property: {hotel.name}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          {roomType.name}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
          {roomType.description}
        </p>
      </div>

      {/* Main Grid: Left Details & Right Reservation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Image, Specs & Room Units */}
        <div className="lg:col-span-2 space-y-8">
          {/* Room Image */}
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
            <img
              src={roomType.images[0]}
              alt={roomType.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 text-stone-900 backdrop-blur-md border border-stone-200 shadow-sm">
                ₹{roomType.basePrice.toLocaleString('en-IN')} / night
              </span>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-700 shadow-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#8C6D46] shrink-0" />
              <span>Capacity: {roomType.capacity} Guests</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-[#8C6D46] shrink-0" />
              <span>{roomType.bedType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-[#8C6D46] shrink-0" />
              <span>{roomType.sizeSqFt} sq.ft</span>
            </div>
          </div>

          {/* Room Unit Selection (Specific Room Numbers) */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8C6D46]" />
                Select Specific Room Unit
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Choose an available room unit on this floor. Booked or maintenance rooms cannot be selected.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roomType.rooms.map((room) => {
                const isSelected = selectedRoomId === room.id;
                const isRoomAvailable = room.status === 'AVAILABLE';

                return (
                  <div
                    key={room.id}
                    onClick={() => {
                      if (isRoomAvailable) setSelectedRoomId(room.id);
                    }}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between shadow-sm ${
                      !isRoomAvailable
                        ? 'bg-stone-100 border-stone-200 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-amber-50/80 border-[#8C6D46] cursor-pointer'
                        : 'bg-white border-stone-200 hover:border-stone-300 cursor-pointer'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-stone-900 text-sm">
                          Room #{room.roomNumber}
                        </span>
                        <span className="text-[10px] text-stone-500">
                          (Floor {room.floor})
                        </span>
                      </div>
                      <span className="text-xs block mt-1">
                        {room.status === 'AVAILABLE' && (
                          <span className="text-emerald-700 font-medium">✓ Available for booking</span>
                        )}
                        {room.status === 'BOOKED' && (
                          <span className="text-rose-700 font-medium">✕ Currently Booked</span>
                        )}
                        {room.status === 'MAINTENANCE' && (
                          <span className="text-amber-700 font-medium">⚠ Under Maintenance</span>
                        )}
                        {room.status === 'OUT_OF_SERVICE' && (
                          <span className="text-stone-500 font-medium">Out of Service</span>
                        )}
                      </span>
                    </div>

                    <div>
                      {isRoomAvailable ? (
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                            isSelected
                              ? 'bg-stone-900 border-stone-900 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      ) : (
                        <span className="text-[10px] uppercase font-bold text-stone-400 px-2 py-0.5 rounded bg-stone-200">
                          Disabled
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Room Amenities List */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-3">
              Included In This Suite
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-700">
              {roomType.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-stone-200 shadow-sm">
                  <Check className="w-3.5 h-3.5 text-[#8C6D46] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Reservation Config & Pricing Card */}
        <div className="space-y-6">
          <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm sticky top-28 text-stone-900">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D46] block mb-1">
                Stay Configuration
              </span>
              <h3 className="text-xl font-bold text-stone-900">Book This Room</h3>
            </div>

            {/* Dates & Guests Selector */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Check-In Date
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46] cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  min={checkInDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46] cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46] cursor-pointer"
                >
                  {Array.from({ length: roomType.capacity }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'} (Max {roomType.capacity})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Room Indicator */}
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs flex items-center justify-between">
              <span className="text-stone-500">Selected Unit:</span>
              <span className="font-bold text-stone-900 font-mono">
                {selectedRoomObj ? `Room #${selectedRoomObj.roomNumber} (Floor ${selectedRoomObj.floor})` : 'Select a unit'}
              </span>
            </div>

            {/* Calculation Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-stone-200 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>
                  ₹{roomType.basePrice.toLocaleString('en-IN')} × {numberOfNights} night{numberOfNights > 1 ? 's' : ''}
                </span>
                <span className="font-semibold text-stone-900">₹{pricing.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Hospitality GST (12%)</span>
                <span>+₹{pricing.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Online Booking Discount (5%)</span>
                <span>-₹{pricing.discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-stone-200 font-bold text-sm text-stone-900">
                <span>Total Estimated</span>
                <span className="text-xl font-bold text-stone-900">
                  ₹{pricing.grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action Button: Book Now / Book This Room */}
            <button
              onClick={handleReserve}
              disabled={!hasAvailableRooms || !selectedRoomObj}
              className="w-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {!isLoggedIn ? (
                <>
                  <Lock className="w-4 h-4 text-amber-200" />
                  <span>Book This Room (Sign In First)</span>
                </>
              ) : (
                <>
                  <span>Book This Room</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-stone-500">
              Free cancellation up to 24 hours prior to check-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoomAvailabilityPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-stone-400">
        <div className="w-8 h-8 border-2 border-[#8C6D46] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading room inventory details...</p>
      </div>
    }>
      <RoomAvailabilityContent />
    </Suspense>
  );
}
