import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}

export function Progress({ value, max = 100, className = '', indicatorClassName = '' }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div 
      className={`h-2 bg-[#E2E8F0] rounded-full overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={`h-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full transition-all duration-500 ${indicatorClassName}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
