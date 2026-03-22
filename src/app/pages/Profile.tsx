import React, { useState } from 'react';
import { Star, Award, Gift, Users } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';
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
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-semibold text-[#1F2937] mb-1">{userProfile.name}</h1>
              <p className="text-[#6B7280] mb-3">{userProfile.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FBBF24]" />
                  <span className="text-sm text-[#6B7280]">Уровень {userProfile.level}</span>
                </div>
              </div>
            </div>
            <Button variant="secondary">Редактировать профиль</Button>
          </div>
        </div>

        {/* Points and Stars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Stars */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FBBF24]/10 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#FBBF24] fill-[#FBBF24]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2937]">Звезды</h3>
                  <p className="text-sm text-[#6B7280]">Для продвижения</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-[#1F2937]">{userProfile.stars}</p>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => setIsBuyStarsModalOpen(true)}
              className="w-full"
            >
              Купить звезды
            </Button>
          </div>

          {/* Points */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-[#10B981]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F2937]">Баллы</h3>
                  <p className="text-sm text-[#6B7280]">Для оплаты услуг</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-[#1F2937]">{userProfile.points}</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280]">
              Зарабатывайте баллы, выполняя задания
            </p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-[#1F2937] mb-4">Прогресс уровня</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#6B7280]">Уровень {userProfile.level}</span>
            <span className="text-sm text-[#6B7280]">Уровень {userProfile.level + 1}</span>
          </div>
          <Progress.Root className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden mb-2">
            <Progress.Indicator
              className="h-full bg-[#10B981] transition-transform duration-500"
              style={{ transform: `translateX(-${100 - userProfile.levelProgress}%)` }}
            />
          </Progress.Root>
          <p className="text-xs text-[#9CA3AF]">{userProfile.levelProgress}% до следующего уровня</p>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="font-semibold text-[#1F2937] mb-4">Заработайте баллы</h3>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#1F2937]">{task.title}</span>
                    <span className="text-sm font-medium text-[#10B981]">+{task.reward} баллов</span>
                  </div>
                  <Progress.Root className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <Progress.Indicator
                      className="h-full bg-[#10B981] transition-transform duration-500"
                      style={{ transform: `translateX(-${100 - task.progress}%)` }}
                    />
                  </Progress.Root>
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
                border-2 rounded-lg p-6 text-center
                ${pkg.popular ? 'border-[#2563EB] bg-[#EFF6FF]' : 'border-[#E5E7EB]'}
              `}
            >
              {pkg.popular && (
                <span className="inline-block px-2 py-1 bg-[#2563EB] text-white text-xs rounded-full mb-3">
                  Популярный
                </span>
              )}
              <Star className="w-12 h-12 text-[#FBBF24] fill-[#FBBF24] mx-auto mb-3" />
              <p className="text-3xl font-semibold text-[#1F2937] mb-2">{pkg.stars}</p>
              <p className="text-sm text-[#6B7280] mb-4">звезд</p>
              <p className="text-2xl font-semibold text-[#1F2937] mb-4">{pkg.price}₽</p>
              <Button variant={pkg.popular ? 'primary' : 'secondary'} className="w-full">
                Выбрать
              </Button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
