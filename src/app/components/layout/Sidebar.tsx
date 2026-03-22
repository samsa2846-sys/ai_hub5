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
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-[#F3F4F6] h-[calc(100vh-80px)] sticky top-20">
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
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

      {/* Level progress */}
      <div className="p-4 border-t border-[#F3F4F6]">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#6B7280]">Уровень {userProfile.level}</span>
            <span className="text-xs text-[#9CA3AF]">{userProfile.levelProgress}%</span>
          </div>
          <Progress.Root className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
            <Progress.Indicator
              className="h-full bg-[#10B981] transition-transform"
              style={{ transform: `translateX(-${100 - userProfile.levelProgress}%)` }}
            />
          </Progress.Root>
        </div>

        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1
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
      </div>
    </aside>
  );
}
