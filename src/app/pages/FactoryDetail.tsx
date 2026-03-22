import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { MessageSquare, Heart, Star, MapPin, Users, Calendar, Award, Shield, ChevronRight } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { mockFactories } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function FactoryDetail() {
  const { id } = useParams();
  const factory = mockFactories.find((f) => f.id === id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContact, setShowContact] = useState(false);

  if (!factory) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-[#6B7280]">Фабрика не найдена</p>
      </div>
    );
  }

  const levelVariant = `level-${factory.level}` as 'level-S' | 'level-G' | 'level-P';

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <Link to="/" className="text-[#2563EB] hover:underline">
          Главная
        </Link>
        <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
        <Link to="/catalog" className="text-[#2563EB] hover:underline">
          Каталог
        </Link>
        <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
        <span className="text-[#6B7280]">{factory.name}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg p-6 mb-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <div>
                <h1 className="text-2xl font-semibold text-[#1F2937] mb-1">
                  {factory.name}
                </h1>
                {factory.nameCn && (
                  <p className="text-[#6B7280]">{factory.nameCn}</p>
                )}
              </div>
              <Badge variant={levelVariant}>{factory.level}</Badge>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-[#FBBF24] fill-[#FBBF24]" />
                <span className="font-semibold text-[#1F2937]">{factory.rating}</span>
                <span className="text-[#6B7280]">({factory.reviewCount} отзывов)</span>
              </div>
            </div>

            <p className="text-[#6B7280]">{factory.description}</p>
          </div>

          <div className="flex gap-3">
            <Button className="gap-2">
              <MessageSquare className="w-5 h-5" />
              Написать в чат
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsFavorite(!isFavorite)}
              className="gap-2"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              В избранное
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main content */}
        <div className="lg:col-span-2">
          <Tabs.Root defaultValue="info" className="bg-white rounded-lg overflow-hidden">
            <Tabs.List className="flex border-b border-[#F3F4F6]">
              <Tabs.Trigger
                value="info"
                className="flex-1 px-6 py-4 text-sm font-medium text-[#6B7280] border-b-2 border-transparent data-[state=active]:text-[#2563EB] data-[state=active]:border-[#2563EB] transition-colors"
              >
                Основное
              </Tabs.Trigger>
              <Tabs.Trigger
                value="reviews"
                className="flex-1 px-6 py-4 text-sm font-medium text-[#6B7280] border-b-2 border-transparent data-[state=active]:text-[#2563EB] data-[state=active]:border-[#2563EB] transition-colors"
              >
                Отзывы ({factory.reviewCount})
              </Tabs.Trigger>
              <Tabs.Trigger
                value="certificates"
                className="flex-1 px-6 py-4 text-sm font-medium text-[#6B7280] border-b-2 border-transparent data-[state=active]:text-[#2563EB] data-[state=active]:border-[#2563EB] transition-colors"
              >
                Сертификаты
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="info" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#1F2937] mb-4">Юридическая информация</h3>
                  <div className="space-y-3 text-sm">
                    {factory.legalName && (
                      <div>
                        <span className="text-[#6B7280]">Юридическое название:</span>
                        <p className="text-[#1F2937] font-medium">{factory.legalName}</p>
                      </div>
                    )}
                    {factory.registrationNumber && (
                      <div>
                        <span className="text-[#6B7280]">Регистрационный номер:</span>
                        <p className="text-[#1F2937] font-medium">{factory.registrationNumber}</p>
                      </div>
                    )}
                    {factory.address && (
                      <div>
                        <span className="text-[#6B7280]">Адрес:</span>
                        <p className="text-[#1F2937] font-medium">{factory.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1F2937] mb-4">Производственные данные</h3>
                  <div className="space-y-3 text-sm">
                    {factory.yearEstablished && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-[#6B7280]">Год основания:</span>
                        <span className="text-[#1F2937] font-medium">{factory.yearEstablished}</span>
                      </div>
                    )}
                    {factory.employees && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-[#6B7280]">Сотрудников:</span>
                        <span className="text-[#1F2937] font-medium">{factory.employees}</span>
                      </div>
                    )}
                    {factory.productionCapacity && (
                      <div>
                        <span className="text-[#6B7280]">Производственная мощность:</span>
                        <p className="text-[#1F2937] font-medium">{factory.productionCapacity}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-[#6B7280]">MOQ:</span>
                      <p className="text-[#1F2937] font-medium">от {factory.moq} шт.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="reviews" className="p-6">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-[#F3F4F6] pb-6 last:border-0">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={`https://images.unsplash.com/photo-147209965${i}-0973d8a0c814`}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-[#1F2937]">Покупатель {i}</span>
                          <span className="text-sm text-[#6B7280]">2 дня назад</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`w-4 h-4 ${j < 4 ? 'text-[#FBBF24] fill-[#FBBF24]' : 'text-[#E5E7EB]'}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-[#6B7280]">
                          Отличная фабрика, качество продукции на высоком уровне. Рекомендую!
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tabs.Content>

            <Tabs.Content value="certificates" className="p-6">
              {factory.certifications && factory.certifications.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {factory.certifications.map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center gap-2 p-4 border border-[#E5E7EB] rounded-lg"
                    >
                      <Award className="w-5 h-5 text-[#2563EB]" />
                      <span className="font-medium text-[#1F2937]">{cert}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#6B7280]">Сертификаты не указаны</p>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* AI Score */}
          {factory.aiScore && (
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-[#2563EB]" />
                <h3 className="font-semibold text-[#1F2937]">AI-скоринг</h3>
              </div>

              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={factory.aiScore >= 85 ? '#10B981' : '#FBBF24'}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${factory.aiScore * 3.51} 351.68`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-semibold text-[#1F2937]">
                      {factory.aiScore}%
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-center text-[#6B7280] mb-6">
                {factory.aiScore >= 85 ? 'Высокая надежность' : 'Средняя надежность'}
              </p>

              {/* Contacts */}
              <div className="border-t border-[#F3F4F6] pt-4">
                <h4 className="font-medium text-[#1F2937] mb-3">Контакты</h4>
                {showContact ? (
                  <div className="space-y-2 text-sm">
                    {factory.contactEmail && (
                      <p className="text-[#6B7280]">{factory.contactEmail}</p>
                    )}
                    {factory.contactPhone && (
                      <p className="text-[#6B7280]">{factory.contactPhone}</p>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => setShowContact(true)}
                    className="w-full"
                  >
                    Показать контакты
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}