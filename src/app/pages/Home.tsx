import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Factory, Users, ShieldCheck, MessageSquare, Search, Cpu, Shirt, Settings, Package, Sparkles, Cog, Box } from 'lucide-react';
import { mockFactories } from '../data/mockData';
import { FactoryCard } from '../components/factory/FactoryCard';
import { FactoryCardSkeleton } from '../components/ui/Skeleton';

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }
  }, [startOnView]);

  useEffect(() => {
    if (!startOnView) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

// Quick filter chips
const quickFilters = [
  { label: 'Электроника', icon: Cpu },
  { label: 'Текстиль', icon: Shirt },
  { label: 'Оборудование', icon: Settings },
  { label: 'Пластик', icon: Box },
  { label: 'Металлообработка', icon: Cog },
];

export function Home() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Animated counters
  const factoriesCounter = useAnimatedCounter(10000);
  const buyersCounter = useAnimatedCounter(50000);
  const successCounter = useAnimatedCounter(98);

  // Track scroll for sticky search
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsSearchSticky(heroBottom < 80);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll('[data-factory-card]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="min-h-screen bg-pattern">
      {/* Sticky Search Bar */}
      <div 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300 
          ${isSearchSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        <div className="glass-dark border-b border-white/10 shadow-2xl">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-4 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Поиск по 10,000+ фабрик..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white rounded-xl text-base placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-[#0B1C3A]"
                />
              </div>
              <button 
                className="
                  h-12 px-6
                  bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] 
                  hover:from-[#C4A030] hover:to-[#E4C030]
                  text-[#0B1C3A] font-semibold rounded-xl
                  transition-all duration-300 hover:shadow-lg
                  whitespace-nowrap
                "
              >
                Найти
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Search */}
      <div ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-[#0B1C3A] via-[#132847] to-[#0B1C3A] py-12 md:py-16 lg:py-20">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v1H0zM0 0v40h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Main heading */}
          <div className="text-center mb-8 md:mb-10 scale-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37] font-medium">AI-скоринг и защита сделок</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Найдите проверенных производителей{' '}
              <span className="text-gradient-gold">из Китая</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Более 10,000 фабрик готовы работать с вами. AI-скоринг, защита сделок, автоперевод.
            </p>
          </div>

          {/* Search Block - Main Focus */}
          <div 
            className={`
              max-w-4xl mx-auto scale-in stagger-1
              ${isSearchFocused ? 'glow-gold' : ''}
            `}
          >
            <div 
              className={`
                glass rounded-2xl p-2 md:p-3 shadow-2xl
                border-2 transition-all duration-300
                ${isSearchFocused ? 'border-[#D4AF37]' : 'border-white/20'}
              `}
            >
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="Поиск по 10,000+ фабрик..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full h-14 md:h-16 pl-14 pr-5 bg-white rounded-xl text-lg placeholder:text-[#94A3B8] focus:outline-none text-[#0B1C3A]"
                  />
                </div>
                <button 
                  className="
                    h-14 md:h-16 px-8 md:px-12
                    bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] 
                    hover:from-[#C4A030] hover:to-[#E4C030]
                    text-[#0B1C3A] font-semibold text-lg rounded-xl
                    transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                    pulse-gold
                  "
                >
                  Найти
                </button>
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex flex-wrap justify-center gap-3 mt-6 scale-in stagger-2">
              {quickFilters.map((filter) => (
                <button
                  key={filter.label}
                  className="
                    inline-flex items-center gap-2 px-4 py-2.5
                    bg-white/10 hover:bg-[#D4AF37]/20 
                    border border-white/20 hover:border-[#D4AF37]/50
                    rounded-full text-white/90 hover:text-white text-sm font-medium
                    transition-all duration-300 hover:scale-105
                  "
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 scale-in stagger-3">
            <Link 
              to="/rfq" 
              className="
                px-8 py-4 bg-white text-[#0B1C3A] rounded-xl font-semibold
                hover:bg-[#D4AF37] transition-all duration-300
                shadow-lg hover:shadow-xl hover:scale-105
              "
            >
              Создать RFQ
            </Link>
            <Link 
              to="/catalog" 
              className="
                px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold
                hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105
              "
            >
              Смотреть каталог
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">
          <div className="premium-card bg-white rounded-2xl p-5 md:p-6 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0B1C3A] to-[#1E3A5F] rounded-xl flex items-center justify-center shadow-lg">
                <Factory className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <span ref={factoriesCounter.ref} className="text-2xl md:text-3xl font-bold text-[#0B1C3A]">
                {factoriesCounter.count.toLocaleString()}+
              </span>
            </div>
            <p className="text-sm text-[#64748B] font-medium">Проверенных фабрик</p>
          </div>

          <div className="premium-card bg-white rounded-2xl p-5 md:p-6 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-[#0B1C3A]" />
              </div>
              <span ref={buyersCounter.ref} className="text-2xl md:text-3xl font-bold text-[#0B1C3A]">
                {buyersCounter.count.toLocaleString()}+
              </span>
            </div>
            <p className="text-sm text-[#64748B] font-medium">Активных покупателей</p>
          </div>

          <div className="premium-card bg-white rounded-2xl p-5 md:p-6 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span ref={successCounter.ref} className="text-2xl md:text-3xl font-bold text-[#0B1C3A]">
                {successCounter.count}%
              </span>
            </div>
            <p className="text-sm text-[#64748B] font-medium">Успешных сделок</p>
          </div>

          <div className="premium-card bg-white rounded-2xl p-5 md:p-6 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#818CF8] rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl md:text-3xl font-bold text-[#0B1C3A]">24/7</span>
            </div>
            <p className="text-sm text-[#64748B] font-medium">Поддержка клиентов</p>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-[#D4AF37] to-[#F4D03F] rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1C3A]">Рекомендуемые фабрики</h2>
          </div>
          <p className="text-[#64748B] ml-4">Проверенные производители с высоким рейтингом</p>
        </div>

        {/* Factory Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => <FactoryCardSkeleton key={i} />)
          ) : (
            mockFactories.map((factory, index) => (
              <div
                key={factory.id}
                data-factory-card
                data-index={index}
                className="opacity-0"
                style={{
                  opacity: visibleCards.has(index) ? 1 : 0,
                  transform: visibleCards.has(index) ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 5) * 0.1}s`,
                }}
              >
                <FactoryCard factory={factory} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
