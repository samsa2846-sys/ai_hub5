import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { mockFactories } from '../data/mockData';
import { FactoryCard } from '../components/factory/FactoryCard';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Input';

export function Catalog() {
  const [sortBy, setSortBy] = useState('rating');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1F2937] mb-4">Каталог фабрик</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-2">
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
            <button className="px-3 py-1.5 text-sm text-[#6B7280] hover:bg-[#F3F4F6] rounded-md">
              Уровень S
            </button>
            <button className="px-3 py-1.5 text-sm text-[#6B7280] hover:bg-[#F3F4F6] rounded-md">
              Уровень G
            </button>
            <button className="px-3 py-1.5 text-sm text-[#6B7280] hover:bg-[#F3F4F6] rounded-md">
              Уровень P
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[#6B7280] mb-4">
        Найдено фабрик: {mockFactories.length}
      </p>

      {/* Factory Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {mockFactories.map((factory) => (
          <FactoryCard key={factory.id} factory={factory} />
        ))}
      </div>
    </div>
  );
}
