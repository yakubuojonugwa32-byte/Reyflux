import React, { useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { PriceDropBadge } from './PriceDropBadge';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { Sparkles, Bot, ShoppingBag, Phone, RefreshCw, Star, ArrowRight, ZoomIn } from 'lucide-react';

interface AiRecommendationSectionProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick?: (product: Product) => void;
  sessionData: {
    viewedProductIds: string[];
    categoryAffinities: Record<string, number>;
    recentSearch: string;
  };
}

interface RecommendedProduct extends Product {
  aiReason?: string;
}

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
        ? `Top Pick in Organic Foodstuffs`
        : p.isPopular
        ? 'Top Seller in Suleja'
        : 'Recommended for Your Kitchen'
  }));
};

export const AiRecommendationSection: React.FC<AiRecommendationSectionProps> = ({
  onAddToCart,
  onProductClick,
  sessionData
}) => {
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>(() =>
    getClientFallbackRecommendations(
      sessionData.viewedProductIds,
      sessionData.categoryAffinities
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
        body: JSON.stringify(sessionData)
      });

      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        setRecommendations(
          getClientFallbackRecommendations(
            sessionData.viewedProductIds,
            sessionData.categoryAffinities
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
            sessionData.viewedProductIds,
            sessionData.categoryAffinities
          )
        );
      }
    } catch {
      setRecommendations(
        getClientFallbackRecommendations(
          sessionData.viewedProductIds,
          sessionData.categoryAffinities
        )
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [sessionData.viewedProductIds.length, sessionData.recentSearch]);

  if (recommendations.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-red-500/10 rounded-3xl p-6 sm:p-8 border border-amber-300/60 dark:border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 text-white flex items-center justify-center font-bold shadow-md">
            <Bot className="w-5 h-5 text-white animate-bounce" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Real-Time AI Personalization</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Recommended For Your Session
            </h3>
          </div>
        </div>

        <button
          onClick={fetchRecommendations}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-amber-100 disabled:opacity-60 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Analyzing...' : 'Refresh AI Picks'}</span>
        </button>
      </div>

      {/* Recommended Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              
              {/* AI Reason Tag */}
              <div className="inline-block bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-amber-300/60 dark:border-amber-800">
                ✨ {product.aiReason || 'Matches your interest'}
              </div>

              {/* Image Frame */}
              <div 
                onClick={() => onProductClick?.(product)}
                className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-850 cursor-pointer group/rec"
                title="Click to view full image and details"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover/rec:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/rec:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white shadow-md text-[10px] font-bold flex items-center gap-1">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-600" />
                    <span>View</span>
                  </span>
                </div>
              </div>

              <h4 
                onClick={() => onProductClick?.(product)}
                className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-2 leading-snug cursor-pointer hover:text-amber-600 transition-colors"
              >
                {product.name}
              </h4>

              <PriceDropBadge
                price={product.price}
                originalPrice={product.originalPrice}
                size="sm"
              />
            </div>

            {/* Quick Action */}
            <div className="pt-2">
              <button
                onClick={() => onAddToCart(product, 1)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
