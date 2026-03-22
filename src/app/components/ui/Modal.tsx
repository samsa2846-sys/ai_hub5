import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 animate-in fade-in" />
        <Dialog.Content
          className={`
            fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            z-50 w-full ${sizes[size]} max-h-[90vh] overflow-y-auto
            bg-white rounded-[20px] p-6
            animate-in fade-in zoom-in-95
          `}
        >
          {title && (
            <Dialog.Title className="text-xl mb-4 pr-8">
              {title}
            </Dialog.Title>
          )}
          <Dialog.Close
            className="absolute right-4 top-4 w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
