import React from 'react';
import { useApp } from '../../context/AppContext';
import { LIVROS_BIBLIA } from '../../data/bibliaACF';
import CommentaryPanel from './CommentaryPanel';

import {
  ChevronLeft,
  ChevronRight,
  NotebookPen,
  CheckCircle2
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
    registrarAtividadeHoje
  } = useApp();

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

        <div class="flex items-center gap-2.5">
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
            <ChevronRight class="w-5 h-5" />
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

      {/* Painel de Estudo Profundo & Prática Diária (apenas se houver conteúdo no capítulo) */}
      <CommentaryPanel />
    </div>
  );
}
