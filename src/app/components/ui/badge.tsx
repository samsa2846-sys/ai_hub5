import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'level-S' | 'level-G' | 'level-P' | 'status-active' | 'status-pending' | 'status-closed';
  className?: string;
}

export function Badge({ children, variant = 'level-S', className = '' }: BadgeProps) {
  const variants = {
    'level-S': 'bg-gradient-to-r from-[#64748B] to-[#94A3B8] text-white',
    'level-G': 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0B1C3A]',
    'level-P': 'bg-gradient-to-r from-[#0B1C3A] to-[#1E3A5F] text-white',
    'status-active': 'bg-[#DCFCE7] text-[#166534]',
    'status-pending': 'bg-[#FEF3C7] text-[#92400E]',
    'status-closed': 'bg-[#F1F5F9] text-[#475569]',
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
