'use client';

import React, { useState, useMemo, Suspense } from 'react';
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
  CalendarCheck,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { isValidEmail } from '@/utils/storage';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';

  const { login, register } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & Touched
  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successText, setSuccessText] = useState('');

  // Real-time validations
  const isEmailFormatValid = useMemo(() => {
    return isValidEmail(email);
  }, [email]);

  const passwordStrength = useMemo(() => {
    if (!password) return { label: '', score: 0, color: '' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { label: 'Weak (min 6 characters)', score: 1, color: 'bg-rose-500' };
    if (score <= 2) return { label: 'Moderate', score: 2, color: 'bg-amber-500' };
    if (score === 3) return { label: 'Good', score: 3, color: 'bg-blue-500' };
    return { label: 'Strong', score: 4, color: 'bg-emerald-500' };
  }, [password]);

  const doPasswordsMatch = useMemo(() => {
    if (!confirmPassword) return false;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setErrorMessage('');
    setIsSuccess(false);
    setEmailTouched(false);
    setConfirmTouched(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    const res = login(cleanEmail, password);
    if (!res.success) {
      setErrorMessage(res.error || 'Invalid email or password.');
      return;
    }

    setIsSuccess(true);
    setSuccessText('Sign in successful! Welcome back.');

    setTimeout(() => {
      router.push(redirectUrl);
    }, 700);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setEmailTouched(true);
    setConfirmTouched(true);

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();

    if (!cleanName || cleanName.length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    if (!cleanEmail) {
      setErrorMessage('Email address is required.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMessage('Please provide a valid email format with a proper domain (e.g. user@domain.com).');
      return;
    }

    if (cleanPhone && cleanPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please recheck your confirm password.');
      return;
    }

    const res = register({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password: password,
    });

    if (!res.success) {
      setErrorMessage(res.error || 'Registration failed.');
      return;
    }

    setIsSuccess(true);
    setSuccessText(`Account created successfully! Welcome, ${cleanName}.`);

    setTimeout(() => {
      router.push(redirectUrl);
    }, 700);
  };

  const handleQuickDemo = (demoEmail: string, demoPass: string) => {
    setErrorMessage('');
    setEmail(demoEmail);
    setPassword(demoPass);
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
          {activeTab === 'login'
            ? 'Access your saved reservations and luxury stays'
            : 'Register with a valid email to manage your luxury hotel bookings'}
        </p>
      </div>

      {/* Redirect Notification Banner if coming from booking flow */}
      {redirectUrl.includes('booking') && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 flex items-start gap-3 shadow-sm animate-fadeIn">
          <CalendarCheck className="w-5 h-5 text-[#8C6D46] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-amber-900 block mb-0.5">
              Sign In to Complete Room Reservation
            </span>
            <p className="text-amber-800 leading-relaxed">
              Your selected room and stay dates have been saved. Sign in or register below to proceed to checkout and reservation confirmation.
            </p>
          </div>
        </div>
      )}

      {/* Main Auth Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Tabs: Sign In vs Sign Up */}
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
            Create Account
          </button>
        </div>

        {/* Global Error message */}
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
              /* ================= SIGN IN FORM ================= */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      Email Address <span className="text-[#8C6D46]">*</span>
                    </span>
                    {email && emailTouched && !isEmailFormatValid && (
                      <span className="text-[11px] text-rose-600 font-normal">Invalid format</span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onBlur={() => setEmailTouched(true)}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="e.g. dia@gmail.com"
                      className={`w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 focus:outline-none focus:bg-white transition-colors ${
                        email && emailTouched && !isEmailFormatValid
                          ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                          : email && isEmailFormatValid
                          ? 'border-emerald-400 focus:ring-2 focus:ring-emerald-100'
                          : 'border-stone-300 focus:ring-2 focus:ring-[#8C6D46]'
                      }`}
                    />
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    {email && isEmailFormatValid && (
                      <Check className="w-4 h-4 text-emerald-600 absolute right-3 top-3" />
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    Password <span className="text-[#8C6D46]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                    />
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 focus:outline-none cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>

                <p className="text-center text-xs text-stone-500 pt-1">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleTabChange('register')}
                    className="font-semibold text-[#8C6D46] hover:underline cursor-pointer"
                  >
                    Create an account
                  </button>
                </p>
              </form>
            ) : (
              /* ================= SIGN UP / REGISTER FORM ================= */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    Full Name <span className="text-[#8C6D46]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="e.g. Dia Sarvaiya"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                    />
                    <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* Email Address with real-time format validation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      Email Address <span className="text-[#8C6D46]">*</span>
                    </label>
                    {email && (
                      <span className={`text-[11px] font-medium flex items-center gap-1 ${
                        isEmailFormatValid ? 'text-emerald-600' : 'text-stone-400'
                      }`}>
                        {isEmailFormatValid ? '✓ Valid format' : 'Must include @ and domain'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onBlur={() => setEmailTouched(true)}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="e.g. dia@gmail.com"
                      className={`w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 focus:outline-none focus:bg-white transition-colors ${
                        emailTouched && email && !isEmailFormatValid
                          ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                          : email && isEmailFormatValid
                          ? 'border-emerald-400 focus:ring-2 focus:ring-emerald-100'
                          : 'border-stone-300 focus:ring-2 focus:ring-[#8C6D46]'
                      }`}
                    />
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    {email && (
                      isEmailFormatValid ? (
                        <Check className="w-4 h-4 text-emerald-600 absolute right-3 top-3" />
                      ) : emailTouched ? (
                        <X className="w-4 h-4 text-rose-500 absolute right-3 top-3" />
                      ) : null
                    )}
                  </div>
                  {emailTouched && email && !isEmailFormatValid && (
                    <p className="text-[11px] text-rose-600">
                      Please enter a complete email address (e.g. name@domain.com)
                    </p>
                  )}
                </div>

                {/* Phone Number (Optional / Recommended) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      Phone Number <span className="text-stone-400 text-[10px] font-normal">(for SMS reservation updates)</span>
                    </span>
                    {phone && (
                      <span className="text-[10px] text-stone-400">
                        {phone.replace(/\D/g, '').length}/10 digits
                      </span>
                    )}
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

                {/* Password with Strength Indicator */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      Password <span className="text-[#8C6D46]">*</span>
                    </label>
                    {password && (
                      <span className="text-[11px] text-stone-500">
                        Strength: <strong className="text-stone-700">{passwordStrength.label}</strong>
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="At least 6 characters"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                    />
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 focus:outline-none cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Password strength bar */}
                  {password && (
                    <div className="grid grid-cols-4 gap-1.5 pt-1">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-1 rounded-full transition-all ${
                            step <= passwordStrength.score ? passwordStrength.color : 'bg-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      Confirm Password <span className="text-[#8C6D46]">*</span>
                    </label>
                    {confirmPassword && (
                      <span className={`text-[11px] font-medium ${
                        doPasswordsMatch ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {doPasswordsMatch ? '✓ Passwords match' : 'Passwords do not match'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onBlur={() => setConfirmTouched(true)}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Repeat your password"
                      className={`w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-50 border text-sm text-stone-900 focus:outline-none focus:bg-white transition-colors ${
                        confirmTouched && confirmPassword && !doPasswordsMatch
                          ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                          : confirmPassword && doPasswordsMatch
                          ? 'border-emerald-400 focus:ring-2 focus:ring-emerald-100'
                          : 'border-stone-300 focus:ring-2 focus:ring-[#8C6D46]'
                      }`}
                    />
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 focus:outline-none cursor-pointer"
                      title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>

                <p className="text-center text-xs text-stone-500 pt-1">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleTabChange('login')}
                    className="font-semibold text-[#8C6D46] hover:underline cursor-pointer"
                  >
                    Sign in here
                  </button>
                </p>
              </form>
            )}

            {/* Quick Demo Logins for Fast Testing / College Evaluation */}
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
          <span>Encrypted local session • Strict email & data validation</span>
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
