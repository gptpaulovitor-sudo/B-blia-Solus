import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LIVROS_BIBLIA } from '../../data/bibliaACF';
import {
  BookOpen,
  LayoutDashboard,
  Target,
  User,
  Settings,
  Sun,
  Moon,
  Sparkles,
  ChevronDown,
  Search,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

export default function HeaderSidebar() {
  const {
    activeTab,
    setActiveTab,
    posicao,
    irParaCapitulo,
    settings,
    setSettings,
    setIsSettingsOpen,
    planoAtivo
  } = useApp();

  const [isBookSelectorOpen, setIsBookSelectorOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const livroAtual = LIVROS_BIBLIA.find(l => l.id === posicao.livroId) || LIVROS_BIBLIA[0];

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : settings.theme === 'light' ? 'sepia' : 'dark';
    setSettings({ ...settings, theme: nextTheme });
  };

  const navItems = [
    { id: 'home', label: 'Fundamento', icon: LayoutDashboard },
    { id: 'reader', label: 'Raízes', icon: BookOpen },
    { id: 'plans', label: 'Obediência', icon: Target },
    { id: 'profile', label: 'Disciplina', icon: User },
  ];

  const livrosFiltrados = LIVROS_BIBLIA.filter(l =>
    l.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.abrev.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Top Header Bar */}
      <header class="sticky top-0 z-30 bg-[#FFFFFF]/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md border-b border-[#E4E4E7] dark:border-[#27272A] transition-colors">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

          {/* Logo, Hamburger Menu & Book Selector Button */}
          <div class="flex items-center gap-2.5">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              class="p-2 rounded-xl bg-[#FAF8F5] dark:bg-[#121215] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#1F1C18] dark:text-[#F6F4EE] border border-[#E8E2D5] dark:border-[#2C271E] md:hidden transition-colors"
              title="Abrir Menu Principal"
            >
              <Menu class="w-5 h-5 text-[#9E7418] dark:text-[#D4AF37]" />
            </button>

            <button
              onClick={() => setActiveTab('home')}
              class="flex items-center gap-3 font-cinzel text-lg font-bold text-[#9E7418] dark:text-[#F6F4EE] hover:opacity-90 transition-opacity"
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <img src="./icon-192.png" alt="Solus Christus" width="34" height="34" className="shrink-0 rounded-xl shadow-xs ring-1 ring-[#D4AF37]/40 object-cover" />
              <span class="tracking-wider font-bold text-xs sm:text-sm md:text-base">SOLUS CHRISTUS</span>
            </button>

            {/* Quick Passage Selector Pill */}
            <div class="relative">
              <button
                onClick={() => setIsBookSelectorOpen(!isBookSelectorOpen)}
                class="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121215] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#1F1C18] dark:text-[#F6F4EE] text-sm font-bold transition-colors border border-[#E8E2D5] dark:border-[#2C271E] shadow-xs"
              >
                <span>{livroAtual.nome} <span class="text-[#9E7418] dark:text-[#D4AF37]">{posicao.capitulo}</span></span>
                <ChevronDown class={`w-4 h-4 text-[#9E7418] dark:text-[#D4AF37] transition-transform duration-200 ${isBookSelectorOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Book & Chapter Selector Dropdown */}
              {isBookSelectorOpen && (
                <div class="absolute top-full left-0 mt-2 w-80 max-h-[480px] bg-[#FFFFFF] dark:bg-[#18181D] border border-[#E8E2D5] dark:border-[#2C271E] rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col animate-fade-in">
                  <div class="p-3 border-b border-[#E8E2D5] dark:border-[#2C271E] bg-[#FAF8F5] dark:bg-[#121215]">
                    <div class="relative">
                      <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Buscar livro..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        class="w-full pl-9 pr-3 py-1.5 bg-[#FFFFFF] dark:bg-[#1C1C1E] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#9E7418] text-[#232323] dark:text-[#EAE6DF]"
                      />
                    </div>
                  </div>

                  <div class="overflow-y-auto flex-1 p-2 space-y-1">
                    {livrosFiltrados.map((livro) => (
                      <div key={livro.id} class="border-b border-[#E8E2D5]/60 dark:border-[#2C271E]/60 last:border-0 pb-1">
                        <div class="text-xs font-bold px-2 py-1 text-[#9E7418] dark:text-[#D4AF37] flex justify-between uppercase tracking-wider">
                          <span>{livro.nome}</span>
                          <span class="text-[10px] text-stone-400 font-sans">{livro.testamento}</span>
                        </div>
                        <div class="grid grid-cols-6 gap-1 p-1">
                          {Array.from({ length: livro.capitulos }, (_, i) => i + 1).map((cap) => {
                            const isSelected = livro.id === posicao.livroId && cap === posicao.capitulo;
                            return (
                              <button
                                key={cap}
                                onClick={() => {
                                  irParaCapitulo(livro.id, cap);
                                  setIsBookSelectorOpen(false);
                                }}
                                class={`py-1 text-xs rounded-lg font-bold transition-colors ${isSelected
                                  ? 'bg-[#9E7418] dark:bg-[#C59B27] text-white dark:text-[#0E0E12] font-black shadow-sm'
                                  : 'bg-[#FAF8F5] dark:bg-[#121215] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#1F1C18] dark:text-[#F6F4EE]'
                                  }`}
                              >
                                {cap}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-2">

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Modo Atual: ${settings.theme}`}
              className="p-2 rounded-xl bg-[#FAF8F5] dark:bg-[#121215] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#1F1C18] dark:text-[#F6F4EE] border border-[#E8E2D5] dark:border-[#2C271E] transition-colors"
            >
              {settings.theme === 'dark' ? (
                <Moon className="w-4 h-4 text-[#D4AF37]" />
              ) : settings.theme === 'sepia' ? (
                <Sparkles className="w-4 h-4 text-[#966812]" />
              ) : (
                <Sun className="w-4 h-4 text-[#9E7418]" />
              )}
            </button>

            {/* Reading Settings Modal Trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              title="Configurações de Leitura"
              className="p-2 rounded-xl bg-[#FAF8F5] dark:bg-[#121215] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#1F1C18] dark:text-[#F6F4EE] border border-[#E8E2D5] dark:border-[#2C271E] transition-colors"
            >
              <Settings className="w-4 h-4 text-[#9E7418] dark:text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Navigation Sidebar (md screens+) */}
      <aside aria-label="Navegação Lateral" className="hidden md:flex fixed top-16 left-0 bottom-0 w-64 bg-[#FFFFFF] dark:bg-[#18181D] border-r border-[#E8E2D5] dark:border-[#2C271E] p-4 flex-col justify-between z-20">
        <div className="space-y-6">
          {/* Main Navigation Items */}
          <nav aria-label="Menu Principal" className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${isActive
                    ? 'bg-[#9E7418]/10 dark:bg-[#D4AF37]/15 text-[#9E7418] dark:text-[#F6F4EE] font-extrabold border-l-4 border-[#9E7418] dark:border-[#D4AF37] shadow-xs'
                    : 'text-[#6B6357] dark:text-[#A39D90] hover:bg-[#FAF8F5] dark:hover:bg-[#121215] hover:text-[#1F1C18] dark:hover:text-[#F6F4EE]'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#9E7418] dark:text-[#D4AF37] stroke-[2.5]' : 'stroke-2'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Active Plan Widget Badge */}
          {planoAtivo && (
            <div class="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121215] border border-[#9E7418]/30 dark:border-[#D4AF37]/40 space-y-2.5 shadow-sm">
              <div class="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#9E7418] dark:text-[#D4AF37]">
                <span>Plano Ativo</span>
                <span class="text-[10px] bg-[#9E7418]/20 dark:bg-[#D4AF37]/25 text-[#9E7418] dark:text-[#F6F4EE] px-2 py-0.5 rounded-md border border-[#9E7418]/30 dark:border-[#D4AF37]/40">
                  Em Dia
                </span>
              </div>
              <p class="text-xs font-bold text-[#1F1C18] dark:text-[#F6F4EE] line-clamp-1">
                {planoAtivo.titulo}
              </p>
              <div class="w-full bg-stone-200 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div
                  class="bg-gradient-to-r from-[#9E7418] to-[#D4AF37] dark:from-[#C59B27] dark:to-[#F3DA8E] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (Object.keys(planoAtivo.progressoDias || {}).length / Math.max(1, planoAtivo.duracaoDias)) * 100)}%` }}
                ></div>
              </div>
              <button
                onClick={() => setActiveTab('plans')}
                class="text-[11px] text-[#9E7418] dark:text-[#D4AF37] hover:underline font-bold block pt-1"
              >
                Ver metas do dia &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div style={{ padding: '16px 0px', borderTop: '1px solid #E8E2D5', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontFamily: "'Cinzel', serif", color: '#9E7418', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase' }} className="dark:text-[#D4AF37]">Solus Christus</span>
          <span style={{ fontFamily: "'Inter', sans-serif", color: '#6B6357', fontSize: '11px', fontStyle: 'italic', lineHeight: '1.4' }} className="dark:text-[#A39D90]">“Cristo no centro. A Palavra como fundamento. A fé como caminho.”</span>
          <span style={{ fontFamily: "'Inter', sans-serif", color: '#A39D90', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }} className="dark:text-[#706B60]">Paulo Vitor Ribeiro de Sousa</span>
        </div>
      </aside>

      {/* Mobile Drawer Menu (Slide-in Overlay) */}
      {isMobileMenuOpen && (
        <div
          class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            class="w-4/5 max-w-sm bg-[#FFFFFF] dark:bg-[#18181D] h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div class="space-y-6">
              {/* Drawer Header */}
              <div class="flex items-center justify-between pb-3 border-b border-[#E8E2D5] dark:border-[#2C271E]">
                <div class="flex items-center gap-3 font-cinzel text-base font-bold text-[#9E7418] dark:text-[#F6F4EE]" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src="./icon-192.png" alt="Solus Christus" width="34" height="34" className="shrink-0 rounded-xl shadow-xs ring-1 ring-[#D4AF37]/40 object-cover" />
                  <span>SOLUS CHRISTUS</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  class="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav aria-label="Menu Mobile" class="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      class={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${isActive
                        ? 'bg-[#9E7418] dark:bg-[#C59B27] text-white dark:text-[#0E0E12] font-extrabold shadow-md'
                        : 'text-[#6B6357] dark:text-[#A39D90] hover:bg-[#FAF8F5] dark:hover:bg-[#121215] hover:text-[#1F1C18] dark:hover:text-[#F6F4EE]'
                        }`}
                    >
                      <Icon class="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Active Plan Widget Badge Mobile */}
              {planoAtivo && (
                <div class="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#121215] border border-[#9E7418]/30 dark:border-[#D4AF37]/40 space-y-2 shadow-sm">
                  <div class="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#9E7418] dark:text-[#D4AF37]">
                    <span>Plano Ativo</span>
                    <span class="text-[10px] bg-[#9E7418]/20 dark:bg-[#D4AF37]/25 text-[#9E7418] dark:text-[#F6F4EE] px-2 py-0.5 rounded-md border border-[#9E7418]/30">
                      Em Dia
                    </span>
                  </div>
                  <p class="text-xs font-bold text-[#1F1C18] dark:text-[#F6F4EE] line-clamp-1">
                    {planoAtivo.titulo}
                  </p>
                  <div class="w-full bg-stone-200 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      class="bg-gradient-to-r from-[#9E7418] to-[#D4AF37] dark:from-[#C59B27] dark:to-[#F3DA8E] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (Object.keys(planoAtivo.progressoDias || {}).length / Math.max(1, planoAtivo.duracaoDias)) * 100)}%` }}
                    ></div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('plans');
                      setIsMobileMenuOpen(false);
                    }}
                    class="text-[11px] text-[#9E7418] dark:text-[#D4AF37] hover:underline font-bold block pt-1"
                  >
                    Ver metas do dia &rarr;
                  </button>
                </div>
              )}
            </div>

            {/* Footer App Info */}
            <div style={{ padding: '16px 0px', borderTop: '1px solid #E8E2D5', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: "'Cinzel', serif", color: '#9E7418', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase' }} className="dark:text-[#D4AF37]">Solus Christus</span>
              <span style={{ fontFamily: "'Inter', sans-serif", color: '#6B6357', fontSize: '11px', fontStyle: 'italic', lineHeight: '1.4' }} className="dark:text-[#A39D90]">“Cristo no centro. A Palavra como fundamento. A fé como caminho.”</span>
              <span style={{ fontFamily: "'Inter', sans-serif", color: '#A39D90', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }} className="dark:text-[#706B60]">Paulo Vitor Ribeiro de Sousa</span>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      )}
    </>
  );
}

