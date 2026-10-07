'use client';

import React, { useState } from 'react';
import { Customer } from '@/types';
import { User, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

interface GuestFormProps {
  initialCustomer?: Partial<Customer>;
  onSubmit: (customer: Customer) => void;
  isSubmitting?: boolean;
}

export default function GuestForm({
  initialCustomer,
  onSubmit,
  isSubmitting = false,
}: GuestFormProps) {
  const [fullName, setFullName] = useState(initialCustomer?.fullName || '');
  const [email, setEmail] = useState(initialCustomer?.email || '');
  const [phone, setPhone] = useState(initialCustomer?.phone || '');
  const [address, setAddress] = useState(initialCustomer?.address || '');
  const [specialRequests, setSpecialRequests] = useState(initialCustomer?.specialRequests || '');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (fullName.trim().length < 3) {
      errs.fullName = 'Name must be at least 3 characters';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a valid 10-digit contact number';
    }

    if (!address.trim()) {
      errs.address = 'Primary residential/billing address is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        specialRequests: specialRequests.trim(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm text-stone-900">
      <div className="border-b border-stone-200 pb-4">
        <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
          <User className="w-5 h-5 text-[#8C6D46]" />
          Primary Guest Information
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          This information will be printed on your reservation voucher and check-in register.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
            Full Name <span className="text-[#8C6D46]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              placeholder="e.g. Diya Sarvaiya"
              className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all ${
                errors.fullName ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:bg-white focus:ring-2 focus:ring-[#8C6D46]'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
            Email Address <span className="text-[#8C6D46]">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="name@example.com"
              className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all ${
                errors.email ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:bg-white focus:ring-2 focus:ring-[#8C6D46]'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        {/* Contact Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
            Phone Number <span className="text-[#8C6D46]">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              placeholder="+91 98765 43210"
              className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all ${
                errors.phone ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:bg-white focus:ring-2 focus:ring-[#8C6D46]'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
            Billing Address <span className="text-[#8C6D46]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errors.address) setErrors({ ...errors, address: '' });
              }}
              placeholder="e.g. 102 Regency Heights, Mumbai"
              className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-all ${
                errors.address ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:bg-white focus:ring-2 focus:ring-[#8C6D46]'
              }`}
            />
          </div>
          {errors.address && (
            <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.address}
            </p>
          )}
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
          Special Requests / Dietary Preferences (Optional)
        </label>
        <textarea
          rows={3}
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="e.g. Late check-in around 8 PM, extra hypoallergenic pillows, airport car pickup."
          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
        />
      </div>

      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-center gap-3 text-xs text-stone-600">
        <ShieldCheck className="w-5 h-5 text-[#8C6D46] shrink-0" />
        <span>
          Your guest records are securely retained and encrypted under HRMS guest privacy standards.
        </span>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Validating Details...' : 'Proceed to Payment'}</span>
          <ArrowRight className="w-5 h-5 text-amber-200" />
        </button>
      </div>
    </form>
  );
}
