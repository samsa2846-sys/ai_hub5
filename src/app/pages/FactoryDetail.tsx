import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { MessageSquare, Heart, Star, MapPin, Users, Calendar, Award, Shield, ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { mockFactories } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';

export function FactoryDetail() {
  const { id } = useParams();
  const factory = mockFactories.find((f) => f.id === id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContact, setShowContact] = useState(false);

  if (!factory) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-[#64748B]">Фабрика не найдена</p>
      </div>
    );
  }

  const levelVariant = `level-${factory.level}` as 'level-S' | 'level-G' | 'level-P';

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <Link to="/" className="text-[#D4AF37] hover:underline">
          Главная
        </Link>
        <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
        <Link to="/catalog" className="text-[#D4AF37] hover:underline">
          Каталог
        </Link>
        <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
        <span className="text-[#64748B]">{factory.name}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 mb-4 border border-[#E2E8F0]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <div>
                <h1 className="text-2xl font-semibold text-[#0B1C3A] mb-1">
                  {factory.name}
                </h1>
                {factory.nameCn && (
                  <p className="text-[#64748B]">{factory.nameCn}</p>
                )}
              </div>
              <Badge variant={levelVariant}>{factory.level}</Badge>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="font-semibold text-[#0B1C3A]">{factory.rating}</span>
                <span className="text-[#64748B]">({factory.reviewCount} отзывов)</span>
              </div>
            </div>

            <p className="text-[#64748B]">{factory.description}</p>
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
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
              В избранное
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="info" className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <TabsList className="border-b border-[#E2E8F0] px-6 pt-4 gap-6">
              <TabsTrigger value="info">
                Основное
              </TabsTrigger>
              <TabsTrigger value="reviews">
                Отзывы ({factory.reviewCount})
              </TabsTrigger>
              <TabsTrigger value="certificates">
                Сертификаты
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#0B1C3A] mb-4">Юридическая информация</h3>
                  <div className="space-y-3 text-sm">
                    {factory.legalName && (
                      <div>
                        <span className="text-[#64748B]">Юридическое название:</span>
                        <p className="text-[#0B1C3A] font-medium">{factory.legalName}</p>
                      </div>
                    )}
                    {factory.registrationNumber && (
                      <div>
                        <span className="text-[#64748B]">Регистрационный номер:</span>
                        <p className="text-[#0B1C3A] font-medium">{factory.registrationNumber}</p>
                      </div>
                    )}
                    {factory.address && (
                      <div>
                        <span className="text-[#64748B]">Адрес:</span>
                        <p className="text-[#0B1C3A] font-medium">{factory.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#0B1C3A] mb-4">Производственные данные</h3>
                  <div className="space-y-3 text-sm">
                    {factory.yearEstablished && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#64748B]" />
                        <span className="text-[#64748B]">Год основания:</span>
                        <span className="text-[#0B1C3A] font-medium">{factory.yearEstablished}</span>
                      </div>
                    )}
                    {factory.employees && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#64748B]" />
                        <span className="text-[#64748B]">Сотрудников:</span>
                        <span className="text-[#0B1C3A] font-medium">{factory.employees}</span>
                      </div>
                    )}
                    {factory.productionCapacity && (
                      <div>
                        <span className="text-[#64748B]">Производственная мощность:</span>
                        <p className="text-[#0B1C3A] font-medium">{factory.productionCapacity}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-[#64748B]">MOQ:</span>
                      <p className="text-[#0B1C3A] font-medium">от {factory.moq} шт.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-[#E2E8F0] pb-6 last:border-0">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={`https://images.unsplash.com/photo-147209965${i}-0973d8a0c814`}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-[#0B1C3A]">Покупатель {i}</span>
                          <span className="text-sm text-[#64748B]">2 дня назад</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`w-4 h-4 ${j < 4 ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-[#E2E8F0]'}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-[#64748B]">
                          Отличная фабрика, качество продукции на высоком уровне. Рекомендую!
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certificates" className="p-6">
              {factory.certifications && factory.certifications.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {factory.certifications.map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center gap-2 p-4 border border-[#E2E8F0] rounded-xl hover:border-[#D4AF37] transition-colors"
                    >
                      <Award className="w-5 h-5 text-[#D4AF37]" />
                      <span className="font-medium text-[#0B1C3A]">{cert}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#64748B]">Сертификаты не указаны</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* AI Score */}
          {factory.aiScore && (
            <div className="bg-white rounded-2xl p-6 sticky top-24 border border-[#E2E8F0]">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-[#D4AF37]" />
                <h3 className="font-semibold text-[#0B1C3A]">AI-скоринг</h3>
              </div>

              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#E2E8F0"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={factory.aiScore >= 85 ? '#10B981' : '#D4AF37'}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${factory.aiScore * 3.51} 351.68`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-semibold text-[#0B1C3A]">
                      {factory.aiScore}%
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-center text-[#64748B] mb-6">
                {factory.aiScore >= 85 ? 'Высокая надежность' : 'Средняя надежность'}
              </p>

              {/* Contacts */}
              <div className="border-t border-[#E2E8F0] pt-4">
                <h4 className="font-medium text-[#0B1C3A] mb-3">Контакты</h4>
                {showContact ? (
                  <div className="space-y-2 text-sm">
                    {factory.contactEmail && (
                      <p className="text-[#64748B]">{factory.contactEmail}</p>
                    )}
                    {factory.contactPhone && (
                      <p className="text-[#64748B]">{factory.contactPhone}</p>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="gold"
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
