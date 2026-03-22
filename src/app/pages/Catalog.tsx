import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { mockFactories } from '../data/mockData';
import { FactoryCard } from '../components/factory/FactoryCard';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Input';

export function Catalog() {
  const [sortBy, setSortBy] = useState('rating');
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  const filteredFactories = activeLevel 
    ? mockFactories.filter(f => f.level === activeLevel)
    : mockFactories;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#0B1C3A] mb-4">Каталог фабрик</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Фильтры
          </Button>

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: 'rating', label: 'По рейтингу' },
              { value: 'reviews', label: 'По отзывам' },
              { value: 'moq', label: 'По MOQ' },
            ]}
            className="w-40"
          />

          <div className="flex gap-2 ml-auto">
            <button 
              onClick={() => setActiveLevel(activeLevel === 'S' ? null : 'S')}
              className={`px-4 py-2 text-sm rounded-xl transition-all ${
                activeLevel === 'S' 
                  ? 'bg-gradient-to-r from-[#94A3B8] to-[#CBD5E1] text-[#0B1C3A] font-semibold shadow-lg' 
                  : 'text-[#64748B] hover:bg-[#F1F5F9]'
              }`}
            >
              Уровень S
            </button>
            <button 
              onClick={() => setActiveLevel(activeLevel === 'G' ? null : 'G')}
              className={`px-4 py-2 text-sm rounded-xl transition-all ${
                activeLevel === 'G' 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0B1C3A] font-semibold shadow-lg' 
                  : 'text-[#64748B] hover:bg-[#F1F5F9]'
              }`}
            >
              Уровень G
            </button>
            <button 
              onClick={() => setActiveLevel(activeLevel === 'P' ? null : 'P')}
              className={`px-4 py-2 text-sm rounded-xl transition-all ${
                activeLevel === 'P' 
                  ? 'bg-gradient-to-r from-[#0B1C3A] to-[#1E3A5F] text-white font-semibold shadow-lg' 
                  : 'text-[#64748B] hover:bg-[#F1F5F9]'
              }`}
            >
              Уровень P
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[#64748B] mb-4">
        Найдено фабрик: {filteredFactories.length}
      </p>

      {/* Factory Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredFactories.map((factory) => (
          <FactoryCard key={factory.id} factory={factory} />
        ))}
      </div>
    </div>
  );
}
