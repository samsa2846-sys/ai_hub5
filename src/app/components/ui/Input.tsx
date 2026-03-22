import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#0B1C3A] mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0]
          bg-white text-[#0B1C3A] placeholder:text-[#94A3B8]
          focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20
          transition-all duration-200
          disabled:bg-[#F1F5F9] disabled:cursor-not-allowed
          ${error ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-[#DC2626]">{error}</p>
      )}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ label, error, className = '', ...props }: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#0B1C3A] mb-1.5">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0]
          bg-white text-[#0B1C3A] placeholder:text-[#94A3B8]
          focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20
          transition-all duration-200 resize-none
          disabled:bg-[#F1F5F9] disabled:cursor-not-allowed
          ${error ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-[#DC2626]">{error}</p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#0B1C3A] mb-1.5">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 rounded-xl border-2 border-[#E2E8F0]
          bg-white text-[#0B1C3A]
          focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20
          transition-all duration-200 cursor-pointer
          disabled:bg-[#F1F5F9] disabled:cursor-not-allowed
          ${error ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 text-sm text-[#DC2626]">{error}</p>
      )}
    </div>
  );
}
