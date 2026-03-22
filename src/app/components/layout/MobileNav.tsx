import React from 'react';
import { Link, useLocation } from 'react-router';
import { Home, Search, FileText, MessageSquare, User } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Главная', path: '/' },
  { icon: Search, label: 'Каталог', path: '/catalog' },
  { icon: FileText, label: 'RFQ', path: '/rfq' },
  { icon: MessageSquare, label: 'Чаты', path: '/chats' },
  { icon: User, label: 'Профиль', path: '/profile' },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-2"
            >
              <div className={`
                p-2 rounded-xl transition-all duration-200
                ${isActive ? 'bg-gradient-to-r from-[#0B1C3A] to-[#1E3A5F] shadow-lg' : ''}
              `}>
                <Icon 
                  className={`w-5 h-5 ${isActive ? 'text-[#D4AF37]' : 'text-[#64748B]'}`}
                />
              </div>
              <span 
                className={`text-xs ${isActive ? 'text-[#0B1C3A] font-semibold' : 'text-[#64748B]'}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
