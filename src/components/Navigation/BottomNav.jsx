import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, BookOpen, Target, User } from 'lucide-react';
import { nativeService } from '../../services/nativeService';

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: 'home', label: 'Fundamento', icon: LayoutDashboard },
    { id: 'reader', label: 'Raízes', icon: BookOpen },
    { id: 'plans', label: 'Obediência', icon: Target },
    { id: 'profile', label: 'Disciplina', icon: User },
  ];

  const handleTabChange = (tabId) => {
    nativeService.haptic('light');
    setActiveTab(tabId);
  };

  return (
    <nav
      aria-label="Navegação Principal"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 dark:bg-[#1C1C1E]/95 backdrop-blur-md border-t border-[#E4E4E7] dark:border-[#27272A] px-4 pt-2"
      style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-95 ${isActive
                  ? 'text-[#7A151C] dark:text-[#8B1C24] font-bold scale-105'
                  : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#232323] dark:hover:text-[#EAE6DF]'
                }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[11px] mt-1 tracking-tight font-sans">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#7A151C] dark:bg-[#8B1C24] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

