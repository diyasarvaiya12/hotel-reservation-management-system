'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please complete all fields before sending.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16 animate-fadeIn text-stone-900">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" /> 24/7 Concierge Support
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Connect with Our Luxury Concierge
        </h1>
        <p className="text-base text-stone-600 font-light leading-relaxed">
          Have an inquiry regarding bespoke suite reservations, private beach villas, or corporate bookings? Our dedicated team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Information & Channels */}
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-4">
              Direct Channels
            </h3>

            <div className="space-y-5 text-xs text-stone-700">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#8C6D46] shrink-0 border border-amber-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-sm">Toll-Free Concierge</span>
                  <p className="text-stone-600 mt-0.5">+91 (022) 8000-HRMS</p>
                  <p className="text-stone-400 text-[11px]">Available 24 hours daily</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#8C6D46] shrink-0 border border-amber-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-sm">Email Reservations</span>
                  <p className="text-stone-600 mt-0.5">concierge@hrms-luxury.com</p>
                  <p className="text-stone-400 text-[11px]">Average response under 30 minutes</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#8C6D46] shrink-0 border border-amber-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-sm">Headquarters</span>
                  <p className="text-stone-600 mt-0.5">Executive Tower, 14 Nariman Point, Mumbai 400021</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#8C6D46] shrink-0 border border-amber-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-sm">Front Desk Operations</span>
                  <p className="text-stone-600 mt-0.5">24 Hours / 7 Days a Week / 365 Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <h3 className="text-2xl font-bold text-stone-900 mb-2">Send an Inquiry</h3>
            <p className="text-xs text-stone-500 mb-8">
              Fill in the form below. Frontend inquiry simulation will acknowledge your submission instantly.
            </p>

            {isSent ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-stone-900">Inquiry Received Successfully!</h4>
                  <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
                    Thank you. Our luxury hospitality desk has logged your request. (Frontend simulation confirmation)
                  </p>
                </div>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">
                      Your Full Name <span className="text-[#8C6D46]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Diya Sarvaiya"
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">
                      Email Address <span className="text-[#8C6D46]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Subject / Topic <span className="text-[#8C6D46]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Special Villa inquiry for Anniversary Stay in Goa"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Message <span className="text-[#8C6D46]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Detail your request, dates of interest, party size or special requests..."
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-200" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
