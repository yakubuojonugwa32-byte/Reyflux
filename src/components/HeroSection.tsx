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
    <section id="hero" className="w-full bg-[#FAF7F2] dark:bg-slate-950 pt-5 pb-6 border-b border-stone-200/70 dark:border-slate-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main Hero Split (Text on Left, Mockup Photography on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top Kicker Label */}
            <div className="text-[11px] sm:text-xs font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase">
              NATURAL • FRESH • DIRECT FROM MILL
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Pure Organic <br />
              <span className="text-[#E55318]">Palm Oil</span> &amp; Foodstuffs
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-xl leading-relaxed">
              High-quality Palm Oil, Garri, Cassava Flour, Plantain Flour, Amala Flour &amp; Groundnut. Delivered to your doorstep nationwide.
            </p>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              
              {/* Pillar 1 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="block text-xs font-black text-slate-900 dark:text-white">
                    100% Natural
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                    No preservatives
                  </span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="block text-xs font-black text-slate-900 dark:text-white">
                    Nationwide Delivery
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                    Fast &amp; reliable
                  </span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="block text-xs font-black text-slate-900 dark:text-white">
                    Wholesale &amp; Bulk
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                    Best prices for businesses
                  </span>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#E55318] hover:bg-[#D4470E] rounded-lg transition-colors shadow-xs"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={createWhatsAppUrl("Hello Reyflux Enterprises, I am placing an order from your website for pure red Palm Oil and organic foodstuffs.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#0B7B4B] hover:bg-[#08633C] rounded-lg transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Hero Column: Authentic Photography Banner without text */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-200/50 dark:border-slate-800 group bg-stone-100 dark:bg-slate-900">
              <img
                src="/assets/hero-clean.png"
                alt="Pure Organic Red Palm Oil bottles, jerrycans and palm fruit bunches by Reyflux"
                className="w-full h-auto object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>

        </div>

        {/* 5 Value Props Bar (Mockup Row below Hero) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs font-bold text-slate-900 dark:text-white">
                Direct Mill Supply
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                From trusted sources
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs font-bold text-slate-900 dark:text-white">
                Quality Guaranteed
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                100% natural products
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs font-bold text-slate-900 dark:text-white">
                Doorstep Delivery
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                To any location in Nigeria
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs font-bold text-slate-900 dark:text-white">
                Bulk Orders
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                Special rates for businesses
              </span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 flex items-center gap-2.5 shadow-2xs col-span-2 sm:col-span-1">
            <div className="w-8 h-8 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs font-bold text-slate-900 dark:text-white">
                24/7 Support
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                Chat, call or WhatsApp
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
