import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { mockDeals } from '../data/mockData';
import { Badge } from '../components/ui/badge';
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
        <h1 className="text-2xl font-semibold text-[#0B1C3A] mb-2">Мои сделки</h1>
        <p className="text-[#64748B]">Отслеживайте статус ваших сделок</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all">
        <TabsList className="gap-6 border-b border-[#E2E8F0] mb-6">
          <TabsTrigger value="all">
            Все ({tabCounts.all})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Ожидают ({tabCounts.pending})
          </TabsTrigger>
          <TabsTrigger value="active">
            Активные ({tabCounts.active})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Завершенные ({tabCounts.completed})
          </TabsTrigger>
        </TabsList>

        {(['all', 'pending', 'active', 'completed'] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="space-y-4">
              {filterDeals(tab).map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white border border-[#E2E8F0] rounded-2xl p-4 hover:shadow-lg transition-all premium-card"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0B1C3A] to-[#1E3A5F] rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-[#D4AF37]" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-[#0B1C3A] mb-1">{deal.number}</h3>
                          <p className="text-sm text-[#64748B]">{deal.factoryName}</p>
                        </div>
                        <Badge variant={getStatusVariant(deal.status) as any}>
                          {getStatusLabel(deal.status)}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div>
                          <span className="text-[#64748B]">Сумма:</span>
                          <span className="text-[#0B1C3A] font-semibold ml-2">
                            ${deal.amount.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#64748B]">Дата создания:</span>
                          <span className="text-[#0B1C3A] ml-2">
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
                  <FileText className="w-12 h-12 text-[#E2E8F0] mx-auto mb-3" />
                  <p className="text-[#64748B]">Нет сделок</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
