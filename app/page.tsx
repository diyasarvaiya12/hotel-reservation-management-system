import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import HotelCard from '@/components/HotelCard';
import { HOTELS_DATA, POPULAR_DESTINATIONS } from '@/data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard, 
  Headphones, 
  Award, 
  Compass, 
  HeartHandshake 
} from 'lucide-react';

export default function HomePage() {
  const featuredHotels = HOTELS_DATA.slice(0, 3);

  const valueProps = [
    {
      icon: <Award className="w-6 h-6 text-[#8C6D46]" />,
      title: 'Handpicked 5-Star Properties',
      description: 'Every hotel and suite undergoes rigorous quality checks to ensure unforgettable stays and exceptional luxury.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#8C6D46]" />,
      title: 'Guaranteed Room Availability',
      description: 'Live inventory sync eliminates overbooking risks with real-time room lock and instant confirmation vouchers.',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#8C6D46]" />,
      title: 'Flexible Payment Methods',
      description: 'Simulated payment options supporting UPI, Credit Cards, Net Banking, and Pay-at-Hotel with 0% extra fees.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#8C6D46]" />,
      title: '24/7 Dedicated Concierge',
      description: 'Personalized hospitality concierge team ready around the clock for custom itinerary and dining arrangements.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-stone-900">
      {/* Hero Section with Embedded Search Bar */}
      <HeroSection />

      {/* Featured Luxury Hotels Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" /> Curated Collection
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Featured Luxury Stays
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-xl">
              Explore our most sought-after resorts and heritage destinations delivering unforgettable guest experiences.
            </p>
          </div>

          <Link
            href="/hotels"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#8C6D46] hover:text-stone-900 group cursor-pointer"
          >
            <span>View All Properties ({HOTELS_DATA.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} featured />
          ))}
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-20 bg-[#F5F2EB] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#8C6D46]" /> Explore India
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              From tranquil seaside shores in Goa to the bustling colonial boulevards of Mumbai and New Delhi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {POPULAR_DESTINATIONS.map((dest) => (
              <Link
                key={dest.city}
                href={`/hotels?city=${dest.city}`}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-stone-200 transition-all duration-300"
              >
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-semibold text-amber-200 uppercase tracking-wider">
                    {dest.hotelsCount}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-100 transition-colors">
                    {dest.city}
                  </h3>
                  <p className="text-[11px] text-stone-200 line-clamp-1 mt-0.5">
                    {dest.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose HRMS Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-[#8C6D46]" /> Hospitality Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Why Reserve with HRMS
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Engineered to simplify hotel operations while providing guests with an unparalleled booking journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-[#8C6D46]/40 transition-all duration-300 flex flex-col items-start shadow-sm"
            >
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-[#F5F2EB] border border-stone-200 p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Ready to Reserve Your Next Unforgettable Stay?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Browse our premier catalog of luxury suites and enjoy direct guest rates with instant room locking.
            </p>
          </div>
          <Link
            href="/hotels"
            className="px-8 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm transition-all cursor-pointer shrink-0"
          >
            Explore Hotels Now
          </Link>
        </div>
      </section>
    </div>
  );
}
