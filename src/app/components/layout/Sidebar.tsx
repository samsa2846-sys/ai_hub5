import React from 'react';
import { Link, useLocation } from 'react-router';
import { Home, Search, FileText, MessageSquare, User, Package, Heart, Settings, HelpCircle } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';
import { userProfile } from '../../data/mockData';

const menuItems = [
  { icon: Home, label: 'Главная', path: '/' },
  { icon: Search, label: 'Каталог', path: '/catalog' },
  { icon: FileText, label: 'Мои RFQ', path: '/rfq' },
  { icon: MessageSquare, label: 'Чаты', path: '/chats' },
  { icon: Package, label: 'Сделки', path: '/deals' },
  { icon: Heart, label: 'Избранное', path: '/favorites' },
  { icon: User, label: 'Профиль', path: '/profile' },
];

const bottomItems = [
  { icon: Settings, label: 'Настройки', path: '/settings' },
  { icon: HelpCircle, label: 'Помощь', path: '/help' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E2E8F0] h-[calc(100vh-80px)] sticky top-20">
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-[#0B1C3A] to-[#1E3A5F] text-white shadow-lg' 
                  : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0B1C3A]'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#D4AF37]' : ''}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Level progress */}
      <div className="p-4 border-t border-[#E2E8F0]">
        <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#0B1C3A]">Уровень {userProfile.level}</span>
            <span className="text-xs font-semibold text-[#D4AF37]">{userProfile.levelProgress}%</span>
          </div>
          <Progress.Root className="h-2 bg-white rounded-full overflow-hidden shadow-inner">
            <Progress.Indicator
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] transition-transform rounded-full"
              style={{ transform: `translateX(-${100 - userProfile.levelProgress}%)` }}
            />
          </Progress.Root>
          <p className="text-xs text-[#64748B] mt-2">До следующего уровня: {100 - userProfile.levelProgress}%</p>
        </div>

        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1
                ${isActive 
                  ? 'bg-gradient-to-r from-[#0B1C3A] to-[#1E3A5F] text-white shadow-lg' 
                  : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0B1C3A]'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#D4AF37]' : ''}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
