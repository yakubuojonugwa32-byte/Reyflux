import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { PriceDropBadge } from './PriceDropBadge';
import { COMPANY_INFO, createWhatsAppUrl } from '../data/companyInfo';
import { Sparkles, Bot, ShoppingBag, Phone, RefreshCw, Star, ArrowRight } from 'lucide-react';

interface AiRecommendationSectionProps {
  onAddToCart: (product: Product, quantity: number) => void;
  sessionData: {
    viewedProductIds: string[];
    categoryAffinities: Record<string, number>;
    recentSearch: string;
  };
}

interface RecommendedProduct extends Product {
  aiReason?: string;
}

export const AiRecommendationSection: React.FC<AiRecommendationSectionProps> = ({
  onAddToCart,
  sessionData
}) => {
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData)
      });
      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      console.error('Failed to fetch AI recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [sessionData.viewedProductIds.length, sessionData.recentSearch]);

  if (loading) {
    return (
      <div className="p-6 bg-amber-500/10 rounded-2xl border border-amber-300/40 space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
          <span>AI Engine is analyzing your session preferences...</span>
        </div>
      </div>
    );
  }

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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-amber-100 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
          <span>Refresh AI Picks</span>
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
              <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-2 leading-snug">
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
