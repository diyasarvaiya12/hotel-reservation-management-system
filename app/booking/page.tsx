'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GuestForm from '@/components/GuestForm';
import BookingSummary from '@/components/BookingSummary';
import { getStoredBooking, saveBooking, DEFAULT_BOOKING } from '@/lib/bookingStorage';
import { Customer, BookingDetail } from '@/types';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function BookingPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetail>(DEFAULT_BOOKING);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setBooking(getStoredBooking());
    setMounted(true);
  }, []);

  const handleGuestSubmit = (customer: Customer) => {
    setIsSubmitting(true);
    const updated = saveBooking({ customer });
    setBooking(updated);

    setTimeout(() => {
      router.push('/payment');
    }, 400);
  };

  if (!mounted) {
    return (
      <div className="py-20 text-center text-stone-400">
        <div className="w-8 h-8 border-2 border-[#8C6D46] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Preparing reservation details...</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10 animate-fadeIn text-stone-900">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href={`/rooms/${booking.roomTypeId}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Room Selection</span>
        </Link>
      </div>

      {/* Booking Stepper Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">
          <span className="flex items-center gap-1.5 text-stone-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1. Select Suite
          </span>
          <span className="text-stone-300">/</span>
          <span className="flex items-center gap-1.5 text-[#8C6D46]">
            <span className="w-4 h-4 rounded-full bg-[#8C6D46] text-white flex items-center justify-center text-[10px]">2</span> 2. Guest Information
          </span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-400">3. Payment & Confirmation</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          Guest Reservation Details
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Please provide primary guest particulars to verify room allocation and reservation voucher.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Guest Form */}
        <div className="lg:col-span-2">
          <GuestForm
            initialCustomer={booking.customer}
            onSubmit={handleGuestSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Right 1 Col: Booking Summary with Price Breakdown */}
        <div className="space-y-6">
          <BookingSummary booking={booking} />
        </div>
      </div>
    </div>
  );
}
