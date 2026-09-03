import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Type, Sun, Moon, Sparkles, Columns, AlignLeft, HardDrive } from 'lucide-react';
import BackupSyncModal from '../Common/BackupSyncModal';

export default function ReadingSettingsModal() {
  const { isSettingsOpen, setIsSettingsOpen, settings, setSettings } = useApp();
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  if (!isSettingsOpen) return null;

  const updateSetting = (key, val) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Ajustes de Leitura
            </h3>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-6">
          {/* Font Size Control */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Tamanho da Fonte
              </label>
              <span className="text-sm font-semibold text-[#9E7418] dark:text-[#D4AF37]">{settings.fontSize}px</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-serif text-stone-400">A</span>
              <input
                type="range"
                min={16}
                max={28}
                step={1}
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', parseInt(e.target.value, 10))}
                className="w-full accent-[#9E7418] dark:accent-[#D4AF37] h-2 bg-stone-200 dark:bg-stone-800 rounded-lg cursor-pointer"
              />
              <span className="text-xl font-serif text-stone-700 dark:text-stone-300">A</span>
            </div>
          </div>

          {/* Typography Family */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              Estilo da Fonte
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSetting('fontFamily', 'serif')}
                className={`py-2.5 px-3 rounded-2xl border text-sm font-serif transition-all flex items-center justify-center gap-2 ${
                  settings.fontFamily === 'serif'
                    ? 'border-[#9E7418] dark:border-[#D4AF37] bg-[#FAF8F5] dark:bg-[#18181D] text-[#9E7418] dark:text-[#D4AF37] font-bold shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                }`}
              >
                <span>Serifada (Clássica)</span>
              </button>
              <button
                onClick={() => updateSetting('fontFamily', 'sans')}
                className={`py-2.5 px-3 rounded-2xl border text-sm font-sans transition-all flex items-center justify-center gap-2 ${
                  settings.fontFamily === 'sans'
                    ? 'border-[#9E7418] dark:border-[#D4AF37] bg-[#FAF8F5] dark:bg-[#18181D] text-[#9E7418] dark:text-[#D4AF37] font-bold shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                }`}
              >
                <span>Sem Serifa (Moderna)</span>
              </button>
            </div>
          </div>

          {/* Reading Theme */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              Modo de Cor e Aparência
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => updateSetting('theme', 'light')}
                className={`py-3 px-2 rounded-2xl border text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                  settings.theme === 'light'
                    ? 'border-[#9E7418] bg-[#FAF8F5] text-[#1F1C18] ring-2 ring-[#9E7418]/30 font-bold shadow-xs'
                    : 'border-[#E8E2D5] bg-white text-[#6B6357] hover:bg-[#FAF8F5]'
                }`}
              >
                <Sun className="w-4 h-4 text-[#9E7418]" />
                <span>Modo Claro</span>
              </button>

              <button
                onClick={() => updateSetting('theme', 'sepia')}
                className={`py-3 px-2 rounded-2xl border text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                  settings.theme === 'sepia'
                    ? 'border-[#966812] bg-[#EBE1CE] text-[#3B2F24] ring-2 ring-[#966812]/30 font-bold shadow-xs'
                    : 'border-[#D6CAA8] bg-[#F5EFE4] text-[#705F50] hover:bg-[#EBE1CE]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#966812]" />
                <span>Modo Sépia</span>
              </button>

              <button
                onClick={() => updateSetting('theme', 'dark')}
                className={`py-3 px-2 rounded-2xl border text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                  settings.theme === 'dark'
                    ? 'border-[#D4AF37] bg-[#0E0E12] text-[#F6F4EE] ring-2 ring-[#D4AF37]/30 font-bold shadow-xs'
                    : 'border-[#2C271E] bg-[#18181D] text-[#A39D90] hover:bg-[#232329]'
                }`}
              >
                <Moon className="w-4 h-4 text-[#D4AF37]" />
                <span>Modo Escuro</span>
              </button>
            </div>
          </div>

          {/* Layout Display Mode for Study Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              Exibição dos Comentários
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSetting('layoutMode', 'split')}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                  settings.layoutMode === 'split'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                <Columns className="w-4 h-4" />
                <span>Lado a Lado / Rodapé</span>
              </button>
              <button
                onClick={() => updateSetting('layoutMode', 'inline')}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                  settings.layoutMode === 'inline'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                <AlignLeft className="w-4 h-4" />
                <span>Em linha Expansível</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <button
            onClick={() => setIsBackupOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs transition-colors"
          >
            <HardDrive className="w-4 h-4 text-[#9E7418] dark:text-amber-400" />
            <span>Backup & Sincronizar</span>
          </button>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm"
          >
            Concluído
          </button>
        </div>
      </div>

      <BackupSyncModal 
        isOpen={isBackupOpen} 
        onClose={() => setIsBackupOpen(false)} 
      />
    </div>
  );
}
