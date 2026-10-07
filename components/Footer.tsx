'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, Shield, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                HRMS <span className="text-amber-400 font-light">LUXURY</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              Premier Hotel Reservation Management System offering bespoke booking experiences, real-time suite discovery, and seamless hospitality management across premier metropolitan and resort destinations in India.
            </p>
            <div className="flex items-center gap-6 pt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-amber-500" /> 100% Guaranteed Booking</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-amber-500" /> Five Star Standard</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/hotels" className="hover:text-amber-400 transition-colors">Browse Hotels</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">About HRMS</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Concierge</Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-amber-400 transition-colors">Current Booking</Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Top Destinations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hotels?city=Mumbai" className="hover:text-amber-400 transition-colors">Mumbai Marine Drive</Link>
              </li>
              <li>
                <Link href="/hotels?city=Goa" className="hover:text-amber-400 transition-colors">Goa Beachfronts</Link>
              </li>
              <li>
                <Link href="/hotels?city=Delhi" className="hover:text-amber-400 transition-colors">New Delhi Lutyens</Link>
              </li>
              <li>
                <Link href="/hotels?city=Bangalore" className="hover:text-amber-400 transition-colors">Bengaluru Garden Suites</Link>
              </li>
              <li>
                <Link href="/hotels?city=Pune" className="hover:text-amber-400 transition-colors">Pune Valley Retreats</Link>
              </li>
            </ul>
          </div>

          {/* Contact Concierge */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Concierge Desk</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Executive HQ, Nariman Point, Mumbai 400021</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 (022) 8000-HRMS</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>reservations@hrms-luxury.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Hotel Reservation Management System (HRMS). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Frontend Architecture Demo</span>
            <span>•</span>
            <span>Next.js App Router & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
