import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface FlashSaleTimerProps {
  claimedPercentage?: number;
  itemsLeft?: number;
  onClaimClick?: () => void;
}

export const FlashSaleTimer: React.FC<FlashSaleTimerProps> = ({
  claimedPercentage = 84,
  itemsLeft = 14,
  onClaimClick
}) => {
  // Target 4 hours, 32 minutes, 15 seconds from load
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 32,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 }; // Loop for demo
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white rounded-2xl p-4 sm:p-5 shadow-xl border border-red-400/40 space-y-3">
      
      {/* Top Banner Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold">
            <Flame className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base leading-tight tracking-tight">
              FLASH SALE • LIMITED BATCH DEALS
            </h4>
            <p className="text-[11px] text-amber-100 font-medium">
              Extreme price drops on fresh Organic Palm Oil & Garri
            </p>
          </div>
        </div>

        {/* Real-time Ticking Countdown Digits */}
        <div className="flex items-center gap-1.5 font-mono">
          <div className="flex flex-col items-center">
            <div className="bg-black/60 backdrop-blur-md text-amber-400 text-sm sm:text-base font-black px-2.5 py-1 rounded-lg border border-amber-400/30 min-w-[36px] text-center shadow-inner">
              {formatDigit(timeLeft.hours)}
            </div>
            <span className="text-[9px] text-amber-100 uppercase mt-0.5">Hours</span>
          </div>
          <span className="text-amber-300 font-extrabold text-base pb-3">:</span>

          <div className="flex flex-col items-center">
            <div className="bg-black/60 backdrop-blur-md text-amber-400 text-sm sm:text-base font-black px-2.5 py-1 rounded-lg border border-amber-400/30 min-w-[36px] text-center shadow-inner">
              {formatDigit(timeLeft.minutes)}
            </div>
            <span className="text-[9px] text-amber-100 uppercase mt-0.5">Mins</span>
          </div>
          <span className="text-amber-300 font-extrabold text-base pb-3">:</span>

          <div className="flex flex-col items-center">
            <div className="bg-black/60 backdrop-blur-md text-red-300 text-sm sm:text-base font-black px-2.5 py-1 rounded-lg border border-red-400/50 min-w-[36px] text-center shadow-inner">
              {formatDigit(timeLeft.seconds)}
            </div>
            <span className="text-[9px] text-amber-100 uppercase mt-0.5">Secs</span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Claim Metrics */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between items-center text-xs font-bold text-amber-100">
          <span className="flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{claimedPercentage}% of batch claimed</span>
          </span>
          <span className="text-amber-200 font-mono">Only {itemsLeft} units left in stock</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-black/40 h-3 rounded-md overflow-hidden p-0.5 border border-white/20">
          <div
            className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 h-full rounded-sm transition-all duration-1000 shadow-md relative"
            style={{ width: `${claimedPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Claim Action Button */}
      {onClaimClick && (
        <button
          onClick={onClaimClick}
          className="w-full mt-2 py-2.5 px-4 bg-white hover:bg-amber-50 text-red-700 font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
        >
          <span>Claim Flash Sale Discount Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      )}

    </div>
  );
};
