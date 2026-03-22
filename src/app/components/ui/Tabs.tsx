import React, { createContext, useContext, useState } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, value, onValueChange, children, className = '' }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value ?? internalValue;
  
  const setActiveTab = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div className={`flex ${className}`} role="tablist">
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className = '' }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');
  
  const isActive = context.activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => context.setActiveTab(value)}
      className={`
        pb-3 text-sm font-medium border-b-2 transition-all duration-200
        ${isActive 
          ? 'text-[#D4AF37] border-[#D4AF37]' 
          : 'text-[#64748B] border-transparent hover:text-[#0B1C3A] hover:border-[#E2E8F0]'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className = '' }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');
  
  if (context.activeTab !== value) return null;

  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  );
}
