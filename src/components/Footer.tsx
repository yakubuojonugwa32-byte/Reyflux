import React from 'react';
import { Phone, MapPin, Truck, ShieldCheck, Heart } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';

interface FooterProps {
  onOpenFlyer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFlyer }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs sm:text-sm w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 py-12 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-amber-500">
                  R
                </div>
              </div>
              <span className="font-black text-white text-base tracking-tight">
                REYFLUX ENTERPRISES
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              "{COMPANY_INFO.tagline}" Pure unadulterated red palm oil, fresh Garri, Cassava flour, and instant POS agency services in Suleja, Niger State.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Natural • No Preservatives • No Colours</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Pure Organic Palm Oil Catalog
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Fresh Yellow Garri & White Ijebu Garri
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  High Quality Cassava Flour (HQCF)
                </a>
              </li>
              <li>
                <a href="#pos-services" className="hover:text-amber-400 transition-colors">
                  POS Cash Withdrawal & Transfer Rates
                </a>
              </li>
              <li>
                <a href="#wholesale" className="hover:text-amber-400 transition-colors">
                  Wholesale Commercial B2B Supply
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
