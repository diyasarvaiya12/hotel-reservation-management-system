import React from 'react';
import { BookingDetail } from '@/types';
import { Calendar, Users, MapPin, ShieldCheck, Tag, Info } from 'lucide-react';

interface BookingSummaryProps {
  booking: BookingDetail;
  hideDetails?: boolean;
}

export default function BookingSummary({ booking, hideDetails = false }: BookingSummaryProps) {
  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm text-stone-900">
      {/* Hotel Snippet Header */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
        <img
          src={booking.hotelImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'}
          alt={booking.hotelName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="text-[11px] font-semibold text-amber-200 uppercase tracking-wider block mb-1">
            Confirmed Property
          </span>
          <h3 className="text-xl font-bold text-white leading-tight">
            {booking.hotelName}
          </h3>
          <p className="text-xs text-stone-200 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{booking.hotelCity}</span>
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-white">
        {/* Stay Details */}
        {!hideDetails && (
          <div className="space-y-3 pb-6 border-b border-stone-200 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 text-xs font-medium">Selected Suite:</span>
              <span className="font-semibold text-stone-900 text-right">{booking.roomTypeName}</span>
            </div>

            {booking.roomNumber && (
              <div className="flex items-center justify-between">
                <span className="text-stone-500 text-xs font-medium">Room Number:</span>
                <span className="font-mono text-stone-900 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded text-xs font-semibold">
                  #{booking.roomNumber}
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#8C6D46]" /> Check-In
                </span>
                <span className="font-bold text-stone-900 text-xs sm:text-sm">{booking.checkInDate}</span>
                <span className="text-[10px] text-stone-500 block mt-0.5">From 2:00 PM</span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#8C6D46]" /> Check-Out
                </span>
                <span className="font-bold text-stone-900 text-xs sm:text-sm">{booking.checkOutDate}</span>
                <span className="text-[10px] text-stone-500 block mt-0.5">Until 11:00 AM</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-stone-600">
              <span className="flex items-center gap-1.5 text-stone-500">
                <Users className="w-3.5 h-3.5 text-[#8C6D46]" /> Occupancy:
              </span>
              <span className="font-medium text-stone-800">{booking.guests} Guest(s) • {booking.numberOfNights} Night(s)</span>
            </div>
          </div>
        )}

        {/* Pricing Breakdown */}
        <div className="space-y-2.5 text-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
            Price Breakdown
          </h4>

          <div className="flex items-center justify-between text-stone-600 text-xs">
            <span>Room Rate ({booking.numberOfNights} night{booking.numberOfNights > 1 ? 's' : ''} × ₹{booking.roomPricePerNight.toLocaleString('en-IN')})</span>
            <span className="font-medium text-stone-900">₹{booking.subtotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex items-center justify-between text-stone-600 text-xs">
            <span className="flex items-center gap-1">
              Taxes & Hospitality GST (12%)
              <Info className="w-3 h-3 text-stone-400" />
            </span>
            <span className="font-medium text-stone-900">+₹{booking.tax.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex items-center justify-between text-emerald-700 text-xs">
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" /> HRMS Direct Booking Discount (5%)
            </span>
            <span className="font-semibold">-₹{booking.discount.toLocaleString('en-IN')}</span>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between">
            <div>
              <span className="text-sm font-bold text-stone-900 block">Grand Total</span>
              <span className="text-[11px] text-stone-500">Includes all taxes & resort fees</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-stone-900">
                ₹{booking.grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#8C6D46]" />
          <span>Instant reservation lock • No cancellation fee within 24h</span>
        </div>
      </div>
    </div>
  );
}
