'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  CalendarCheck, 
  LogOut,
  Save
} from 'lucide-react';

function ProfileContent() {
  const router = useRouter();
  const { user, isLoggedIn, updateUserProfile, logout } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  if (!isLoggedIn || !user) {
    return (
      <div className="py-20 px-4 max-w-md mx-auto text-center space-y-4 text-stone-900">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#8C6D46] border border-amber-200 flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900">Sign In Required</h2>
        <p className="text-xs text-stone-500">
          Please sign in to view and edit your profile credentials.
        </p>
        <Link
          href="/login?redirect=/profile"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs shadow-sm transition-all"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim(),
      phone: phone.trim(),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full space-y-8 animate-fadeIn text-stone-900">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D46]">
          Guest Account Management
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
          Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Manage your personal guest particulars stored locally in your browser.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Avatar Presentation */}
        <div className="flex items-center gap-4 pb-6 border-b border-stone-200">
          <div className="w-16 h-16 rounded-full bg-[#8C6D46] text-white font-serif font-bold text-2xl flex items-center justify-center border-2 border-amber-200 shadow-sm shrink-0">
            {userInitial}
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900">{user.name}</h3>
            <p className="text-xs text-stone-500">{user.email}</p>
            <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
              <Sparkles className="w-3 h-3 text-[#8C6D46]" />
              <span>HRMS Gold Tier Guest</span>
            </div>
          </div>
        </div>

        {isSaved && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">Profile updated successfully! Stored in hrms_users and hrms_current_user.</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              Full Name <span className="text-[#8C6D46]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
              />
              <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              Email Address (Account Identifier)
            </label>
            <div className="relative">
              <input
                type="email"
                disabled
                value={email}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-100 border border-stone-200 text-sm text-stone-500 cursor-not-allowed"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
            <p className="text-[10px] text-stone-400">Email is unique to your login account.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
              />
              <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-200" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>

        {/* Quick Links */}
        <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-3">
          <Link
            href="/my-bookings"
            className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 hover:border-stone-300 text-xs font-semibold text-stone-800 flex items-center justify-center gap-2 transition-all"
          >
            <CalendarCheck className="w-4 h-4 text-[#8C6D46]" />
            <span>My Bookings</span>
          </Link>

          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="p-3 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-xs font-semibold text-rose-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-stone-400">
        <div className="w-8 h-8 border-2 border-[#8C6D46] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading profile settings...</p>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
