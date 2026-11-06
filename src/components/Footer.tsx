import React from 'react';
import { ShoppingBag, Users, Leaf, Truck, Phone, MapPin, ShieldCheck, Heart, Facebook, Instagram, Youtube } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { ReyfluxLogo } from './ReyfluxLogo';

interface FooterProps {
  onOpenFlyer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFlyer }) => {
  return (
    <footer id="contact-info" className="w-full bg-[#0F172A] text-slate-400">
      
      {/* 1. Value Metric Bar */}
      <div className="w-full bg-[#F97316] text-white py-4 px-4 sm:px-6 lg:px-10 shadow-sm">
        <div className="w-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Key Metrics */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-8 text-xs sm:text-sm font-bold">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-orange-200" />
              <span>2,000+ Orders Delivered</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-200" />
              <span>500+ Happy Households</span>
            </div>

            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-orange-200" />
              <span>100% Organic &amp; Unadulterated</span>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-200" />
              <span>Nationwide Interstate Waybill</span>
            </div>
          </div>

          {/* Social Follow & Brand Motto */}
          <div className="flex items-center gap-5 shrink-0 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="text-orange-100 text-[11px]">Follow Us</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white text-white hover:text-[#F97316] flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white text-white hover:text-[#F97316] flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white text-white hover:text-[#F97316] flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="italic text-white text-xs tracking-wide hidden sm:block border-l border-white/30 pl-4 font-medium">
              Good Food Brighter Lives With Reyflux
            </div>
          </div>

        </div>
      </div>

      {/* 2. Detailed Directory Footer */}
      <div className="py-10 sm:py-12 px-4 sm:px-6 lg:px-10 text-xs border-t border-slate-800">
        <div className="w-full max-w-[1720px] mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Col 1: Brand Info */}
            <div className="space-y-3">
              <div className="bg-white/95 p-2 rounded-xl inline-block">
                <ReyfluxLogo size="sm" showTagline={false} />
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mt-2">
                Pure unadulterated red Palm Oil, crispy Garri, Cassava Flour, Plantain Flour, Amala Flour, and farm-fresh Groundnut. Direct mill supply from Suleja, Niger State.
              </p>
              <div className="flex items-center gap-1.5 text-[#16A34A] font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Natural • Zero Additives • Preservative-Free</span>
              </div>
            </div>

            {/* Col 2: Store Staples */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Store Foodstuffs
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li><a href="#products" className="hover:text-white transition-colors">Pure Organic Red Palm Oil (1L - 50L)</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Crispy Yellow &amp; White Garri</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">High Quality Cassava Flour (HQCF)</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Natural Unripe Plantain Flour</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Traditional Amala Yam Flour</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Farm-Fresh Raw Groundnut Seeds</a></li>
              </ul>
            </div>

            {/* Col 3: Depot Address */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Suleja Depot &amp; Hub
              </h4>
              <div className="flex items-start gap-2 text-[11px] leading-relaxed">
                <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="pt-1 space-y-1 text-[11px]">
                <div className="text-slate-500 font-medium">Direct Customer Hotlines:</div>
                <div className="font-mono font-bold text-white flex gap-2">
                  <a href={`tel:${COMPANY_INFO.phones[0]}`} className="hover:text-[#F97316] transition-colors">{COMPANY_INFO.phones[0]}</a>
                  <span>•</span>
                  <a href={`tel:${COMPANY_INFO.phones[1]}`} className="hover:text-[#F97316] transition-colors">{COMPANY_INFO.phones[1]}</a>
                </div>
              </div>
            </div>

            {/* Col 4: Wholesale B2B Support */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Commercial Wholesale
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Bulk commodity supply for hotels, restaurants, schools, bakeries, and retailers with dedicated freight waybill.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={onOpenFlyer}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold hover:border-slate-600 text-left transition-colors"
                >
                  View Official Depot Flyer 📄
                </button>
                <a
                  href={createWhatsAppUrl("Hello Reyflux Enterprises, I am inquiring about business wholesale supply.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold text-center transition-colors shadow-xs"
                >
                  Direct WhatsApp Inquiries 💬
                </a>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <p>© {new Date().getFullYear()} REYFLUX ENTERPRISES LIMITED. All rights reserved.</p>
            <p>Direct agricultural mill supply from Suleja, Niger State to all 36 Nigerian States + FCT Abuja.</p>
          </div>

        </div>
      </div>

    </footer>
  );
};
