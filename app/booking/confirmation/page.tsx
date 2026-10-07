'use client';

import React, { useState, useEffect } from 'react';
import ConfirmationCard from '@/components/ConfirmationCard';
import { getConfirmedBooking, DEFAULT_BOOKING } from '@/lib/bookingStorage';
import { BookingDetail } from '@/types';

export default function BookingConfirmationPage() {
  const [booking, setBooking] = useState<BookingDetail>(DEFAULT_BOOKING);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = getConfirmedBooking();
    setBooking(data);
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Retrieving confirmed booking voucher...</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full animate-fadeIn">
      <ConfirmationCard booking={booking} />
    </div>
  );
}
