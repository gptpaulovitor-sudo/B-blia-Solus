import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Highlighter, NotebookPen, Copy, Check, Loader2 } from 'lucide-react';
import { LIVROS_BIBLIA, getCapituloVersiculos } from '../../data/bibliaACF';
import WhatsAppShareCard from './WhatsAppShareCard';
import ShareModal from './ShareModal';

export default function VerseContextMenu() {
  const { 
    selectedVerseModal, 
    setSelectedVerseModal, 
    salvarVersiculoMarcado, 
    salvarMultiplosVersiculosMarcados,
    versiculosMarcados, 
    showToast, 
    registrarAtividadeHoje
  } = useApp();

  if (!selectedVerseModal) return null;

  const { livroId, capitulo, versiculo, texto } = selectedVerseModal;
  const livroObj = LIVROS_BIBLIA.find(l => l.id === livroId) || { nome: livroId };

  // Obter todos os versículos do capítulo
  const todosVersiculosCapitulo = useMemo(() => {
    return getCapituloVersiculos(livroId, capitulo) || [];
  }, [livroId, capitulo]);

  // Estados de intervalo de versículos
  const [rangeInicio, setRangeInicio] = useState(Number(versiculo) || 1);
  const [rangeFim, setRangeFim] = useState(Number(selectedVerseModal.versiculoFim || versiculo) || Number(versiculo) || 1);

  // Verificar se já tem cor ou nota salvas para o versículo inicial
  const idVersiculo = `v_${livroId}_${capitulo}_${versiculo}`;
  const versiculoExistente = versiculosMarcados.find(
    v => v.id === idVersiculo || (v.livroId === livroId && Number(v.capitulo) === Number(capitulo) && Number(v.versiculo) === Number(versiculo))
  );

  const [selectedColor, setSelectedColor] = useState(versiculoExistente?.cor || null);
  const [notaTexto, setNotaTexto] = useState(versiculoExistente?.nota || '');
  const [isCopied, setIsCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const vIni = Number(selectedVerseModal.versiculo) || 1;
    const vFim = Number(selectedVerseModal.versiculoFim || selectedVerseModal.versiculo) || vIni;
    setRangeInicio(vIni);
    setRangeFim(vFim);

    if (versiculoExistente) {
      setSelectedColor(versiculoExistente.cor || null);
      setNotaTexto(versiculoExistente.nota || '');
    } else {
      setSelectedColor(null);
      setNotaTexto('');
    }
  }, [selectedVerseModal]);

  const numInicio = Math.min(rangeInicio, rangeFim);
  const numFim = Math.max(rangeInicio, rangeFim);

  const versiculosSelecionados = useMemo(() => {
    return todosVersiculosCapitulo.filter(v => {
      const n = Number(v.v);
      return n >= numInicio && n <= numFim;
    });
  }, [todosVersiculosCapitulo, numInicio, numFim]);

  const textoCompleto = useMemo(() => {
    if (versiculosSelecionados.length === 0) return texto || '';
    if (versiculosSelecionados.length === 1) return versiculosSelecionados[0].t;
    return versiculosSelecionados.map(v => `(${v.v}) ${v.t}`).join(' ');
  }, [versiculosSelecionados, texto]);

  const referenciaFormatada = useMemo(() => {
    if (numInicio === numFim) {
      return `${livroObj.nome} ${capitulo}:${numInicio}`;
    }
    return `${livroObj.nome} ${capitulo}:${numInicio}-${numFim}`;
  }, [livroObj.nome, capitulo, numInicio, numFim]);

  const listaNumerosVersiculos = useMemo(() => {
    const arr = [];
    for (let i = numInicio; i <= numFim; i++) {
      arr.push(i);
    }
    return arr;
  }, [numInicio, numFim]);

  const coresDestaque = [
    { id: 'yellow', label: 'Amarelo', bg: 'bg-yellow-200 dark:bg-yellow-600/50 border-yellow-400' },
    { id: 'green', label: 'Verde', bg: 'bg-emerald-200 dark:bg-emerald-600/50 border-emerald-400' },
    { id: 'blue', label: 'Azul', bg: 'bg-blue-200 dark:bg-blue-600/50 border-blue-400' },
    { id: 'pink', label: 'Rosa', bg: 'bg-pink-200 dark:bg-pink-600/50 border-pink-400' },
  ];

  const handleSave = () => {
    registrarAtividadeHoje();
    if (salvarMultiplosVersiculosMarcados) {
      salvarMultiplosVersiculosMarcados({
        livroId,
        capitulo,
        versiculos: listaNumerosVersiculos,
        cor: selectedColor,
        nota: notaTexto
      });
    } else {
      salvarVersiculoMarcado({
        livroId,
        capitulo,
        versiculo: numInicio,
        cor: selectedColor,
        nota: notaTexto
      });
    }
  };

  const handleShareWhatsAppFromModal = () => {
    registrarAtividadeHoje();
    if (salvarMultiplosVersiculosMarcados) {
      salvarMultiplosVersiculosMarcados({
        livroId,
        capitulo,
        versiculos: listaNumerosVersiculos,
        cor: selectedColor,
        nota: notaTexto
      });
    } else {
      salvarVersiculoMarcado({
        livroId,
        capitulo,
        versiculo: numInicio,
        cor: selectedColor,
        nota: notaTexto
      });
    }
    setIsShareModalOpen(true);
  };

  const handleCopy = () => {
    const textoParaCopiar = `"${textoCompleto}" — ${referenciaFormatada} (ACF)`;
    navigator.clipboard.writeText(textoParaCopiar);
    setIsCopied(true);
    showToast('Versículo(s) copiado(s) para a área de transferência!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Interação do Leitor
            </span>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
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

        {/* Seletor de Múltiplos Versículos (De ... Até ...) */}
        <div className="flex items-center justify-between p-3 my-2 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/20">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Versículos:
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 dark:text-stone-200">
              <span>Do</span>
              <select
                value={numInicio}
                onChange={(e) => setRangeInicio(Number(e.target.value))}
                className="px-2 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-bold text-amber-700 dark:text-amber-400"
              >
                {todosVersiculosCapitulo.map((item) => (
                  <option key={item.v} value={item.v}>
                    v. {item.v}
                  </option>
                ))}
              </select>
              <span>até</span>
              <select
                value={numFim}
                onChange={(e) => setRangeFim(Number(e.target.value))}
                className="px-2 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-bold text-amber-700 dark:text-amber-400"
              >
                {todosVersiculosCapitulo.map((item) => (
                  <option key={item.v} value={item.v}>
                    v. {item.v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-600 text-white shadow-xs shrink-0">
            {listaNumerosVersiculos.length} {listaNumerosVersiculos.length > 1 ? 'versículos' : 'versículo'}
          </span>
        </div>

        {/* Verse Text Quote */}
        <div className="py-3 px-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/60 dark:border-stone-800/80 font-serif italic text-stone-800 dark:text-stone-200 text-sm leading-relaxed max-h-36 overflow-y-auto">
          "{textoCompleto}"
        </div>

        {/* Action Controls */}
        <div className="space-y-4 overflow-y-auto flex-1 pr-1 py-2">
          {/* Highlight Color Palette */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
              Destacar Versículos Selecionados
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
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Personal Note Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <NotebookPen className="w-4 h-4 text-amber-600" />
                Anotação / Estudo ({listaNumerosVersiculos.length > 1 ? `Versículos ${numInicio}-${numFim}` : `Versículo ${numInicio}`})
              </label>
              <span className="text-[11px] text-stone-400">Salvo no seu Perfil</span>
            </div>
            <textarea
              rows={3}
              placeholder="Escreva sua reflexão ou anotação para estes versículos..."
              value={notaTexto}
              onChange={(e) => setNotaTexto(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-700 text-sm text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none font-sans"
            ></textarea>
          </div>
        </div>

        {/* Modal Footer Buttons */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedVerseModal(null)}
              className="px-3 py-2.5 rounded-xl text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-3.5 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition-all"
            >
              Salvar Anotação
            </button>
            <button
              onClick={handleShareWhatsAppFromModal}
              title="Compartilhar Cartão e Estudo no WhatsApp"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#7A151C] hover:bg-[#681117] dark:bg-[#8B1C24] dark:hover:bg-[#7A151C] text-white text-xs font-bold shadow-md transition-all scale-100 active:scale-95 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" className="shrink-0">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.13 7.39C8.95 7.39 8.66 7.46 8.42 7.72C8.17 7.99 7.48 8.63 7.48 9.94C7.48 11.24 8.43 12.5 8.56 12.68C8.7 12.85 10.42 15.5 13.06 16.64C13.69 16.91 14.18 17.07 14.56 17.19C15.2 17.39 15.78 17.36 16.24 17.3C16.76 17.22 17.83 16.65 18.06 16.01C18.28 15.37 18.28 14.82 18.21 14.71C18.15 14.59 17.97 14.52 17.7 14.39C17.43 14.25 16.11 13.6 15.86 13.51C15.62 13.42 15.44 13.38 15.26 13.64C15.08 13.91 14.57 14.52 14.41 14.7C14.26 14.89 14.1 14.91 13.83 14.77C13.56 14.64 12.69 14.35 11.66 13.43C10.86 12.72 10.32 11.84 10.16 11.57C10.01 11.31 10.15 11.16 10.28 11.03C10.4 10.91 10.56 10.7 10.7 10.53C10.84 10.37 10.88 10.25 10.97 10.07C11.06 9.89 11.02 9.73 10.95 9.6C10.88 9.47 10.34 8.15 10.12 7.61C9.9 7.08 9.68 7.15 9.52 7.14C9.37 7.14 9.19 7.39 9.13 7.39Z" />
              </svg>
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cartão Padrão Oculto para Renderização de Imagem 1080x1080px */}
      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '1080px',
          height: '1080px',
          pointerEvents: 'none',
          zIndex: -100
        }}
        aria-hidden="true"
      >
        <WhatsAppShareCard
          ref={cardRef}
          versiculoTexto={textoCompleto}
          referencia={referenciaFormatada}
          notaUsuario={notaTexto}
        />
      </div>

      {/* Modal Interativo de Compartilhamento */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        cardRef={cardRef}
        versiculoTexto={textoCompleto}
        referencia={referenciaFormatada}
        notaUsuario={notaTexto}
        showToast={showToast}
      />
    </div>
  );
}
