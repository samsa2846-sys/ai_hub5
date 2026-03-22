import React, { useState } from 'react';
import { Star, Award, Gift, Users } from 'lucide-react';
import { Progress } from '../components/ui/Progress';
import { userProfile } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export function Profile() {
  const [isBuyStarsModalOpen, setIsBuyStarsModalOpen] = useState(false);

  const starPackages = [
    { stars: 20, price: 500, popular: false },
    { stars: 50, price: 1000, popular: true },
    { stars: 100, price: 1800, popular: false },
  ];

  const tasks = [
    { id: 1, title: 'Заполните профиль', progress: 100, reward: 10 },
    { id: 2, title: 'Создайте первый RFQ', progress: 100, reward: 15 },
    { id: 3, title: 'Пригласите друга', progress: 0, reward: 25 },
    { id: 4, title: 'Совершите первую сделку', progress: 50, reward: 50 },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile header */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-[#E2E8F0]">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#D4AF37]/20"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-semibold text-[#0B1C3A] mb-1">{userProfile.name}</h1>
              <p className="text-[#64748B] mb-3">{userProfile.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm text-[#64748B]">Уровень {userProfile.level}</span>
                </div>
              </div>
            </div>
            <Button variant="secondary">Редактировать профиль</Button>
          </div>
        </div>

        {/* Points and Stars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Stars */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] premium-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-[#0B1C3A] fill-[#0B1C3A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0B1C3A]">Звезды</h3>
                  <p className="text-sm text-[#64748B]">Для продвижения</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-[#0B1C3A]">{userProfile.stars}</p>
              </div>
            </div>
            <Button
              variant="gold"
              onClick={() => setIsBuyStarsModalOpen(true)}
              className="w-full"
            >
              Купить звезды
            </Button>
          </div>

          {/* Points */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] premium-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center shadow-lg">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0B1C3A]">Баллы</h3>
                  <p className="text-sm text-[#64748B]">Для оплаты услуг</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-[#0B1C3A]">{userProfile.points}</p>
              </div>
            </div>
            <p className="text-sm text-[#64748B]">
              Зарабатывайте баллы, выполняя задания
            </p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-[#E2E8F0]">
          <h3 className="font-semibold text-[#0B1C3A] mb-4">Прогресс уровня</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#64748B]">Уровень {userProfile.level}</span>
            <span className="text-sm text-[#64748B]">Уровень {userProfile.level + 1}</span>
          </div>
          <Progress value={userProfile.levelProgress} className="mb-2" />
          <p className="text-xs text-[#94A3B8]">{userProfile.levelProgress}% до следующего уровня</p>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0]">
          <h3 className="font-semibold text-[#0B1C3A] mb-4">Заработайте баллы</h3>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#0B1C3A]">{task.title}</span>
                    <span className="text-sm font-medium text-[#10B981]">+{task.reward} баллов</span>
                  </div>
                  <Progress 
                    value={task.progress} 
                    className="h-1" 
                    indicatorClassName={task.progress === 100 ? 'bg-[#10B981]' : ''} 
                  />
                </div>
                {task.progress < 100 && (
                  <Button size="sm" variant="secondary">
                    Выполнить
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buy Stars Modal */}
      <Modal
        isOpen={isBuyStarsModalOpen}
        onClose={() => setIsBuyStarsModalOpen(false)}
        title="Купить звезды"
        size="md"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {starPackages.map((pkg, index) => (
            <div
              key={index}
              className={`
                border-2 rounded-2xl p-6 text-center transition-all premium-card
                ${pkg.popular ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#E2E8F0]'}
              `}
            >
              {pkg.popular && (
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0B1C3A] text-xs font-semibold rounded-full mb-3">
                  Популярный
                </span>
              )}
              <Star className="w-12 h-12 text-[#D4AF37] fill-[#D4AF37] mx-auto mb-3" />
              <p className="text-3xl font-semibold text-[#0B1C3A] mb-2">{pkg.stars}</p>
              <p className="text-sm text-[#64748B] mb-4">звезд</p>
              <p className="text-2xl font-semibold text-[#0B1C3A] mb-4">{pkg.price} &#8381;</p>
              <Button variant={pkg.popular ? 'gold' : 'secondary'} className="w-full">
                Выбрать
              </Button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
