import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: 'bg-[#0B1C3A] hover:bg-[#1E3A5F] text-white focus:ring-[#0B1C3A]',
    secondary: 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0B1C3A] focus:ring-[#64748B]',
    outline: 'border-2 border-[#E2E8F0] hover:border-[#D4AF37] hover:bg-[#F8FAFC] text-[#0B1C3A] focus:ring-[#D4AF37]',
    ghost: 'hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0B1C3A] focus:ring-[#64748B]',
    gold: 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] hover:from-[#C4A030] hover:to-[#E4C030] text-[#0B1C3A] focus:ring-[#D4AF37] shadow-lg',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
