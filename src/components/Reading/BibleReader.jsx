import React from 'react';
import { useApp } from '../../context/AppContext';
import { LIVROS_BIBLIA } from '../../data/bibliaACF';
import CommentaryPanel from './CommentaryPanel';
import WhatsAppShareCard from './WhatsAppShareCard';
import ShareModal from './ShareModal';
import { handleShareWhatsApp } from '../../services/shareService';

import {
  ChevronLeft,
  ChevronRight,
  NotebookPen,
  CheckCircle2,
  Sparkles,
  Loader2
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
    registrarAtividadeHoje,
    salvarVersiculoMarcado,
    salvarMultiplosVersiculosMarcados,
    showToast
  } = useApp();

  const cardRef = React.useRef(null);
  const [versiculoInicioNum, setVersiculoInicioNum] = React.useState(1);
  const [versiculoFimNum, setVersiculoFimNum] = React.useState(1);
  const [notaUsuario, setNotaUsuario] = React.useState('');
  const [isSharing, setIsSharing] = React.useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);

  // Modo Seleção Múltipla direto no texto bíblico
  const [modoSelecaoMultipla, setModoSelecaoMultipla] = React.useState(false);
  const [versiculosSelecionadosSet, setVersiculosSelecionadosSet] = React.useState([]);

  // Carregar anotação existente ao mudar de livro ou capítulo
  React.useEffect(() => {
    const notaExistente = (versiculosMarcados || []).find(
      v => v.livroId === posicao.livroId && Number(v.capitulo) === Number(posicao.capitulo) && v.nota?.trim()
    );

    if (notaExistente) {
      setVersiculoInicioNum(Number(notaExistente.versiculo));
      setVersiculoFimNum(Number(notaExistente.versiculo));
      setNotaUsuario(notaExistente.nota);
    } else {
      setVersiculoInicioNum(1);
      setVersiculoFimNum(1);
      setNotaUsuario('');
    }
    setVersiculosSelecionadosSet([]);
  }, [posicao.livroId, posicao.capitulo]);

  const numInicioEstudo = Math.min(versiculoInicioNum, versiculoFimNum);
  const numFimEstudo = Math.max(versiculoInicioNum, versiculoFimNum);

  const versiculosEstudo = React.useMemo(() => {
    return versiculosAtuais.filter(v => {
      const n = Number(v.v);
      return n >= numInicioEstudo && n <= numFimEstudo;
    });
  }, [versiculosAtuais, numInicioEstudo, numFimEstudo]);

  const textoEstudoCompleto = React.useMemo(() => {
    if (versiculosEstudo.length === 0) return '';
    if (versiculosEstudo.length === 1) return versiculosEstudo[0].t;
    return versiculosEstudo.map(v => `(${v.v}) ${v.t}`).join(' ');
  }, [versiculosEstudo]);

  const referenciaEstudoCompleta = React.useMemo(() => {
    if (numInicioEstudo === numFimEstudo) {
      return `${livroAtual.nome} ${posicao.capitulo}:${numInicioEstudo}`;
    }
    return `${livroAtual.nome} ${posicao.capitulo}:${numInicioEstudo}-${numFimEstudo}`;
  }, [livroAtual.nome, posicao.capitulo, numInicioEstudo, numFimEstudo]);

  const listaVersiculosEstudo = React.useMemo(() => {
    const arr = [];
    for (let i = numInicioEstudo; i <= numFimEstudo; i++) {
      arr.push(i);
    }
    return arr;
  }, [numInicioEstudo, numFimEstudo]);

  const onCompartilharWhatsApp = () => {
    registrarAtividadeHoje();
    if (salvarMultiplosVersiculosMarcados) {
      salvarMultiplosVersiculosMarcados({
        livroId: posicao.livroId,
        capitulo: posicao.capitulo,
        versiculos: listaVersiculosEstudo,
        nota: notaUsuario
      });
    } else {
      salvarVersiculoMarcado({
        livroId: posicao.livroId,
        capitulo: posicao.capitulo,
        versiculo: numInicioEstudo,
        nota: notaUsuario
      });
    }

    setIsShareModalOpen(true);
  };

  const isCapLido = !!progressoCapitulos[`${posicao.livroId}-${posicao.capitulo}`];

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

  return (
    <div class="min-h-screen pb-28 md:pb-12 pt-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      {/* Chapter Title Bar */}
      <div class="flex items-center justify-between pb-4 mb-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
        <div class="flex items-center gap-3.5">
          <button
            onClick={handleCapituloAnterior}
            class="p-2.5 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#232323] dark:text-[#EAE6DF] border border-[#E4E4E7] dark:border-[#27272A] transition-colors"
            title={anteriorCapituloDoPlano ? `Anterior do Plano: ${anteriorCapituloDoPlano.livroNome} ${anteriorCapituloDoPlano.capitulo}` : "Capítulo Anterior"}
          >
            <ChevronLeft class="w-5 h-5" />
          </button>

          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-[#7A151C] dark:text-[#8B1C24] uppercase tracking-widest">
              <span>{livroAtual.testamento === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}</span>
              <span class="text-stone-400">•</span>
              <span class="text-[#52525B] dark:text-[#A1A1AA] font-bold">{livroAtual.grupo}</span>
            </div>
            <h1 class="font-cinzel font-extrabold text-3xl md:text-4xl text-[#232323] dark:text-[#EAE6DF] tracking-tight mt-0.5">
              {livroAtual.nome} <span class="text-[#7A151C] dark:text-[#8B1C24]">{posicao.capitulo}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => {
              setModoSelecaoMultipla(prev => !prev);
              if (modoSelecaoMultipla) setVersiculosSelecionadosSet([]);
            }}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              modoSelecaoMultipla
                ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-600/30'
                : 'bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#7A151C] dark:text-[#EAE6DF] border-[#E4E4E7] dark:border-[#27272A]'
            }`}
            title="Selecionar múltiplos versículos juntos para uma anotação"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">
              {modoSelecaoMultipla ? 'Selecionando...' : 'Selecionar Vários'}
            </span>
          </button>

          <button
            onClick={() => {
              const sec = document.getElementById('secao-estudo-whatsapp');
              if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#7A151C] dark:text-[#EAE6DF] border border-[#E4E4E7] dark:border-[#27272A] text-xs font-bold transition-colors cursor-pointer"
            title="Ir para Anotações e Compartilhar no WhatsApp"
          >
            <NotebookPen className="w-4 h-4 text-[#7A151C] dark:text-[#8B1C24]" />
            <span className="hidden sm:inline">Anotar & WhatsApp</span>
          </button>

          <button
            onClick={() => toggleCapituloLido(posicao.livroId, posicao.capitulo)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${isCapLido
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'bg-[#7A151C] dark:bg-[#8B1C24] hover:bg-[#681117] dark:hover:bg-[#7A151C] text-white shadow-md'
              }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCapLido ? 'Capítulo Lido' : 'Concluir Capítulo'}</span>
          </button>

          <button
            onClick={handleProximoCapitulo}
            className="p-2.5 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#232323] dark:text-[#EAE6DF] border border-[#E4E4E7] dark:border-[#27272A] transition-colors"
            title={proximoCapituloDoPlano ? `Próximo do Plano: ${proximoCapituloDoPlano.livroNome} ${proximoCapituloDoPlano.capitulo}` : "Próximo Capítulo"}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Continuous Bible Reading Card */}
      <main aria-label="Texto Bíblico Versão ACF" className="bg-[#FFFFFF] dark:bg-[#1C1C1E] rounded-3xl p-6 md:p-10 border border-[#E4E4E7] dark:border-[#27272A] shadow-lg">
        {modoSelecaoMultipla && (
          <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-semibold text-amber-900 dark:text-amber-200 animate-fadeIn">
            <span>✨ Modo Seleção Múltipla ativo: toque nos versículos para agrupá-los para um estudo.</span>
            <button
              onClick={() => {
                setModoSelecaoMultipla(false);
                setVersiculosSelecionadosSet([]);
              }}
              className="text-xs font-bold text-[#7A151C] dark:text-amber-400 underline ml-2 cursor-pointer"
            >
              Concluir
            </button>
          </div>
        )}

        <div
          className="space-y-5 text-[#232323] dark:text-[#EAE6DF]"
          style={{ fontFamily: 'var(--font-leitura)', fontSize: `${settings.fontSize}px`, lineHeight: 1.85 }}
        >
          {versiculosAtuais.map((item) => {
            const idVersiculo = `v_${posicao.livroId}_${posicao.capitulo}_${item.v}`;
            const marcacao = versiculosMarcados.find(v => v.id === idVersiculo || (v.livroId === posicao.livroId && Number(v.capitulo) === Number(posicao.capitulo) && Number(v.versiculo) === Number(item.v)));
            const highlightClass = marcacao?.cor ? `highlight-${marcacao.cor}` : '';
            const temNota = !!marcacao?.nota;
            const numV = Number(item.v);
            const isSelectedInMulti = versiculosSelecionadosSet.includes(numV);
            const multiClass = isSelectedInMulti ? 'ring-2 ring-amber-500 bg-amber-100/90 dark:bg-amber-900/60 font-semibold shadow-xs' : '';

            return (
              <div key={item.v} className="group relative inline">
                <span
                  onClick={() => {
                    if (modoSelecaoMultipla) {
                      setVersiculosSelecionadosSet(prev => {
                        if (prev.includes(numV)) {
                          return prev.filter(n => n !== numV);
                        } else {
                          return [...prev, numV].sort((a, b) => a - b);
                        }
                      });
                    } else {
                      setSelectedVerseModal({
                        livroId: posicao.livroId,
                        capitulo: posicao.capitulo,
                        versiculo: item.v,
                        texto: item.t
                      });
                    }
                  }}
                  className={`
                    inline rounded-md px-1.5 py-0.5 cursor-pointer transition-all duration-150 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 text-stone-900 dark:text-zinc-100
                    ${highlightClass} ${multiClass}
                  `}
                >
                  {/* Verse Number Indicator */}
                  <sup className="font-sans text-[12px] font-black text-amber-600 dark:text-amber-400 mr-1.5 select-none">
                    {item.v}
                  </sup>

                  <span>{item.t}</span>

                  {/* Personal Note Indicator */}
                  {temNota && (
                    <span title={`Nota: ${marcacao.nota}`} className="inline-flex items-center ml-1 text-red-600 dark:text-red-400">
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
        <div class="mt-10 pt-6 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between">
          <button
            onClick={handleCapituloAnterior}
            class="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#232323] dark:text-[#EAE6DF] border border-[#E4E4E7] dark:border-[#27272A] text-xs font-bold transition-colors"
          >
            <ChevronLeft class="w-4 h-4" />
            <span>{anteriorCapituloDoPlano ? `Anterior (${anteriorCapituloDoPlano.livroNome} ${anteriorCapituloDoPlano.capitulo})` : 'Anterior'}</span>
          </button>

          <span class="text-xs font-bold text-[#52525B] dark:text-[#A1A1AA] font-cinzel">
            {livroAtual.nome} <span class="text-[#7A151C] dark:text-[#8B1C24] font-extrabold">{posicao.capitulo}</span> de {livroAtual.capitulos}
          </span>

          <button
            onClick={handleProximoCapitulo}
            class="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#7A151C] dark:bg-[#8B1C24] hover:bg-[#681117] dark:hover:bg-[#7A151C] text-white text-xs font-black shadow-lg transition-all scale-100 active:scale-95"
          >
            <span>{proximoCapituloDoPlano ? `Próximo (${proximoCapituloDoPlano.livroNome} ${proximoCapituloDoPlano.capitulo})` : 'Próximo'}</span>
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* SEÇÃO DE ANOTAÇÕES DO ESTUDO DIÁRIO & COMPARTILHAMENTO */}
      <section
        id="secao-estudo-whatsapp"
        aria-label="Anotações do Estudo Diário"
        className="bg-[#FFFFFF] dark:bg-[#1C1C1E] rounded-3xl p-6 md:p-8 border border-[#E4E4E7] dark:border-[#27272A] shadow-lg space-y-5 scroll-mt-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7A151C] dark:text-[#8B1C24] uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Estudo Diário • Anotações Pessoais</span>
            </div>
            <h2 className="font-cinzel font-black text-xl md:text-2xl text-[#232323] dark:text-[#EAE6DF] tracking-tight">
              O que Deus falou com você hoje?
            </h2>
          </div>

          {/* Seletor de Versículos do Estudo (De ... Até ...) */}
          <div className="flex items-center gap-2 flex-wrap">
            <label className="text-xs font-bold text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider">
              Versículos do Estudo:
            </label>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#232323] dark:text-[#EAE6DF]">
              <span>Do</span>
              <select
                id="versiculo-inicio-select"
                value={numInicioEstudo}
                onChange={(e) => setVersiculoInicioNum(Number(e.target.value))}
                className="px-2.5 py-1.5 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#E4E4E7] dark:border-[#27272A] text-xs font-bold text-[#7A151C] dark:text-[#8B1C24] focus:outline-none focus:ring-2 focus:ring-[#7A151C]"
              >
                {versiculosAtuais.map((item) => (
                  <option key={item.v} value={item.v}>
                    v. {item.v}
                  </option>
                ))}
              </select>
              <span>até o</span>
              <select
                id="versiculo-fim-select"
                value={numFimEstudo}
                onChange={(e) => setVersiculoFimNum(Number(e.target.value))}
                className="px-2.5 py-1.5 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#E4E4E7] dark:border-[#27272A] text-xs font-bold text-[#7A151C] dark:text-[#8B1C24] focus:outline-none focus:ring-2 focus:ring-[#7A151C]"
              >
                {versiculosAtuais.map((item) => (
                  <option key={item.v} value={item.v}>
                    v. {item.v}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 text-[#7A151C] dark:text-[#8B1C24]">
              {listaVersiculosEstudo.length} {listaVersiculosEstudo.length > 1 ? 'versículos' : 'versículo'}
            </span>
          </div>
        </div>

        {/* Citação dos Versículos Escolhidos */}
        <blockquote className="p-3.5 rounded-2xl bg-[#F9F7F1] dark:bg-[#121212] border-l-4 border-[#7A151C] dark:border-[#8B1C24] text-xs md:text-sm font-crimson italic text-[#232323] dark:text-[#EAE6DF] max-h-36 overflow-y-auto">
          "{textoEstudoCompleto}"
          <span className="block mt-1 font-sans font-bold text-[#7A151C] dark:text-[#8B1C24] not-italic text-[11px]">
            — {referenciaEstudoCompleta} (ACF)
          </span>
        </blockquote>

        {/* Textarea elegante solicitada */}
        <div className="space-y-2">
          <textarea
            rows={4}
            value={notaUsuario}
            onChange={(e) => setNotaUsuario(e.target.value)}
            placeholder="Escreva suas anotações ou o que Deus falou com você hoje..."
            className="w-full p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1C1C1E] border border-[#E4E4E7] dark:border-[#27272A] text-sm text-[#232323] dark:text-[#EAE6DF] placeholder-[#A1A1AA] dark:placeholder-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#7A151C] shadow-xs resize-none font-sans leading-relaxed"
          />
        </div>

        {/* Botão de Fundo Carmesim com ícone do WhatsApp */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <span className="text-[11px] text-[#52525B] dark:text-[#A1A1AA] font-sans">
            Gera o cartão 1080x1080 com o versículo e envia sua anotação completa no texto do WhatsApp.
          </span>

          <button
            onClick={onCompartilharWhatsApp}
            disabled={isSharing}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#7A151C] hover:bg-[#681117] dark:bg-[#8B1C24] dark:hover:bg-[#7A151C] text-white font-inter font-bold text-xs md:text-sm shadow-md transition-all scale-100 active:scale-95 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSharing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gerando Cartão...</span>
              </>
            ) : (
              <>
                {/* SVG Oficial WhatsApp */}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.13 7.39C8.95 7.39 8.66 7.46 8.42 7.72C8.17 7.99 7.48 8.63 7.48 9.94C7.48 11.24 8.43 12.5 8.56 12.68C8.7 12.85 10.42 15.5 13.06 16.64C13.69 16.91 14.18 17.07 14.56 17.19C15.2 17.39 15.78 17.36 16.24 17.3C16.76 17.22 17.83 16.65 18.06 16.01C18.28 15.37 18.28 14.82 18.21 14.71C18.15 14.59 17.97 14.52 17.7 14.39C17.43 14.25 16.11 13.6 15.86 13.51C15.62 13.42 15.44 13.38 15.26 13.64C15.08 13.91 14.57 14.52 14.41 14.7C14.26 14.89 14.1 14.91 13.83 14.77C13.56 14.64 12.69 14.35 11.66 13.43C10.86 12.72 10.32 11.84 10.16 11.57C10.01 11.31 10.15 11.16 10.28 11.03C10.4 10.91 10.56 10.7 10.7 10.53C10.84 10.37 10.88 10.25 10.97 10.07C11.06 9.89 11.02 9.73 10.95 9.6C10.88 9.47 10.34 8.15 10.12 7.61C9.9 7.08 9.68 7.15 9.52 7.14C9.37 7.14 9.19 7.39 9.13 7.39Z" />
                </svg>
                <span>Salvar e Compartilhar no WhatsApp</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Barra Flutuante de Ação para Seleção Múltipla */}
      {modoSelecaoMultipla && versiculosSelecionadosSet.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#FFFFFF] dark:bg-[#1C1C1E] border-2 border-[#7A151C] shadow-2xl rounded-2xl px-5 py-3.5 flex items-center gap-4 animate-fadeIn">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#7A151C] dark:text-[#8B1C24] font-cinzel">
              {versiculosSelecionadosSet.length} {versiculosSelecionadosSet.length > 1 ? 'versículos selecionados' : 'versículo selecionado'}
            </span>
            <span className="text-[11px] text-stone-600 dark:text-stone-300 font-semibold">
              {livroAtual.nome} {posicao.capitulo}:{Math.min(...versiculosSelecionadosSet)}{versiculosSelecionadosSet.length > 1 ? `-${Math.max(...versiculosSelecionadosSet)}` : ''}
            </span>
          </div>

          <button
            onClick={() => {
              const minV = Math.min(...versiculosSelecionadosSet);
              const maxV = Math.max(...versiculosSelecionadosSet);
              const versesSelected = versiculosAtuais.filter(v => versiculosSelecionadosSet.includes(Number(v.v)));
              const txt = versesSelected.map(v => `(${v.v}) ${v.t}`).join(' ');

              setSelectedVerseModal({
                livroId: posicao.livroId,
                capitulo: posicao.capitulo,
                versiculo: minV,
                versiculoFim: maxV,
                texto: txt
              });
              setModoSelecaoMultipla(false);
              setVersiculosSelecionadosSet([]);
            }}
            className="px-4 py-2 rounded-xl bg-[#7A151C] hover:bg-[#681117] text-white text-xs font-bold shadow-md cursor-pointer transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <NotebookPen className="w-3.5 h-3.5" />
            <span>Anotar Versículos</span>
          </button>

          <button
            onClick={() => setVersiculosSelecionadosSet([])}
            className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs font-semibold px-2 py-1 cursor-pointer"
          >
            Limpar
          </button>
        </div>
      )}

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
          versiculoTexto={textoEstudoCompleto}
          referencia={referenciaEstudoCompleta}
          notaUsuario={notaUsuario}
        />
      </div>

      {/* Painel de Estudo Profundo & Prática Diária (apenas se houver conteúdo no capítulo) */}
      <CommentaryPanel />

      {/* Modal de Compartilhamento Interativo */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        cardRef={cardRef}
        versiculoTexto={textoEstudoCompleto}
        referencia={referenciaEstudoCompleta}
        notaUsuario={notaUsuario}
        showToast={showToast}
      />
    </div>
  );
}
