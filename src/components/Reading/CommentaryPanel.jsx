import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Search, Compass, Target, Layers, BookOpen } from 'lucide-react';

export default function CommentaryPanel() {
  const { comentarioAtual, livroAtual, posicao } = useApp();

  if (!comentarioAtual) return null;

  const versiculosAnalisados = comentarioAtual.analiseVersiculos || [];
  const blocoNome = comentarioAtual.blocoNome;

  return (
    <section
      id="curadoria-exegetica-bloco"
      aria-label="Estudo Profundo & Prática Diária da Passagem"
      class="bg-white dark:bg-zinc-950 rounded-3xl p-6 md:p-10 border border-stone-200 dark:border-amber-500/30 shadow-xl space-y-8 transition-all duration-300 animate-fade-in"
    >
      {/* Title Header */}
      <div class="flex items-start gap-4 border-b border-stone-200 dark:border-zinc-800/80 pb-6">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-amber-200 flex items-center justify-center flex-shrink-0 shadow-md mt-0.5">
          <Sparkles class="w-6 h-6" />
        </div>
        <div class="space-y-1.5">
          {blocoNome && (
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/40 text-amber-300 font-sans text-xs font-black uppercase tracking-wider">
              <Layers class="w-3.5 h-3.5 text-amber-400" />
              <span>{blocoNome}</span>
            </div>
          )}
          <h3 class="font-serif font-black text-xl md:text-2xl text-zinc-900 dark:text-amber-400 leading-snug">
            📖 ESTUDO PROFUNDO & PRÁTICA DIÁRIA: A BÍBLIA EM BLOCOS
          </h3>
        </div>
      </div>

      {/* ANÁLISE DOS VERSÍCULOS SELECIONADOS */}
      <div class="space-y-6">
        {versiculosAnalisados.map((item) => (
          <div
            key={item.referenciaCompleta}
            class="p-5 md:p-6 rounded-2xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800/80 shadow-sm space-y-4"
            style={{ fontFamily: 'var(--font-leitura)' }}
          >
            {/* Header do Versículo */}
            <div class="flex items-center gap-2 text-base md:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
              <span class="inline-flex items-center justify-center px-3.5 py-1 rounded-xl bg-amber-600 dark:bg-amber-700 text-white font-sans text-xs font-black shadow-sm uppercase tracking-wider">
                {item.referenciaCompleta}
              </span>
            </div>

            {/* Tópicos */}
            <div class="space-y-3 text-sm md:text-base leading-relaxed pt-1">
              {/* 🔍 Estudo Profundo & Prática Diária */}
              <div class="flex items-start gap-3 text-zinc-800 dark:text-zinc-200">
                <Search class="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <strong class="font-bold text-zinc-900 dark:text-zinc-100">Estudo Profundo & Prática Diária:</strong>{' '}
                  <span>{item.profundidadeExegetica}</span>
                </div>
              </div>

              {/* 💡 Conexão Humana */}
              <div class="flex items-start gap-3 text-zinc-800 dark:text-zinc-200">
                <Compass class="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <strong class="font-bold text-zinc-900 dark:text-zinc-100">Conexão Humana:</strong>{' '}
                  <span>{item.conexaoHumana}</span>
                </div>
              </div>

              {/* 🎯 Aplicação Prática */}
              <div class="flex items-start gap-3 text-zinc-800 dark:text-zinc-200">
                <Target class="w-4 h-4 text-red-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <strong class="font-bold text-zinc-900 dark:text-zinc-100">Aplicação Prática:</strong>{' '}
                  <span class="italic text-zinc-800 dark:text-zinc-200">{item.aplicacaoPratica}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footnote Bar */}
      <div class="pt-4 border-t border-stone-200 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-sans">
        <span class="flex items-center gap-2 font-medium">
          <BookOpen class="w-4 h-4 text-amber-600 dark:text-amber-500" />
          Bíblia de Estudo Lux — Estudo Profundo & Prática Diária em Blocos
        </span>
        <span class="italic text-amber-700 dark:text-amber-400 font-semibold">{livroAtual.nome} cap. {posicao.capitulo}</span>
      </div>
    </section>
  );
}
