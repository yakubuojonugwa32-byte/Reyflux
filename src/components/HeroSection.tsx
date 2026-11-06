import React from 'react';
import { ShoppingCart, Phone, ArrowRight, ShieldCheck, Truck, Users, Leaf, Star, CheckCircle } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';

interface HeroSectionProps {
  onOpenFlyer: () => void;
  onOpenAiChat: () => void;
  onSelectCategory: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectCategory }) => {
  return (
    <section 
      id="hero" 
      className="w-full bg-[#FAF7F2] dark:bg-slate-950 min-h-[calc(100vh-6.5rem)] flex flex-col justify-between py-6 sm:py-8 lg:py-10 border-b border-stone-200/70 dark:border-slate-800 transition-colors"
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col flex-1 justify-between gap-8">
        
        {/* Main Hero Split (Text on Left, Clean Photography on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 lg:space-y-6">
            
            {/* Top Kicker Label (Clean Unboxed Typography) */}
            <div className="text-xs font-semibold tracking-wider text-[#E55318] dark:text-orange-400 uppercase">
              Natural · Fresh · Direct From Mill
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] text-wrap-balance">
              Pure Organic <br />
              <span className="text-[#E55318]">Palm Oil</span> &amp; Foodstuffs
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-xl leading-relaxed">
              High-quality Palm Oil, Garri, Cassava Flour, Plantain Flour, Amala Flour &amp; Groundnut. Direct depot supply in Suleja and delivered nationwide.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-bold text-white bg-[#E55318] hover:bg-[#D4470E] rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Shop Foodstuffs</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={createWhatsAppUrl("Hello Reyflux Enterprises, I am placing an order from your website for pure red Palm Oil and organic foodstuffs.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-bold text-white bg-[#0B7B4B] hover:bg-[#08633C] rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* SOCIAL PROOF: Verified Customers & Trust Scorecard */}
            <div className="pt-2 border-t border-stone-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                {/* Avatar Stack */}
                <div className="flex -space-x-2 shrink-0">
                  <img
                    src="/assets/avatar-amina.png"
                    alt="Customer Amina S."
                    className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-900 object-cover"
                  />
                  <img
                    src="/assets/avatar-chinedu.png"
                    alt="Customer Chinedu K."
                    className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-900 object-cover"
                  />
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white dark:border-slate-900">
                    +850
                  </div>
                </div>

                {/* Rating & Verified Tag */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      4.9 / 5.0
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      (850+ reviews)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                    Trusted by 500+ households, restaurants &amp; caterers across Nigeria
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Authentic Photography Banner fitted gracefully */}
          <div className="lg:col-span-5 h-full flex items-center justify-center">
            <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] xl:min-h-[480px] rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-slate-800 group bg-stone-100 dark:bg-slate-900 flex items-center justify-center">
              <img
                src="/assets/hero-clean.png"
                alt="Pure Organic Red Palm Oil bottles, jerrycans and palm fruit bunches by Reyflux"
                className="w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] xl:min-h-[480px] object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>

        </div>

        {/* Minimal Trust Strip (Clean, Uncluttered, Zero Heavy Banners) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-t border-stone-200/70 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#0B7B4B] shrink-0" />
            <span className="font-semibold text-slate-900 dark:text-slate-200">100% Unadulterated</span>
          </div>

          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#0B7B4B] shrink-0" />
            <span className="font-semibold text-slate-900 dark:text-slate-200">Doorstep &amp; Waybill Dispatch</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0B7B4B] shrink-0" />
            <span className="font-semibold text-slate-900 dark:text-slate-200">Direct Wholesale Supply</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0B7B4B] shrink-0" />
            <span className="font-semibold text-slate-900 dark:text-slate-200">Anti-Spill Sealed Guarantee</span>
          </div>
        </div>

      </div>
    </section>
  );
};
