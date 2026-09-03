import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  NotebookPen, 
  Copy, 
  Trash2, 
  Check, 
  Plus, 
  Minus, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { LIVROS_BIBLIA, getCapituloVersiculos } from '../../data/bibliaACF';
import { formatarIntervalosVersiculos } from '../../utils/bibleHelpers';

export default function VerseContextMenu() {
  const { 
    selectedVerseModal, 
    setSelectedVerseModal, 
    salvarVersiculoMarcado, 
    removerVersiculoMarcado,
    versiculosMarcados, 
    showToast, 
    registrarAtividadeHoje
  } = useApp();

  if (!selectedVerseModal) return null;

  const { livroId, capitulo, versiculo, versiculos } = selectedVerseModal;
  const livroObj = LIVROS_BIBLIA.find(l => l.id === livroId) || { nome: livroId };

  // Todos os versículos do capítulo atual para citação e limites
  const todosVersiculosCap = useMemo(() => {
    return getCapituloVersiculos(livroId, capitulo) || [];
  }, [livroId, capitulo]);

  const maxCapVersiculos = todosVersiculosCap.length || 100;

  // Buscar se o versículo de clique já possui anotação ou vínculo de múltiplos versículos
  const idVersiculo = `v_${livroId}_${capitulo}_${versiculo}`;
  const versiculoExistente = versiculosMarcados.find(v => 
    v.id === idVersiculo || 
    (v.livroId === livroId && Number(v.capitulo) === Number(capitulo) && Number(v.versiculo) === Number(versiculo))
  );

  // Inicializar versículos selecionados
  const initialVerses = useMemo(() => {
    if (Array.isArray(versiculos) && versiculos.length > 0) {
      return [...new Set(versiculos.map(Number))].sort((a, b) => a - b);
    }
    if (versiculoExistente?.versiculos && Array.isArray(versiculoExistente.versiculos) && versiculoExistente.versiculos.length > 0) {
      return [...new Set(versiculoExistente.versiculos.map(Number))].sort((a, b) => a - b);
    }
    return [Number(versiculo)];
  }, [versiculos, versiculoExistente, versiculo]);

  const [selectedVerses, setSelectedVerses] = useState(initialVerses);
  const [selectedColor, setSelectedColor] = useState(versiculoExistente?.cor || null);
  const [notaTexto, setNotaTexto] = useState(versiculoExistente?.nota || '');
  const [isCopied, setIsCopied] = useState(false);
  const [showAllChips, setShowAllChips] = useState(false);

  useEffect(() => {
    setSelectedVerses(initialVerses);
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

  // Cálculos do intervalo (Início e Fim)
  const minV = selectedVerses.length > 0 ? Math.min(...selectedVerses) : Number(versiculo);
  const maxV = selectedVerses.length > 0 ? Math.max(...selectedVerses) : Number(versiculo);

  // Definir intervalo contíguo
  const definirIntervalo = (inicio, fim) => {
    const s = Math.max(1, Math.min(inicio, fim));
    const e = Math.min(maxCapVersiculos, Math.max(inicio, fim));
    const novos = [];
    for (let i = s; i <= e; i++) {
      novos.push(i);
    }
    setSelectedVerses(novos);
  };

  // Alternar um versículo individual nos chips
  const toggleVersiculoChip = (num) => {
    const n = Number(num);
    if (selectedVerses.includes(n)) {
      if (selectedVerses.length === 1) return; // Manter pelo menos 1
      setSelectedVerses(selectedVerses.filter(v => v !== n).sort((a, b) => a - b));
    } else {
      setSelectedVerses([...selectedVerses, n].sort((a, b) => a - b));
    }
  };

  // Montar texto combinado de todos os versículos selecionados
  const textoCombinado = useMemo(() => {
    return selectedVerses.map(vNum => {
      const vObj = todosVersiculosCap.find(v => Number(v.v) === Number(vNum));
      const t = vObj ? vObj.t : '';
      return selectedVerses.length > 1 ? `(${vNum}) ${t}` : t;
    }).filter(Boolean).join(' ');
  }, [selectedVerses, todosVersiculosCap]);

  const referenciaFormatada = `${livroObj.nome} ${capitulo}:${formatarIntervalosVersiculos(selectedVerses)}`;

  const handleSave = () => {
    registrarAtividadeHoje();
    salvarVersiculoMarcado({
      livroId,
      capitulo,
      versiculos: selectedVerses,
      cor: selectedColor,
      nota: notaTexto
    });
  };

  const handleCopy = () => {
    const textoFormatado = `"${textoCombinado}" — ${referenciaFormatada} (ACF)`;
    navigator.clipboard.writeText(textoFormatado);
    setIsCopied(true);
    showToast('Versículos copiados para a área de transferência!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDelete = () => {
    removerVersiculoMarcado(livroId, capitulo, selectedVerses);
    setSelectedVerseModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-5 sm:p-6 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9E7418] dark:text-[#D4AF37]">
                Anotação & Estudo do Leitor
              </span>
              {selectedVerses.length > 1 && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#9E7418]/10 text-[#9E7418] dark:bg-[#D4AF37]/20 dark:text-[#F3DA8E]">
                  {selectedVerses.length} versículos
                </span>
              )}
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 mt-0.5">
              {referenciaFormatada}
            </h3>
          </div>
          <button
            onClick={() => setSelectedVerseModal(null)}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="space-y-4 overflow-y-auto flex-1 pr-1 py-2">
          
          {/* SELETOR DE MÚLTIPLOS VERSÍCULOS */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-stone-950/70 border border-amber-200/60 dark:border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#9E7418] dark:text-[#D4AF37]" />
                <span>Abranger Versículos:</span>
              </label>
              <span className="text-[11px] font-semibold text-[#9E7418] dark:text-[#D4AF37]">
                {selectedVerses.length === 1 ? '1 versículo selecionado' : `${selectedVerses.length} versículos na nota`}
              </span>
            </div>

            {/* Controles de Intervalo Início e Fim */}
            <div className="grid grid-cols-2 gap-3">
              {/* Do Versículo */}
              <div className="bg-white dark:bg-stone-900 p-2 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase">Do v.</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => definirIntervalo(minV - 1, maxV)}
                    disabled={minV <= 1}
                    className="w-6 h-6 rounded-md bg-stone-100 dark:bg-stone-800 disabled:opacity-30 hover:bg-stone-200 text-stone-700 dark:text-stone-300 flex items-center justify-center text-xs font-bold transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-bold text-sm text-[#9E7418] dark:text-[#D4AF37] min-w-[20px] text-center">
                    {minV}
                  </span>
                  <button
                    type="button"
                    onClick={() => definirIntervalo(minV + 1, maxV)}
                    disabled={minV >= maxV}
                    className="w-6 h-6 rounded-md bg-stone-100 dark:bg-stone-800 disabled:opacity-30 hover:bg-stone-200 text-stone-700 dark:text-stone-300 flex items-center justify-center text-xs font-bold transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Até o Versículo */}
              <div className="bg-white dark:bg-stone-900 p-2 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase">Até v.</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => definirIntervalo(minV, maxV - 1)}
                    disabled={maxV <= minV}
                    className="w-6 h-6 rounded-md bg-stone-100 dark:bg-stone-800 disabled:opacity-30 hover:bg-stone-200 text-stone-700 dark:text-stone-300 flex items-center justify-center text-xs font-bold transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-bold text-sm text-[#9E7418] dark:text-[#D4AF37] min-w-[20px] text-center">
                    {maxV}
                  </span>
                  <button
                    type="button"
                    onClick={() => definirIntervalo(minV, maxV + 1)}
                    disabled={maxV >= maxCapVersiculos}
                    className="w-6 h-6 rounded-md bg-stone-100 dark:bg-stone-800 disabled:opacity-30 hover:bg-stone-200 text-stone-700 dark:text-stone-300 flex items-center justify-center text-xs font-bold transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Atalhos Rápidos & Chips do Capítulo */}
            <div className="pt-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => definirIntervalo(minV, minV + 1)}
                  disabled={minV >= maxCapVersiculos}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:border-amber-400 transition-colors"
                >
                  +1 Versículo
                </button>
                <button
                  type="button"
                  onClick={() => definirIntervalo(minV, minV + 2)}
                  disabled={minV + 2 > maxCapVersiculos}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[11px] font-semibold text-stone-700 dark:text-stone-300 hover:border-amber-400 transition-colors"
                >
                  +2 Versículos
                </button>
                {selectedVerses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setSelectedVerses([Number(versiculo)])}
                    className="px-2.5 py-1 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-[11px] font-semibold"
                  >
                    Apenas v. {versiculo}
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowAllChips(!showAllChips)}
                className="text-[11px] font-semibold text-[#9E7418] dark:text-[#D4AF37] hover:underline flex items-center gap-0.5"
              >
                <span>{showAllChips ? 'Ocultar Grade' : 'Ver Todos'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllChips ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Grade expansível com todos os versículos do capítulo */}
            {showAllChips && (
              <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800">
                <p className="text-[10px] text-stone-500 mb-1.5 font-medium">
                  Toque para adicionar ou remover versículos específicos deste capítulo:
                </p>
                <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-1 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
                  {todosVersiculosCap.map((vObj) => {
                    const isSelected = selectedVerses.includes(Number(vObj.v));
                    return (
                      <button
                        key={vObj.v}
                        type="button"
                        onClick={() => toggleVersiculoChip(vObj.v)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-[#9E7418] dark:bg-[#C59B27] text-white dark:text-[#0E0E12] shadow-xs'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                        }`}
                      >
                        {vObj.v}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Verse Text Quote Box */}
          <div>
            <label className="block text-[11px] font-bold text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">
              Texto da Passagem Selecionada:
            </label>
            <div className="py-3 px-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/70 dark:border-stone-800/80 font-serif italic text-stone-800 dark:text-stone-200 text-sm leading-relaxed max-h-36 overflow-y-auto">
              "{textoCombinado || 'Carregando versículos...'}"
            </div>
          </div>

          {/* Highlight Color Palette */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
              Destacar Versículos (Highlight)
            </label>
            <div className="flex items-center gap-2">
              {coresDestaque.map((cor) => {
                const isSelected = selectedColor === cor.id;
                return (
                  <button
                    key={cor.id}
                    onClick={() => setSelectedColor(isSelected ? null : cor.id)}
                    className={`flex-1 py-2.5 rounded-xl border-2 transition-all flex items-center justify-center gap-1 text-xs font-medium ${cor.bg} ${
                      isSelected ? 'ring-2 ring-amber-500 scale-105 shadow-sm' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-stone-900" />}
                    <span className="capitalize text-stone-900 dark:text-stone-100">{cor.label}</span>
                  </button>
                );
              })}

              {selectedColor && (
                <button
                  onClick={() => setSelectedColor(null)}
                  title="Remover cor"
                  className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Personal Notepad linked to verses */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <NotebookPen className="w-4 h-4 text-[#9E7418] dark:text-[#D4AF37]" />
                <span>Explicação & Anotação Pessoal</span>
              </label>
              <span className="text-[11px] text-stone-400">Salva na aba Disciplina</span>
            </div>
            <textarea
              rows={3}
              placeholder="Escreva sua reflexão, estudo ou explicação abrangendo estes versículos..."
              value={notaTexto}
              onChange={(e) => setNotaTexto(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 text-sm text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#9E7418] dark:focus:ring-[#D4AF37] resize-none font-sans"
            ></textarea>
          </div>
        </div>

        {/* Modal Footer Buttons */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            {(versiculoExistente || selectedColor || notaTexto) && (
              <button
                onClick={handleDelete}
                title="Excluir anotação e destaques"
                className="p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedVerseModal(null)}
              className="px-3.5 py-2 rounded-xl text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2.5 rounded-xl bg-[#9E7418] hover:bg-[#855F0E] dark:bg-[#C59B27] dark:hover:bg-[#D4AF37] text-white dark:text-[#0E0E12] text-xs font-bold shadow-md transition-all scale-100 active:scale-95"
            >
              Salvar Anotação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
