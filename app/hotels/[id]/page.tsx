'use client';

import React, { useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getHotelById } from '@/data/mockData';
import RoomCard from '@/components/RoomCard';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  Heart,
  Building
} from 'lucide-react';

function HotelDetailContent() {
  const params = useParams();
  const hotelId = params?.id as string;
  const hotel = getHotelById(hotelId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  if (!hotel) {
    return (
      <div className="py-24 px-4 text-center max-w-xl mx-auto text-stone-600">
        <Building className="w-16 h-16 text-[#8C6D46] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Hotel Not Found</h2>
        <p className="text-sm text-stone-500 mb-6">
          The requested hotel listing does not exist or may have been updated.
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

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12 animate-fadeIn text-stone-900">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/hotels"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hotel Listings</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-rose-50 border-rose-300 text-rose-600'
                : 'bg-white border-stone-200 text-stone-500 hover:text-stone-900'
            }`}
            title="Save to Favorites"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hotel Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
              {'★'.repeat(hotel.starCategory)} Star Luxury Property
            </span>
            <span className="text-xs text-stone-500 font-medium">
              {hotel.city}, {hotel.state}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            {hotel.name}
          </h1>
          <p className="text-sm text-stone-600 flex items-center gap-1.5 mt-2">
            <MapPin className="w-4 h-4 text-[#8C6D46] shrink-0" />
            <span>{hotel.address}, {hotel.city}</span>
          </p>
        </div>

        <div className="flex flex-col sm:items-end">
          <div className="flex items-center gap-2 mb-1">
            <div className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold text-sm flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{hotel.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-stone-500">
              ({hotel.reviewsCount} verified guest reviews)
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-stone-500">Starting from</span>
            <div className="text-2xl font-bold text-stone-900">
              ₹{hotel.startingPrice.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-stone-500">/ night</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="space-y-4">
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
          <img
            src={hotel.images[activeImageIndex]}
            alt={hotel.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {hotel.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? 'border-[#8C6D46] ring-2 ring-amber-200'
                  : 'border-stone-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${hotel.name} view ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content Columns: About & Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Description & Amenities */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8C6D46]" />
              About the Property
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {hotel.description}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-stone-900 mb-4">
              Featured Amenities & Privileges
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-800 shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-[#8C6D46]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Concierge & Contact Box */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 self-start shadow-sm">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="text-lg font-bold text-stone-900">Concierge & Front Desk</h3>
            <p className="text-xs text-stone-500 mt-1">Direct guest service contact details</p>
          </div>

          <div className="space-y-4 text-xs text-stone-700">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-stone-900">Front Desk Telephone</span>
                <span>{hotel.contact.phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-stone-900">Reservations Desk</span>
                <span>{hotel.contact.email}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-stone-900">Reception Availability</span>
                <span>{hotel.contact.receptionHours}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 shrink-0 text-[#8C6D46]" />
            <span>Direct booking guarantees priority room allocation and flexible check-in.</span>
          </div>
        </div>
      </div>

      {/* Available Room Types Section */}
      <div id="rooms-section" className="pt-8 border-t border-stone-200 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D46]">
            Accommodations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Available Suites & Rooms
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Choose your preferred category to view live room availability and finalize reservations.
          </p>
        </div>

        <div className="space-y-6">
          {hotel.roomTypes.map((roomType) => (
            <RoomCard
              key={roomType.id}
              roomType={roomType}
              hotelId={hotel.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HotelDetailPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-stone-400">
        <div className="w-8 h-8 border-2 border-[#8C6D46] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading hotel specifications...</p>
      </div>
    }>
      <HotelDetailContent />
    </Suspense>
  );
}
