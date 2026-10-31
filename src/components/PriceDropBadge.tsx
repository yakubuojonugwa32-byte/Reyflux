import React from 'react';
import { TrendingDown, Sparkles, Tag } from 'lucide-react';

interface PriceDropBadgeProps {
  price: number;
  originalPrice: number;
  badgeText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceDropBadge: React.FC<PriceDropBadgeProps> = ({
  price,
  originalPrice,
  badgeText,
  size = 'md'
}) => {
  const savingsAmount = Math.max(0, originalPrice - price);
  const discountPercentage = originalPrice > 0 ? Math.round((savingsAmount / originalPrice) * 100) : 0;

  const sizeClasses = {
    sm: {
      priceText: 'text-sm font-black text-red-600 dark:text-red-400 font-mono',
      originalText: 'text-xs text-slate-400 line-through font-mono',
      badge: 'text-[9px] px-1.5 py-0.5'
    },
    md: {
      priceText: 'text-lg font-black text-red-600 dark:text-red-400 font-mono',
      originalText: 'text-xs text-slate-400 line-through font-mono',
      badge: 'text-[10px] px-2 py-0.5'
    },
    lg: {
      priceText: 'text-2xl font-black text-red-600 dark:text-red-400 font-mono',
      originalText: 'text-sm text-slate-400 line-through font-mono',
      badge: 'text-xs px-2.5 py-1'
    }
  }[size];

  return (
    <div className="space-y-1 animate-fade-in">
      
      {/* Price row */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={sizeClasses.priceText}>
          ₦{price.toLocaleString()}
        </span>

        {originalPrice > price && (
          <span className={sizeClasses.originalText}>
            ₦{originalPrice.toLocaleString()}
          </span>
        )}

        {discountPercentage > 0 && (
          <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-300/60 dark:border-emerald-800">
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* Dynamic Price Drop Badge with micro-bounce animation */}
      {(badgeText || savingsAmount > 0) && (
        <div className="inline-flex items-center gap-1.5 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-900 rounded-md font-bold uppercase tracking-wide transform transition-transform hover:scale-105 duration-200 shadow-2xs">
          <TrendingDown className="w-3 h-3 text-red-600 shrink-0 animate-pulse" />
          <span className={sizeClasses.badge}>
            {badgeText || `Lowest Price in 30 Days! (Save ₦${savingsAmount.toLocaleString()})`}
          </span>
        </div>
      )}

    </div>
  );
};
