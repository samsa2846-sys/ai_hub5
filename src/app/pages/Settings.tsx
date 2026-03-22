import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <SettingsIcon className="w-16 h-16 text-[#E5E7EB] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#1F2937] mb-2">Настройки</h2>
          <p className="text-[#6B7280]">
            Раздел в разработке
          </p>
        </div>
      </div>
    </div>
  );
}
