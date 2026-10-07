'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Menu, 
  X, 
  LogIn, 
  UserPlus, 
  ShieldCheck 
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSuccessMsg(
      authModal === 'login' 
        ? 'Login simulation successful! Welcome back.' 
        : 'Registration simulation successful! Account ready.'
    );
    setTimeout(() => {
      setAuthModal(null);
      setAuthSuccessMsg('');
    }, 1500);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 text-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#8C6D46] to-[#B08D5B] flex items-center justify-center text-white font-bold shadow-md shadow-stone-300/40 group-hover:scale-105 transition-transform duration-200">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-stone-900 flex items-center gap-1.5">
                  HRMS <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 font-semibold tracking-wider">LUXURY</span>
                </span>
                <span className="text-[11px] text-stone-500 font-medium tracking-wider uppercase">
                  Reservation Management
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-[#8C6D46] bg-amber-50/80 border border-amber-200/70 font-semibold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setAuthModal('login')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 border border-stone-200 transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#8C6D46]" />
                <span>Sign In</span>
              </button>

              <button
                onClick={() => setAuthModal('register')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 shadow-sm transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-amber-300" />
                <span>Register</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 shadow-lg">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? 'text-[#8C6D46] bg-amber-50 border border-amber-200 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModal('login');
                }}
                className="w-full py-2.5 rounded-lg text-center text-sm font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-50"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModal('register');
                }}
                className="w-full py-2.5 rounded-lg text-center text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal Simulation */}
      {authModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-stone-900">
            <button
              onClick={() => setAuthModal(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 rounded-xl bg-amber-50 text-[#8C6D46] flex items-center justify-center mb-3 border border-amber-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                {authModal === 'login' ? 'Sign In to HRMS' : 'Create an HRMS Account'}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Frontend authentication preview • No backend required
              </p>
            </div>

            {authSuccessMsg ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm text-center font-medium">
                ✓ {authSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authModal === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Diya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8C6D46] focus:bg-white text-sm"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8C6D46] focus:bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8C6D46] focus:bg-white text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  {authModal === 'login' ? 'Sign In Now' : 'Complete Registration'}
                </button>

                <p className="text-center text-xs text-stone-500 pt-2">
                  {authModal === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthModal('register')}
                        className="text-[#8C6D46] hover:underline font-semibold"
                      >
                        Register here
                      </button>
                    </>
                  ) : (
                    <>
                      Already registered?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthModal('login')}
                        className="text-[#8C6D46] hover:underline font-semibold"
                      >
                        Sign in here
                      </button>
                    </>
                  )}
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
