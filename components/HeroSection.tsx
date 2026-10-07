import React from 'react';
import SearchBar from './SearchBar';
import { Sparkles, ShieldCheck, Clock, Award, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-stone-900 text-white">
      {/* Background Image with Warm Soft Vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/35 to-stone-950/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-stone-800 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md shadow-sm border border-stone-200">
          <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" />
          <span>Curated Five-Star Hospitality</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.15] mb-6 drop-shadow-sm">
          Experience Timeless Luxury,{' '}
          <span className="text-amber-200 font-serif italic font-normal">
            Crafted for Serenity
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-stone-100 max-w-2xl font-light mb-10 leading-relaxed drop-shadow-sm">
          Discover handpicked heritage palaces, pristine beach lagoons, and secluded sanctuaries with verified direct room reservations.
        </p>

        {/* Search Bar Container */}
        <div className="w-full max-w-5xl relative z-10 mb-8">
          <SearchBar />
        </div>

        {/* Highlights / Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs sm:text-sm text-stone-200 drop-shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Guaranteed Direct Reservation</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>4.9 / 5 Guest Satisfaction</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-300" />
            <span>24/7 Dedicated Concierge</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Best Rate Assurance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
