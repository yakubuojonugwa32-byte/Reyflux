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
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');
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
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed view of ${product.name}`}
    >
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-2xl w-[96vw] max-w-[1720px] border border-amber-300/40 dark:border-slate-800 overflow-hidden flex flex-col h-[92vh] max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar (Clean unboxed typography) */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="uppercase tracking-wider">
              {product.volumeOrWeight}
            </span>
            <span aria-hidden="true" className="text-white/60">·</span>
            <span className="text-amber-100">
              {product.unit}
            </span>
            {currentIndex !== undefined && totalProducts !== undefined && (
              <>
                <span aria-hidden="true" className="text-white/60">·</span>
                <span className="text-amber-100 hidden sm:inline">
                  Item {currentIndex + 1} of {totalProducts}
                </span>
              </>
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

        {/* Modal Main Body (70% Image Width / 30% Details Width) */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row gap-5 p-3 sm:p-5 lg:p-6 min-h-0">
          
          {/* Left Column: Image Stage occupying 70% of modal width (Unobstructed, zero badge clutter) */}
          <div className="w-full lg:w-[70%] lg:max-w-[70%] flex flex-col h-full min-h-0 justify-between space-y-2">
            
            {/* Main Image Frame stretching to full available height & 70% width */}
            <div 
              className={`relative w-full flex-1 min-h-0 rounded-2xl overflow-hidden bg-gradient-to-b from-stone-900 via-slate-900 to-black border border-stone-800 flex items-center justify-center transition-all ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.highResImage || product.image}
                alt={product.name}
                className={`w-full h-full transition-transform duration-300 ${
                  fitMode === 'cover' ? 'object-cover' : 'object-contain'
                } ${
                  isZoomed 
                    ? 'scale-[2.4]' 
                    : 'hover:scale-[1.01]'
                }`}
                style={
                  isZoomed 
                    ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } 
                    : undefined
                }
              />

              {/* Action Buttons: Full Height Toggle & Zoom Action Indicator */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFitMode(fitMode === 'contain' ? 'cover' : 'contain');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-black/75 hover:bg-black text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm transition-all"
                  title="Toggle Full Height Fill"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{fitMode === 'contain' ? 'Fill Height' : 'Fit Entire'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-black/75 hover:bg-black text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm transition-all"
                  title={isZoomed ? "Zoom out" : "Click to magnify packaging details"}
                >
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5 text-amber-400" />
                      <span>Zoom Out</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                      <span>Zoom</span>
                    </>
                  )}
                </button>
              </div>

              {/* Stock Indicator */}
              <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs border border-slate-200 dark:border-slate-800 z-10">
                {product.stockCount} in stock in Suleja
              </div>
            </div>

            {/* Quick Browse Bar (Previous / Next Item) */}
            {(onNavigatePrev || onNavigateNext) && (
              <div className="flex items-center justify-between w-full pt-1 shrink-0 text-xs text-slate-600 dark:text-slate-400 font-bold">
                <button
                  onClick={onNavigatePrev}
                  disabled={!onNavigatePrev}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <span className="text-[11px] text-slate-500 font-normal">
                  Authentic packaging view • Direct Mill Supply
                </span>
                <button
                  onClick={onNavigateNext}
                  disabled={!onNavigateNext}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Product Details & Fast Purchase occupying remaining 30% */}
          <div className="w-full lg:w-[30%] lg:max-w-[30%] flex flex-col justify-between overflow-y-auto h-full pr-1.5 space-y-4 min-h-0">
            <div className="space-y-3.5">
              
              {/* Category & Rating (Clean unboxed metadata) */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold uppercase tracking-wider">
                  {product.volumeOrWeight} · {product.unit}
                </span>

                <div className="flex items-center gap-1 font-semibold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {product.name}
              </h2>

              {/* Price & Savings */}
              <div className="pt-1">
                <PriceDropBadge
                  price={product.price}
                  originalPrice={product.originalPrice}
                  badgeText={product.badgeText}
                  size="lg"
                />
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Quality Guarantee (Clean unboxed list, zero badge clutter) */}
              <div className="space-y-1.5 py-1 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0B7B4B] shrink-0" />
                  <span>100% Pure Organic · Zero additives or artificial colors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0B7B4B] shrink-0" />
                  <span>Direct Mill Supply · Sealed anti-spill packaging</span>
                </div>
              </div>

              {/* Recommended Uses */}
              {product.uses && product.uses.length > 0 && (
                <div className="space-y-1 pt-1 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider block">
                    Culinary &amp; Food Applications:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
                    {product.uses.join(' · ')}
                  </p>
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800 shrink-0">
              
              {/* Quantity Picker & Add to Cart */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold transition-colors"
                    title="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-extrabold text-slate-900 dark:text-white min-w-[2.2rem] text-center">
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
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-extrabold text-white bg-[#E55318] hover:bg-[#D4470E] rounded-xl transition-all shadow-md shadow-orange-500/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {quantity > 1 ? `${quantity} Units` : ''} • ₦{(product.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              {/* Direct WhatsApp Ordering */}
              <a
                href={createWhatsAppUrl(`Hello Reyflux Enterprises, I want to order ${quantity} unit(s) of "${product.name}" for N${(product.price * quantity).toLocaleString()}. Please confirm availability and delivery in Suleja/Nationwide.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-extrabold text-white bg-[#0B7B4B] hover:bg-[#08633C] rounded-xl transition-colors shadow-xs"
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
