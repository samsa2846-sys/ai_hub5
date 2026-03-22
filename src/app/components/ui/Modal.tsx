import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  };

  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, handleEscapeKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0B1C3A]/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className={`
            relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto
            bg-white rounded-2xl shadow-2xl
            animate-in zoom-in-95 fade-in duration-200
          `}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
              <h2 className="text-xl font-semibold text-[#0B1C3A]">{title}</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors"
              >
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>
          )}
          
          {/* Close button when no title */}
          {!title && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F1F5F9] transition-colors z-10"
            >
              <X className="w-5 h-5 text-[#64748B]" />
            </button>
          )}
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
