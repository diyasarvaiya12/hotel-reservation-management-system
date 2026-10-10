'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Building2, 
  Menu, 
  X, 
  LogIn, 
  UserPlus, 
  User as UserIcon, 
  CalendarCheck, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push('/');
  };

  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';
  const showUser = isMounted && isLoggedIn && !!user;

  return (
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

          {/* Right Action: User Avatar OR Sign In / Register */}
          <div className="hidden md:flex items-center gap-3">
            {showUser ? (
              /* Logged In Circular Avatar & Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-stone-100 transition-all cursor-pointer focus:outline-none"
                  aria-label="User Account Menu"
                >
                  {/* Circular Avatar showing First Letter */}
                  <div className="w-10 h-10 rounded-full bg-[#8C6D46] text-white font-serif font-bold text-base flex items-center justify-center shadow-sm border-2 border-amber-200/80 hover:scale-105 transition-transform">
                    {userInitial}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-stone-200 rounded-2xl shadow-xl p-2.5 text-stone-900 animate-fadeIn z-50">
                    {/* User Info Header */}
                    <div className="px-3 py-2.5 bg-[#FAF8F5] rounded-xl border border-stone-200/80 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#8C6D46] text-white font-serif font-bold text-sm flex items-center justify-center shrink-0">
                          {userInitial}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-stone-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-stone-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Links */}
                    <div className="space-y-0.5 text-xs font-medium text-stone-700">
                      <Link
                        href="/my-bookings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-50 text-stone-800 transition-colors text-left cursor-pointer"
                      >
                        <CalendarCheck className="w-4 h-4 text-[#8C6D46]" />
                        <span>My Bookings</span>
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-50 text-stone-800 transition-colors text-left cursor-pointer"
                      >
                        <UserIcon className="w-4 h-4 text-[#8C6D46]" />
                        <span>Profile</span>
                      </Link>

                      <div className="border-t border-stone-100 my-1.5" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors text-left cursor-pointer font-semibold"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out Buttons */
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 border border-stone-200 transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-[#8C6D46]" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/login?tab=register"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 shadow-sm transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-amber-300" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {showUser && (
              <Link
                href="/profile"
                className="w-9 h-9 rounded-full bg-[#8C6D46] text-white font-serif font-bold text-sm flex items-center justify-center border border-amber-200/80"
              >
                {userInitial}
              </Link>
            )}
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
          {showUser && (
            <div className="p-3 bg-white border border-stone-200 rounded-xl mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-stone-900">{user.name}</p>
                <p className="text-xs text-stone-500">{user.email}</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                Logged In
              </span>
            </div>
          )}

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

          {showUser ? (
            <div className="pt-3 border-t border-stone-200 space-y-1">
              <Link
                href="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 rounded-lg flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4 text-[#8C6D46]" />
                <span>My Bookings</span>
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 rounded-lg flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4 text-[#8C6D46]" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 font-semibold"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-stone-200 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg text-center text-sm font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-50"
              >
                Sign In
              </Link>
              <Link
                href="/login?tab=register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg text-center text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
