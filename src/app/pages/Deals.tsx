import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { mockDeals } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export function Deals() {
  const [activeTab, setActiveTab] = useState('all');

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-closed';
      default:
        return 'status-pending';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активна';
      case 'pending':
        return 'Ожидает';
      case 'completed':
        return 'Завершена';
      case 'cancelled':
        return 'Отменена';
      default:
        return status;
    }
  };

  const filterDeals = (status: string) => {
    if (status === 'all') return mockDeals;
    return mockDeals.filter((deal) => deal.status === status);
  };

  const tabCounts = {
    all: mockDeals.length,
    pending: mockDeals.filter((d) => d.status === 'pending').length,
    active: mockDeals.filter((d) => d.status === 'active').length,
    completed: mockDeals.filter((d) => d.status === 'completed').length,
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">Мои сделки</h1>
        <p className="text-[#6B7280]">Отслеживайте статус ваших сделок</p>
      </div>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-6 border-b border-[#F3F4F6] mb-6">
          <Tabs.Trigger
            value="all"
            className="pb-3 text-sm font-medium text-[#6B7280] border-b-2 border-transparent data-[state=active]:text-[#2563EB] data-[state=active]:border-[#2563EB] transition-colors"
          >
            Все ({tabCounts.all})
          </Tabs.Trigger>
          <Tabs.Trigger
            value="pending"
            className="pb-3 text-sm font-medium text-[#6B7280] border-b-2 border-transparent data-[state=active]:text-[#2563EB] data-[state=active]:border-[#2563EB] transition-colors"
          >
            Ожидают ({tabCounts.pending})
          </Tabs.Trigger>
          <Tabs.Trigger
            value="active"
            className="pb-3 text-sm font-medium text-[#6B7280] border-b-2 border-transparent data-[state=active]:text-[#2563EB] data-[state=active]:border-[#2563EB] transition-colors"
          >
            Активные ({tabCounts.active})
          </Tabs.Trigger>
          <Tabs.Trigger
            value="completed"
            className="pb-3 text-sm font-medium text-[#6B7280] border-b-2 border-transparent data-[state=active]:text-[#2563EB] data-[state=active]:border-[#2563EB] transition-colors"
          >
            Завершенные ({tabCounts.completed})
          </Tabs.Trigger>
        </Tabs.List>

        {(['all', 'pending', 'active', 'completed'] as const).map((tab) => (
          <Tabs.Content key={tab} value={tab}>
            <div className="space-y-4">
              {filterDeals(tab).map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-[#2563EB]" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-[#1F2937] mb-1">{deal.number}</h3>
                          <p className="text-sm text-[#6B7280]">{deal.factoryName}</p>
                        </div>
                        <Badge variant={getStatusVariant(deal.status) as any}>
                          {getStatusLabel(deal.status)}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div>
                          <span className="text-[#6B7280]">Сумма:</span>
                          <span className="text-[#1F2937] font-semibold ml-2">
                            ${deal.amount.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#6B7280]">Дата создания:</span>
                          <span className="text-[#1F2937] ml-2">
                            {new Date(deal.createdAt).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <Button variant="ghost" size="sm" className="gap-2 shrink-0">
                      <Download className="w-4 h-4" />
                      PDF
                    </Button>
                  </div>
                </div>
              ))}

              {filterDeals(tab).length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                  <p className="text-[#6B7280]">Нет сделок</p>
                </div>
              )}
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}
