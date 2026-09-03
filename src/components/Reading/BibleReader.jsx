import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LIVROS_BIBLIA } from '../../data/bibliaACF';
import CommentaryPanel from './CommentaryPanel';
import { formatarIntervalosVersiculos } from '../../utils/bibleHelpers';

import {
  ChevronLeft,
  ChevronRight,
  NotebookPen,
  CheckCircle2,
  Layers,
  Copy,
  X,
  Check
} from 'lucide-react';

export default function BibleReader() {
  const {
    posicao,
    livroAtual,
    versiculosAtuais,
    settings,
    irParaCapitulo,
    setSelectedVerseModal,
    versiculosMarcados,
    progressoCapitulos,
    toggleCapituloLido,
    planoAtivo,
    showToast
  } = useApp();

  const isCapLido = !!progressoCapitulos[`${posicao.livroId}-${posicao.capitulo}`];

  // Estado para seleção múltipla direta no leitor bíblico
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedVerses, setSelectedVerses] = useState([]);

  // Limpar seleção ao mudar de capítulo
  React.useEffect(() => {
    setSelectedVerses([]);
    setIsSelectionMode(false);
  }, [posicao.livroId, posicao.capitulo]);

  // Mapear capítulos do plano ativo em uma lista sequencial contínua
  const planoCapitulos = React.useMemo(() => {
    if (!planoAtivo || !planoAtivo.metasDiarias) return [];
    const caps = [];
    planoAtivo.metasDiarias.forEach(meta => {
      if (meta.capitulos) {
        meta.capitulos.forEach(c => caps.push(c));
      }
    });
    return caps;
  }, [planoAtivo]);

  // Encontrar a posição atual do leitor na lista de capítulos do plano
  const indexNoPlano = React.useMemo(() => {
    if (planoCapitulos.length === 0) return -1;
    return planoCapitulos.findIndex(c => c.livroId === posicao.livroId && Number(c.capitulo) === Number(posicao.capitulo));
  }, [planoCapitulos, posicao]);

  const proximoCapituloDoPlano = indexNoPlano !== -1 && indexNoPlano < planoCapitulos.length - 1
    ? planoCapitulos[indexNoPlano + 1]
    : null;

  const anteriorCapituloDoPlano = indexNoPlano > 0
    ? planoCapitulos[indexNoPlano - 1]
    : null;

  // Navegação para capítulo anterior / próximo
  const handleCapituloAnterior = () => {
    if (anteriorCapituloDoPlano) {
      irParaCapitulo(anteriorCapituloDoPlano.livroId, anteriorCapituloDoPlano.capitulo);
      return;
    }

    if (posicao.capitulo > 1) {
      irParaCapitulo(posicao.livroId, posicao.capitulo - 1);
    } else {
      const indexAtual = LIVROS_BIBLIA.findIndex(l => l.id === posicao.livroId);
      if (indexAtual > 0) {
        const livroAnterior = LIVROS_BIBLIA[indexAtual - 1];
        irParaCapitulo(livroAnterior.id, livroAnterior.capitulos);
      }
    }
  };

  const handleProximoCapitulo = () => {
    if (proximoCapituloDoPlano) {
      irParaCapitulo(proximoCapituloDoPlano.livroId, proximoCapituloDoPlano.capitulo);
      return;
    }

    if (posicao.capitulo < livroAtual.capitulos) {
      irParaCapitulo(posicao.livroId, posicao.capitulo + 1);
    } else {
      const indexAtual = LIVROS_BIBLIA.findIndex(l => l.id === posicao.livroId);
      if (indexAtual < LIVROS_BIBLIA.length - 1) {
        const proximoLivro = LIVROS_BIBLIA[indexAtual + 1];
        irParaCapitulo(proximoLivro.id, 1);
      }
    }
  };

  // Alternar versículo no modo seleção
  const handleToggleVerseSelect = (vNum) => {
    const num = Number(vNum);
    if (selectedVerses.includes(num)) {
      setSelectedVerses(selectedVerses.filter(v => v !== num));
    } else {
      setSelectedVerses([...selectedVerses, num].sort((a, b) => a - b));
    }
  };

  // Clique normal no versículo
  const handleVerseClick = (item, marcacao) => {
    if (isSelectionMode) {
      handleToggleVerseSelect(item.v);
      return;
    }

    // Se o versículo já faz parte de um grupo unificado, carrega todos eles no modal
    const versiculosParaCarregar = (marcacao?.versiculos && Array.isArray(marcacao.versiculos) && marcacao.versiculos.length > 0)
      ? marcacao.versiculos
      : [item.v];

    setSelectedVerseModal({
      livroId: posicao.livroId,
      capitulo: posicao.capitulo,
      versiculo: item.v,
      versiculos: versiculosParaCarregar,
      texto: item.t
    });
  };

  // Ação da barra flutuante: abrir modal com múltiplos versículos selecionados
  const handleAbrirModalMultiplos = () => {
    if (selectedVerses.length === 0) return;
    const primeiro = selectedVerses[0];
    const itemObj = versiculosAtuais.find(v => Number(v.v) === Number(primeiro));

    setSelectedVerseModal({
      livroId: posicao.livroId,
      capitulo: posicao.capitulo,
      versiculo: primeiro,
      versiculos: selectedVerses,
      texto: itemObj?.t || ''
    });

    setIsSelectionMode(false);
    setSelectedVerses([]);
  };

  // Copiar versículos selecionados na barra flutuante
  const handleCopiarMultiplos = () => {
    if (selectedVerses.length === 0) return;
    const ref = `${livroAtual.nome} ${posicao.capitulo}:${formatarIntervalosVersiculos(selectedVerses)}`;
    const textoComb = selectedVerses.map(vNum => {
      const vObj = versiculosAtuais.find(v => Number(v.v) === Number(vNum));
      return selectedVerses.length > 1 ? `(${vNum}) ${vObj?.t || ''}` : (vObj?.t || '');
    }).join(' ');

    navigator.clipboard.writeText(`"${textoComb}" — ${ref} (ACF)`);
    showToast(`${selectedVerses.length} versículos copiados!`);
  };

  return (
    <div className="min-h-screen pb-28 md:pb-12 pt-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      {/* Chapter Title Bar */}
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-[#E8E2D5] dark:border-[#2C271E] gap-3 flex-wrap">
        <div className="flex items-center gap-3.5">
          <button
            onClick={handleCapituloAnterior}
            className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121215] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#1F1C18] dark:text-[#F6F4EE] border border-[#E8E2D5] dark:border-[#2C271E] transition-colors"
            title={anteriorCapituloDoPlano ? `Anterior do Plano: ${anteriorCapituloDoPlano.livroNome} ${anteriorCapituloDoPlano.capitulo}` : "Capítulo Anterior"}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#9E7418] dark:text-[#D4AF37] uppercase tracking-widest">
              <span>{livroAtual.testamento === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}</span>
              <span className="text-stone-400">•</span>
              <span className="text-[#6B6357] dark:text-[#A39D90] font-bold">{livroAtual.grupo}</span>
            </div>
            <h1 className="font-cinzel font-extrabold text-3xl md:text-4xl text-[#1F1C18] dark:text-[#F6F4EE] tracking-tight mt-0.5">
              {livroAtual.nome} <span className="text-[#9E7418] dark:text-[#D4AF37]">{posicao.capitulo}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Botão de Modo Seleção Múltipla */}
          <button
            onClick={() => {
              if (isSelectionMode) {
                setIsSelectionMode(false);
                setSelectedVerses([]);
              } else {
                setIsSelectionMode(true);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              isSelectionMode 
                ? 'bg-[#D4AF37] text-[#0E0E12] font-extrabold shadow-md ring-2 ring-[#D4AF37]' 
                : 'bg-[#FAF8F5] dark:bg-[#121215] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#1F1C18] dark:text-[#F6F4EE] border border-[#E8E2D5] dark:border-[#2C271E]'
            }`}
            title="Selecionar múltiplos versículos no texto para criar anotação conjunta"
          >
            <Layers className="w-4 h-4 text-[#9E7418] dark:text-[#D4AF37]" />
            <span className="hidden sm:inline">{isSelectionMode ? 'Sair da Seleção' : 'Selecionar Vários'}</span>
          </button>

          <button
            onClick={() => toggleCapituloLido(posicao.livroId, posicao.capitulo)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${isCapLido
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'bg-[#9E7418] dark:bg-[#C59B27] hover:bg-[#855F0E] dark:hover:bg-[#D4AF37] text-white dark:text-[#0E0E12] shadow-md'
              }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCapLido ? 'Capítulo Lido' : 'Concluir Capítulo'}</span>
          </button>

          <button
            onClick={handleProximoCapitulo}
            className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121215] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#1F1C18] dark:text-[#F6F4EE] border border-[#E8E2D5] dark:border-[#2C271E] transition-colors"
            title={proximoCapituloDoPlano ? `Próximo do Plano: ${proximoCapituloDoPlano.livroNome} ${proximoCapituloDoPlano.capitulo}` : "Próximo Capítulo"}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Dica amigável se modo de seleção estiver ativo */}
      {isSelectionMode && (
        <div className="py-2.5 px-4 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#9E7418] dark:text-[#F3DA8E] text-xs font-medium flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#9E7418] dark:text-[#D4AF37] shrink-0" />
            <span>Toque nos versículos abaixo que você quer incluir na mesma explicação ou destaque.</span>
          </div>
          <button 
            onClick={() => { setIsSelectionMode(false); setSelectedVerses([]); }}
            className="text-[11px] font-bold text-[#9E7418] dark:text-[#D4AF37] hover:underline shrink-0"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Main Continuous Bible Reading Card */}
      <main aria-label="Texto Bíblico Versão ACF" className="bg-[#FFFFFF] dark:bg-[#18181D] rounded-3xl p-6 md:p-10 border border-[#E8E2D5] dark:border-[#2C271E] shadow-lg relative">
        <div
          className="space-y-5 text-[#1F1C18] dark:text-[#F6F4EE]"
          style={{ fontFamily: 'var(--font-leitura)', fontSize: `${settings.fontSize}px`, lineHeight: 1.85 }}
        >
          {versiculosAtuais.map((item) => {
            const idVersiculo = `v_${posicao.livroId}_${posicao.capitulo}_${item.v}`;
            const marcacao = versiculosMarcados.find(v => 
              v.id === idVersiculo || 
              (v.livroId === posicao.livroId && Number(v.capitulo) === Number(posicao.capitulo) && Number(v.versiculo) === Number(item.v))
            );
            const highlightClass = marcacao?.cor ? `highlight-${marcacao.cor}` : '';
            const temNota = !!marcacao?.nota;
            const isSelected = selectedVerses.includes(Number(item.v));

            return (
              <div key={item.v} className="group relative inline">
                <span
                  onClick={() => handleVerseClick(item, marcacao)}
                  className={`
                    inline rounded-md px-1.5 py-0.5 cursor-pointer transition-all duration-150 text-stone-900 dark:text-zinc-100
                    ${isSelected ? 'ring-2 ring-[#D4AF37] bg-amber-100 dark:bg-amber-950/80 font-medium' : 'hover:bg-amber-100/70 dark:hover:bg-amber-900/40'}
                    ${highlightClass}
                  `}
                >
                  {/* Verse Number Indicator */}
                  <sup className="font-sans text-[12px] font-black text-[#9E7418] dark:text-[#D4AF37] mr-1.5 select-none">
                    {item.v}
                  </sup>

                  <span>{item.t}</span>

                  {/* Personal Note Indicator */}
                  {temNota && (
                    <span 
                      title={marcacao.versiculos && marcacao.versiculos.length > 1 
                        ? `Nota compartilhada (v. ${formatarIntervalosVersiculos(marcacao.versiculos)}): ${marcacao.nota}` 
                        : `Nota: ${marcacao.nota}`
                      } 
                      className="inline-flex items-center ml-1 text-[#9E7418] dark:text-[#D4AF37] align-baseline"
                    >
                      <NotebookPen className="w-3.5 h-3.5 inline" />
                    </span>
                  )}
                </span>
                {" "}
              </div>
            );
          })}
        </div>

        {/* Chapter Navigation Footer */}
        <div className="mt-10 pt-6 border-t border-[#E8E2D5] dark:border-[#2C271E] flex items-center justify-between">
          <button
            onClick={handleCapituloAnterior}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#121215] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#1F1C18] dark:text-[#F6F4EE] border border-[#E8E2D5] dark:border-[#2C271E] text-xs font-bold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{anteriorCapituloDoPlano ? `Anterior (${anteriorCapituloDoPlano.livroNome} ${anteriorCapituloDoPlano.capitulo})` : 'Anterior'}</span>
          </button>

          <span className="text-xs font-bold text-[#6B6357] dark:text-[#A39D90] font-cinzel">
            {livroAtual.nome} <span className="text-[#9E7418] dark:text-[#D4AF37] font-extrabold">{posicao.capitulo}</span> de {livroAtual.capitulos}
          </span>

          <button
            onClick={handleProximoCapitulo}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#9E7418] dark:bg-[#C59B27] hover:bg-[#855F0E] dark:hover:bg-[#D4AF37] text-white dark:text-[#0E0E12] text-xs font-black shadow-lg transition-all scale-100 active:scale-95"
          >
            <span>{proximoCapituloDoPlano ? `Próximo (${proximoCapituloDoPlano.livroNome} ${proximoCapituloDoPlano.capitulo})` : 'Próximo'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Floating Bottom Action Bar for Multi-verse selection */}
      {selectedVerses.length > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-xl bg-white dark:bg-[#18181D] border-2 border-[#9E7418] dark:border-[#D4AF37] rounded-2xl shadow-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5 truncate">
            <span className="w-8 h-8 rounded-xl bg-[#9E7418] dark:bg-[#C59B27] text-white dark:text-[#0E0E12] flex items-center justify-center text-xs font-black shrink-0 shadow-sm">
              {selectedVerses.length}
            </span>
            <div className="truncate">
              <div className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 truncate">
                {livroAtual.nome} {posicao.capitulo}:{formatarIntervalosVersiculos(selectedVerses)}
              </div>
              <div className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                {selectedVerses.length === 1 ? 'Versículo selecionado' : `${selectedVerses.length} versículos selecionados`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleAbrirModalMultiplos}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#9E7418] dark:bg-[#C59B27] hover:bg-[#855F0E] dark:hover:bg-[#D4AF37] text-white dark:text-[#0E0E12] text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <NotebookPen className="w-3.5 h-3.5" />
              <span>Anotar / Destacar</span>
            </button>
            <button
              onClick={handleCopiarMultiplos}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              title="Copiar versículos selecionados"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedVerses([]);
                setIsSelectionMode(false);
              }}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              title="Limpar seleção"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Painel de Estudo Profundo & Prática Diária (apenas se houver conteúdo no capítulo) */}
      <CommentaryPanel />
    </div>
  );
}
