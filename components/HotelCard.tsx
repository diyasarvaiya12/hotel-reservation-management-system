import React from 'react';
import Link from 'next/link';
import { Hotel } from '@/types';
import { Star, MapPin, ArrowRight } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
  featured?: boolean;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div className="group bg-white border border-stone-200/90 hover:border-[#8C6D46]/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-stone-200/60 transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/10" />

        {/* Location Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-xs font-semibold text-stone-800 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-[#8C6D46]" />
          <span>{hotel.city}</span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300/80 text-xs font-bold shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{hotel.rating.toFixed(1)}</span>
        </div>

        {/* Star Category & Tagline */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <span className="flex items-center gap-1 text-amber-200 font-medium">
            {'★'.repeat(hotel.starCategory)} Luxury Heritage
          </span>
          <span className="bg-stone-900/70 px-2 py-0.5 rounded text-[11px] backdrop-blur-sm">
            {hotel.reviewsCount}+ reviews
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#8C6D46] transition-colors line-clamp-1 mb-1.5">
            {hotel.name}
          </h3>
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {hotel.description}
          </p>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 rounded-md bg-stone-50 text-stone-700 border border-stone-200 font-medium"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-[11px] px-2 py-1 rounded-md bg-stone-50 text-stone-500">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 block font-medium">
              Starting from
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-stone-900">
                ₹{hotel.startingPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-500">/ night</span>
            </div>
          </div>

          <Link
            href={`/hotels/${hotel.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-900 text-stone-800 hover:text-white font-medium text-xs tracking-wide transition-all border border-stone-200 group/btn cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
