import React, { useState } from 'react';
import { Plus, Upload, HelpCircle } from 'lucide-react';
import { mockRFQs } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input, TextArea, Select } from '../components/ui/Input';
import { Tooltip } from '../components/ui/Tooltip';

export function RFQ() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: 'textiles',
    title: '',
    description: '',
    moq: '',
    targetPrice: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsCreateModalOpen(false);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'closed':
        return 'status-closed';
      default:
        return 'status-active';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активен';
      case 'pending':
        return 'Ожидает';
      case 'closed':
        return 'Закрыт';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">Мои запросы (RFQ)</h1>
          <p className="text-[#6B7280]">Управляйте своими запросами на производство</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
          <Plus className="w-5 h-5" />
          Создать запрос
        </Button>
      </div>

      {/* RFQ List */}
      <div className="space-y-4">
        {mockRFQs.map((rfq) => (
          <div key={rfq.id} className="bg-[#F9FAFB] rounded-lg p-4 hover:bg-[#F3F4F6] transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="font-semibold text-[#1F2937]">{rfq.title}</h3>
                  <Badge variant={getStatusVariant(rfq.status) as any}>
                    {getStatusLabel(rfq.status)}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-[#6B7280]">Категория:</span>
                    <p className="text-[#1F2937] font-medium">{rfq.category}</p>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">MOQ:</span>
                    <p className="text-[#1F2937] font-medium">{rfq.moq} шт.</p>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Целевая цена:</span>
                    <p className="text-[#1F2937] font-medium">{rfq.targetPrice}</p>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Ответов:</span>
                    <p className="text-[#1F2937] font-medium">{rfq.responses}</p>
                  </div>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-2">
                  Создан: {new Date(rfq.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="tertiary" size="sm">
                  Редактировать
                </Button>
                {rfq.status === 'active' && (
                  <Button variant="ghost" size="sm">
                    Закрыть
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create RFQ Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Создать запрос (RFQ)"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Категория"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={[
              { value: 'textiles', label: 'Текстиль' },
              { value: 'electronics', label: 'Электроника' },
              { value: 'packaging', label: 'Упаковка' },
              { value: 'furniture', label: 'Мебель' },
              { value: 'other', label: 'Другое' },
            ]}
          />

          <Input
            label="Наименование товара"
            placeholder="Например: Хлопковые футболки"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <TextArea
            label="Описание"
            placeholder="Подробное описание требований к товару..."
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="MOQ (мин. заказ)"
              type="number"
              placeholder="1000"
              value={formData.moq}
              onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
              required
            />

            <Input
              label="Целевая цена"
              placeholder="$3-5"
              value={formData.targetPrice}
              onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
            />
          </div>

          {/* File upload area */}
          <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-6 text-center hover:border-[#2563EB] transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-[#6B7280] mx-auto mb-2" />
            <p className="text-sm text-[#6B7280] mb-1">
              Перетащите файлы сюда или нажмите для выбора
            </p>
            <p className="text-xs text-[#9CA3AF]">
              Поддерживаются: PDF, DOC, JPG, PNG (макс. 10 МБ)
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Создать запрос
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Отмена
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}