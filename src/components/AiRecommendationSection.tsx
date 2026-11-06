import React, { useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { Sparkles, ShoppingBag, Phone, RefreshCw, ZoomIn, CheckCircle2 } from 'lucide-react';

interface AiRecommendationSectionProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick?: (product: Product) => void;
  sessionData?: {
    viewedProductIds?: string[];
    categoryAffinities?: Record<string, number>;
    recentSearch?: string;
  };
}

interface RecommendedProduct extends Product {
  aiReason?: string;
}

const DEFAULT_SESSION_DATA = {
  viewedProductIds: [] as string[],
  categoryAffinities: {} as Record<string, number>,
  recentSearch: ''
};

const getClientFallbackRecommendations = (
  viewedProductIds: string[] = [],
  categoryAffinities: Record<string, number> = {}
): RecommendedProduct[] => {
  const sortedCategories = Object.entries(categoryAffinities || {})
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .map(([cat]) => cat);

  const primaryCat = sortedCategories[0] || 'palm_oil';
  const categoryPicks = PRODUCTS.filter((p) => p.category === primaryCat);
  const nonViewed = PRODUCTS.filter((p) => !viewedProductIds.includes(p.id));

  const combined = Array.from(new Set([...categoryPicks, ...nonViewed, ...PRODUCTS]));
  const selected = combined.slice(0, 4);

  return selected.map((p) => ({
    ...p,
    aiReason:
      p.category === primaryCat
        ? 'Frequently Bought with Your Selection'
        : p.isPopular
        ? 'Depot Top Choice'
        : 'Recommended for You'
  }));
};

export const AiRecommendationSection: React.FC<AiRecommendationSectionProps> = ({
  onAddToCart,
  onProductClick,
  sessionData = DEFAULT_SESSION_DATA
}) => {
  const safeSession = {
    viewedProductIds: sessionData?.viewedProductIds || [],
    categoryAffinities: sessionData?.categoryAffinities || {},
    recentSearch: sessionData?.recentSearch || ''
  };

  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>(() =>
    getClientFallbackRecommendations(
      safeSession.viewedProductIds,
      safeSession.categoryAffinities
    )
  );
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchRecommendations = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(safeSession)
      });

      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        setRecommendations(
          getClientFallbackRecommendations(
            safeSession.viewedProductIds,
            safeSession.categoryAffinities
          )
        );
        return;
      }

      const data = await res.json();
      if (Array.isArray(data?.recommendations) && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
      } else {
        setRecommendations(
          getClientFallbackRecommendations(
            safeSession.viewedProductIds,
            safeSession.categoryAffinities
          )
        );
      }
    } catch {
      setRecommendations(
        getClientFallbackRecommendations(
          safeSession.viewedProductIds,
          safeSession.categoryAffinities
        )
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  const viewedCount = safeSession.viewedProductIds.length;
  const recentSearch = safeSession.recentSearch;

  useEffect(() => {
    fetchRecommendations();
  }, [viewedCount, recentSearch]);

  if (recommendations.length === 0 && !isRefreshing) return null;

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-slate-800 space-y-5 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-950/60 flex items-center justify-center text-[#F97316]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white tracking-tight">
              Recommended For Your Session
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
              Curated items tailored to your browsing and dietary preferences
            </p>
          </div>
        </div>

        <button
          onClick={fetchRecommendations}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0F172A] dark:text-slate-300 bg-[#F8FAFC] dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700 hover:border-[#F97316] disabled:opacity-60 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#F97316] ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh Picks'}</span>
        </button>
      </div>

      {/* Grid: 4 Cards or Skeleton Loaders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isRefreshing ? (
          // Skeleton Loaders
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#F8FAFC] dark:bg-slate-800/50 rounded-2xl p-4 border border-[#E2E8F0] dark:border-slate-800 opacity-80 space-y-3">
              <div className="aspect-[4/3] w-full bg-slate-200 dark:bg-slate-700 rounded-xl" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl" />
            </div>
          ))
        ) : (
          recommendations.map((product) => (
            <div
              key={product.id}
              className="bg-[#FAFAF9] dark:bg-slate-800/60 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 p-4 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                
                {/* AI Reason Line */}
                <div className="text-[11px] font-semibold text-[#F97316] flex items-center gap-1">
                  <span>✨</span>
                  <span>{product.aiReason || 'Direct Mill Match'}</span>
                </div>

                {/* Image Frame with Strict 4:3 Ratio */}
                <div 
                  onClick={() => onProductClick?.(product)}
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 cursor-pointer flex items-center justify-center"
                  title="Click to view full image and details"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-1.5 rounded-lg bg-white/95 dark:bg-slate-900/95 text-[#0F172A] dark:text-white shadow-xs text-[10px] font-bold flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5 text-[#F97316]" />
                      <span>Inspect</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-0.5">
                  <span className="font-bold text-[#0F172A] dark:text-slate-300">
                    {product.volumeOrWeight}
                  </span>
                  <span className="font-semibold text-[#16A34A] dark:text-emerald-400">
                    {product.stockCount} in stock
                  </span>
                </div>

                <h4 
                  onClick={() => onProductClick?.(product)}
                  className="font-bold text-xs sm:text-[13px] text-[#0F172A] dark:text-white leading-snug cursor-pointer hover:text-[#F97316] transition-colors line-clamp-1"
                >
                  {product.name}
                </h4>

                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono font-black text-sm text-[#0F172A] dark:text-white">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="font-mono text-[10px] text-[#94A3B8] line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons: Add to Cart (Orange) & WhatsApp (Green) */}
              <div className="pt-2 grid grid-cols-2 gap-2 border-t border-[#E2E8F0] dark:border-slate-700/80">
                <button
                  onClick={() => onAddToCart(product, 1)}
                  className="w-full flex items-center justify-center gap-1 py-2 px-2 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl transition-colors shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>

                <a
                  href={createWhatsAppUrl(`Hello Reyflux Enterprises, I want to order "${product.name}" (${product.volumeOrWeight}) for N${product.price.toLocaleString()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1 py-2 px-2 text-xs font-bold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          ))
        )}
      </div>

    </section>
  );
};
