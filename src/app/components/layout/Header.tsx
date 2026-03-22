import React, { useState } from 'react';
import { Link } from 'react-router';
import { Search, Mic, Heart, Bell, Star, Menu } from 'lucide-react';
import { userProfile } from '../../data/mockData';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#F3F4F6]">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#1F2937] hover:bg-[#F3F4F6] rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <span className="text-white text-lg lg:text-xl font-semibold">B</span>
            </div>
            <span className="hidden sm:block text-lg lg:text-xl font-semibold text-[#1F2937]">
              Bridge
            </span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Поиск фабрик, товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-12 pr-12 bg-[#F3F4F6] rounded-full text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-[#E5E7EB] rounded-full transition-colors">
                <Mic className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Favorites */}
            <Link
              to="/favorites"
              className="hidden sm:flex w-10 h-10 lg:w-11 lg:h-11 items-center justify-center text-[#6B7280] hover:bg-[#F3F4F6] rounded-lg transition-colors"
            >
              <Heart className="w-5 h-5 lg:w-6 lg:h-6" />
            </Link>

            {/* Notifications */}
            <button className="hidden sm:flex relative w-10 h-10 lg:w-11 lg:h-11 items-center justify-center text-[#6B7280] hover:bg-[#F3F4F6] rounded-lg transition-colors">
              <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full"></span>
            </button>

            {/* User profile with stars */}
            <Link
              to="/profile"
              className="flex items-center gap-2 lg:gap-3 bg-[#F3F4F6] rounded-full px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-[#E5E7EB] transition-colors"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover"
              />
              <div className="hidden md:flex items-center gap-1.5 pr-1">
                <Star className="w-4 h-4 text-[#FBBF24] fill-[#FBBF24]" />
                <span className="text-sm font-medium text-[#1F2937]">{userProfile.stars}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
