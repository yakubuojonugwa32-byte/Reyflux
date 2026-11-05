import React, { useState } from 'react';
import { ShoppingCart, User, Search, Phone, MessageSquare, Moon, Sun, Menu, X, ShieldCheck, ChevronDown } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'home' | 'products' | 'wholesale' | 'delivery' | 'about' | 'contact'>('home');
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
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 transition-colors shadow-2xs">
      
      {/* Top Row: Logo, Search, Account, Cart */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 py-2.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a href="#" className="shrink-0 flex items-center group">
            <ReyfluxLogo size="md" />
          </a>

          {/* Search Bar (Mockup Center) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Search for Palm Oil, Garri, Flour, Groundnut..."
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                className="w-full pl-4 pr-12 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-[#E55318] dark:focus:border-orange-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-3.5 bg-[#E55318] hover:bg-[#D4470E] text-white rounded-r-lg flex items-center justify-center transition-colors shadow-2xs"
                title="Search foodstuffs"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right Tools: Account & Cart */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            
            {/* Account Sign In / Register */}
            <button
              onClick={onToggleAdmin}
              className="hidden sm:flex items-center gap-2 text-left group hover:opacity-85 transition-opacity"
              title="Merchant & Customer Account"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-[#E55318]">
                <User className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <span className="block text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E55318] transition-colors">
                  Account
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                  {isAdmin ? 'Merchant Admin' : 'Sign In / Register'}
                </span>
              </div>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 group hover:opacity-85 transition-opacity"
              title="View Shopping Cart"
            >
              <div className="relative w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-[#E55318]">
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-[#E55318] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              </div>
              <div className="hidden sm:block leading-tight text-left">
                <span className="block text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E55318] transition-colors">
                  Cart
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                  {cartCount} item{cartCount !== 1 ? 's' : ''}
                </span>
              </div>
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Search Input */}
        <form onSubmit={handleSearchSubmit} className="mt-2.5 md:hidden flex">
          <div className="relative w-full flex items-center">
            <input
              type="text"
              placeholder="Search Palm Oil, Garri, Flour..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              className="w-full pl-3 pr-10 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-3 bg-[#E55318] text-white rounded-r-lg flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Row: Navigation Links + Action CTAs (Mockup row 2) */}
      <div className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hidden md:block">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-11">
            
            {/* Nav links */}
            <nav className="flex items-center gap-7 text-xs font-bold text-slate-700 dark:text-slate-300">
              <button
                onClick={() => scrollTo('hero', 'home')}
                className={`py-3 transition-colors relative ${
                  activeTab === 'home'
                    ? 'text-[#E55318] font-black'
                    : 'hover:text-[#E55318]'
                }`}
              >
                Home
                {activeTab === 'home' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E55318]" />
                )}
              </button>

              <button
                onClick={() => scrollTo('products', 'products')}
                className={`py-3 flex items-center gap-1 transition-colors ${
                  activeTab === 'products'
                    ? 'text-[#E55318] font-black'
                    : 'hover:text-[#E55318]'
                }`}
              >
                <span>Products</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <button
                onClick={() => scrollTo('wholesale-b2b', 'wholesale')}
                className={`py-3 transition-colors ${
                  activeTab === 'wholesale'
                    ? 'text-[#E55318] font-black'
                    : 'hover:text-[#E55318]'
                }`}
              >
                Wholesale
              </button>

              <button
                onClick={() => scrollTo('delivery-calc', 'delivery')}
                className={`py-3 transition-colors ${
                  activeTab === 'delivery'
                    ? 'text-[#E55318] font-black'
                    : 'hover:text-[#E55318]'
                }`}
              >
                Delivery
              </button>

              <button
                onClick={() => scrollTo('contact-info', 'about')}
                className={`py-3 transition-colors ${
                  activeTab === 'about'
                    ? 'text-[#E55318] font-black'
                    : 'hover:text-[#E55318]'
                }`}
              >
                About Us
              </button>

              <button
                onClick={() => scrollTo('contact-info', 'contact')}
                className={`py-3 transition-colors ${
                  activeTab === 'contact'
                    ? 'text-[#E55318] font-black'
                    : 'hover:text-[#E55318]'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Action CTAs: Order via WhatsApp + Live AI Chat */}
            <div className="flex items-center gap-3">
              
              {/* Green WhatsApp Button */}
              <a
                href={createWhatsAppUrl("Hello Reyflux Enterprises, I want to order Palm Oil, Garri, Flour, or Groundnut.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B7B4B] hover:bg-[#08633C] text-white font-bold text-xs rounded-lg transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Order via WhatsApp</span>
              </a>

              {/* Red Live AI Chat Button */}
              <button
                onClick={onOpenAiChat}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E13B1F] hover:bg-[#C92F15] text-white font-bold text-xs rounded-lg transition-colors shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live AI Chat</span>
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-3">
          <button
            onClick={() => scrollTo('hero', 'home')}
            className="w-full text-left py-2 text-sm font-bold text-slate-800 dark:text-slate-200"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('products', 'products')}
            className="w-full text-left py-2 text-sm font-bold text-slate-800 dark:text-slate-200"
          >
            Products
          </button>
          <button
            onClick={() => scrollTo('wholesale-b2b', 'wholesale')}
            className="w-full text-left py-2 text-sm font-bold text-slate-800 dark:text-slate-200"
          >
            Wholesale
          </button>
          <button
            onClick={() => scrollTo('delivery-calc', 'delivery')}
            className="w-full text-left py-2 text-sm font-bold text-slate-800 dark:text-slate-200"
          >
            Delivery
          </button>
          <button
            onClick={() => scrollTo('contact-info', 'contact')}
            className="w-full text-left py-2 text-sm font-bold text-slate-800 dark:text-slate-200"
          >
            About & Contact
          </button>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <a
              href={createWhatsAppUrl("Hello Reyflux Enterprises, I am placing an order from mobile.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#0B7B4B] text-white rounded-lg text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Order via WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onOpenAiChat();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#E13B1F] text-white rounded-lg text-xs font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live AI Chat</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
