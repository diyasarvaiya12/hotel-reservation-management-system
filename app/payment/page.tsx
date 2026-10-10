'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PaymentForm from '@/components/PaymentForm';
import BookingSummary from '@/components/BookingSummary';
import { getStoredBooking, saveConfirmedBooking, DEFAULT_BOOKING } from '@/lib/bookingStorage';
import { BookingDetail, PaymentMethod } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const [booking, setBooking] = useState<BookingDetail>(DEFAULT_BOOKING);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setBooking(getStoredBooking());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push('/login?redirect=/booking');
    }
  }, [mounted, isLoggedIn, router]);

  const handlePaymentSuccess = (method: PaymentMethod) => {
    const finalUserId = user?.id || booking.userId || 'user_dia_001';

    // Save confirmed booking directly to avoid duplicate entries in localStorage
    saveConfirmedBooking({
      ...booking,
      userId: finalUserId,
      paymentMethod: method,
      paymentStatus: 'SUCCESSFUL',
      reservationStatus: 'CONFIRMED',
      customer: {
        fullName: user?.name || booking.customer.fullName,
        email: user?.email || booking.customer.email,
        phone: user?.phone || booking.customer.phone,
        address: booking.customer.address,
        specialRequests: booking.customer.specialRequests,
      },
    });

    router.push('/booking/confirmation');
  };

  if (!mounted) {
    return (
      <div className="py-20 text-center text-stone-400">
        <div className="w-8 h-8 border-2 border-[#8C6D46] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading checkout terminal...</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10 animate-fadeIn text-stone-900">
      {/* Navigation */}
      <div>
        <Link
          href="/booking"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Guest Information</span>
        </Link>
      </div>

      {/* Stepper Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">
          <span className="flex items-center gap-1.5 text-stone-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1. Select Suite
          </span>
          <span className="text-stone-300">/</span>
          <span className="flex items-center gap-1.5 text-stone-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 2. Guest Information
          </span>
          <span className="text-stone-300">/</span>
          <span className="flex items-center gap-1.5 text-[#8C6D46]">
            <span className="w-4 h-4 rounded-full bg-[#8C6D46] text-white flex items-center justify-center text-[10px]">3</span> 3. Payment Simulation
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          Secure Checkout Simulation
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Select your simulated payment gateway to finalize the room lock and save your official booking to localStorage.
        </p>
      </div>

      {/* Main Grid: Payment Form & Booking Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Payment Methods & Input Forms */}
        <div className="lg:col-span-2">
          <PaymentForm
            booking={booking}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>

        {/* Right column: Stay and Price Breakdown */}
        <div className="space-y-6">
          <BookingSummary booking={booking} />
        </div>
      </div>
    </div>
  );
}
