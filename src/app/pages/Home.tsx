import React, { useState } from 'react';
import { Link } from 'react-router';
import { Factory, Users, ShieldCheck, MessageSquare } from 'lucide-react';
import { mockFactories } from '../data/mockData';
import { FactoryCard } from '../components/factory/FactoryCard';
import { FactoryCardSkeleton } from '../components/ui/Skeleton';

export function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-lg p-6 md:p-8 mb-6 text-white">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Найдите проверенных производителей из Китая
          </h2>
          <p className="text-white/90 mb-4">
            Более 10,000 фабрик готовы работать с вами. AI-скоринг, защита сделок, автоперевод.
          </p>
          <div className="flex gap-3">
            <Link to="/rfq" className="px-6 py-3 bg-white text-[#2563EB] rounded-lg font-medium hover:bg-white/90 transition-colors">
              Создать RFQ
            </Link>
            <Link to="/catalog" className="px-6 py-3 border border-white/30 rounded-lg font-medium hover:bg-white/10 transition-colors">
              Смотреть каталог
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">Рекомендуемые фабрики</h1>
        <p className="text-[#6B7280]">Проверенные производители с высоким рейтингом</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-[#F3F4F6] rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#2563EB]/10 rounded-lg flex items-center justify-center">
              <Factory className="w-5 h-5 text-[#2563EB]" />
            </div>
            <span className="text-2xl font-semibold text-[#1F2937]">10,000+</span>
          </div>
          <p className="text-sm text-[#6B7280]">Проверенных фабрик</p>
        </div>

        <div className="bg-white border border-[#F3F4F6] rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-2xl font-semibold text-[#1F2937]">50,000+</span>
          </div>
          <p className="text-sm text-[#6B7280]">Активных покупателей</p>
        </div>

        <div className="bg-white border border-[#F3F4F6] rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FBBF24]/10 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#FBBF24]" />
            </div>
            <span className="text-2xl font-semibold text-[#1F2937]">98%</span>
          </div>
          <p className="text-sm text-[#6B7280]">Успешных сделок</p>
        </div>

        <div className="bg-white border border-[#F3F4F6] rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-2xl font-semibold text-[#1F2937]">24/7</span>
          </div>
          <p className="text-sm text-[#6B7280]">Поддержка клиентов</p>
        </div>
      </div>

      {/* Factory Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => <FactoryCardSkeleton key={i} />)
        ) : (
          mockFactories.map((factory) => (
            <FactoryCard key={factory.id} factory={factory} />
          ))
        )}
      </div>
    </div>
  );
}