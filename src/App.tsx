import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductStore } from './components/ProductStore';
import { DeliveryEstimator } from './components/DeliveryEstimator';
import { WholesaleCalculator } from './components/WholesaleCalculator';
import { LocationAndContact } from './components/LocationAndContact';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { FlyerModal } from './components/FlyerModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LiveAiChatDrawer } from './components/LiveAiChatDrawer';
import { Footer } from './components/Footer';
import { Product } from './data/products';
import { Phone, Sparkles } from 'lucide-react';
import { createWhatsAppUrl } from './data/companyInfo';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFlyerOpen, setIsFlyerOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync Dark Mode with document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-amber-50/20 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-300 relative">
      
      {/* Top Header Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFlyer={() => setIsFlyerOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        isAdmin={isAdminOpen}
        onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Banner Showcase */}
        <HeroSection
          onOpenFlyer={() => setIsFlyerOpen(true)}
          onOpenAiChat={() => setIsAiChatOpen(true)}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Product Store & Volume Estimator */}
        <ProductStore
          onAddToCart={handleAddToCart}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
        />

        {/* Nationwide Doorstep Delivery & Live Tracker */}
        <DeliveryEstimator />

        {/* Commercial Wholesale B2B Calculator */}
        <WholesaleCalculator />

        {/* Store Location & Direct Inquiries */}
        <LocationAndContact />

      </main>

      {/* Floating Action Buttons Dock (Lower Right Corner) */}
      <aside 
        aria-label="Quick Contact & Assistant"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 pointer-events-auto"
      >
        {/* Floating WhatsApp Quick Action Button */}
        <a
          href={createWhatsAppUrl("Hello Reyflux Enterprises, I am reaching out to order Palm Oil, Garri, Flour, or Groundnut.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3.5 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs rounded-full shadow-lg shadow-green-600/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          title="Direct WhatsApp Order"
        >
          <Phone className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap text-xs">
            WhatsApp Order
          </span>
        </a>

        {/* Floating AI Assistant Quick Action Button */}
        <button
          onClick={() => setIsAiChatOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#F97316] text-[#0F172A] dark:text-white font-bold text-xs rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          title="Open AI Foodstuffs Assistant"
        >
          <Sparkles className="w-4 h-4 text-[#F97316] shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap text-xs">
            Ask AI
          </span>
        </button>
      </aside>

      {/* Footer Sign-off */}
      <Footer onOpenFlyer={() => setIsFlyerOpen(true)} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Official Business Flyer Modal Lightbox */}
      <FlyerModal
        isOpen={isFlyerOpen}
        onClose={() => setIsFlyerOpen(false)}
      />

      {/* Live Gemini AI Assistant Drawer */}
      <LiveAiChatDrawer
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />

      {/* Merchant Dashboard Portal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
