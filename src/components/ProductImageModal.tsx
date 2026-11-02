import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../data/products';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  Phone, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { PriceDropBadge } from './PriceDropBadge';

interface ProductImageModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  currentIndex?: number;
  totalProducts?: number;
}

export const ProductImageModal: React.FC<ProductImageModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onNavigatePrev,
  onNavigateNext,
  currentIndex,
  totalProducts
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  // Reset zoom and quantity on product change
  useEffect(() => {
    setIsZoomed(false);
    setQuantity(1);
    setZoomPosition({ x: 50, y: 50 });
  }, [product?.id]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onNavigatePrev) {
        onNavigatePrev();
      } else if (e.key === 'ArrowRight' && onNavigateNext) {
        onNavigateNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock scroll on background
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onNavigatePrev, onNavigateNext]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }, [isZoomed]);

  if (!isOpen || !product) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed view of ${product.name}`}
    >
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-2xl max-w-5xl w-full border border-amber-300/40 dark:border-slate-800 overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              {product.volumeOrWeight}
            </span>
            {currentIndex !== undefined && totalProducts !== undefined && (
              <span className="text-amber-100 text-xs font-medium hidden sm:inline">
                Product {currentIndex + 1} of {totalProducts}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next Header Buttons */}
            {onNavigatePrev && (
              <button
                onClick={onNavigatePrev}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                title="Previous product (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {onNavigateNext && (
              <button
                onClick={onNavigateNext}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                title="Next product (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-colors ml-1"
              title="Close modal (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 lg:p-8">
          
          {/* Left Column: Proper Image Stage */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-3">
            
            {/* Main Image Frame with Zoom Support */}
            <div 
              className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-2 border-amber-300/60 dark:border-slate-700 flex items-center justify-center transition-all ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              style={{ minHeight: '340px', height: '460px' }}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.image}
                alt={product.name}
                className={`max-w-full max-h-full transition-transform duration-200 ${
                  isZoomed 
                    ? 'scale-[2.2] object-contain' 
                    : 'object-contain p-2 hover:scale-[1.02]'
                }`}
                style={
                  isZoomed 
                    ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } 
                    : undefined
                }
              />

              {/* Floating Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                <span className="bg-red-600 text-white text-xs font-black uppercase px-2.5 py-1 rounded shadow-md">
                  {product.badgeText || 'Pure Quality'}
                </span>
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>100% Organic</span>
                </span>
              </div>

              {/* Zoom Action Indicator */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm transition-all"
                title={isZoomed ? "Zoom out" : "Click to magnify packaging details"}
              >
                {isZoomed ? (
                  <>
                    <ZoomOut className="w-4 h-4 text-amber-400" />
                    <span>Zoom Out</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-4 h-4 text-amber-400" />
                    <span>Click to Zoom</span>
                  </>
                )}
              </button>

              {/* Stock Indicator */}
              <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs border border-slate-200 dark:border-slate-800">
                {product.stockCount} in stock in Suleja
              </div>
            </div>

            {/* Image Helper Tip */}
            <div className="flex items-center justify-between w-full text-xs text-slate-500 dark:text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Full authentic product packaging & clarity view</span>
              </span>
              <span>Direct Mill Supply</span>
            </div>

            {/* Quick Browse Buttons (Mobile / Tablet bottom nav) */}
            {(onNavigatePrev || onNavigateNext) && (
              <div className="flex items-center justify-between w-full pt-1">
                <button
                  onClick={onNavigatePrev}
                  disabled={!onNavigatePrev}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Item</span>
                </button>
                <button
                  onClick={onNavigateNext}
                  disabled={!onNavigateNext}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors"
                >
                  <span>Next Item</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Product Details & Fast Purchase */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-900/60">
                  {product.volumeOrWeight} • {product.unit}
                </span>

                <div className="flex items-center gap-1.5 font-bold text-amber-500 text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {product.name}
              </h2>

              {/* Price & Savings */}
              <div className="p-3.5 bg-amber-50/70 dark:bg-slate-800/80 rounded-xl border border-amber-200/80 dark:border-slate-700">
                <PriceDropBadge
                  price={product.price}
                  originalPrice={product.originalPrice}
                  badgeText={product.badgeText}
                  size="lg"
                />
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Quality Guarantee Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero Additives</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>No Preservatives</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>No Added Colours</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Fresh Direct Mill</span>
                </div>
              </div>

              {/* Recommended Uses */}
              {product.uses && product.uses.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Recommended Uses:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.uses.map((use, i) => (
                      <span 
                        key={i} 
                        className="text-[11px] px-2.5 py-1 bg-amber-100/70 dark:bg-slate-800 text-amber-900 dark:text-amber-300 rounded-md font-medium border border-amber-200 dark:border-slate-700"
                      >
                        • {use}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              
              {/* Quantity Picker & Add to Cart */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold transition-colors"
                    title="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-extrabold text-slate-900 dark:text-white min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold transition-colors"
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-extrabold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-all shadow-md shadow-amber-600/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {quantity > 1 ? `${quantity} Units` : ''} to Cart • ₦{(product.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              {/* Direct WhatsApp Ordering */}
              <a
                href={createWhatsAppUrl(`Hello Reyflux Enterprises, I want to order ${quantity} unit(s) of "${product.name}" for N${(product.price * quantity).toLocaleString()}. Please confirm availability and delivery in Suleja/Nationwide.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Instant WhatsApp Order ({COMPANY_INFO.phones[0]})</span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
