import React from 'react';
import Link from 'next/link';
import { RoomType, RoomStatus } from '@/types';
import { Users, BedDouble, Maximize2, ArrowRight, XCircle } from 'lucide-react';

interface RoomCardProps {
  roomType: RoomType;
  hotelId: string;
}

export default function RoomCard({ roomType }: RoomCardProps) {
  const availableRooms = roomType.rooms.filter((r) => r.status === 'AVAILABLE').length;
  const isAvailable = availableRooms > 0;

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Available
          </span>
        );
      case 'BOOKED':
        return (
          <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span> Booked
          </span>
        );
      case 'MAINTENANCE':
      case 'OUT_OF_SERVICE':
        return (
          <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> Maintenance
          </span>
        );
    }
  };

  return (
    <div className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row shadow-sm hover:shadow-md ${
      isAvailable ? 'border-stone-200/90 hover:border-[#8C6D46]/40' : 'border-stone-200 opacity-75'
    }`}>
      {/* Room Photo */}
      <div className="relative md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden bg-stone-100">
        <img
          src={roomType.images[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'}
          alt={roomType.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          {isAvailable ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-emerald-800 border border-emerald-200 shadow-sm">
              {availableRooms} {availableRooms === 1 ? 'Room' : 'Rooms'} Left
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-rose-800 border border-rose-200 shadow-sm">
              Currently Unavailable
            </span>
          )}
        </div>
      </div>

      {/* Room Details */}
      <div className="p-6 md:w-3/5 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="text-xl font-bold text-stone-900 mb-1">
                {roomType.name}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                {roomType.description}
              </p>
            </div>
          </div>

          {/* Room Specs */}
          <div className="grid grid-cols-3 gap-2 my-4 py-3 px-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#8C6D46] shrink-0" />
              <span>Up to {roomType.capacity} Guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-[#8C6D46] shrink-0" />
              <span className="truncate">{roomType.bedType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-[#8C6D46] shrink-0" />
              <span>{roomType.sizeSqFt} sq.ft</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {roomType.amenities.map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-0.5 rounded bg-stone-50 text-stone-700 border border-stone-200"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Room Inventory Status */}
          <div className="pt-2 mb-4">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
              Room Inventory Status:
            </span>
            <div className="flex flex-wrap gap-2">
              {roomType.rooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FAF8F5] border border-stone-200 text-xs"
                >
                  <span className="font-mono text-stone-700 font-medium">Room #{room.roomNumber}</span>
                  {getStatusBadge(room.status)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 block font-medium">
              Price per night
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-stone-900">
                ₹{roomType.basePrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-500">+ taxes</span>
            </div>
          </div>

          {isAvailable ? (
            <Link
              href={`/rooms/${roomType.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm transition-all cursor-pointer"
            >
              <span>Select Room</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 text-stone-400 font-medium text-sm cursor-not-allowed border border-stone-200"
            >
              <XCircle className="w-4 h-4" />
              <span>Unavailable</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
