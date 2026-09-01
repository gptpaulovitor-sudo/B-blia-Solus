import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div class="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:max-w-md z-50 animate-fade-in pointer-events-none">
      <div class="bg-stone-900/95 dark:bg-stone-100/95 text-stone-100 dark:text-stone-900 border border-amber-500/40 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs font-semibold">
        <Sparkles class="w-4 h-4 text-amber-400 dark:text-amber-600 flex-shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
