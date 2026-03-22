import React, { useState } from 'react';
import { Link } from 'react-router';
import { Heart, Star, Package } from 'lucide-react';
import { Factory } from '../../data/mockData';
import { Badge } from '../ui/Badge';

interface FactoryCardProps {
  factory: Factory;
}

export function FactoryCard({ factory }: FactoryCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const levelVariant = `level-${factory.level}` as 'level-S' | 'level-G' | 'level-P';

  return (
    <Link to={`/factory/${factory.id}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden border border-[#F3F4F6] hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[#F3F4F6]">
          <img
            src={factory.image}
            alt={factory.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Level badge */}
          <div className="absolute top-3 left-3">
            <Badge variant={levelVariant}>{factory.level}</Badge>
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'fill-[#EF4444] text-[#EF4444]' : 'text-[#6B7280]'}`}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-[#1F2937] mb-2 line-clamp-2 min-h-[2.5rem]">
            {factory.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <Star className="w-4 h-4 text-[#FBBF24] fill-[#FBBF24]" />
            <span className="text-sm text-[#1F2937]">{factory.rating}</span>
            <span className="text-sm text-[#6B7280]">({factory.reviewCount})</span>
          </div>

          {/* MOQ */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <Package className="w-3.5 h-3.5" />
            <span>от {factory.moq} шт.</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
