'use client';

import React from 'react';
import Link from 'next/link';
import { BookingDetail } from '@/types';
import { 
  CheckCircle, 
  Printer, 
  Home, 
  MapPin, 
  Building, 
  ShieldCheck, 
  BedDouble
} from 'lucide-react';

interface ConfirmationCardProps {
  booking: BookingDetail;
}

export default function ConfirmationCard({ booking }: ConfirmationCardProps) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn text-stone-900">
      {/* Top Confirmed Banner */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shadow-sm">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div>
          <span className="text-xs font-bold tracking-widest text-[#8C6D46] uppercase">
            Reservation Guaranteed
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            ✓ Booking Confirmed!
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto">
            A confirmation voucher and receipt have been generated. Thank you for choosing HRMS Luxury Hotels.
          </p>
        </div>
      </div>

      {/* Main Reservation Card (Printable) */}
      <div id="printable-voucher" className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-xl text-stone-900">
        {/* Header Bar */}
        <div className="bg-[#FAF8F5] p-6 sm:p-8 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D46] block mb-1">
              Booking Reference Number
            </span>
            <span className="text-2xl font-mono font-bold text-stone-900 tracking-wider">
              {booking.bookingId}
            </span>
          </div>
          <div className="flex flex-col sm:items-end">
            <span className="text-xs text-stone-500">Payment Status</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {booking.paymentStatus === 'SUCCESSFUL' ? 'Paid & Verified' : booking.paymentStatus}
            </span>
          </div>
        </div>

        {/* Hotel & Guest Information */}
        <div className="p-6 sm:p-8 space-y-6 bg-white">
          {/* Hotel snippet */}
          <div className="flex flex-col sm:flex-row gap-5 items-start bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200">
            <img
              src={booking.hotelImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'}
              alt={booking.hotelName}
              className="w-full sm:w-32 h-24 object-cover rounded-xl shrink-0"
            />
            <div className="flex-1">
              <span className="text-xs text-[#8C6D46] font-semibold uppercase tracking-wider">Reserved Property</span>
              <h3 className="text-lg font-bold text-stone-900">{booking.hotelName}</h3>
              <p className="text-xs text-stone-600 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#8C6D46]" />
                {booking.hotelCity}
              </p>
              <div className="mt-2 text-xs font-medium text-stone-700 flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-[#8C6D46]" />
                <span>{booking.roomTypeName}</span>
                {booking.roomNumber && (
                  <span className="font-mono text-stone-900 bg-white border border-stone-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                    Room #{booking.roomNumber}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Grid of stay & guest info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1">
                Guest Name
              </span>
              <span className="font-bold text-stone-900 text-sm block">
                {booking.customer.fullName}
              </span>
              <span className="text-xs text-stone-500 truncate block mt-0.5">
                {booking.customer.email}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1">
                Check-in / Check-out
              </span>
              <span className="font-bold text-stone-900 text-sm block">
                {booking.checkInDate} → {booking.checkOutDate}
              </span>
              <span className="text-xs text-stone-500 block mt-0.5">
                {booking.numberOfNights} Night(s) Stay
              </span>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1">
                Occupancy
              </span>
              <span className="font-bold text-stone-900 text-sm block">
                {booking.guests} Guest(s)
              </span>
              <span className="text-xs text-stone-500 block mt-0.5">
                Standard Room Capacity
              </span>
            </div>
          </div>

          {/* Financial Breakdown Summary */}
          <div className="pt-4 border-t border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Payment Summary
            </h4>
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Room Charges ({booking.numberOfNights} Nights)</span>
                <span className="font-medium text-stone-900">₹{booking.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Hospitality GST & Luxury Taxes (12%)</span>
                <span className="font-medium text-stone-900">+₹{booking.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Direct HRMS Online Discount</span>
                <span className="font-semibold">-₹{booking.discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Amount Paid</span>
                <span className="text-stone-900 font-extrabold text-base">
                  ₹{booking.grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Special Requests if any */}
          {booking.customer.specialRequests && (
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-700">
              <span className="font-semibold text-[#8C6D46] block mb-0.5">Special Requests Registered:</span>
              <p className="italic">"{booking.customer.specialRequests}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-sm transition-all border border-stone-200"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Link
          href="/hotels"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-sm transition-all border border-stone-200"
        >
          <Building className="w-4 h-4" />
          <span>Explore More Hotels</span>
        </Link>

        <Link
          href="/my-bookings"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#8C6D46] font-medium text-sm transition-all border border-amber-200"
        >
          <span>View All My Bookings</span>
        </Link>

        <button
          onClick={handlePrint}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4 text-amber-200" />
          <span>Print Confirmation</span>
        </button>
      </div>
    </div>
  );
}
