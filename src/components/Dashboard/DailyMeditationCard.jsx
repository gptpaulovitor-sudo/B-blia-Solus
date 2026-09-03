import React from 'react';
import { useApp } from '../../context/AppContext';
import { getCapituloVersiculos, LIVROS_BIBLIA } from '../../data/bibliaACF';
import { getComentarioCapitulo } from '../../data/comentariosEstudo';
import { Sparkles, HeartHandshake, ArrowRight, Quote, Calendar, Lightbulb } from 'lucide-react';

export default function DailyMeditationCard() {
  const { posicao, irParaCapitulo, versiculosMarcados } = useApp();

  const livroObj = LIVROS_BIBLIA.find(l => l.id === posicao.livroId) || LIVROS_BIBLIA[0];
  const capituloAtual = posicao.capitulo;

  // 1. Obter versículos do capítulo em leitura
  const versiculosCap = getCapituloVersiculos(posicao.livroId, capituloAtual);
  
  // 2. Verificar se há estudo profundo & prática diária/curadoria para este capítulo
  const comentarioCap = getComentarioCapitulo(posicao.livroId, capituloAtual);

  let versiculoNumero = 1;
  let versiculoTexto = versiculosCap[0]?.t || "No princípio era o Verbo, e o Verbo estava com Deus.";
  let meditarInsight = null;
  let referenciaTexto = `${livroObj.nome} ${capituloAtual}:${versiculoNumero}`;

  if (comentarioCap && comentarioCap.analiseVersiculos && comentarioCap.analiseVersiculos.length > 0) {
    const analise = comentarioCap.analiseVersiculos[0];
    versiculoNumero = analise.numero || 1;
    const matchV = versiculosCap.find(v => Number(v.v) === Number(versiculoNumero));
    if (matchV) {
      versiculoTexto = matchV.t;
    }
    referenciaTexto = analise.referenciaCompleta || `${livroObj.nome} ${capituloAtual}:${versiculoNumero}`;
    meditarInsight = analise.conexaoHumana || analise.profundidadeExegetica || analise.aplicacaoPratica;
  } else {
    // Verificar se o usuário marcou algum versículo especificamente neste capítulo
    const marcacao = (versiculosMarcados || []).find(v => v.livroId === posicao.livroId && Number(v.capitulo) === Number(capituloAtual));
    if (marcacao) {
      versiculoNumero = marcacao.versiculo;
      const matchV = versiculosCap.find(v => Number(v.v) === Number(versiculoNumero));
      if (matchV) {
        versiculoTexto = matchV.t;
      }
      referenciaTexto = `${livroObj.nome} ${capituloAtual}:${versiculoNumero}`;
      if (marcacao.nota && marcacao.nota.trim() !== '') {
        meditarInsight = marcacao.nota;
      }
    }
  }

  return (
    <div class="relative overflow-hidden bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-amber-500/20">
      {/* Background Decorative Glow */}
      <div class="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
      
      {/* Top Tag Header */}
      <div class="flex items-center justify-between gap-2 mb-6">
        <div class="flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles class="w-3.5 h-3.5" />
          <span>Palavra do Dia • {livroObj.nome}</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-amber-200/70 font-sans">
          <Calendar class="w-3.5 h-3.5" />
          <span class="capitalize">{new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}</span>
        </div>
      </div>

      {/* Scripture Quote */}
      <div class="mb-5 relative z-10 space-y-3">
        <Quote class="w-8 h-8 text-amber-500/40" />
        <blockquote class="font-serif italic text-lg md:text-xl text-amber-50 leading-relaxed">
          "{versiculoTexto}"
        </blockquote>
        <div class="text-sm font-bold text-amber-400 font-sans flex items-center gap-2">
          <span>— {referenciaTexto} (Versão ACF)</span>
        </div>
      </div>

      {/* Optional Devotional Insight */}
      {meditarInsight && (
        <div class="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed font-sans flex items-start gap-3">
          <Lightbulb class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong class="text-amber-300 block mb-0.5 font-bold uppercase tracking-wider text-[11px]">
              Reflexão de {livroObj.nome}
            </strong>
            <p class="italic">{meditarInsight}</p>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div class="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-amber-500/20">
        <div class="flex items-center gap-2 text-xs text-amber-200/80 font-sans">
          <HeartHandshake class="w-4 h-4 text-amber-400" />
          <span>Meditação ancorada na sua leitura em andamento ({livroObj.nome} {capituloAtual})</span>
        </div>

        <button
          onClick={() => irParaCapitulo(posicao.livroId, capituloAtual)}
          class="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all scale-100 active:scale-95 cursor-pointer"
        >
          <span>Ler {livroObj.nome} {capituloAtual} Completo</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
