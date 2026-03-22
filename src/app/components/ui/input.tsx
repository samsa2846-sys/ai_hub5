import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm text-[#1F2937]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full h-11 px-3 ${icon ? 'pl-10' : ''} 
            border border-[#E5E7EB] rounded-lg 
            bg-white text-[#1F2937] 
            placeholder:text-[#9CA3AF]
            focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/20
            ${error ? 'border-[#EF4444]' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-[#EF4444]">{error}</p>
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
        <label className="block mb-2 text-sm text-[#1F2937]">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-3 py-2 
          border border-[#E5E7EB] rounded-lg 
          bg-white text-[#1F2937] 
          placeholder:text-[#9CA3AF]
          focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/20
          ${error ? 'border-[#EF4444]' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-[#EF4444]">{error}</p>
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
        <label className="block mb-2 text-sm text-[#1F2937]">
          {label}
        </label>
      )}
      <select
        className={`
          w-full h-11 px-3 
          border border-[#E5E7EB] rounded-lg 
          bg-white text-[#1F2937] 
          focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/20
          ${error ? 'border-[#EF4444]' : ''}
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
        <p className="mt-1 text-xs text-[#EF4444]">{error}</p>
      )}
    </div>
  );
}
