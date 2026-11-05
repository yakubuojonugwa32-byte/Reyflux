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
  // Height sizing for the brand emblem
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-20'
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/assets/brand-logo.png"
        alt="Reyflux Enterprises Limited - The Flow of Quality Products"
        className={`${heights[size]} w-auto object-contain transition-transform group-hover:scale-[1.02]`}
      />
    </div>
  );
};

