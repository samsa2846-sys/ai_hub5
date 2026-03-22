import React from 'react';
import { Link, useLocation } from 'react-router';
import { X, Home, Search, FileText, MessageSquare, User, Package, Heart, Settings, HelpCircle } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Главная', path: '/' },
  { icon: Search, label: 'Каталог', path: '/catalog' },
  { icon: FileText, label: 'Мои RFQ', path: '/rfq' },
  { icon: MessageSquare, label: 'Чаты', path: '/chats' },
  { icon: Package, label: 'Сделки', path: '/deals' },
  { icon: Heart, label: 'Избранное', path: '/favorites' },
  { icon: User, label: 'Профиль', path: '/profile' },
  { icon: Settings, label: 'Настройки', path: '/settings' },
  { icon: HelpCircle, label: 'Помощь', path: '/help' },
];

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-white z-50 animate-in slide-in-from-left">
        <div className="flex items-center justify-between px-4 h-16 border-b border-[#F3F4F6]">
          <span className="text-lg font-semibold text-[#1F2937]">Меню</span>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-[#F3F4F6] rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-[#6B7280]" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-[#2563EB]/10 text-[#2563EB]' 
                    : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
