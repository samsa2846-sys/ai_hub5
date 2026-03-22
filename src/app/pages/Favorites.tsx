import React from 'react';
import { Heart } from 'lucide-react';

export function Favorites() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-md mx-auto">
        <Heart className="w-16 h-16 text-[#E5E7EB] mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-[#1F2937] mb-2">Избранное пусто</h2>
        <p className="text-[#6B7280]">
          Добавляйте фабрики в избранное, чтобы быстро находить их позже
        </p>
      </div>
    </div>
  );
}
