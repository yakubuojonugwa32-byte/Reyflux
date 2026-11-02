import React from 'react';
import { Phone, MapPin, Truck, ShieldCheck, Heart } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { ReyfluxLogo } from './ReyfluxLogo';

interface FooterProps {
  onOpenFlyer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFlyer }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <ReyfluxLogo size="md" showTagline={true} />
            <p className="text-slate-400 leading-relaxed">
              "{COMPANY_INFO.tagline}" Pure unadulterated red Palm Oil, fresh Garri, Cassava Flour, Plantain Flour, Amala Flour, and Groundnut in Suleja, Niger State.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Natural • No Preservatives • No Colours</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Our Food Products</h4>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Pure Organic Palm Oil (4L - 50L)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Fresh Yellow & White Ijebu Garri
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  High Quality Cassava Flour (HQCF)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Pure Plantain Flour
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Traditional Amala Yam Flour
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Crispy & Raw Shelled Groundnut
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Store Address</h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-slate-300 leading-relaxed font-medium">
                {COMPANY_INFO.address}
              </p>
            </div>
            <div className="space-y-1 pt-1">
              <p className="text-slate-400">Hotlines:</p>
              <div className="font-mono font-bold text-white space-x-2">
                <a href={`tel:${COMPANY_INFO.phones[0]}`} className="hover:text-amber-400">
                  {COMPANY_INFO.phones[0]}
                </a>
                <span>•</span>
                <a href={`tel:${COMPANY_INFO.phones[1]}`} className="hover:text-amber-400">
                  {COMPANY_INFO.phones[1]}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Delivery Promise & Flyer Link */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Doorstep Delivery</h4>
            <div className="flex items-start gap-2">
              <Truck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-slate-300 leading-relaxed">
                "{COMPANY_INFO.deliveryNotes}"
              </p>
            </div>
            <button
              onClick={onOpenFlyer}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold hover:bg-amber-500/20 transition-colors"
            >
              <span>View Official Business Poster</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} REYFLUX ENTERPRISES LIMITED. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Direct supply from Suleja, Niger State</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
