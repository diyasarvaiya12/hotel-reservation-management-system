'use client';

import React, { useState } from 'react';
import { PaymentMethod, BookingDetail } from '@/types';
import { 
  CreditCard, 
  Smartphone, 
  Landmark, 
  Wallet, 
  Banknote, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  QrCode
} from 'lucide-react';

interface PaymentFormProps {
  booking: BookingDetail;
  onPaymentSuccess: (method: PaymentMethod, txId: string) => void;
}

export default function PaymentForm({ booking, onPaymentSuccess }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('CREDIT_CARD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Credit/Debit card form state
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardHolder, setCardHolder] = useState(booking.customer?.fullName || 'Diya Sarvaiya');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('742');

  // UPI state
  const [upiId, setUpiId] = useState('guest@okhdfcbank');

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Wallet state
  const [selectedWallet, setSelectedWallet] = useState('Paytm');

  const paymentMethodsList: { id: PaymentMethod; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'CREDIT_CARD', label: 'Credit Card', icon: <CreditCard className="w-4 h-4" />, desc: 'Visa, Mastercard, Amex' },
    { id: 'DEBIT_CARD', label: 'Debit Card', icon: <CreditCard className="w-4 h-4" />, desc: 'All Major Banks' },
    { id: 'UPI', label: 'UPI / QR', icon: <Smartphone className="w-4 h-4" />, desc: 'GPay, PhonePe, Paytm' },
    { id: 'NET_BANKING', label: 'Net Banking', icon: <Landmark className="w-4 h-4" />, desc: '50+ Major Banks' },
    { id: 'WALLET', label: 'Wallets', icon: <Wallet className="w-4 h-4" />, desc: 'Amazon Pay, Mobikwik' },
    { id: 'CASH', label: 'Pay at Hotel', icon: <Banknote className="w-4 h-4" />, desc: 'Cash / Card on Check-in' },
  ];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (selectedMethod === 'CREDIT_CARD' || selectedMethod === 'DEBIT_CARD') {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        setErrorMsg('Please complete all card details');
        return;
      }
    } else if (selectedMethod === 'UPI') {
      if (!upiId.trim() || !upiId.includes('@')) {
        setErrorMsg('Please enter a valid UPI Virtual Payment Address (e.g. name@bank)');
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      const generatedTxId = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);
      setIsProcessing(false);
      onPaymentSuccess(selectedMethod, generatedTxId);
    }, 1200);
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm text-stone-900">
      <div>
        <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#8C6D46]" />
          Secure Payment Simulation
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          Simulated checkout environment. No real funds or sensitive details will be charged.
        </p>
      </div>

      {/* Payment Method Selector Grid */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
          Select Payment Method
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {paymentMethodsList.map((m) => {
            const isSelected = selectedMethod === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMethod(m.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50/80 border-[#8C6D46] text-stone-900 shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#8C6D46] text-white' : 'bg-stone-200 text-stone-700'}`}>
                    {m.icon}
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#8C6D46]" />}
                </div>
                <div>
                  <span className="text-xs font-bold block text-stone-900">{m.label}</span>
                  <span className="text-[10px] text-stone-500 truncate block">{m.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Payment Method Form Fields */}
      <form onSubmit={handlePay} className="space-y-6 pt-2 border-t border-stone-200">
        {(selectedMethod === 'CREDIT_CARD' || selectedMethod === 'DEBIT_CARD') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800">
                {selectedMethod === 'CREDIT_CARD' ? 'Credit Card Information' : 'Debit Card Information'}
              </span>
              <span className="text-[11px] text-[#8C6D46] font-mono">256-bit SSL Protected</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">Cardholder Name</label>
              <input
                type="text"
                required
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Name as on Card"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4532 0000 0000 8921"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 font-mono focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                />
                <CreditCard className="w-4 h-4 text-stone-400 absolute right-3.5 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">Expiry (MM/YY)</label>
                <input
                  type="text"
                  required
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 font-mono focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">Security CVV</label>
                <input
                  type="password"
                  required
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  placeholder="•••"
                  maxLength={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 font-mono focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'UPI' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center gap-4">
              <div className="p-3 bg-white border border-stone-200 rounded-lg shrink-0 shadow-sm">
                <QrCode className="w-20 h-20 text-stone-900" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-[#8C6D46] uppercase tracking-wider block">
                  Scan to Pay Simulation
                </span>
                <p className="text-xs text-stone-600">
                  Open any UPI App (Google Pay, PhonePe, Paytm, CRED) or enter your Virtual Payment Address (VPA) below.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">UPI ID / VPA</label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@bank"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 font-mono focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8C6D46]"
              />
            </div>
          </div>
        )}

        {selectedMethod === 'NET_BANKING' && (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-stone-700">Choose your banking partner</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                <button
                  type="button"
                  key={bank}
                  onClick={() => setSelectedBank(bank)}
                  className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                    selectedBank === bank
                      ? 'border-[#8C6D46] bg-amber-50 text-stone-900 font-semibold'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-white'
                  }`}
                >
                  {bank}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 mt-2">
              You will be seamlessly redirected to {selectedBank} mock portal for one-click authorization.
            </p>
          </div>
        )}

        {selectedMethod === 'WALLET' && (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-stone-700">Select Digital Wallet</label>
            <div className="grid grid-cols-3 gap-3">
              {['Paytm Wallet', 'Amazon Pay', 'PhonePe Wallet'].map((w) => (
                <button
                  type="button"
                  key={w}
                  onClick={() => setSelectedWallet(w)}
                  className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    selectedWallet === w
                      ? 'border-[#8C6D46] bg-amber-50 text-stone-900 font-semibold'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-white'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500">
              Mock balance linked with {selectedWallet}: ₹50,000 available.
            </p>
          </div>
        )}

        {selectedMethod === 'CASH' && (
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700">
            <span className="font-bold text-[#8C6D46] block text-sm">Pay at Hotel Reception on Arrival</span>
            <p>
              Your booking reservation will be held guaranteed. You may pay the grand total of ₹{booking.grandTotal.toLocaleString('en-IN')} via Cash, Credit Card, or UPI directly at the front desk when checking in.
            </p>
            <p className="text-stone-500">
              A valid government photo ID matching "{booking.customer?.fullName || 'the primary guest'}" is required at reception.
            </p>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Total and Submit */}
        <div className="pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 block">Total Payable Now</span>
              <span className="text-2xl font-bold text-stone-900">
                ₹{booking.grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Simulated Payment</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-base shadow-md transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authorizing Mock Transaction...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-amber-200" />
                <span>Pay & Confirm Booking (₹{booking.grandTotal.toLocaleString('en-IN')})</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
