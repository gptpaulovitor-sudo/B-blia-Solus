import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import HeaderSidebar from './components/Navigation/HeaderSidebar';
import BottomNav from './components/Navigation/BottomNav';
import DashboardView from './components/Dashboard/DashboardView';
import BibleReader from './components/Reading/BibleReader';
import PlansView from './components/Plans/PlansView';
import ProfileView from './components/Profile/ProfileView';
import VerseContextMenu from './components/Reading/VerseContextMenu';
import ReadingSettingsModal from './components/Reading/ReadingSettingsModal';
import Toast from './components/Common/Toast';

function AppContent() {
  const { 
    activeTab 
  } = useApp();

  return (
    <div className="min-h-screen bg-[#F9F7F1] dark:bg-[#121212] text-[#232323] dark:text-[#EAE6DF] font-inter transition-colors duration-200">
      {/* Top Header & Desktop Sidebar Navigation */}
      <HeaderSidebar />

      {/* Main Content Area */}
      <div className="md:pl-64 transition-all min-h-[calc(100vh-64px)] flex flex-col justify-between">
        <div>
          {activeTab === 'home' && <DashboardView />}
          {activeTab === 'reader' && <BibleReader />}
          {activeTab === 'plans' && <PlansView />}
          {activeTab === 'profile' && <ProfileView />}
        </div>

        {/* Mobile Page Footer (Visível no rodapé de todas as telas no celular) */}
        <footer style={{ padding: '24px 16px', borderTop: '1px solid #E8E2D5', marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'center', marginBottom: '72px' }} className="md:hidden border-t border-[#E8E2D5] dark:border-[#2C271E]">
          <span style={{ fontFamily: "'Cinzel', serif", color: '#9E7418', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase' }} className="dark:text-[#D4AF37]">Solus Christus</span>
          <span style={{ fontFamily: "'Inter', sans-serif", color: '#6B6357', fontSize: '11px', fontStyle: 'italic', lineHeight: '1.4' }} className="dark:text-[#A39D90]">“Cristo no centro. A Palavra como fundamento. A fé como caminho.”</span>
          <span style={{ fontFamily: "'Inter', sans-serif", color: '#A39D90', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }} className="dark:text-[#706B60]">Paulo Vitor Ribeiro de Sousa</span>
        </footer>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Floating Modals */}
      <VerseContextMenu />
      <ReadingSettingsModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
