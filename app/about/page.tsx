import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function AboutPage() {
  const stakeholderRoles = [
    {
      title: 'Customers & Guests',
      icon: <Users className="w-6 h-6 text-[#8C6D46]" />,
      desc: 'Seamless discovery, instant room availability search, granular room-tier selection, and simulated frictionless checkout with immediate confirmation vouchers.',
      features: [
        'Explore luxury properties by destination & budget',
        'Direct room unit selection with real-time status',
        'Transparent tax, discount & grand total breakdown',
        'Printable digital reservation vouchers',
      ],
    },
    {
      title: 'Hotel Front Desk & Staff',
      icon: <UserCheck className="w-6 h-6 text-[#8C6D46]" />,
      desc: 'Empowers on-property hotel reception and housekeeping personnel to monitor occupancy, track guest arrivals, and maintain room statuses in real-time.',
      features: [
        'Live room status tracking (Available, Booked, Maintenance)',
        'Guest verification & check-in handling',
        'Floor-wise inventory visibility',
        'Special guest requests registration',
      ],
    },
    {
      title: 'System Administrators',
      icon: <ShieldCheck className="w-6 h-6 text-[#8C6D46]" />,
      desc: 'Centralized oversight over multi-property portfolios, room categorization, seasonal tariff configurations, and financial reporting metrics.',
      features: [
        'Multi-city property portfolio management',
        'Tariff tier & dynamic taxation configuration',
        'Comprehensive reservation lifecycle oversight',
        'Modular architectural foundation ready for API integration',
      ],
    },
  ];

  const coreFeatures = [
    {
      title: 'Next.js App Router Architecture',
      desc: 'Built on the latest React and Next.js foundation ensuring fast transitions, SEO-optimized layouts, and modular component hierarchy.',
    },
    {
      title: 'Real-Time Inventory State Sync',
      desc: 'Tracks discrete room units per category, distinguishing active available rooms from units under maintenance or occupied status.',
    },
    {
      title: 'Dynamic Financial Computation',
      desc: 'Calculates base room rates, multi-night multipliers, 12% Hospitality GST, and promotional direct discounts seamlessly on the fly.',
    },
    {
      title: 'Omnichannel Payment Simulation',
      desc: 'Realistic interactive simulation for Credit Cards, Debit Cards, UPI QR, Net Banking portals, Wallets, and Hotel Reception Pay.',
    },
    {
      title: 'Client-Side Session Persistence',
      desc: 'Preserves selected property, dates, guest counts, and customer credentials across navigations without requiring complex backend servers.',
    },
    {
      title: 'Premium Light Luxury Aesthetic',
      desc: 'Tailored warm ivory and stone palette, refined gold accents, natural shadows, accessible typography, and complete mobile responsiveness.',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-20 animate-fadeIn text-stone-900">
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" /> Enterprise Hospitality Platform
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          About the Hotel Reservation Management System
        </h1>
        <p className="text-base text-stone-600 leading-relaxed font-light">
          HRMS is a comprehensive frontend architecture designed to bridge luxury travelers with premier hospitality properties through seamless reservations, live room management, and effortless checkout.
        </p>
      </div>

      {/* Purpose & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D46]">
            System Purpose & Objectives
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Modernizing the Reservation Journey from Search to Suite
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Traditional hotel booking portals often suffer from cumbersome user flows, hidden extra fees, and disconnected room inventories. HRMS was engineered to solve these friction points by delivering transparent, instantaneous, and aesthetically delightful hospitality experiences.
          </p>
          <p className="text-sm text-stone-500 leading-relaxed">
            By structuring modular data models for hotels, room types, specific room units, reservations, and simulated payments, HRMS establishes a production-grade foundation ready to interface seamlessly with modern REST or GraphQL microservices.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
            <span className="text-3xl font-bold text-[#8C6D46] block mb-1">5+</span>
            <span className="text-xs font-bold text-stone-900 block">Metropolitan Hubs</span>
            <span className="text-[11px] text-stone-500">Mumbai, Pune, Goa, Delhi, Bangalore</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
            <span className="text-3xl font-bold text-[#8C6D46] block mb-1">100%</span>
            <span className="text-xs font-bold text-stone-900 block">Frontend Driven</span>
            <span className="text-[11px] text-stone-500">Zero backend dependencies for preview</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
            <span className="text-3xl font-bold text-[#8C6D46] block mb-1">6</span>
            <span className="text-xs font-bold text-stone-900 block">Payment Channels</span>
            <span className="text-[11px] text-stone-500">Cards, UPI, Net Banking, Cash & Wallets</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
            <span className="text-3xl font-bold text-[#8C6D46] block mb-1">4.9★</span>
            <span className="text-xs font-bold text-stone-900 block">Guest Satisfaction</span>
            <span className="text-[11px] text-stone-500">Benchmark five-star hospitality standard</span>
          </div>
        </div>
      </div>

      {/* Stakeholders Section */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D46]">
            Multi-User Ecosystem
          </span>
          <h2 className="text-3xl font-bold text-stone-900 mt-1">
            Tailored Experiences for Every Stakeholder
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            The platform addresses the distinct operational needs of customers, on-ground hotel staff, and central administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stakeholderRoles.map((role, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#8C6D46]/40 transition-all shadow-sm"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5">
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{role.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-6">{role.desc}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-stone-100">
                {role.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-stone-700">
                    <CheckCircle className="w-3.5 h-3.5 text-[#8C6D46] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D46]">
            Platform Capabilities
          </span>
          <h2 className="text-3xl font-bold text-stone-900 mt-1">
            Main Architectural Features
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Engineered with modern frontend best practices, strict TypeScript interfaces, and resilient client-side state models.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-colors shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[#8C6D46] mb-3" />
              <h4 className="text-base font-bold text-stone-900 mb-2">{feat.title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center py-6">
        <Link
          href="/hotels"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm transition-all cursor-pointer"
        >
          <span>Start Exploring Hotels</span>
          <ArrowRight className="w-4 h-4 text-amber-200" />
        </Link>
      </div>
    </div>
  );
}
