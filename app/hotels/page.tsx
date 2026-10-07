'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import HotelCard from '@/components/HotelCard';
import { HOTELS_DATA } from '@/data/mockData';
import { Search, RotateCcw, Building } from 'lucide-react';

function HotelsContent() {
  const searchParams = useSearchParams();
  const initialCity = searchParams.get('city') || '';

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [maxPrice, setMaxPrice] = useState<number>(35000);
  const [minRating, setMinRating] = useState<number>(4.0);

  const citiesList = useMemo(() => {
    return Array.from(new Set(HOTELS_DATA.map((h) => h.city)));
  }, []);

  const filteredHotels = useMemo(() => {
    return HOTELS_DATA.filter((hotel) => {
      if (selectedCity && selectedCity !== 'All' && hotel.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(query);
        const matchesDesc = hotel.description.toLowerCase().includes(query);
        const matchesCity = hotel.city.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCity) return false;
      }

      if (hotel.startingPrice > maxPrice) {
        return false;
      }

      if (hotel.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [selectedCity, searchKeyword, maxPrice, minRating]);

  const handleResetFilters = () => {
    setSearchKeyword('');
    setSelectedCity('');
    setMaxPrice(35000);
    setMinRating(4.0);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-stone-900">
      {/* Page Title */}
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D46]">
          Premier Stays Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
          Explore Luxury Hotels & Resorts
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Discover verified accommodations across India's top metropolitan destinations and scenic retreats.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 mb-10 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Keyword Search */}
          <div className="relative">
            <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
              Search by Keyword
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Hotel name, landmark, amenities..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* City Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
              Destination City
            </label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46] cursor-pointer"
              >
                <option value="">All Destinations</option>
                {citiesList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Max Price Range */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold uppercase text-stone-500">
                Max Price / Night
              </label>
              <span className="text-xs font-mono font-bold text-stone-900">
                ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={35000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#8C6D46] cursor-pointer"
            />
          </div>

          {/* Min Rating Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
              Minimum Rating
            </label>
            <div className="flex items-center gap-2">
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46] cursor-pointer"
              >
                <option value={4.0}>★ 4.0 & above</option>
                <option value={4.5}>★ 4.5 & above</option>
                <option value={4.8}>★ 4.8 & above</option>
              </select>

              <button
                onClick={handleResetFilters}
                title="Reset Filters"
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-stone-600">
          Showing <span className="font-bold text-stone-900">{filteredHotels.length}</span> luxury properties
          {selectedCity ? ` in ${selectedCity}` : ''}
        </p>
      </div>

      {/* Hotels Grid or Empty State */}
      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4 bg-white border border-stone-200 rounded-3xl shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-500 flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-2">No matching hotels found</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto mb-6">
            Try adjusting your search criteria, raising your price ceiling, or selecting a different destination city.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-stone-400">
        <div className="w-8 h-8 border-2 border-[#8C6D46] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading properties catalog...</p>
      </div>
    }>
      <HotelsContent />
    </Suspense>
  );
}
