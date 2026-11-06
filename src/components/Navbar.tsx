import React, { useState } from 'react';
import { ShoppingCart, User, Search, Phone, MessageSquare, Moon, Sun, Menu, X } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { ReyfluxLogo } from './ReyfluxLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFlyer: () => void;
  onOpenAiChat: () => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenFlyer,
  onOpenAiChat,
  isAdmin,
  onToggleAdmin,
  darkMode,
  onToggleDarkMode,
  searchQuery = '',
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'products' | 'wholesale' | 'delivery' | 'contact'>('home');
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(localSearch);
    }
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollTo = (id: string, tabName: typeof activeTab) => {
    setActiveTab(tabName);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-slate-800 transition-colors shadow-xs">
      
      {/* Top Bar: Brand Logo, Expanded Search, Cart, Account, Live Support */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Brand Logo Zone */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); scrollTo('hero', 'home'); }}
            className="shrink-0 flex items-center group py-1"
            title="Reyflux Enterprises Limited - Home"
          >
            <ReyfluxLogo size="md" />
          </a>

          {/* Large Shopify-Style Centered Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl mx-2 lg:mx-6">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Search premium Palm Oil, Garri, Cassava Flour, Groundnut..."
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                className="w-full pl-4 pr-12 py-2.5 text-xs sm:text-sm bg-[#FAFAF9] dark:bg-slate-800/90 border border-[#E2E8F0] dark:border-slate-700 rounded-xl focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10 dark:focus:border-[#F97316] text-[#0F172A] dark:text-slate-100 placeholder:text-[#64748B] transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-lg flex items-center justify-center transition-colors shadow-xs"
                title="Search foodstuffs"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right Action Tools: WhatsApp Direct, Cart, Account, Theme Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            
            {/* Primary WhatsApp Direct CTA (Desktop) */}
            <a
              href={createWhatsAppUrl("Hello Reyflux Enterprises, I would like to place an order for foodstuffs.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs rounded-xl transition-all shadow-xs"
              title="Instant WhatsApp Order"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Order via WhatsApp</span>
            </a>

            {/* AI Assistant Button (Subtle, Clean) */}
            <button
              onClick={onOpenAiChat}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#F97316] hover:text-[#F97316] text-[#64748B] dark:text-slate-300 font-semibold text-xs rounded-xl transition-colors"
              title="Open AI Product Assistant"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="hidden xl:inline">AI Help</span>
            </button>

            {/* Account Profile Toggle */}
            <button
              onClick={onToggleAdmin}
              className="hidden sm:flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Merchant & Account Settings"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-slate-200">
                <User className="w-4 h-4" />
              </div>
              <div className="leading-tight text-left">
                <span className="block text-xs font-bold text-[#0F172A] dark:text-white">
                  Account
                </span>
                <span className="block text-[10px] text-[#64748B] dark:text-slate-400">
                  {isAdmin ? 'Admin Portal' : 'Sign In'}
                </span>
              </div>
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-3 py-2 bg-[#F8FAFC] dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl transition-all group"
              title="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-[#0F172A] dark:text-white group-hover:text-[#F97316] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-[10px] font-black w-4 h-4 rounded-md flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-xs text-[#0F172A] dark:text-white">
                Cart {cartCount > 0 ? `(${cartCount})` : ''}
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-[#64748B] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#0F172A] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Search Input */}
        <form onSubmit={handleSearchSubmit} className="mt-3 md:hidden flex">
          <div className="relative w-full flex items-center">
            <input
              type="text"
              placeholder="Search Palm Oil, Garri, Flour..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              className="w-full pl-3.5 pr-10 py-2 text-xs bg-[#FAFAF9] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-[#0F172A] dark:text-slate-100"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-[#F97316] text-white rounded-lg flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Secondary Clean Navigation Bar (Shopify Style Tabs) */}
      <div className="border-t border-[#E2E8F0] dark:border-slate-800 bg-[#FAFAF9] dark:bg-slate-900 hidden md:block">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-10 text-xs">
            
            {/* Nav links */}
            <nav className="flex items-center gap-8 font-semibold text-[#64748B] dark:text-slate-300">
              <button
                onClick={() => scrollTo('hero', 'home')}
                className={`py-2 transition-colors relative ${
                  activeTab === 'home'
                    ? 'text-[#F97316] font-bold'
                    : 'hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                Home
                {activeTab === 'home' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316]" />
                )}
              </button>

              <button
                onClick={() => scrollTo('products', 'products')}
                className={`py-2 transition-colors relative ${
                  activeTab === 'products'
                    ? 'text-[#F97316] font-bold'
                    : 'hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                Featured Products
                {activeTab === 'products' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316]" />
                )}
              </button>

              <button
                onClick={() => scrollTo('wholesale-b2b', 'wholesale')}
                className={`py-2 transition-colors relative ${
                  activeTab === 'wholesale'
                    ? 'text-[#F97316] font-bold'
                    : 'hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                Wholesale Depot
                {activeTab === 'wholesale' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316]" />
                )}
              </button>

              <button
                onClick={() => scrollTo('delivery-calc', 'delivery')}
                className={`py-2 transition-colors relative ${
                  activeTab === 'delivery'
                    ? 'text-[#F97316] font-bold'
                    : 'hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                Nationwide Delivery
                {activeTab === 'delivery' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316]" />
                )}
              </button>

              <button
                onClick={() => scrollTo('contact-info', 'contact')}
                className={`py-2 transition-colors relative ${
                  activeTab === 'contact'
                    ? 'text-[#F97316] font-bold'
                    : 'hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                Store Location &amp; Contact
                {activeTab === 'contact' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316]" />
                )}
              </button>
            </nav>

            {/* Quick Trust Marker */}
            <div className="flex items-center gap-4 text-[11px] text-[#64748B] dark:text-slate-400">
              <span className="flex items-center gap-1 font-medium text-[#16A34A] dark:text-emerald-400">
                ✓ Suleja Mill Direct
              </span>
              <span>•</span>
              <span>Waybill to all 36 States</span>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-[#0F172A] dark:text-slate-200">
            <button
              onClick={() => scrollTo('hero', 'home')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('products', 'products')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Featured Products
            </button>
            <button
              onClick={() => scrollTo('wholesale-b2b', 'wholesale')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Wholesale &amp; Bulk Orders
            </button>
            <button
              onClick={() => scrollTo('delivery-calc', 'delivery')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Delivery Fee Calculator
            </button>
            <button
              onClick={() => scrollTo('contact-info', 'contact')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Suleja Depot &amp; Contact
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <a
              href={createWhatsAppUrl("Hello Reyflux Enterprises, I want to order foodstuffs.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#16A34A] text-white font-bold text-xs rounded-xl"
            >
              <Phone className="w-4 h-4" />
              <span>Instant WhatsApp Order</span>
            </a>

            <button
              onClick={() => {
                onOpenAiChat();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-slate-200 dark:border-slate-700 text-[#0F172A] dark:text-white font-bold text-xs rounded-xl"
            >
              <MessageSquare className="w-4 h-4 text-[#F97316]" />
              <span>Ask AI Foodstuffs Assistant</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
