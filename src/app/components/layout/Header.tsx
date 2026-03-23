import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, Heart, Bell, Star, Menu, Sparkles } from 'lucide-react';
import { userProfile } from '../../data/mockData';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0B1C3A] border-b border-[#1E3A5F] shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 lg:gap-4 h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-[#D4AF37] hover:bg-white/10 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 lg:gap-3 shrink-0">
            <div className="w-9 h-9 lg:w-11 lg:h-11 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-[#0B1C3A] text-lg lg:text-xl font-bold">B</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg lg:text-xl font-bold text-white leading-tight">
                Bridge
              </span>
              <span className="text-xs text-[#D4AF37] font-medium -mt-0.5">Factory Hub</span>
            </div>
          </Link>

          {/* Premium Search Bar */}
          <div className="flex-1 flex justify-center px-2 lg:px-4">
            <div 
              className={`
                relative flex items-center
                w-full max-w-xl min-w-0 lg:min-w-[320px]
                bg-[#0F1F2F] rounded-2xl
                border-2 transition-all duration-300
                ${mounted ? 'search-appear' : 'opacity-0'}
                ${isSearchFocused 
                  ? 'border-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.5)]' 
                  : 'border-[#D4AF37] border-pulse-gold'
                }
              `}
            >
              {/* Gold Search Icon */}
              <Search className="absolute left-3 lg:left-4 w-4 h-4 lg:w-5 lg:h-5 text-[#D4AF37]" />
              
              {/* Input Field */}
              <input
                type="text"
                placeholder="Поиск по 10,000+ фабрик..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="
                  flex-1 h-10 lg:h-12 pl-9 lg:pl-12 pr-2
                  bg-transparent text-white text-sm lg:text-base
                  placeholder:text-[#64748B]
                  focus:outline-none
                "
              />
              
              {/* Gold Search Button */}
              <button 
                className="
                  h-8 lg:h-10 px-3 lg:px-5 mr-1
                  bg-gradient-to-r from-[#D4AF37] to-[#E4C030]
                  hover:from-[#E4C030] hover:to-[#F4D03F]
                  text-[#0B1C3A] font-semibold text-xs lg:text-sm rounded-xl
                  transition-all duration-300
                  whitespace-nowrap flex items-center gap-1.5
                "
              >
                <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">Найти</span>
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 lg:gap-2">
            {/* Favorites */}
            <Link
              to="/favorites"
              className="hidden sm:flex w-9 h-9 lg:w-10 lg:h-10 items-center justify-center text-white/60 hover:text-[#D4AF37] hover:bg-white/10 rounded-xl transition-all"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Notifications */}
            <button className="hidden sm:flex relative w-9 h-9 lg:w-10 lg:h-10 items-center justify-center text-white/60 hover:text-[#D4AF37] hover:bg-white/10 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border-2 border-[#0B1C3A] animate-pulse"></span>
            </button>

            {/* User profile with stars */}
            <Link
              to="/profile"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 rounded-full px-2 lg:px-3 py-1.5 transition-all border border-white/10 hover:border-[#D4AF37]/30"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover ring-2 ring-[#D4AF37]/50"
              />
              <div className="hidden md:flex items-center gap-1 pr-0.5">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-sm font-semibold text-white">{userProfile.stars}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
