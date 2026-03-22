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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#F3F4F6] safe-area-inset-bottom">
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
              <Icon 
                className={`w-6 h-6 ${isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'}`}
              />
              <span 
                className={`text-xs ${isActive ? 'text-[#2563EB] font-medium' : 'text-[#6B7280]'}`}
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
