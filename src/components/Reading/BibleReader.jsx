import React from 'react';
import { useApp } from '../../context/AppContext';
import { LIVROS_BIBLIA } from '../../data/bibliaACF';
import CommentaryPanel from './CommentaryPanel';
import WhatsAppShareCard from './WhatsAppShareCard';
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
    showToast
  } = useApp();

  const cardRef = React.useRef(null);
  const [versiculoBaseNum, setVersiculoBaseNum] = React.useState(1);
  const [notaUsuario, setNotaUsuario] = React.useState('');
  const [isSharing, setIsSharing] = React.useState(false);

  // Carregar anotação existente ao mudar de livro ou capítulo
  React.useEffect(() => {
    const notaExistente = (versiculosMarcados || []).find(
      v => v.livroId === posicao.livroId && Number(v.capitulo) === Number(posicao.capitulo) && v.nota?.trim()
    );

    if (notaExistente) {
      setVersiculoBaseNum(Number(notaExistente.versiculo));
      setNotaUsuario(notaExistente.nota);
    } else {
      setVersiculoBaseNum(1);
      setNotaUsuario('');
    }
  }, [posicao.livroId, posicao.capitulo]);

  const versiculoBaseObj = React.useMemo(() => {
    return versiculosAtuais.find(v => Number(v.v) === Number(versiculoBaseNum)) || versiculosAtuais[0] || { v: 1, t: '' };
  }, [versiculosAtuais, versiculoBaseNum]);

  const referenciaCompleta = `${livroAtual.nome} ${posicao.capitulo}:${versiculoBaseObj.v}`;

  const onCompartilharWhatsApp = async () => {
    try {
      setIsSharing(true);
      // Salva anotação no progresso pessoal e ativa ofensiva
      registrarAtividadeHoje();
      salvarVersiculoMarcado({
        livroId: posicao.livroId,
        capitulo: posicao.capitulo,
        versiculo: versiculoBaseObj.v,
        nota: notaUsuario
      });

      // Dispara renderização e compartilhamento
      await handleShareWhatsApp({
        notaUsuario,
        versiculoDoDia: {
          texto: versiculoBaseObj.t,
          referencia: referenciaCompleta
        },
        cardElement: cardRef.current,
        showToast
      });
    } catch (err) {
      console.error('Erro ao compartilhar no WhatsApp:', err);
    } finally {
      setIsSharing(false);
    }
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

        <div class="flex items-center gap-2">
          <button
            onClick={() => {
              const sec = document.getElementById('secao-estudo-whatsapp');
              if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            }}
            class="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#7A151C] dark:text-[#EAE6DF] border border-[#E4E4E7] dark:border-[#27272A] text-xs font-bold transition-colors cursor-pointer"
            title="Ir para Anotações e Compartilhar no WhatsApp"
          >
            <NotebookPen class="w-4 h-4 text-[#7A151C] dark:text-[#8B1C24]" />
            <span class="hidden sm:inline">Anotar & WhatsApp</span>
          </button>

          <button
            onClick={() => toggleCapituloLido(posicao.livroId, posicao.capitulo)}
            class={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${isCapLido
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                : 'bg-[#7A151C] dark:bg-[#8B1C24] hover:bg-[#681117] dark:hover:bg-[#7A151C] text-white shadow-md'
              }`}
          >
            <CheckCircle2 class="w-4 h-4" />
            <span>{isCapLido ? 'Capítulo Lido' : 'Concluir Capítulo'}</span>
          </button>

          <button
            onClick={handleProximoCapitulo}
            class="p-2.5 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#232323] dark:text-[#EAE6DF] border border-[#E4E4E7] dark:border-[#27272A] transition-colors"
            title={proximoCapituloDoPlano ? `Próximo do Plano: ${proximoCapituloDoPlano.livroNome} ${proximoCapituloDoPlano.capitulo}` : "Próximo Capítulo"}
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Continuous Bible Reading Card */}
      <main aria-label="Texto Bíblico Versão ACF" class="bg-[#FFFFFF] dark:bg-[#1C1C1E] rounded-3xl p-6 md:p-10 border border-[#E4E4E7] dark:border-[#27272A] shadow-lg">
        <div
          class="space-y-5 text-[#232323] dark:text-[#EAE6DF]"
          style={{ fontFamily: 'var(--font-leitura)', fontSize: `${settings.fontSize}px`, lineHeight: 1.85 }}
        >
          {versiculosAtuais.map((item) => {
            const idVersiculo = `v_${posicao.livroId}_${posicao.capitulo}_${item.v}`;
            const marcacao = versiculosMarcados.find(v => v.id === idVersiculo || (v.livroId === posicao.livroId && Number(v.capitulo) === Number(posicao.capitulo) && Number(v.versiculo) === Number(item.v)));
            const highlightClass = marcacao?.cor ? `highlight-${marcacao.cor}` : '';
            const temNota = !!marcacao?.nota;

            return (
              <div key={item.v} class="group relative inline">
                <span
                  onClick={() => setSelectedVerseModal({
                    livroId: posicao.livroId,
                    capitulo: posicao.capitulo,
                    versiculo: item.v,
                    texto: item.t
                  })}
                  class={`
                    inline rounded-md px-1.5 py-0.5 cursor-pointer transition-all duration-150 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 text-stone-900 dark:text-zinc-100
                    ${highlightClass}
                  `}
                >
                  {/* Verse Number Indicator */}
                  <sup class="font-sans text-[12px] font-black text-amber-600 dark:text-amber-400 mr-1.5 select-none">
                    {item.v}
                  </sup>

                  <span>{item.t}</span>

                  {/* Personal Note Indicator */}
                  {temNota && (
                    <span title={`Nota: ${marcacao.nota}`} class="inline-flex items-center ml-1 text-red-600 dark:text-red-400">
                      <NotebookPen class="w-3.5 h-3.5 inline" />
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

          {/* Seletor de Versículo Base do Capítulo */}
          <div className="flex items-center gap-2">
            <label htmlFor="versiculo-base-select" className="text-xs font-bold text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider">
              Versículo Base:
            </label>
            <select
              id="versiculo-base-select"
              value={versiculoBaseNum}
              onChange={(e) => setVersiculoBaseNum(Number(e.target.value))}
              className="px-3 py-1.5 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#E4E4E7] dark:border-[#27272A] text-xs font-bold text-[#7A151C] dark:text-[#8B1C24] focus:outline-none focus:ring-2 focus:ring-[#7A151C]"
            >
              {versiculosAtuais.map((item) => (
                <option key={item.v} value={item.v}>
                  {livroAtual.nome} {posicao.capitulo}:{item.v}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Citação do Versículo Base Escolhido */}
        <blockquote className="p-3.5 rounded-2xl bg-[#F9F7F1] dark:bg-[#121212] border-l-4 border-[#7A151C] dark:border-[#8B1C24] text-xs md:text-sm font-crimson italic text-[#232323] dark:text-[#EAE6DF]">
          "{versiculoBaseObj.t}"
          <span className="block mt-1 font-sans font-bold text-[#7A151C] dark:text-[#8B1C24] not-italic text-[11px]">
            — {referenciaCompleta} (ACF)
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
            Gera um cartão quadrado 1080x1080 para WhatsApp com sua anotação e versículo.
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
          versiculoTexto={versiculoBaseObj.t}
          referencia={referenciaCompleta}
          notaUsuario={notaUsuario}
        />
      </div>

      {/* Painel de Estudo Profundo & Prática Diária (apenas se houver conteúdo no capítulo) */}
      <CommentaryPanel />
    </div>
  );
}
