import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Factory, Users, ShieldCheck, MessageSquare, Search } from 'lucide-react';
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

export function Home() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  // Animated counters
  const factoriesCounter = useAnimatedCounter(10000);
  const buyersCounter = useAnimatedCounter(50000);
  const successCounter = useAnimatedCounter(98);

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
      {/* Premium Sticky Search Header */}
      <div className="sticky top-0 z-50 bg-[#0B1C3A] border-b border-[#1E3A5F] shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            {/* Premium Search Bar */}
            <div 
              className={`
                search-appear
                relative flex items-center
                w-full max-w-xl min-w-[280px]
                bg-[#0F1F2F] rounded-2xl
                border-2 transition-all duration-300
                ${isSearchFocused 
                  ? 'border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.5)]' 
                  : 'border-[#D4AF37] border-pulse-gold'
                }
              `}
            >
              {/* Gold Search Icon */}
              <Search className="absolute left-4 w-5 h-5 text-[#D4AF37]" />
              
              {/* Input Field */}
              <input
                type="text"
                placeholder="Поиск по 10,000+ фабрик..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="
                  flex-1 h-12 pl-12 pr-2
                  bg-transparent text-white text-base
                  placeholder:text-[#64748B]
                  focus:outline-none
                "
              />
              
              {/* Gold Search Button */}
              <button 
                className="
                  h-10 px-6 mr-1
                  bg-gradient-to-r from-[#D4AF37] to-[#E4C030]
                  hover:from-[#E4C030] hover:to-[#F4D03F]
                  text-[#0B1C3A] font-semibold text-sm rounded-xl
                  transition-all duration-300
                  whitespace-nowrap
                "
              >
                Найти
              </button>
            </div>
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
