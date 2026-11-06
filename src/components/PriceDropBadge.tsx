import React from 'react';
import { TrendingDown } from 'lucide-react';

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
      priceText: 'text-sm font-bold text-slate-900 dark:text-white font-mono',
      originalText: 'text-xs text-slate-400 line-through font-mono',
      savingsText: 'text-[11px] text-[#0B7B4B] dark:text-emerald-400 font-semibold'
    },
    md: {
      priceText: 'text-lg font-bold text-slate-900 dark:text-white font-mono',
      originalText: 'text-xs text-slate-400 line-through font-mono',
      savingsText: 'text-xs text-[#0B7B4B] dark:text-emerald-400 font-semibold'
    },
    lg: {
      priceText: 'text-2xl font-extrabold text-[#E55318] dark:text-orange-400 font-mono',
      originalText: 'text-sm text-slate-400 line-through font-mono',
      savingsText: 'text-sm text-[#0B7B4B] dark:text-emerald-400 font-semibold'
    }
  }[size];

  return (
    <div className="space-y-0.5">
      {/* Clean Price Row */}
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
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            ({discountPercentage}% off)
          </span>
        )}
      </div>

      {/* Quiet, unboxed savings proof (No heavy badge box, no pulsating dots) */}
      {savingsAmount > 0 && (
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          Save ₦{savingsAmount.toLocaleString()} direct from mill
        </div>
      )}
    </div>
  );
};
