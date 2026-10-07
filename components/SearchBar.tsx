'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

interface SearchBarProps {
  initialCity?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  compact?: boolean;
}

export default function SearchBar({
  initialCity = '',
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = 2,
  compact = false,
}: SearchBarProps) {
  const router = useRouter();

  const [city, setCity] = useState(initialCity);
  const [checkIn, setCheckIn] = useState(initialCheckIn || '2026-10-15');
  const [checkOut, setCheckOut] = useState(initialCheckOut || '2026-10-18');
  const [guests, setGuests] = useState(initialGuests);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city && city !== 'All') params.set('city', city);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests.toString());

    router.push(`/hotels?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl shadow-xl shadow-stone-900/10 text-stone-900 ${
        compact ? 'p-3 md:p-4' : 'p-4 md:p-5'
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 items-center">
        {/* Destination */}
        <div className="relative flex flex-col px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 hover:border-[#8C6D46]/60 transition-colors">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D46] flex items-center gap-1.5 mb-1">
            <MapPin className="w-3.5 h-3.5" /> Destination
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent text-stone-900 font-medium text-sm focus:outline-none cursor-pointer"
          >
            <option value="">All Destinations</option>
            <option value="Mumbai">Mumbai, Maharashtra</option>
            <option value="Goa">Goa (Beaches & Resorts)</option>
            <option value="Delhi">New Delhi (Lutyens)</option>
            <option value="Bangalore">Bangalore (Tech Hub)</option>
            <option value="Pune">Pune (Hill Country)</option>
          </select>
        </div>

        {/* Check-In */}
        <div className="relative flex flex-col px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 hover:border-[#8C6D46]/60 transition-colors">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D46] flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5" /> Check-In
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent text-stone-900 font-medium text-sm focus:outline-none cursor-pointer"
          />
        </div>

        {/* Check-Out */}
        <div className="relative flex flex-col px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 hover:border-[#8C6D46]/60 transition-colors">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D46] flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5" /> Check-Out
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent text-stone-900 font-medium text-sm focus:outline-none cursor-pointer"
          />
        </div>

        {/* Guests & Action Button */}
        <div className="flex gap-2">
          <div className="flex-1 relative flex flex-col px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 hover:border-[#8C6D46]/60 transition-colors">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D46] flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5" /> Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-transparent text-stone-900 font-medium text-sm focus:outline-none cursor-pointer"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
              <option value={5}>5 Guests</option>
              <option value={6}>6 Guests</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold flex items-center justify-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer self-stretch"
          >
            <Search className="w-4 h-4 text-amber-200" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
