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
  const scales = {
    sm: {
      emblem: 'w-7 h-7 sm:w-8 sm:h-8',
      title: 'text-base sm:text-lg',
      sub: 'text-[8.5px] sm:text-[9.5px] tracking-[0.2em]',
      tagline: 'text-[7px] sm:text-[8px]'
    },
    md: {
      emblem: 'w-9 h-9 sm:w-11 sm:h-11',
      title: 'text-lg sm:text-2xl',
      sub: 'text-[9.5px] sm:text-[11px] tracking-[0.22em]',
      tagline: 'text-[8px] sm:text-[9px]'
    },
    lg: {
      emblem: 'w-12 h-12 sm:w-14 sm:h-14',
      title: 'text-2xl sm:text-3xl',
      sub: 'text-xs sm:text-sm tracking-[0.24em]',
      tagline: 'text-[9px] sm:text-[10px]'
    },
    xl: {
      emblem: 'w-16 h-16 sm:w-20 sm:h-20',
      title: 'text-3xl sm:text-4xl',
      sub: 'text-sm sm:text-base tracking-[0.26em]',
      tagline: 'text-xs'
    }
  };

  const currentScale = scales[size] || scales.md;

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none transition-transform group-hover:scale-[1.01] ${className}`}>
      {/* High-Fidelity Vector Emblem */}
      <div className={`relative ${currentScale.emblem} shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="reyflux_primary_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="60%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="reyflux_inner_gold" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
            <linearGradient id="reyflux_seed_glow" x1="20%" y1="20%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
          </defs>

          {/* Outer Swirling Flow Crescent */}
          <path
            d="M 50,6 C 75,6 94,25 94,50 C 94,74 76,92 52,94 C 36,95 22,86 14,73 C 24,80 37,83 49,82 C 67,81 81,67 81,50 C 81,33 67,19 50,19 C 32,19 18,34 18,52 C 18,57 19,62 22,66 C 14,60 9,50 9,39 C 9,21 27,6 50,6 Z"
            fill="url(#reyflux_primary_grad)"
          />

          {/* Golden Inner Swoosh Accent */}
          <path
            d="M 40,26 C 54,26 66,37 66,51 C 66,62 58,71 48,74 C 55,71 60,64 60,56 C 60,45 51,36 40,36 C 33,36 28,39 24,44 C 27,33 33,26 40,26 Z"
            fill="url(#reyflux_inner_gold)"
            opacity="0.95"
          />

          {/* Center Organic Palm Oil Droplet / Seed */}
          <path
            d="M 46,39 C 55,39 61,46 61,54 C 61,64 51,75 40,79 C 33,74 27,65 27,56 C 27,47 36,39 46,39 Z"
            fill="url(#reyflux_seed_glow)"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        
        {/* REYFLUX */}
        <div className="flex items-baseline">
          <span className={`font-black uppercase tracking-tight text-[#0F172A] dark:text-white ${currentScale.title}`}>
            REY<span className="text-[#F97316]">FLUX</span>
          </span>
        </div>

        {/* ENTERPRISES LIMITED */}
        <span className={`font-bold text-[#64748B] dark:text-slate-400 ${currentScale.sub} uppercase mt-0.5`}>
          ENTERPRISES LIMITED
        </span>

        {/* Tagline */}
        {showTagline && (
          <span className={`font-medium tracking-wider text-[#94A3B8] dark:text-slate-500 ${currentScale.tagline} uppercase mt-0.5`}>
            THE FLOW OF QUALITY PRODUCTS
          </span>
        )}

      </div>
    </div>
  );
};
