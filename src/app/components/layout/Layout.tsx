import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { MobileSidebar } from './MobileSidebar';

export function Layout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-[calc(100vh-80px)] pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>

      <MobileNav />
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
    </div>
  );
}
