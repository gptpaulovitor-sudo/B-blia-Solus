import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Highlighter, NotebookPen, Copy, Share2, Trash2, Check } from 'lucide-react';
import { LIVROS_BIBLIA } from '../../data/bibliaACF';

export default function VerseContextMenu() {
  const { 
    selectedVerseModal, 
    setSelectedVerseModal, 
    salvarVersiculoMarcado, 
    versiculosMarcados, 
    showToast, 
    registrarAtividadeHoje
  } = useApp();

  if (!selectedVerseModal) return null;

  const { livroId, capitulo, versiculo, texto } = selectedVerseModal;
  const livroObj = LIVROS_BIBLIA.find(l => l.id === livroId) || { nome: livroId };

  // Verificar se já tem cor ou nota salvas
  const idVersiculo = `v_${livroId}_${capitulo}_${versiculo}`;
  const versiculoExistente = versiculosMarcados.find(v => v.id === idVersiculo || (v.livroId === livroId && Number(v.capitulo) === Number(capitulo) && Number(v.versiculo) === Number(versiculo)));

  const [selectedColor, setSelectedColor] = useState(versiculoExistente?.cor || null);
  const [notaTexto, setNotaTexto] = useState(versiculoExistente?.nota || '');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (versiculoExistente) {
      setSelectedColor(versiculoExistente.cor || null);
      setNotaTexto(versiculoExistente.nota || '');
    } else {
      setSelectedColor(null);
      setNotaTexto('');
    }
  }, [selectedVerseModal]);

  const coresDestaque = [
    { id: 'yellow', label: 'Amarelo', bg: 'bg-yellow-200 dark:bg-yellow-600/50 border-yellow-400' },
    { id: 'green', label: 'Verde', bg: 'bg-emerald-200 dark:bg-emerald-600/50 border-emerald-400' },
    { id: 'blue', label: 'Azul', bg: 'bg-blue-200 dark:bg-blue-600/50 border-blue-400' },
    { id: 'pink', label: 'Rosa', bg: 'bg-pink-200 dark:bg-pink-600/50 border-pink-400' },
  ];

  const handleSave = () => {
    registrarAtividadeHoje();
    salvarVersiculoMarcado({
      livroId,
      capitulo,
      versiculo,
      cor: selectedColor,
      nota: notaTexto
    });
  };

  const handleCopy = () => {
    const textoFormatado = `"${texto}" — ${livroObj.nome} ${capitulo}:${versiculo} (ACF)`;
    navigator.clipboard.writeText(textoFormatado);
    setIsCopied(true);
    showToast('Versículo copiado para a área de transferência!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        class="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Interação do Leitor
            </span>
            <h3 class="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              {livroObj.nome} {capitulo}:{versiculo}
            </h3>
          </div>
          <button
            onClick={() => setSelectedVerseModal(null)}
            class="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        {/* Verse Text Quote */}
        <div class="py-4 my-2 px-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/60 dark:border-stone-800/80 font-serif italic text-stone-800 dark:text-stone-200 text-sm leading-relaxed max-h-36 overflow-y-auto">
          "{texto}"
        </div>

        {/* Action Controls */}
        <div class="space-y-5 overflow-y-auto flex-1 pr-1 py-1">
          {/* Highlight Color Palette */}
          <div>
            <label class="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
              Destacar Versículo (Highlight)
            </label>
            <div class="flex items-center gap-2">
              {coresDestaque.map((cor) => {
                const isSelected = selectedColor === cor.id;
                return (
                  <button
                    key={cor.id}
                    onClick={() => setSelectedColor(isSelected ? null : cor.id)}
                    class={`flex-1 py-2.5 rounded-xl border-2 transition-all flex items-center justify-center gap-1 text-xs font-medium ${cor.bg} ${
                      isSelected ? 'ring-2 ring-amber-500 scale-105 shadow-sm' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    {isSelected && <Check class="w-3.5 h-3.5 text-stone-900" />}
                    <span class="capitalize text-stone-900 dark:text-stone-100">{cor.label}</span>
                  </button>
                );
              })}

              {selectedColor && (
                <button
                  onClick={() => setSelectedColor(null)}
                  title="Remover cor"
                  class="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Personal Notepad linked to verse */}
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <NotebookPen class="w-4 h-4 text-amber-600" />
                Bloco de Notas Pessoal
              </label>
              <span class="text-[11px] text-stone-400">Salvo no seu Perfil</span>
            </div>
            <textarea
              rows={3}
              placeholder="Escreva suas reflexões, revelações ou anotações espirituais sobre este versículo..."
              value={notaTexto}
              onChange={(e) => setNotaTexto(e.target.value)}
              class="w-full p-3 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 text-sm text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none font-sans"
            ></textarea>
          </div>
        </div>

        {/* Modal Footer Buttons */}
        <div class="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <button
              onClick={handleCopy}
              class="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors"
            >
              {isCopied ? <Check class="w-4 h-4 text-emerald-500" /> : <Copy class="w-4 h-4" />}
              <span>{isCopied ? 'Copiado!' : 'Copiar Versículo'}</span>
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button
              onClick={() => setSelectedVerseModal(null)}
              class="px-3 py-2.5 rounded-xl text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              class="px-4 py-2.5 rounded-xl bg-[#7A151C] hover:bg-[#681117] dark:bg-[#8B1C24] dark:hover:bg-[#7A151C] text-white text-xs font-bold shadow-md transition-all scale-100 active:scale-95"
            >
              Salvar Anotação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
