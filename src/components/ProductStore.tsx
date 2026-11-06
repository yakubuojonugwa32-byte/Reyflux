import React, { useState } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { ProductImageModal } from './ProductImageModal';
import { InfiniteProductFeed } from './InfiniteProductFeed';
import { 
  ShoppingCart, Heart, Star, Truck, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, 
  Package, MapPin, Calculator, FileText, ChevronDown, ChevronUp, ZoomIn, Phone
} from 'lucide-react';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';

interface ProductStoreProps {
  onAddToCart: (product: Product, quantity: number) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery?: string;
}

// 5 Featured Products matching the user's mockup precisely
const FEATURED_PRODUCTS_MOCKUP = [
  {
    id: 'palm-oil-4l',
    name: 'Pure Organic Palm Oil',
    spec: '4 Litres Jerrycan',
    price: 14500,
    originalPrice: 18500,
    discount: '-22%',
    rating: 4.9,
    reviews: 128,
    image: '/assets/product-palm-oil.png',
    highResImage: '/assets/palm-oil-hires.jpg',
    isBestSeller: true,
    category: 'palm_oil'
  },
  {
    id: 'garri-yellow-10kg',
    name: 'Premium Yellow Garri',
    spec: '10kg Bag',
    price: 18000,
    originalPrice: 22000,
    discount: '-18%',
    rating: 4.8,
    reviews: 94,
    image: '/assets/product-garri.png',
    highResImage: '/assets/foodstuffs-hires.jpg',
    isBestSeller: false,
    category: 'garri'
  },
  {
    id: 'cassava-flour-25kg',
    name: 'Cassava Flour',
    spec: '25kg Bag',
    price: 34000,
    originalPrice: 40000,
    discount: '-15%',
    rating: 4.8,
    reviews: 76,
    image: '/assets/product-cassava-flour.png',
    highResImage: '/assets/foodstuffs-hires.jpg',
    isBestSeller: false,
    category: 'cassava_flour'
  },
  {
    id: 'plantain-flour-25kg',
    name: 'Plantain Flour',
    spec: '25kg Bag',
    price: 28000,
    originalPrice: 34500,
    discount: '-19%',
    rating: 4.7,
    reviews: 65,
    image: '/assets/product-plantain-flour.png',
    highResImage: '/assets/foodstuffs-hires.jpg',
    isBestSeller: false,
    category: 'plantain_flour'
  },
  {
    id: 'groundnut-raw-10kg',
    name: 'Raw Groundnut Seeds',
    spec: '10kg Bag',
    price: 21000,
    originalPrice: 26000,
    discount: '-19%',
    rating: 4.8,
    reviews: 58,
    image: '/assets/product-groundnut.png',
    highResImage: '/assets/foodstuffs-hires.jpg',
    isBestSeller: false,
    category: 'groundnut'
  }
];

// Delivery fee rates
const DELIVERY_LOCATIONS: Record<string, { name: string; baseFee: number; time: string }> = {
  suleja_central: { name: 'Suleja Central & Yaro College Area', baseFee: 1200, time: '20 - 45 Minutes' },
  madalla: { name: 'Madalla & Zuma Rock Junction', baseFee: 1500, time: '30 - 55 Minutes' },
  gauraka: { name: 'Gauraka & Dakwa Outskirts', baseFee: 1800, time: '40 - 60 Minutes' },
  abuja_kubwa: { name: 'Abuja (Kubwa & Dutse Express)', baseFee: 2500, time: '45 - 75 Minutes' },
  abuja_gwarinpa: { name: 'Abuja (Gwarinpa, Jabi & Utako)', baseFee: 3000, time: '1 - 2 Hours' },
  abuja_central: { name: 'Abuja (Wuse 2, Maitama & Central Area)', baseFee: 3500, time: 'Same-Day Express' },
  minna: { name: 'Minna (Niger State Capital Hub)', baseFee: 4000, time: 'Next-Day Dispatch' },
  kaduna: { name: 'Kaduna Central Commercial Hub', baseFee: 5000, time: '24 - 48 Hours' },
  kano: { name: 'Kano & Northern Hubs', baseFee: 6000, time: '24 - 48 Hours' },
  lagos: { name: 'Lagos & Western Region Interstate', baseFee: 6500, time: 'Waybill Express' },
  other: { name: 'All Other Nigerian States', baseFee: 7000, time: 'Waybill Express' }
};

