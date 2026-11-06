import React, { useState } from 'react';
import { Truck, MapPin, Clock, Search, ShieldCheck, CheckCircle2, Navigation, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export const DeliveryEstimator: React.FC = () => {
  const [destination, setDestination] = useState('suleja-local');
  const [itemWeight, setItemWeight] = useState('medium');
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const deliveryRates: Record<string, { label: string; fee: number; time: string; note: string }> = {
    'suleja-local': { label: 'Suleja Central & Yaro College Area', fee: 1000, time: '20 - 45 Minutes', note: 'Direct Dispatch Rider' },
    'suleja-outskirts': { label: 'Suleja Outskirts (Gurara, Maje)', fee: 1500, time: '30 - 60 Minutes', note: 'Direct Dispatch Rider' },
    'abuja-fct': { label: 'Abuja FCT (Kubwa, Zuba, Wuse, Maitama)', fee: 2500, time: 'Same Day (2 - 4 Hours)', note: 'Dedicated Delivery Bus' },
    'minna-niger': { label: 'Minna & Niger State Towns', fee: 3000, time: 'Same Day Delivery', note: 'Intercity Transport' },
    'interstate': { label: 'Interstate (Lagos, Kano, Port Harcourt)', fee: 5000, time: '24 - 48 Hours', note: 'Waybill & Waybill Express' }
  };

  const currentRate = deliveryRates[destination] || deliveryRates['suleja-local'];

  const multiplier = itemWeight === 'small' ? 1 : itemWeight === 'medium' ? 1.2 : 1.5;
  const estimatedFee = Math.round(currentRate.fee * multiplier);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingIdInput.trim()) return;

    setTrackingResult({
      id: trackingIdInput.toUpperCase(),
      status: 'Out for Doorstep Delivery',
      item: 'Pure Organic Palm Oil (25L) + Yellow Garri (10kg)',
      driver: 'Rilwan (08034928172)',
      estimatedArrival: 'In 25 Mins',
      steps: [
        { label: 'Order Confirmed & Sealed at Suleja Depot', completed: true, time: '09:15 AM' },
        { label: 'Quality Verification (Zero Preservatives Check)', completed: true, time: '09:30 AM' },
        { label: 'Dispatched with Delivery Rider', completed: true, time: '10:00 AM' },
        { label: 'Arriving at Destination', completed: false, time: 'Pending' }
      ]
    });
  };

  return (
    <section id="delivery" className="py-6 sm:py-8 bg-amber-50/40 dark:bg-slate-900 border-t border-amber-200/50 dark:border-slate-800">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-semibold tracking-wider text-[#0B7B4B] dark:text-emerald-400 uppercase flex items-center justify-center gap-1.5">
            <Truck className="w-4 h-4" />
            <span>Nationwide Doorstep Logistics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Delivery & Live Order Tracker
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            "{COMPANY_INFO.deliveryNotes}" Sealed anti-spill jerrycans and moisture-proof sacks shipped with care.
          </p>
        </div>

        {/* 2-Column Grid: Delivery Estimator & Live Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Interactive Delivery Estimator */}
          <div className="bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-2xl border border-amber-200 dark:border-slate-700 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Delivery Fee Calculator</h3>
                <p className="text-xs text-slate-500">Calculate instant doorstep shipping fee</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Delivery Location:
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                >
                  {Object.entries(deliveryRates).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Order Volume / Package Size:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'small', label: 'Small (4L - 10L / 5kg)' },
                    { id: 'medium', label: 'Medium (25L / 25kg)' },
                    { id: 'large', label: 'Bulk (50L+ / 50kg+)' }
                  ].map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setItemWeight(size.id)}
                      className={`p-2.5 text-xs font-bold rounded-xl border transition-colors ${
                        itemWeight === size.id
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Output */}
              <div className="p-4 bg-amber-50 dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Estimated Delivery Fee:</span>
                  <span className="text-xl font-black text-amber-600 font-mono">₦{estimatedFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Estimated Time:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {currentRate.time}
                  </span>
                </div>

                <p className="text-[10px] text-slate-500 pt-1 border-t border-amber-200/50 dark:border-slate-800">
                  Dispatch Partner: {currentRate.note}. Anti-leak seals included for all Palm Oil containers.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Order Tracker Widget */}
          <div className="bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-2xl border border-amber-200 dark:border-slate-700 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Live Order Tracker</h3>
                <p className="text-xs text-slate-500">Track your pending delivery</p>
              </div>
            </div>

            <form onSubmit={handleTrackOrder} className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Enter Order ID (e.g. <span className="font-mono text-amber-600 cursor-pointer" onClick={() => setTrackingIdInput('REY-8492')}>REY-8492</span>):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. REY-8492"
                  value={trackingIdInput}
                  onChange={(e) => setTrackingIdInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono uppercase focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Track Status
                </button>
              </div>
            </form>

            {/* Tracking Result View */}
            {trackingResult ? (
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-extrabold text-slate-900 dark:text-white font-mono">{trackingResult.id}</span>
                  <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-md text-[10px]">
                    {trackingResult.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {trackingResult.steps.map((step: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                        step.completed ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-600'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold ${step.completed ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>
                          {step.label}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/50 rounded-lg text-amber-900 dark:text-amber-300 text-[11px]">
                  Driver: <span className="font-bold">{trackingResult.driver}</span> • ETA: <span className="font-bold">{trackingResult.estimatedArrival}</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-500 space-y-1">
                <p>Click <span className="font-bold text-amber-600 underline cursor-pointer" onClick={() => setTrackingIdInput('REY-8492')}>REY-8492</span> above to preview live tracking simulation.</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
