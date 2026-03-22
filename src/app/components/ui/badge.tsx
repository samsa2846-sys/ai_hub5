import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'level-S' | 'level-G' | 'level-P' | 'status-active' | 'status-pending' | 'status-closed';
  className?: string;
}

export function Badge({ children, variant = 'level-S', className = '' }: BadgeProps) {
  const variants = {
    'level-S': 'bg-[#9CA3AF] text-white',
    'level-G': 'bg-[#FBBF24] text-white',
    'level-P': 'bg-[#3B82F6] text-white',
    'status-active': 'bg-[#D1FAE5] text-[#065F46]',
    'status-pending': 'bg-[#FEF3C7] text-[#92400E]',
    'status-closed': 'bg-[#F3F4F6] text-[#4B5563]',
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