export const ProductStore: React.FC<ProductStoreProps> = ({
  onAddToCart,
  selectedCategory,
  onSelectCategory,
  searchQuery = ''
}) => {
  // Wishlist state
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Modal view state for full proper image viewing
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [showFullPriceTable, setShowFullPriceTable] = useState<boolean>(true);

  // Delivery Calculator Card State
  const [selectedLocationKey, setSelectedLocationKey] = useState<string>('suleja_central');
  const [packageSize, setPackageSize] = useState<'small' | 'medium' | 'bulk'>('medium');
  const [calculatedMessage, setCalculatedMessage] = useState<string | null>(null);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProductForModal(product);
  };

  const currentProductIndex = selectedProductForModal 
    ? PRODUCTS.findIndex((p) => p.id === selectedProductForModal.id)
    : -1;

  const handleNavigatePrev = () => {
    if (currentProductIndex === -1) return;
    const prevIndex = (currentProductIndex - 1 + PRODUCTS.length) % PRODUCTS.length;
    setSelectedProductForModal(PRODUCTS[prevIndex]);
  };

  const handleNavigateNext = () => {
    if (currentProductIndex === -1) return;
    const nextIndex = (currentProductIndex + 1) % PRODUCTS.length;
    setSelectedProductForModal(PRODUCTS[nextIndex]);
  };

  // Compute fee
  const loc = DELIVERY_LOCATIONS[selectedLocationKey] || DELIVERY_LOCATIONS['suleja_central'];
  const sizeMultiplier = packageSize === 'small' ? 0.8 : packageSize === 'medium' ? 1.0 : 1.5;
  const currentFee = Math.round(loc.baseFee * sizeMultiplier);
  const currentTime = loc.time;

  const handleCalculateClick = () => {
    setCalculatedMessage(`Delivery fee for ${loc.name} (${packageSize.toUpperCase()} size) is ₦${currentFee.toLocaleString()} (Estimated Time: ${currentTime}). Ready to dispatch!`);
    setTimeout(() => setCalculatedMessage(null), 6000);
  };

  return (
    <section id="products" className="py-6 sm:py-8 bg-white dark:bg-slate-950">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 space-y-7">
        
        {/* ROW 1: FEATURED PRODUCTS (LEFT) + DELIVERY FEE CALCULATOR (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* LEFT COLUMN: FEATURED PRODUCTS GRID (COL-SPAN-8) */}
          <div className="lg:col-span-8 space-y-3">
            
            {/* Header: Title + View All link */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Featured Products
              </h2>
              <a
                href="#all-products-feed"
                className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#E55318] transition-colors inline-flex items-center gap-1"
              >
                <span>View All Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 5 Product Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
              {FEATURED_PRODUCTS_MOCKUP.map((item) => {
                const foundInCatalog = PRODUCTS.find((p) => p.id === item.id) || PRODUCTS[0];
                const activeProduct: Product = {
                  ...foundInCatalog,
                  id: item.id,
                  name: item.name,
                  image: item.image,
                  highResImage: (item as any).highResImage || foundInCatalog.highResImage,
                  price: item.price,
                  originalPrice: item.originalPrice,
                  volumeOrWeight: item.spec,
                  category: item.category as any,
                  rating: item.rating,
                  reviewsCount: item.reviews
                };
                const isFavorited = !!wishlist[item.id];

                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-2.5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow group relative h-full"
                  >
                    {/* Image Stage (Clean, zero floating badges) */}
                    <div className="relative mb-2">
                      <div 
                        className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-stone-100 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800/60 relative cursor-pointer flex items-center justify-center" 
                        onClick={() => handleProductClick(activeProduct)}
                        title="Click to view packaging and details"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Wishlist Button (Clean rounded-md, no pill) */}
                      <button
                        onClick={(e) => toggleWishlist(item.id, e)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-md bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-red-600 transition-colors shadow-2xs"
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-red-600 text-red-600' : ''}`} />
                      </button>
                    </div>

                    {/* Product Info (Refined Typography) */}
                    <div className="space-y-1 mb-2">
                      <h3
                        onClick={() => handleProductClick(activeProduct)}
                        className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-tight line-clamp-1 hover:text-[#E55318] cursor-pointer"
                        title={item.name}
                      >
                        {item.name}
                      </h3>
                      
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {item.spec}
                      </div>

                      {/* Price Row (Clean, zero loud badge chips) */}
                      <div className="flex items-baseline gap-1.5 flex-wrap pt-0.5">
                        <span className="font-mono font-bold text-xs sm:text-sm text-[#E55318] dark:text-orange-400">
                          ₦{item.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through">
                          ₦{item.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                          ({item.discount})
                        </span>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-500" />
                          ))}
                        </div>
                        <span className="font-semibold text-[10px]">{item.rating} ({item.reviews})</span>
                      </div>
                    </div>

                    {/* Add to Cart Button (Solid Orange) */}
                    <button
                      onClick={() => onAddToCart(activeProduct, 1)}
                      className="w-full py-1.5 px-2 bg-[#E55318] hover:bg-[#D4470E] text-white font-bold text-xs rounded-lg transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT COLUMN: DELIVERY FEE CALCULATOR CARD (COL-SPAN-4) */}
          <div id="delivery-calc" className="lg:col-span-4 bg-[#FFFDF9] dark:bg-slate-900 border border-amber-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
            
            {/* Header */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E8F5E9] dark:bg-emerald-950 flex items-center justify-center text-[#0B7B4B] dark:text-emerald-400 shrink-0 mt-0.5">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                  Delivery Fee Calculator
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Get instant delivery cost estimate
                </p>
              </div>
            </div>

            {/* Select Location */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Select Location
              </label>
              <select
                value={selectedLocationKey}
                onChange={(e) => setSelectedLocationKey(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#E55318]"
              >
                {Object.entries(DELIVERY_LOCATIONS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Package Size Tabs */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Package Size
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPackageSize('small')}
                  className={`py-1.5 px-2 text-[11px] font-bold rounded-md transition-all text-center leading-tight ${
                    packageSize === 'small'
                      ? 'bg-[#E55318] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Small <br />
                  <span className="text-[9px] font-normal">(4L - 10L)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPackageSize('medium')}
                  className={`py-1.5 px-2 text-[11px] font-bold rounded-md transition-all text-center leading-tight ${
                    packageSize === 'medium'
                      ? 'bg-[#E55318] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Medium <br />
                  <span className="text-[9px] font-normal">(25L / 25kg)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPackageSize('bulk')}
                  className={`py-1.5 px-2 text-[11px] font-bold rounded-md transition-all text-center leading-tight ${
                    packageSize === 'bulk'
                      ? 'bg-[#E55318] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Bulk <br />
                  <span className="text-[9px] font-normal">(50L+)</span>
                </button>
              </div>
            </div>

            {/* Delivery Estimates Display */}
            <div className="space-y-2 pt-1 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Estimated Delivery Fee
                </span>
                <span className="font-mono font-black text-xl text-[#E55318] dark:text-orange-400">
                  ₦{currentFee.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium">
                  Estimated Time
                </span>
                <span className="font-bold text-[#0B7B4B] dark:text-emerald-400 flex items-center gap-1">
                  ⏱ {currentTime}
                </span>
              </div>
            </div>

            {/* Calculate Button (Solid Green) */}
            <button
              onClick={handleCalculateClick}
              className="w-full py-2.5 px-4 bg-[#0B7B4B] hover:bg-[#08633C] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <span>Calculate for My Location</span>
            </button>

            {/* Notice / Calculated Message feedback */}
            {calculatedMessage && (
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-200 font-medium animate-fadeIn">
                {calculatedMessage}
              </div>
            )}

          </div>

        </div>

        {/* ROW 2: COMMERCIAL SERVICES & COMPREHENSIVE SOCIAL PROOF */}
        <div className="space-y-6">
          
          {/* 2-Column Services Row (Clean, reduced banners) */}
          <div id="wholesale-b2b" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Card 1: Wholesale & B2B Supply */}
            <div className="bg-[#043323] text-white rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-xs">
              <div className="space-y-2.5 z-10 max-w-[70%]">
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-emerald-300 uppercase">
                  <Package className="w-4 h-4" />
                  <span>Wholesale &amp; Commercial Supply</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  Bulk Foodstuffs for Hotels, Restaurants &amp; Bakeries
                </h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
                  Guaranteed volume supply in 25L/50L drums and 25kg/50kg sacks with dedicated wholesale depot invoicing.
                </p>
                <div className="pt-2">
                  <a
                    href={createWhatsAppUrl("Hello Reyflux Enterprises, I would like to request a wholesale quotation for bulk supply.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#043323] hover:bg-emerald-50 rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <span>Get Wholesale Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Graphic on right */}
              <div className="absolute right-0 bottom-0 top-0 w-36 sm:w-44 flex items-end justify-end pointer-events-none p-2 opacity-90">
                <img
                  src="/assets/wholesale-sacks.png"
                  alt="Wholesale grain sacks and palm oil containers"
                  className="max-h-full object-contain object-bottom"
                />
              </div>
            </div>

            {/* Card 2: We Deliver Nationwide */}
            <div className="bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xs space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                  <Truck className="w-4 h-4 text-[#0B7B4B]" />
                  <span>Nationwide Logistics Coverage</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                  From Suleja Depot to Every State in Nigeria
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Same-day local dispatch in Suleja &amp; Abuja FCT; 24–48hr interstate waybill.
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="w-1/2 flex items-center justify-center">
                  <img
                    src="/assets/nigeria-map.png"
                    alt="Nigeria map delivery coverage"
                    className="max-h-24 w-auto object-contain"
                  />
                </div>

                <div className="w-1/2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {['Suleja & Niger State (Same-Day)', 'Abuja FCT (Same-Day)', 'Kaduna & Kano (24-48h)', 'Lagos & All 36 States (Waybill)'].map((st, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0B7B4B] shrink-0" />
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* DEDICATED SOCIAL PROOF & VERIFIED REVIEWS SHOWCASE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
            
            {/* Social Proof Header & Stats Scorecard */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#E55318] dark:text-orange-400 uppercase tracking-wider">
                  Social Proof · Real Customer Feedback
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Trusted by Over 850+ Households &amp; Food Vendors
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                  Read authentic experiences from verified customers across Niger State, Abuja FCT, and interstate delivery destinations.
                </p>
              </div>

              {/* Rating Summary Block */}
              <div className="flex items-center gap-3 shrink-0 p-3 bg-stone-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono leading-none">
                  4.9
                </div>
                <div className="space-y-0.5">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500" />
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    850+ Verified Ratings
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Verified Reviews Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  avatar: '/assets/avatar-amina.png',
                  name: 'Amina S.',
                  location: 'Abuja FCT (Kubwa)',
                  product: 'Pure Organic Palm Oil 25L',
                  date: 'November 2026',
                  comment: 'The palm oil has no chemical smell, no artificial red dye, and does not separate or curdle. Soup aroma was unmatched. Same-day delivery to Kubwa!'
                },
                {
                  avatar: '/assets/avatar-chinedu.png',
                  name: 'Chinedu K.',
                  location: 'Kaduna Central',
                  product: 'Premium Yellow Garri 25kg',
                  date: 'October 2026',
                  comment: 'Extra dry, crispy, and zero stones or sand. Fried with genuine palm oil. The swallow texture is exceptional.'
                },
                {
                  avatar: '/assets/avatar-amina.png',
                  name: 'Hajiya Fatima',
                  location: 'Minna, Niger State',
                  product: 'Unripe Plantain Flour 5kg',
                  date: 'November 2026',
                  comment: '100% authentic unripe plantain flour. Very smooth when prepared for swallow, perfect for our healthy diabetic meal plan.'
                },
                {
                  avatar: '/assets/avatar-chinedu.png',
                  name: 'Alhaji Babangida',
                  location: 'Suleja Commercial Canteen',
                  product: 'Palm Oil 50L Bulk Drum',
                  date: 'October 2026',
                  comment: 'We buy monthly for our restaurant. The jerrycans and drums are sealed with tamper-proof lids. Consistent depot quality.'
                }
              ].map((rev, idx) => (
                <div 
                  key={idx} 
                  className="bg-stone-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    {/* Stars & Verified Proof */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-500" />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold text-[#0B7B4B] dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Customer Meta */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2.5">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="text-[11px] leading-tight">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {rev.name}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400">
                        {rev.location}
                      </div>
                      <div className="text-[10px] text-[#E55318] dark:text-orange-400 font-medium mt-0.5">
                        {rev.product}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* ROW 3: ALL PRODUCTS CONTINUOUS FEED & SPECIFICATION DIRECTORY */}
        <div id="all-products-feed" className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-6">

          {/* COMPLETE SPECIFICATIONS & PRICE DIRECTORY TABLE */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#E55318]" />
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    Official Foodstuffs Directory &amp; Depot Pricing
                  </h3>
                  <p className="text-xs text-slate-500">
                    Comprehensive catalog with current stock levels in Suleja
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowFullPriceTable(!showFullPriceTable)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span>{showFullPriceTable ? 'Hide Table View' : 'Show Full Directory Table'}</span>
                {showFullPriceTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {showFullPriceTable && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[11px] font-black uppercase text-slate-900 dark:text-white">
                      <th className="py-2.5 px-3">Product &amp; Packaging</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Direct Price</th>
                      <th className="py-2.5 px-3">Guarantee</th>
                      <th className="py-2.5 px-3">Depot Stock</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {PRODUCTS.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0 cursor-pointer"
                              onClick={() => handleProductClick(prod)}
                              title="Click to view full image"
                            />
                            <div>
                              <span 
                                onClick={() => handleProductClick(prod)}
                                className="font-extrabold text-slate-900 dark:text-white hover:text-[#E55318] transition-colors cursor-pointer block"
                              >
                                {prod.name}
                              </span>
                              <span className="text-[10px] text-[#E55318] dark:text-orange-400 font-bold">
                                {prod.volumeOrWeight} • {prod.unit}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 capitalize font-semibold text-[11px]">
                          {prod.category.replace('_', ' ')}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-black text-slate-900 dark:text-white font-mono text-sm">
                            ₦{prod.price.toLocaleString()}
                          </div>
                          {prod.originalPrice > prod.price && (
                            <div className="text-[10px] text-slate-400 line-through">
                              ₦{prod.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex flex-col gap-0.5 text-[10px]">
                            <span className="text-[#0B7B4B] font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> 100% Natural Organic
                            </span>
                            <span className="text-slate-500 font-medium">
                              Zero Additives • Direct Mill
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            {prod.stockCount} in stock
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            <button
                              onClick={() => onAddToCart(prod, 1)}
                              className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#E55318] hover:bg-[#D4470E] rounded-lg transition-colors flex items-center gap-1"
                              title="Add to cart"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                            <a
                              href={createWhatsAppUrl(`Hello Reyflux Enterprises, I want to order "${prod.name}" (${prod.volumeOrWeight}) for N${prod.price.toLocaleString()}.`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-1"
                              title="Order via WhatsApp"
                            >
                              <Phone className="w-3 h-3" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* CONTINUOUS DISCOVERY FEED */}
          <div id="discovery-feed" className="space-y-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              Continuous Foodstuffs Feed
            </h3>
            <InfiniteProductFeed
              onAddToCart={onAddToCart}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
              onProductClick={handleProductClick}
            />
          </div>

        </div>

      </div>

      {/* High-Resolution Product Image View Lightbox Modal */}
      <ProductImageModal
        product={selectedProductForModal}
        isOpen={!!selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={onAddToCart}
        onNavigatePrev={handleNavigatePrev}
        onNavigateNext={handleNavigateNext}
        currentIndex={currentProductIndex}
        totalProducts={PRODUCTS.length}
      />
    </section>
  );
};
