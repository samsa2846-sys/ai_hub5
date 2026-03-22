import React, { useState } from 'react';
import { Link } from 'react-router';
import { Heart, Star, Package, ShieldCheck, BadgeCheck } from 'lucide-react';
import { Factory } from '../../data/mockData';

interface FactoryCardProps {
  factory: Factory;
}

export function FactoryCard({ factory }: FactoryCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const levelConfig = {
    S: {
      bg: 'bg-gradient-to-r from-[#64748B] to-[#94A3B8]',
      text: 'text-white',
      label: 'Silver',
      border: 'border-[#94A3B8]/30',
    },
    G: {
      bg: 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]',
      text: 'text-[#0B1C3A]',
      label: 'Gold',
      border: 'border-[#D4AF37]/30',
    },
    P: {
      bg: 'bg-gradient-to-r from-[#0B1C3A] to-[#1E3A5F]',
      text: 'text-white',
      label: 'Platinum',
      border: 'border-[#0B1C3A]/30',
    },
  };

  const config = levelConfig[factory.level];

  return (
    <Link to={`/factory/${factory.id}`} className="group block">
      <div className="premium-card bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)]">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[#F1F5F9]">
          <img
            src={factory.image}
            alt={factory.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Level badge */}
          <div className="absolute top-3 left-3">
            <div className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
              ${config.bg} ${config.text} shadow-lg
            `}>
              <BadgeCheck className="w-3.5 h-3.5" />
              {config.label}
            </div>
          </div>

          {/* Verified indicator */}
          {factory.aiScore && factory.aiScore >= 85 && (
            <div className="absolute top-3 right-12 group-hover:right-3 transition-all duration-300">
              <div className="w-8 h-8 flex items-center justify-center bg-[#10B981] rounded-full shadow-lg">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className={`
              absolute top-3 right-3 w-9 h-9 flex items-center justify-center 
              bg-white/90 hover:bg-white rounded-full shadow-lg
              transition-all duration-300
              ${isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-[#EF4444] text-[#EF4444]' : 'text-[#64748B]'}`}
            />
          </button>

          {/* AI Score badge */}
          {factory.aiScore && (
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 shadow-lg text-xs font-medium">
                <span className="text-[#64748B]">AI:</span>
                <span className={`font-bold ${factory.aiScore >= 90 ? 'text-[#10B981]' : factory.aiScore >= 80 ? 'text-[#D4AF37]' : 'text-[#64748B]'}`}>
                  {factory.aiScore}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-[#0B1C3A] mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-[#D4AF37] transition-colors">
            {factory.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(factory.rating)
                      ? 'text-[#D4AF37] fill-[#D4AF37]'
                      : 'text-[#E2E8F0] fill-[#E2E8F0]'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-[#0B1C3A]">{factory.rating}</span>
            <span className="text-sm text-[#64748B]">({factory.reviewCount})</span>
          </div>

          {/* MOQ with styled badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                <Package className="w-4 h-4 text-[#64748B]" />
              </div>
              <div>
                <span className="text-xs text-[#64748B] block">MOQ</span>
                <span className="text-sm font-medium text-[#0B1C3A]">от {factory.moq} шт.</span>
              </div>
            </div>
            
            {/* Quick action on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#0B1C3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
