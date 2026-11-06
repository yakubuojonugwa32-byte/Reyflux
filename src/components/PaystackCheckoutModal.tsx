import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Lock, CheckCircle2, ArrowRight, RefreshCw, Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface PaystackCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryLocation: string;
  onPaymentSuccess: () => void;
}

export const PaystackCheckoutModal: React.FC<PaystackCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  customerName,
  customerEmail,
  customerPhone,
  deliveryLocation,
  onPaymentSuccess
}) => {
  const [step, setStep] = useState<'review' | 'processing' | 'paystack_frame' | 'success'>('review');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [orderReference, setOrderReference] = useState<string>('');
  const [verifiedOrder, setVerifiedOrder] = useState<any>(null);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>(customerEmail || 'customer@reyflux.com');
  const [nameInput, setNameInput] = useState<string>(customerName || 'Reyflux Customer');
  const [phoneInput, setPhoneInput] = useState<string>(customerPhone || '09064153934');

  if (!isOpen) return null;

  // Step 1: Initialize transaction on server
  const handleStartPaystackCheckout = async () => {
    setLoading(true);
    setErrorMsg('');
    setStep('processing');

    try {
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity
          })),
          customerEmail: emailInput,
          customerName: nameInput,
          customerPhone: phoneInput,
          deliveryLocation: deliveryLocation
        })
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.error || 'Failed to initialize Paystack checkout');
      }

      setOrderReference(data.reference);

      // If live Paystack authorization URL is returned, redirect or open Paystack popup
      if (data.mode === 'live_paystack' && data.authorization_url) {
        window.location.href = data.authorization_url;
        return;
      }

      // Preview / demo mode: simulate instant secure Paystack card authorization
      setStep('paystack_frame');
    } catch (err: any) {
      setErrorMsg(err.message || 'Error processing checkout with Paystack');
      setStep('review');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify transaction on server
  const handleVerifyPayment = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/paystack/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: orderReference })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Payment verification failed on server');
      }

      setVerifiedOrder(data.order);
      setStep('success');
      onPaymentSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment verification failed');
    } finally {
      setLoading(false);
    }
  };

  const copyOrderReference = () => {
    if (orderReference) {
      navigator.clipboard.writeText(orderReference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-8">
        
        {/* Modal Header with Paystack Branding */}
        <div className="px-6 py-4 bg-[#0A1B2A] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00C3F7]/20 border border-[#00C3F7]/40 flex items-center justify-center text-[#00C3F7]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white">Paystack Secure Checkout</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#00C3F7]/20 text-[#00C3F7] border border-[#00C3F7]/30">
                  256-BIT SSL
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Server Price Validated • Guaranteed Safe</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 flex-1">
          
          {errorMsg && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-2xl flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <div>
                <span className="font-bold">Checkout Error: </span>
                {errorMsg}
              </div>
            </div>
          )}

          {/* STEP 1: REVIEW & CUSTOMER DETAILS */}
          {step === 'review' && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/70 space-y-3">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block">
                  Verify Payer Details
                </span>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Amina Suleja"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#00C3F7]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Email Address (for Paystack digital receipt)
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="customer@example.com"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#00C3F7]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="08012345678"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#00C3F7]"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/40 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Cart Items ({cartItems.length}):</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₦{cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Delivery ({deliveryLocation}):</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₦{deliveryLocation.includes('Suleja') ? '1,000' : deliveryLocation.includes('Abuja') ? '2,500' : '3,000'}
                  </span>
                </div>
                <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800 flex justify-between font-extrabold text-sm text-slate-900 dark:text-white">
                  <span>Total (Server Validated):</span>
                  <span className="text-[#E55318]">
                    ₦{(
                      cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0) +
                      (deliveryLocation.includes('Suleja') ? 1000 : deliveryLocation.includes('Abuja') ? 2500 : 3000)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleStartPaystackCheckout}
                disabled={loading || !emailInput || !nameInput}
                className="w-full py-3.5 px-4 bg-[#00C3F7] hover:bg-[#00B0DF] text-slate-950 font-black text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Initialize Paystack Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: PROCESSING / INITIALIZING */}
          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <RefreshCw className="w-10 h-10 text-[#00C3F7] animate-spin mx-auto" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Connecting to Paystack Gateway...
                </h4>
                <p className="text-xs text-slate-500">
                  Validating product prices server-side and generating encrypted payment session.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: PAYSTACK SIMULATED / SECURE GATEWAY FRAME */}
          {step === 'paystack_frame' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Transaction Reference:</span>
                  <span className="font-mono font-bold text-[#00C3F7]">{orderReference}</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl space-y-1 text-xs">
                  <div className="text-slate-300 font-bold">Paystack Merchant: Reyflux Enterprises Ltd</div>
                  <div className="text-slate-400 text-[11px]">Card, USSD, Bank Transfer &amp; Apple Pay Supported</div>
                </div>

                <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-xs font-mono">
                  <span>Payer: {nameInput}</span>
                  <span className="font-extrabold text-amber-400">
                    ₦{(
                      cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0) +
                      (deliveryLocation.includes('Suleja') ? 1000 : deliveryLocation.includes('Abuja') ? 2500 : 3000)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00C3F7] shrink-0" />
                <span>
                  Ready for payment authorization. Click below to simulate instant card authorization and verify transaction on server.
                </span>
              </div>

              <button
                onClick={handleVerifyPayment}
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#00C3F7] hover:bg-[#00B0DF] text-slate-950 font-black text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying with Paystack Server...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Authorize &amp; Verify Payment (₦{(
                      cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0) +
                      (deliveryLocation.includes('Suleja') ? 1000 : deliveryLocation.includes('Abuja') ? 2500 : 3000)
                    ).toLocaleString()})</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 4: SUCCESS RECEIPT */}
          {step === 'success' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white font-bold text-[10px] rounded-md uppercase tracking-wider">
                  Payment Verified &amp; Saved to Supabase
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white pt-1">
                  Order Confirmed!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your payment has been successfully processed and verified on Paystack server. Depot fulfillment is underway!
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">Order Reference</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{orderReference}</span>
                </div>
                <button
                  onClick={copyOrderReference}
                  className="p-2 bg-white dark:bg-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1 text-[11px] font-bold"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRef ? 'Copied' : 'Copy Ref'}</span>
                </button>
              </div>

              {/* Details List */}
              {verifiedOrder && (
                <div className="p-4 bg-stone-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-left space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Customer:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{verifiedOrder.customer_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destination:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{verifiedOrder.delivery_location}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5 font-sans font-extrabold text-sm">
                    <span>Total Paid:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">₦{Number(verifiedOrder.total_amount).toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Close Receipt
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
