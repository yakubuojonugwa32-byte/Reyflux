import React from 'react';
import { ShoppingBag, Truck, ShieldCheck, CheckCircle2, Phone, ExternalLink, ArrowRight, Sparkles, MapPin, ImageIcon, Bot } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';

interface HeroSectionProps {
  onOpenFlyer: () => void;
  onOpenAiChat: () => void;
  onSelectCategory: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenFlyer, onOpenAiChat, onSelectCategory }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent pt-6 pb-8 lg:pt-8 lg:pb-10 w-full">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 mb-8 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-300/40 dark:border-amber-700/50 rounded-2xl text-xs font-semibold text-amber-950 dark:text-amber-200 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>DIRECT FROM SULEJA, NIGER STATE</span>
            <span aria-hidden="true" className="text-amber-400">·</span>
            <span>Second Gate by Yaro College Road, Adjacent Alheri Plaza</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-amber-800 dark:text-amber-300">Hotlines & WhatsApp:</span>
            <a href={`tel:${COMPANY_INFO.phones[0]}`} className="font-mono font-extrabold text-red-700 dark:text-red-400 hover:underline">
              {COMPANY_INFO.phones[0]}
            </a>
            <span className="text-amber-300">|</span>
            <a href={`tel:${COMPANY_INFO.phones[1]}`} className="font-mono font-extrabold text-red-700 dark:text-red-400 hover:underline">
              {COMPANY_INFO.phones[1]}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{COMPANY_INFO.tagline}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] text-wrap-balance">
              Pure Organic <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-amber-600">Palm Oil</span>, Garri, Flours & Groundnut
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
              100% Natural • No Preservatives • No Added Colours. Direct mill supply of red Palm Oil, crispy Garri, Cassava Flour, Plantain Flour, Amala Yam Flour, and hand-roasted Groundnut in Suleja with nationwide doorstep delivery.
            </p>

            {/* Product Badges List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {[
                '🛢️ Pure Red Palm Oil',
                '🥣 Crispy Yellow & White Garri',
                '🍞 High Quality Cassava Flour',
                '🍌 Plantain Flour',
                '🍲 Traditional Amala Flour',
                '🥜 Crunchy Groundnut'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-2xs">
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:opacity-95 rounded-xl shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Foodstuffs</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={createWhatsAppUrl("Hello Reyflux Enterprises, I want to place an order for Palm Oil, Garri, Flours or Groundnut.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Order ({COMPANY_INFO.phones[0]})</span>
              </a>

              <button
                onClick={onOpenAiChat}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-extrabold text-amber-950 dark:text-amber-100 bg-amber-200 dark:bg-amber-900/80 border border-amber-300 dark:border-amber-700 hover:bg-amber-300 dark:hover:bg-amber-800 rounded-xl transition-colors shadow-sm"
              >
                <Bot className="w-4 h-4 text-amber-700 dark:text-amber-300 animate-bounce" />
                <span>Live AI Chat</span>
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Need quick price quotes or bulk supply?</span>
              <a
                href={createWhatsAppUrl("Hello Reyflux Enterprises, I am reaching out from your website for a direct order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Click to Chat on WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Poster Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative group">
              
              {/* Outer Glow frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />

              {/* Main Card */}
              <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-2xl border border-amber-300/60 dark:border-slate-800 space-y-4">
                
                {/* Image Frame featuring the uploaded asset */}
                <div className="relative overflow-hidden rounded-xl border-2 border-amber-400/80 bg-slate-900 aspect-square">
                  <img
                    src={COMPANY_INFO.flyerImagePath}
                    alt="Reyflux Enterprises Limited Poster - Pure Organic Palm Oil, Garri, Cassava Flour, Plantain Flour, Amala Flour, Groundnut"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider">
                    Official Business Poster
                  </div>

                  {/* Click to Enlarge Overlay */}
                  <button
                    onClick={onOpenFlyer}
                    className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-2 backdrop-blur-[2px]"
                  >
                    <ImageIcon className="w-5 h-5 text-amber-400" />
                    <span>Click to View Full Size Poster</span>
                  </button>
                </div>

                {/* Offerings Summary Pills */}
                <div className="grid grid-cols-3 gap-2 text-[10px] font-bold">
                  <button
                    onClick={() => onSelectCategory('palm_oil')}
                    className="p-2 rounded-lg bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-amber-900 dark:text-amber-300 text-center hover:bg-amber-100 transition-colors"
                  >
                    <div className="font-extrabold text-xs">Palm Oil</div>
                  </button>

                  <button
                    onClick={() => onSelectCategory('garri')}
                    className="p-2 rounded-lg bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-amber-900 dark:text-amber-300 text-center hover:bg-amber-100 transition-colors"
                  >
                    <div className="font-extrabold text-xs">Garri</div>
                  </button>

                  <button
                    onClick={() => onSelectCategory('plantain_flour')}
                    className="p-2 rounded-lg bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-amber-900 dark:text-amber-300 text-center hover:bg-amber-100 transition-colors"
                  >
                    <div className="font-extrabold text-xs">Flours & Nuts</div>
                  </button>
                </div>

                {/* Delivery Guarantee Banner */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 text-white flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-black tracking-widest text-emerald-200 uppercase">Nationwide Shipping</div>
                    <div className="font-extrabold text-xs sm:text-sm">DOORSTEP DELIVERY</div>
                  </div>
                  <a
                    href="#delivery"
                    className="px-3 py-1.5 bg-white text-emerald-800 font-extrabold text-xs rounded-lg hover:bg-amber-50 transition-colors shadow-sm"
                  >
                    Check Rates
                  </a>
                </div>

                {/* Delivery Note */}
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-semibold px-1">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p className="line-clamp-1">{COMPANY_INFO.deliveryNotes}</p>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
