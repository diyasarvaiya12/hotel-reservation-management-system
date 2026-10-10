'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, 
  Lock, 
  Mail, 
  Phone,
  User as UserIcon, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  CalendarCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';

  const { login, register } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successText, setSuccessText] = useState('');

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setErrorMessage('');
    setIsSuccess(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    const res = login(email.trim(), password);
    if (!res.success) {
      setErrorMessage(res.error || 'Invalid email or password.');
      return;
    }

    setIsSuccess(true);
    setSuccessText('Login successful! Welcome back.');

    setTimeout(() => {
      router.push(redirectUrl);
    }, 700);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter a password.');
      return;
    }

    const res = register({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password.trim(),
    });

    if (!res.success) {
      setErrorMessage(res.error || 'Registration failed.');
      return;
    }

    setIsSuccess(true);
    setSuccessText(`Account created! Welcome, ${name.trim()}.`);

    setTimeout(() => {
      router.push(redirectUrl);
    }, 700);
  };

  const handleQuickDemo = (demoEmail: string, demoPass: string) => {
    setErrorMessage('');
    const res = login(demoEmail, demoPass);
    if (res.success) {
      setIsSuccess(true);
      setSuccessText(`Logged in as ${demoEmail.split('@')[0]}!`);
      setTimeout(() => {
        router.push(redirectUrl);
      }, 500);
    } else {
      setErrorMessage(res.error || 'Demo login failed');
    }
  };

  return (
    <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto w-full animate-fadeIn text-stone-900">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#8C6D46] to-[#B08D5B] flex items-center justify-center text-white font-bold shadow-md shadow-stone-300/40 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-stone-900">
            HRMS <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold tracking-wider">LUXURY</span>
          </span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          {activeTab === 'login' ? 'Sign In to Your Account' : 'Create Guest Account'}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          localStorage-based persistent authentication • College project demo
        </p>
      </div>

      {/* Redirect Notification Banner if coming from booking */}
      {redirectUrl.includes('booking') && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 flex items-start gap-3 shadow-sm animate-fadeIn">
          <CalendarCheck className="w-5 h-5 text-[#8C6D46] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-amber-900 block mb-0.5">
              Sign In to Complete Room Reservation
            </span>
            <p className="text-amber-800 leading-relaxed">
              Your selected room and stay dates have been saved. Sign in or register below to proceed to the checkout and reservation confirmation.
            </p>
          </div>
        </div>
      )}

      {/* Main Auth Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Tabs: Login vs Register */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-stone-100 border border-stone-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleTabChange('login')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('register')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-base">
              {successText}
            </h3>
            <p className="text-xs text-emerald-800">
              Redirecting to your destination...
            </p>
            <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mt-2" />
          </div>
        ) : (
          <>
            {activeTab === 'login' ? (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    Email Address <span className="text-[#8C6D46]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. dia@gmail.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                    />
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    Password <span className="text-[#8C6D46]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                    />
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
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
                      placeholder="e.g. Dia Sarvaiya"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                    />
                    <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    Email Address <span className="text-[#8C6D46]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. dia@gmail.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                    />
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  </div>
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

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    Password <span className="text-[#8C6D46]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                    />
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
              </form>
            )}

            {/* Quick Demo Logins for Fast Testing */}
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block text-center">
                Quick Demo Testing Accounts
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('dia@gmail.com', '123456')}
                  className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#8C6D46] border border-amber-200/90 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer truncate"
                  title="Login as Dia Sarvaiya"
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Dia (dia@gmail.com)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('rahul@gmail.com', '123456')}
                  className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer truncate"
                  title="Login as Rahul Sharma"
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Rahul (rahul@gmail.com)</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Security Assurance */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-center gap-2 text-[11px] text-stone-500">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D46]" />
          <span>Stored in browser localStorage • Data isolated per user</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-stone-400">
        <div className="w-8 h-8 border-2 border-[#8C6D46] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading login terminal...</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
