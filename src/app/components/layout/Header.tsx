import React, { useState } from 'react';
import { Link } from 'react-router';
import { Search, Mic, Heart, Bell, Star, Menu } from 'lucide-react';
import { userProfile } from '../../data/mockData';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#0B1C3A] hover:bg-[#F1F5F9] rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 lg:w-11 lg:h-11 bg-gradient-to-br from-[#0B1C3A] to-[#1E3A5F] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-[#D4AF37] text-lg lg:text-xl font-bold">B</span>
            </div>
            <span className="hidden sm:block text-lg lg:text-xl font-bold text-[#0B1C3A]">
              Bridge
            </span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className={`
              relative transition-all duration-300
              ${isSearchFocused ? 'transform scale-[1.02]' : ''}
            `}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <input
                type="text"
                placeholder="Поиск фабрик, товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`
                  w-full h-11 pl-12 pr-12 bg-[#F1F5F9] rounded-xl text-sm 
                  placeholder:text-[#94A3B8] focus:outline-none 
                  border-2 transition-all duration-300
                  ${isSearchFocused ? 'border-[#D4AF37] bg-white shadow-lg' : 'border-transparent'}
                `}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-[#E2E8F0] rounded-full transition-colors">
                <Mic className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Favorites */}
            <Link
              to="/favorites"
              className="hidden sm:flex w-10 h-10 lg:w-11 lg:h-11 items-center justify-center text-[#64748B] hover:text-[#D4AF37] hover:bg-[#F1F5F9] rounded-xl transition-all"
            >
              <Heart className="w-5 h-5 lg:w-6 lg:h-6" />
            </Link>

            {/* Notifications */}
            <button className="hidden sm:flex relative w-10 h-10 lg:w-11 lg:h-11 items-center justify-center text-[#64748B] hover:text-[#D4AF37] hover:bg-[#F1F5F9] rounded-xl transition-all">
              <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border-2 border-white"></span>
            </button>

            {/* User profile with stars */}
            <Link
              to="/profile"
              className="flex items-center gap-2 lg:gap-3 bg-gradient-to-r from-[#F1F5F9] to-[#E2E8F0] rounded-full px-2 lg:px-4 py-1.5 lg:py-2 hover:from-[#E2E8F0] hover:to-[#CBD5E1] transition-all border border-[#E2E8F0]"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover ring-2 ring-[#D4AF37]/30"
              />
              <div className="hidden md:flex items-center gap-1.5 pr-1">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-sm font-semibold text-[#0B1C3A]">{userProfile.stars}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
