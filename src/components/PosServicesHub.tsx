import React, { useState } from 'react';
import { POS_SERVICES, calculatePosFee } from '../data/posServices';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { CreditCard, Banknote, Send, Zap, Tv, Truck, Calculator, ArrowRight, ShieldCheck, CheckCircle2, Phone, Clock, MapPin } from 'lucide-react';

export const PosServicesHub: React.FC = () => {
  const [transactionType, setTransactionType] = useState<'withdrawal' | 'transfer'>('withdrawal');
  const [amount, setAmount] = useState<number>(10000);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Doorstep Cash Request State
  const [cashRequestForm, setCashRequestForm] = useState({
    name: '',
    phone: '',
    address: 'Suleja',
    cashAmount: 20000,
    serviceType: 'withdrawal',
    notes: ''
  });

  const feeData = calculatePosFee(amount, transactionType);

  const handleCashRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
  };

  const getWhatsAppCashRequestUrl = () => {
    const msg = `Hello Reyflux POS Agency, I need emergency Doorstep Cash/POS service:
- Name: ${cashRequestForm.name || 'Customer'}
- Phone: ${cashRequestForm.phone || COMPANY_INFO.phones[0]}
- Address: ${cashRequestForm.address}
- Amount Needed: ₦${Number(cashRequestForm.cashAmount).toLocaleString()}
- Type: ${cashRequestForm.serviceType.toUpperCase()}
- Additional Notes: ${cashRequestForm.notes || 'None'}`;
    return createWhatsAppUrl(msg);
  };

  return (
    <section id="pos-services" className="py-16 bg-white dark:bg-slate-900 border-t border-amber-200/50 dark:border-slate-800 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-300 text-xs font-bold uppercase tracking-wider">
            <CreditCard className="w-4 h-4 text-red-600" />
            <span>POS AVAILABLE HERE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Financial Agency & POS Cash Terminal
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400">
            Instant cash withdrawal, bank transfers to any Nigerian bank, utility bill payments, and emergency doorstep cash delivery in Suleja.
          </p>
        </div>

        {/* 2-Column Main Layout: Calculator & Services */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive POS Fee Calculator */}
          <div className="lg:col-span-5 bg-gradient-to-br from-red-900 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 border border-red-500/30">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center font-black">
                  POS
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg">Rate Calculator</h3>
                  <p className="text-xs text-red-200">Instant Fee Breakdown</p>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-bold bg-red-500/30 text-red-200 px-2.5 py-1 rounded-full uppercase border border-red-400/30">
                0% Hidden Charges
              </span>
            </div>

            {/* Transaction Type Selector */}
            <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-xl text-xs sm:text-sm font-bold">
              <button
                type="button"
                onClick={() => setTransactionType('withdrawal')}
                className={`py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  transactionType === 'withdrawal' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Banknote className="w-4 h-4" />
                <span>Cash Withdrawal</span>
              </button>

              <button
                type="button"
                onClick={() => setTransactionType('transfer')}
                className={`py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  transactionType === 'transfer' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Bank Transfer</span>
              </button>
            </div>

            {/* Amount Slider & Presets */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-slate-300 flex justify-between">
                <span>Transaction Amount:</span>
                <span className="text-amber-400 font-mono text-base sm:text-lg font-black">₦{amount.toLocaleString()}</span>
              </label>

              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />

              <div className="flex flex-wrap gap-2 pt-1">
                {[5000, 10000, 20000, 50000, 100000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md border transition-colors ${
                      amount === preset
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    ₦{(preset / 1000)}k
                  </button>
                ))}
              </div>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-black/50 p-4 sm:p-5 rounded-xl border border-white/10 space-y-2 text-xs sm:text-sm font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Requested Amount:</span>
                <span className="text-white">₦{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Service Fee:</span>
                <span className="text-amber-400 font-bold">₦{feeData.fee.toLocaleString()}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between text-sm sm:text-base font-extrabold text-white">
                <span>{transactionType === 'withdrawal' ? 'You Receive Cash:' : 'Total Amount Debited:'}</span>
                <span className="text-emerald-400">₦{feeData.netAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Direct Action */}
            <a
              href={createWhatsAppUrl(`Hello Reyflux POS Agency, I want to perform a POS ${transactionType.toUpperCase()} of N${amount.toLocaleString()} (Service Fee: N${feeData.fee}). Please confirm cash availability or agent dispatch.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-lg shadow-amber-500/20"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Confirm & Request via WhatsApp</span>
            </a>
          </div>

          {/* Right Column: POS Services List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {POS_SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="p-5 bg-amber-50/40 dark:bg-slate-800/60 rounded-2xl border border-amber-200/60 dark:border-slate-700/60 space-y-3 shadow-sm hover:border-red-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">{service.title}</h3>
                      <p className="text-xs text-red-700 dark:text-red-400 font-semibold">{service.tagline}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 flex justify-between">
                    <span className="text-slate-500 font-sans">Rate:</span>
                    <span className="font-bold text-red-600 dark:text-red-400">{service.feeStructure}</span>
                  </div>

                  <ul className="space-y-1.5 pt-1">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Doorstep Cash Request Form */}
            <div id="doorstep-cash-form" className="mt-6 p-6 sm:p-8 bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-red-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-red-600" />
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                    Doorstep Emergency POS & Cash Dispatch
                  </h3>
                </div>
                <span className="text-xs text-red-700 dark:text-red-400 font-bold bg-white dark:bg-slate-900 px-3 py-1 rounded-full shadow-sm">
                  Suleja & Environs
                </span>
              </div>

              {!requestSubmitted ? (
                <form onSubmit={handleCashRequestSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ibrahim Hassan"
                        value={cashRequestForm.name}
                        onChange={(e) => setCashRequestForm({ ...cashRequestForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08012345678"
                        value={cashRequestForm.phone}
                        onChange={(e) => setCashRequestForm({ ...cashRequestForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Cash Amount Needed (₦)</label>
                      <input
                        type="number"
                        min="5000"
                        step="5000"
                        value={cashRequestForm.cashAmount}
                        onChange={(e) => setCashRequestForm({ ...cashRequestForm, cashAmount: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Delivery Address in Suleja</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Near Yaro College, Second Gate, Suleja"
                      value={cashRequestForm.address}
                      onChange={(e) => setCashRequestForm({ ...cashRequestForm, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Dispatch Fee: ₦500. Agent arrives within 20-30 minutes with terminal and cash.
                    </p>
                    <a
                      href={getWhatsAppCashRequestUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-md whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Dispatch Agent via WhatsApp</span>
                    </a>
                  </div>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-xs sm:text-sm font-medium space-y-2">
                  <p className="font-bold">Request Dispatched Successfully!</p>
                  <p>Our agent will call you shortly at {cashRequestForm.phone} for confirmation.</p>
                  <button
                    onClick={() => setRequestSubmitted(false)}
                    className="text-emerald-700 underline font-bold"
                  >
                    Submit another request
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
