import React from 'react';
import { ShoppingCart, Phone, ArrowRight, ShieldCheck, Truck, Users, Headphones, Leaf } from 'lucide-react';
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
        
        {/* Main Hero Split (Text on Left, Clean Photography Banner on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 lg:space-y-6">
            
            {/* Top Kicker Label */}
            <div className="text-xs sm:text-sm font-black tracking-widest text-[#E55318] dark:text-orange-400 uppercase">
              NATURAL • FRESH • DIRECT FROM MILL
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] text-wrap-balance">
              Pure Organic <br />
              <span className="text-[#E55318]">Palm Oil</span> &amp; Foodstuffs
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
              High-quality Palm Oil, Garri, Cassava Flour, Plantain Flour, Amala Flour &amp; Groundnut. Delivered to your doorstep nationwide.
            </p>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              
              {/* Pillar 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0 shadow-2xs">
                  <Leaf className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="block text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                    100% Natural
                  </span>
                  <span className="block text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                    No preservatives
                  </span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0 shadow-2xs">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="block text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                    Nationwide Delivery
                  </span>
                  <span className="block text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                    Fast &amp; reliable
                  </span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0 shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="block text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                    Wholesale &amp; Bulk
                  </span>
                  <span className="block text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                    Best prices for businesses
                  </span>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 text-sm sm:text-base font-bold text-white bg-[#E55318] hover:bg-[#D4470E] rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={createWhatsAppUrl("Hello Reyflux Enterprises, I am placing an order from your website for pure red Palm Oil and organic foodstuffs.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm sm:text-base font-bold text-white bg-[#0B7B4B] hover:bg-[#08633C] rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Hero Column: Authentic Photography Banner fitted gracefully */}
          <div className="lg:col-span-5 h-full flex items-center justify-center">
            <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] xl:min-h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-amber-200/60 dark:border-slate-800 group bg-stone-100 dark:bg-slate-900 flex items-center justify-center">
              <img
                src="/assets/hero-clean.png"
                alt="Pure Organic Red Palm Oil bottles, jerrycans and palm fruit bunches by Reyflux"
                className="w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] xl:min-h-[520px] object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none" />
            </div>
          </div>

        </div>

        {/* 5 Value Props Bar (Full-Width Responsive Row) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-2 border-t border-stone-200/60 dark:border-slate-800/80">
          
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-9 h-9 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">
                Direct Mill Supply
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                From trusted sources
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-9 h-9 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">
                Quality Guaranteed
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                100% natural products
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-9 h-9 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">
                Doorstep Delivery
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                To any location in Nigeria
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-9 h-9 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">
                Bulk Orders
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                Special rates for businesses
              </span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover:shadow-xs transition-shadow col-span-2 sm:col-span-1">
            <div className="w-9 h-9 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white">
                24/7 Support
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                Chat, call or WhatsApp
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
