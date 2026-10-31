import React, { useState } from 'react';
import { ShoppingBag, Phone, Sparkles, Image as ImageIcon, MapPin, Moon, Sun, Menu, X, ShieldCheck, Bot, MessageSquare } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFlyer: () => void;
  onOpenAiChat: () => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenFlyer,
  onOpenAiChat,
  isAdmin,
  onToggleAdmin,
  darkMode,
  onToggleDarkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-amber-200/60 dark:border-slate-800 transition-colors w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 p-0.5 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden">
                <span className="font-extrabold text-xl bg-gradient-to-br from-amber-600 to-red-600 bg-clip-text text-transparent">
                  R
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                REYFLUX
              </span>
              <span className="text-[10px] font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase">
                ENTERPRISES LIMITED
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <a href="#products" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Garri, Palm Oil & Flour
            </a>
            <a href="#pos-services" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              POS Financials
            </a>
            <a href="#delivery" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Doorstep Delivery
            </a>
            <a href="#wholesale" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Wholesale Bulk
            </a>
            <a href="#contact" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Address & Contact
            </a>
          </nav>

          {/* Zone 3: Direct Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            
            {/* Live AI Chat Button */}
            <button
              onClick={onOpenAiChat}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold text-amber-950 dark:text-amber-100 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-900 dark:to-orange-950 border border-amber-300 dark:border-amber-700 rounded-lg hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap"
              title="Live AI Chat Assistant"
            >
              <Bot className="w-4 h-4 text-amber-700 dark:text-amber-300 animate-bounce" />
              <span>Live AI Chat</span>
            </button>

            {/* Direct WhatsApp Callout Button */}
            <a
              href={createWhatsAppUrl("Hello Reyflux Enterprises, I am reaching out from your website to place an order or inquire.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-md whitespace-nowrap"
              title="WhatsApp Customer Hotline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp ({COMPANY_INFO.phones[0]})</span>
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-lg hover:opacity-95 transition-opacity shadow-md shadow-orange-500/20 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 bg-white text-red-600 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={onToggleAdmin}
              className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                isAdmin
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Merchant Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAiChat}
              className="p-2 text-amber-900 bg-amber-200 rounded-lg flex items-center gap-1 text-xs font-bold"
            >
              <Bot className="w-4 h-4 text-amber-700" />
              <span>AI Chat</span>
            </button>
            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-800 dark:text-white bg-amber-100 dark:bg-slate-800 rounded-lg"
            >
              <ShoppingBag className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-amber-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-md"
          >
            Garri, Palm Oil & Cassava Flour
          </a>
          <a
            href="#pos-services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-md"
          >
            POS Financials
          </a>
          <a
            href="#delivery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-md"
          >
            Doorstep Delivery
          </a>
          <a
            href="#wholesale"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-md"
          >
            Wholesale Calculator
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-md"
          >
            Location & Contact
          </a>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAiChat();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-extrabold text-amber-950 bg-amber-200 rounded-lg"
            >
              <Bot className="w-4 h-4 text-amber-800" />
              <span>Launch Live AI Chat Assistant</span>
            </button>

            <a
              href={createWhatsAppUrl("Hello Reyflux Enterprises, I am making an inquiry from mobile.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Us ({COMPANY_INFO.phones[0]})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
