import React from 'react';
import { ShoppingCart, Users, Leaf, Truck, Phone, MapPin, ShieldCheck, Heart, Facebook, Instagram, Youtube } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { ReyfluxLogo } from './ReyfluxLogo';

interface FooterProps {
  onOpenFlyer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFlyer }) => {
  return (
    <footer id="contact-info" className="w-full">
      
      {/* 1. MOCKUP PROMINENT ORANGE METRIC & BRAND STRIP */}
      <div className="w-full bg-[#E55318] text-white py-4 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="w-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Left Metrics (2,000+ Orders, 500+ Customers, 100% Natural, Nationwide) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-black">
            
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-amber-200" />
              <span>2,000+ Orders Delivered</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-200" />
              <span>500+ Happy Customers</span>
            </div>

            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-amber-200" />
              <span>100% Natural Products</span>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-200" />
              <span>Nationwide Delivery Coverage</span>
            </div>

          </div>

          {/* Right: Social Follow + Brand Motto */}
          <div className="flex items-center gap-5 shrink-0 text-xs font-bold">
            
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <span className="text-amber-100 text-[11px]">Follow Us</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#E55318] flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#E55318] flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#E55318] flex items-center justify-center transition-colors text-[10px] font-black"
                title="TikTok"
              >
                TK
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#E55318] flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Script Motto */}
            <div className="italic text-white font-serif text-sm tracking-wide hidden sm:block border-l border-white/30 pl-4">
              Good Food Brighter Lives With Reyflux
            </div>

          </div>

        </div>
      </div>

      {/* 2. DETAILED DIRECTORY FOOTER */}
      <div className="bg-slate-950 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-900">
        <div className="w-full max-w-[1720px] mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Col 1: Brand Info */}
            <div className="space-y-3">
              <ReyfluxLogo size="md" />
              <p className="text-slate-400 text-xs leading-relaxed mt-2">
                Pure unadulterated red Palm Oil, fresh Garri, Cassava Flour, Plantain Flour, Amala Flour, and Groundnut in Suleja, Niger State. Guaranteed direct mill supply.
              </p>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Natural • No Preservatives • No Added Colours</span>
              </div>
            </div>

            {/* Col 2: Products */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
                Store Products
              </h4>
              <ul className="space-y-1.5 text-[11px]">
                <li><a href="#products" className="hover:text-amber-400">Pure Organic Palm Oil (1L - 50L)</a></li>
                <li><a href="#products" className="hover:text-amber-400">Premium Yellow &amp; White Garri</a></li>
                <li><a href="#products" className="hover:text-amber-400">High Quality Cassava Flour (HQCF)</a></li>
                <li><a href="#products" className="hover:text-amber-400">Pure Plantain Flour (Diabetic friendly)</a></li>
                <li><a href="#products" className="hover:text-amber-400">Traditional Amala Yam Flour</a></li>
                <li><a href="#products" className="hover:text-amber-400">Raw Shelled &amp; Hand-Picked Groundnut</a></li>
              </ul>
            </div>

            {/* Col 3: Depot Address */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
                Depot Location (Suleja)
              </h4>
              <div className="flex items-start gap-2 text-[11px] leading-relaxed">
                <MapPin className="w-4 h-4 text-[#E55318] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="pt-1 space-y-0.5 text-[11px]">
                <div className="text-slate-400">Direct Customer Hotlines:</div>
                <div className="font-mono font-bold text-white flex gap-2">
                  <a href={`tel:${COMPANY_INFO.phones[0]}`} className="hover:text-amber-400">{COMPANY_INFO.phones[0]}</a>
                  <span>•</span>
                  <a href={`tel:${COMPANY_INFO.phones[1]}`} className="hover:text-amber-400">{COMPANY_INFO.phones[1]}</a>
                </div>
              </div>
            </div>

            {/* Col 4: Business Poster & Quick WhatsApp */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
                Business Inquiries
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Bulk institutional supply for restaurants, hotels, schools, and bakeries nationwide.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={onOpenFlyer}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold hover:bg-slate-800 text-left transition-colors"
                >
                  View Official Business Poster 📄
                </button>
                <a
                  href={createWhatsAppUrl("Hello Reyflux Enterprises, I am inquiring about business wholesale supply.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#0B7B4B] hover:bg-[#08633C] text-white text-xs font-bold text-center transition-colors"
                >
                  WhatsApp Inquiries 💬
                </a>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <p>© {new Date().getFullYear()} REYFLUX ENTERPRISES LIMITED. All rights reserved.</p>
            <p>Direct mill supply from Suleja, Niger State to all 36 Nigerian States + FCT Abuja.</p>
          </div>

        </div>
      </div>

    </footer>
  );
};
