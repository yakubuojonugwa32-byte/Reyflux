import React from 'react';

interface ReyfluxLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  lightText?: boolean;
}

export const ReyfluxLogo: React.FC<ReyfluxLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  lightText = false
}) => {
  // Dimensions based on size
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const titleSizes = {
    sm: 'text-base font-black tracking-tight',
    md: 'text-xl sm:text-2xl font-black tracking-tighter leading-none',
    lg: 'text-3xl font-black tracking-tighter leading-none',
    xl: 'text-4xl font-black tracking-tighter leading-none'
  };

  const subSizes = {
    sm: 'text-[8px] font-extrabold tracking-wider',
    md: 'text-[9.5px] sm:text-[10.5px] font-extrabold tracking-widest',
    lg: 'text-[13px] font-extrabold tracking-widest',
    xl: 'text-[16px] font-extrabold tracking-widest'
  };

  const taglineSizes = {
    sm: 'text-[6px]',
    md: 'text-[7.5px] sm:text-[8.5px]',
    lg: 'text-[10px]',
    xl: 'text-[12px]'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      
      {/* Dynamic Graphic Swoosh Mark (R Emblem) */}
      <div className={`relative shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Top Outer Yellow-Orange Gradient */}
            <linearGradient id="reyfluxTopSwirl" x1="20" y1="10" x2="120" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="45%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>

            {/* Inner Crimson Red Gradient */}
            <linearGradient id="reyfluxRedFlame" x1="10" y1="60" x2="120" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="60%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>

            {/* Text Fill Gradient */}
            <linearGradient id="reyfluxTextGradient" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="35%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
          </defs>

          {/* Outer Main Crescent Swirl (Yellow to Deep Orange) */}
          <path
            d="M 125 32 C 100 2, 50 2, 22 35 C -2 70 8 115 50 135 C 90 152 135 125 125 95 C 120 80 102 75 92 88 C 78 106 48 108 35 90 C 22 72 32 45 55 35 C 78 25 108 30 125 32 Z"
            fill="url(#reyfluxTopSwirl)"
          />

          {/* Secondary Top Swoosh Crest */}
          <path
            d="M 112 48 C 88 24 55 24 38 42 C 24 58 28 85 45 96 C 60 105 82 98 88 88 C 72 96 52 92 42 78 C 32 64 36 48 48 38 C 65 24 95 36 112 48 Z"
            fill="url(#reyfluxTopSwirl)"
            opacity="0.9"
          />

          {/* Inner Flame "R" Center Sweep (Deep Crimson Red) */}
          <path
            d="M 32 88 C 30 115 65 132 108 132 C 122 132 132 130 112 125 C 70 118 48 98 48 72 C 48 50 68 38 90 44 C 105 48 112 62 102 72 C 92 82 72 80 62 70 C 58 66 65 58 75 60 C 85 62 90 70 82 74 C 74 78 62 76 60 68 C 58 60 70 52 85 54 C 98 56 102 68 94 78 C 82 92 58 92 45 80 C 38 72 40 60 48 50 C 35 62 30 75 32 88 Z"
            fill="url(#reyfluxRedFlame)"
          />

          {/* Sharp 'R' Leg Sweep */}
          <path
            d="M 45 82 C 40 98 48 115 65 128 C 48 118 42 102 48 88 C 52 78 60 70 65 65 C 55 70 48 76 45 82 Z"
            fill="#991B1B"
          />
        </svg>
      </div>

      {/* Typography Block */}
      <div className="flex flex-col justify-center">
        
        {/* REYFLUX - Bold Orange Red Gradient */}
        <div className={`font-extrabold uppercase font-['Plus_Jakarta_Sans',sans-serif] ${titleSizes[size]}`}>
          <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 bg-clip-text text-transparent drop-shadow-2xs">
            REYFLUX
          </span>
        </div>

        {/* ENTERPRISES LIMITED - Crimson Red Subtext */}
        <div className={`font-black uppercase tracking-widest text-red-700 dark:text-red-500 ${subSizes[size]}`}>
          ENTERPRISES LIMITED
        </div>

        {/* ...THE FLOW OF QUALITY PRODUCTS... Tagline */}
        {showTagline && (
          <div className={`font-bold italic uppercase tracking-wider text-slate-600 dark:text-slate-400 ${taglineSizes[size]}`}>
            THE FLOW OF QUALITY PRODUCTS...
          </div>
        )}

      </div>

    </div>
  );
};
