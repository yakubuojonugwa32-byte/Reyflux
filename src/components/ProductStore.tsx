import React, { useState } from 'react';
import { Product } from '../data/products';
import { FlashSaleTimer } from './FlashSaleTimer';
import { AiRecommendationSection } from './AiRecommendationSection';
import { InfiniteProductFeed } from './InfiniteProductFeed';
import { Calculator, Sparkles } from 'lucide-react';

interface ProductStoreProps {
  onAddToCart: (product: Product, quantity: number) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ProductStore: React.FC<ProductStoreProps> = ({
  onAddToCart,
  selectedCategory,
  onSelectCategory
}) => {
  // Session behavior state for AI recommendation engine
  const [sessionData, setSessionData] = useState<{
    viewedProductIds: string[];
    categoryAffinities: Record<string, number>;
    recentSearch: string;
  }>({
    viewedProductIds: ['palm-oil-25l', 'garri-yellow-5kg'],
    categoryAffinities: { palm_oil: 3, garri: 4 },
    recentSearch: ''
  });

  const trackProductClick = (product: Product) => {
    setSessionData((prev) => {
      const updatedViewed = Array.from(new Set([product.id, ...prev.viewedProductIds]));
      const updatedAffinities = {
        ...prev.categoryAffinities,
        [product.category]: (prev.categoryAffinities[product.category] || 0) + 1
      };
      return {
        ...prev,
        viewedProductIds: updatedViewed,
        categoryAffinities: updatedAffinities
      };
    });
  };

  const handleCategorySelect = (cat: string) => {
    onSelectCategory(cat);
    setSessionData((prev) => ({
      ...prev,
      categoryAffinities: {
        ...prev.categoryAffinities,
        [cat]: (prev.categoryAffinities[cat] || 0) + 1
      }
    }));
  };

  // Interactive Volume Calculator state
  const [calcLiters, setCalcLiters] = useState(10);
  const [calcGarriKg, setCalcGarriKg] = useState(25);

  const estimatedPalmOilCost = calcLiters * 3400;
  const estimatedGarriCost = calcGarriKg * 1360;

  return (
    <section id="products" className="py-16 bg-slate-50/50 dark:bg-slate-900/50 border-t border-amber-200/50 dark:border-slate-800 space-y-12 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Guaranteed Direct Supply</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Organic Foodstuffs Discovery Feed
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400">
            Fresh unadulterated red palm oil, crispy fried Garri, and High Quality Cassava Flour. 100% Natural, zero preservatives, direct from primary mill to your doorstep.
          </p>
        </div>

        {/* 1. GAMIFIED URGENCY COUNTDOWN TIMER */}
        <FlashSaleTimer
          claimedPercentage={88}
          itemsLeft={12}
          onClaimClick={() => {
            const el = document.getElementById('discovery-feed');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. REAL-TIME AI RECOMMENDATION ENGINE */}
        <AiRecommendationSection
          onAddToCart={onAddToCart}
          sessionData={sessionData}
        />

        {/* Interactive Volume Quick Calculator Bar */}
        <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 dark:from-amber-950/40 dark:to-slate-900 p-6 sm:p-8 rounded-2xl border border-amber-300/60 dark:border-amber-900/50 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-base sm:text-lg">
            <Calculator className="w-5 h-5 text-amber-600" />
            <h3>Interactive Order Estimator</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-amber-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                <span className="text-slate-800 dark:text-slate-200">Palm Oil Needed (Litres):</span>
                <span className="text-amber-600 font-mono text-base font-extrabold">{calcLiters} Litres</span>
              </div>
              <input
                type="range"
                min="4"
                max="200"
                step="2"
                value={calcLiters}
                onChange={(e) => setCalcLiters(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
                <span className="text-slate-500">Estimated Cost:</span>
                <span className="font-extrabold text-slate-900 dark:text-white font-mono text-base">
                  ₦{estimatedPalmOilCost.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-amber-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                <span className="text-slate-800 dark:text-slate-200">Garri Needed (Kg):</span>
                <span className="text-amber-600 font-mono text-base font-extrabold">{calcGarriKg} kg</span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={calcGarriKg}
                onChange={(e) => setCalcGarriKg(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
                <span className="text-slate-500">Estimated Cost:</span>
                <span className="font-extrabold text-slate-900 dark:text-white font-mono text-base">
                  ₦{estimatedGarriCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. INFINITE SCROLL DISCOVERY FEED WITH DYNAMIC PRICE-DROP BADGES */}
        <div id="discovery-feed" className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Continuous Discovery Feed
            </h3>
          </div>

          <InfiniteProductFeed
            onAddToCart={(prod, qty) => {
              trackProductClick(prod);
              onAddToCart(prod, qty);
            }}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            onProductClick={trackProductClick}
          />
        </div>

      </div>
    </section>
  );
};
