import React, { useState } from 'react';
import { X, ZoomIn, CheckCircle2, Phone, MapPin, Truck, Sparkles, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { ReyfluxLogo } from './ReyfluxLogo';

interface FlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlyerModal: React.FC<FlyerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'flyer' | 'breakdown'>('flyer');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full border border-amber-300/40 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white shrink-0">
          <ReyfluxLogo size="sm" showTagline={false} />

          <div className="flex items-center gap-2">
            <div className="flex bg-black/20 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveTab('flyer')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'flyer' ? 'bg-white text-slate-900 font-bold' : 'text-amber-100 hover:text-white'
                }`}
              >
                Poster View
              </button>
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'breakdown' ? 'bg-white text-slate-900 font-bold' : 'text-amber-100 hover:text-white'
                }`}
              >
                Verified Specs
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors ml-2"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'flyer' ? (
            <div className="flex flex-col items-center gap-4">
              <div 
                onClick={() => setIsZoomed(!isZoomed)}
                className={`relative group rounded-xl overflow-hidden shadow-2xl border-4 border-amber-400/80 bg-amber-900 transition-all ${
                  isZoomed ? 'cursor-zoom-out max-w-full' : 'cursor-zoom-in max-w-xl'
                }`}
              >
                <img
                  src={COMPANY_INFO.flyerImagePath}
                  alt="Reyflux Enterprises Limited Official Flyer - Pure Organic Palm Oil, Garri, Cassava Flour, Plantain Flour, Amala Flour, Groundnut"
                  className={`w-full h-auto object-contain transition-all duration-300 ${
                    isZoomed ? 'max-h-[85vh] scale-105' : 'max-h-[60vh] group-hover:scale-[1.02]'
                  }`}
                />
                
                {/* Floating Zoom Indicator Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm transition-all"
                >
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span>{isZoomed ? 'Reset View' : 'Click to Zoom Full Poster'}</span>
                </button>

                {/* Hotspot Indicators */}
                {!isZoomed && (
                  <>
                    <div className="absolute top-[35%] left-[45%] group/spot bg-stone-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md border border-white/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-xs bg-emerald-400" />
                      <span>Palm Oil (100% Organic)</span>
                    </div>

                    <div className="absolute top-[60%] left-[25%] group/spot bg-stone-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md border border-white/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-xs bg-amber-400" />
                      <span>Garri &amp; Cassava Flour</span>
                    </div>
                  </>
                )}
              </div>

              <p className="text-xs text-center text-slate-500 dark:text-slate-400 max-w-md">
                Official advertisement banner for Reyflux Enterprises Limited in Suleja, Niger State. Guaranteed authentic products direct from primary processing. Click image to toggle full zoom view.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Column 1: Organic Oils & Staples */}
              <div className="bg-amber-50/60 dark:bg-slate-800/60 p-5 rounded-xl border border-amber-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3>Organic Oils & Crispy Staples</h3>
                </div>

                <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-amber-100 dark:border-slate-800">
                    <h4 className="font-bold text-amber-800 dark:text-amber-400">Pure Organic Palm Oil</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      100% Natural • No Preservatives • No Colours. Available in 4L, 10L, 25L, and 50L drums.
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-amber-100 dark:border-slate-800">
                    <h4 className="font-bold text-amber-800 dark:text-amber-400">Fresh Yellow & White Garri</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Fried Yellow Garri & Extra Sour White Ijebu Garri in 5kg, 10kg, 25kg, 50kg sacks.
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-amber-100 dark:border-slate-800">
                    <h4 className="font-bold text-amber-800 dark:text-amber-400">Crunchy Groundnut</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Crispy groundnut and raw peeled seeds in 2kg, 5kg, and 10kg bags.
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 2: Healthy Flours & Location */}
              <div className="bg-red-50/60 dark:bg-slate-800/60 p-5 rounded-xl border border-red-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center gap-2 text-red-900 dark:text-red-300 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-red-600" />
                  <h3>Healthy Flours & Address</h3>
                </div>

                <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-red-100 dark:border-slate-800">
                    <h4 className="font-bold text-red-800 dark:text-red-400">Flour Selection</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      High Quality Odorless Cassava Flour, Pure Plantain Flour (Diabetic friendly), and Amala Yam Flour.
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-red-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-red-600" />
                      Physical Address
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {COMPANY_INFO.address}
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-red-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      Delivery Guarantee
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      "{COMPANY_INFO.deliveryNotes}"
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-800 dark:text-slate-200">Hotlines:</span>
            <span className="font-mono text-red-600 dark:text-red-400 font-bold">{COMPANY_INFO.phones.join(' • ')}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={createWhatsAppUrl("Hello Reyflux Enterprises, I viewed your official poster and want to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Contact via WhatsApp</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
