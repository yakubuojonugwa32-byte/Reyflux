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
import { Bot, Phone } from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from './data/companyInfo';

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

      {/* Floating Action Buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        
        {/* Floating WhatsApp Quick Button */}
        <a
          href={createWhatsAppUrl("Hello Reyflux Enterprises, I am reaching out to order Palm Oil, Garri, Cassava Flour, Plantain Flour, Amala Flour, or Groundnut.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-full shadow-2xl transition-all transform hover:scale-105"
          title="Direct WhatsApp Order"
        >
          <Phone className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs">
            WhatsApp ({COMPANY_INFO.phones[0]})
          </span>
        </a>

        {/* Floating Live AI Chat Button */}
        <button
          onClick={() => setIsAiChatOpen(true)}
          className="relative group flex items-center gap-2 px-4 py-3.5 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:opacity-95 text-white font-extrabold text-xs rounded-full shadow-2xl transition-all transform hover:scale-105"
          title="Open Live AI Assistant"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
          <Bot className="w-5 h-5 animate-bounce" />
          <span className="text-xs">Live AI Chat</span>
        </button>

      </div>

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
