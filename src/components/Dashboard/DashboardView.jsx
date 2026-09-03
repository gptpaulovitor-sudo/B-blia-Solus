import React from 'react';
import { useApp } from '../../context/AppContext';
import DailyMeditationCard from './DailyMeditationCard';
import {
  Flame,
  Target,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Bookmark,
  ChevronRight,
  TrendingUp,
  Play
} from 'lucide-react';
import { LIVROS_BIBLIA, getCapituloVersiculos } from '../../data/bibliaACF';

export default function DashboardView() {
  const {
    posicao,
    toggleCapituloLido,
    planoAtivo,
    setActiveTab,
    irParaCapitulo,
    progressoCapitulos,
    versiculosMarcados,
    ofensivaDias
  } = useApp();

  // Estatísticas rápidas
  const totalCapitulosLidos = Object.keys(progressoCapitulos || {}).length;
  const totalMarcacoes = versiculosMarcados.length;

  // Leitura em Andamento / Continuar de Onde Parou
  const livroPosicaoObj = LIVROS_BIBLIA.find(l => l.id === posicao.livroId) || LIVROS_BIBLIA[0];
  const isCapAtualLido = !!progressoCapitulos[`${posicao.livroId}-${posicao.capitulo}`];

  const getProximoCapitulo = (livroId, capitulo) => {
    const livroIndex = LIVROS_BIBLIA.findIndex(l => l.id === livroId);
    const lObj = LIVROS_BIBLIA[livroIndex] || LIVROS_BIBLIA[0];

    if (capitulo < lObj.capitulos) {
      return { livroId: lObj.id, capitulo: capitulo + 1, livroNome: lObj.nome };
    } else if (livroIndex < LIVROS_BIBLIA.length - 1) {
      const proxLivro = LIVROS_BIBLIA[livroIndex + 1];
      return { livroId: proxLivro.id, capitulo: 1, livroNome: proxLivro.nome };
    } else {
      return { livroId: 'genesis', capitulo: 1, livroNome: 'Gênesis' };
    }
  };

  const proximaLeitura = isCapAtualLido
    ? getProximoCapitulo(posicao.livroId, posicao.capitulo)
    : { livroId: posicao.livroId, capitulo: posicao.capitulo, livroNome: livroPosicaoObj.nome };

  const versiculosCap = getCapituloVersiculos(posicao.livroId, posicao.capitulo);
  const versiculoPreview = versiculosCap.length > 0 ? versiculosCap[0].t : '';

  // Informações do plano ativo
  let diaAtual = 1;
  let metaDoDia = null;
  let capitulosFaltantes = 0;
  let percentualPlano = 0;

  if (planoAtivo && planoAtivo.metasDiarias) {
    const totalDias = planoAtivo.duracaoDias || 365;
    const diasConcluidos = Object.values(planoAtivo.progressoDias || {}).filter(Boolean).length;
    percentualPlano = Math.min(100, Math.round((diasConcluidos / Math.max(1, totalDias)) * 100));

    // Encontrar o dia atual ativo (primeiro dia pendente ou o último concluído)
    metaDoDia = planoAtivo.metasDiarias.find(m => !planoAtivo.progressoDias?.[m.dia]) || planoAtivo.metasDiarias[planoAtivo.metasDiarias.length - 1];
    if (metaDoDia) {
      diaAtual = metaDoDia.dia;
      const capsFaltantes = metaDoDia.capitulos?.filter(c => !progressoCapitulos[`${c.livroId}-${c.capitulo}`]) || [];
      capitulosFaltantes = capsFaltantes.length;
    }
  }

  return (
    <div class="min-h-screen pb-28 md:pb-12 pt-4 px-4 max-w-7xl mx-auto space-y-8 animate-fade-in">

      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FFFFFF] dark:bg-[#18181D] rounded-3xl p-6 md:p-8 border border-[#E8E2D5] dark:border-[#2C271E] shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#9E7418] dark:text-[#D4AF37] font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Solus Christus • Estudo Profundo & Prática Diária</span>
          </div>
          <h1 className="font-cinzel font-black text-2xl md:text-3xl text-[#1F1C18] dark:text-[#F6F4EE] tracking-tight">
            Fundamento da Fé
          </h1>

          {/* Versículo Base Destacado */}
          <blockquote className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121215] border-l-4 border-[#9E7418] dark:border-[#D4AF37] text-xs md:text-sm font-crimson italic text-[#1F1C18] dark:text-[#F6F4EE]">
            "Jesus lhe disse: Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim."
            <span className="block mt-1 font-sans font-bold text-[#9E7418] dark:text-[#D4AF37] not-italic text-[11px]">
              — João 14:6
            </span>
          </blockquote>
        </div>

        {/* Streak & Stats Counter */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#9E7418]/10 dark:bg-[#D4AF37]/20 border border-[#9E7418]/20 dark:border-[#D4AF37]/30">
            <Flame className="w-5 h-5 text-[#9E7418] dark:text-[#D4AF37] fill-[#9E7418]/20" />
            <div>
              <div className="text-[10px] uppercase font-bold text-[#9E7418] dark:text-[#D4AF37] tracking-wider">Ofensiva</div>
              <div className="text-sm font-extrabold text-[#1F1C18] dark:text-[#F6F4EE]">
                {ofensivaDias} {ofensivaDias === 1 ? 'Dia Seguido' : 'Dias Seguidos'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leitura em Andamento / Continuar Leitura */}
      <section aria-label="Leitura em Andamento" class="bg-gradient-to-br from-amber-500/10 via-stone-900/50 to-stone-900 rounded-3xl p-6 md:p-8 border border-amber-500/30 shadow-xl space-y-5 relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800/80">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
              <BookOpen class="w-6 h-6" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  Leitura em Andamento
                </span>
                <span class="text-xs text-stone-400">•</span>
                <span class="text-xs font-semibold text-stone-500 dark:text-stone-400">
                  {livroPosicaoObj.testamento === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}
                </span>
              </div>
              <h2 class="font-serif font-black text-2xl md:text-3xl text-stone-900 dark:text-stone-100 tracking-tight mt-0.5">
                {livroPosicaoObj.nome} <span class="text-amber-600 dark:text-amber-400">{posicao.capitulo}</span>
              </h2>
            </div>
          </div>

          <div class="flex items-center gap-2">
            {isCapAtualLido ? (
              <span class="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold flex items-center gap-1.5">
                <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500" />
                <span>Capítulo {posicao.capitulo} Concluído</span>
              </span>
            ) : (
              <span class="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-extrabold flex items-center gap-1.5">
                <Flame class="w-3.5 h-3.5 text-amber-500" />
                <span>Em Andamento</span>
              </span>
            )}
          </div>
        </div>

        {/* Verse 1 Preview Quote */}
        {versiculoPreview && (
          <blockquote class="font-serif italic text-sm md:text-base text-stone-700 dark:text-stone-300 pl-4 border-l-2 border-amber-500 leading-relaxed max-h-24 overflow-hidden text-ellipsis line-clamp-2">
            "{versiculoPreview}"
          </blockquote>
        )}

        {/* Card Action Buttons */}
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div class="text-xs text-stone-500 dark:text-stone-400 font-medium">
            {isCapAtualLido ? (
              <span>Próximo capítulo: <strong class="text-stone-900 dark:text-stone-100">{proximaLeitura.livroNome} {proximaLeitura.capitulo}</strong></span>
            ) : (
              <span>Capítulo atual: <strong class="text-stone-900 dark:text-stone-100">{livroPosicaoObj.nome} {posicao.capitulo}</strong></span>
            )}
          </div>

          <div class="flex items-center gap-3">
            {!isCapAtualLido && (
              <button
                onClick={() => toggleCapituloLido(posicao.livroId, posicao.capitulo)}
                class="px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 class="w-4 h-4 text-emerald-500" />
                <span>Concluir {posicao.capitulo}</span>
              </button>
            )}

            <button
              onClick={() => irParaCapitulo(proximaLeitura.livroId, proximaLeitura.capitulo)}
              class="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 text-xs font-black shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group scale-100 active:scale-95"
            >
              <span>{isCapAtualLido ? `Continuar para ${proximaLeitura.livroNome} ${proximaLeitura.capitulo}` : `Retomar ${livroPosicaoObj.nome} ${posicao.capitulo}`}</span>
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Active Reading Plan Dashboard Widget */}
      {planoAtivo && (
        <section aria-label="Progresso do Plano de Leitura Ativo" class="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Target class="w-6 h-6" />
              </div>
              <div>
                <span class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Plano Ativo
                </span>
                <h2 class="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  {planoAtivo.titulo}
                </h2>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold">
                Dia {diaAtual} de {planoAtivo.duracaoDias || 365}
              </span>
              <button
                onClick={() => setActiveTab('plans')}
                class="text-xs font-semibold text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                Gerenciar
              </button>
            </div>
          </div>

          {/* Progress Bar & Status Text */}
          <div class="space-y-2">
            <div class="flex justify-between items-center text-xs font-semibold">
              <span class="text-stone-700 dark:text-stone-300 font-bold">
                {capitulosFaltantes === 0 ? (
                  <span class="text-emerald-600 dark:text-emerald-400">✨ Todas as metas do Dia {diaAtual} foram concluídas!</span>
                ) : (
                  <span>Dia {diaAtual} — Faltam {capitulosFaltantes} {capitulosFaltantes === 1 ? 'Capítulo' : 'Capítulos'} para hoje!</span>
                )}
              </span>
              <span class="text-amber-600 dark:text-amber-400 font-bold">{percentualPlano}% concluído</span>
            </div>
            <div class="w-full bg-stone-100 dark:bg-stone-800 h-3 rounded-full overflow-hidden">
              <div
                class="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${percentualPlano}%` }}
              ></div>
            </div>
          </div>

          {/* Today's Target Chapters Checklist */}
          {metaDoDia && metaDoDia.capitulos && (
            <div class="pt-2">
              <label class="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                Leitura Agendada para Hoje ({metaDoDia.dataFormatted}):
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {metaDoDia.capitulos.map((cap) => {
                  const isCapLido = !!progressoCapitulos[`${cap.livroId}-${cap.capitulo}`];
                  return (
                    <button
                      key={`${cap.livroId}-${cap.capitulo}`}
                      onClick={() => irParaCapitulo(cap.livroId, cap.capitulo)}
                      class={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all group ${isCapLido
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200'
                          : 'bg-stone-50 dark:bg-stone-950/50 border-stone-200 dark:border-stone-800 hover:border-amber-400 text-stone-800 dark:text-stone-200'
                        }`}
                    >
                      <div class="flex items-center gap-2.5">
                        <CheckCircle2 class={`w-4 h-4 ${isCapLido ? 'text-emerald-500 fill-emerald-500/20' : 'text-stone-300'}`} />
                        <div>
                          <div class="font-serif font-bold text-sm">{cap.livroNome} {cap.capitulo}</div>
                          <div class="text-[10px] text-stone-500">Versão ACF</div>
                        </div>
                      </div>
                      <ChevronRight class="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Featured Daily Meditation Devotional Generator Card */}
      <section aria-label="Meditação Devocional do Dia">
        <DailyMeditationCard />
      </section>

      {/* Quick Access Grid */}
      <section aria-label="Acesso Rápido" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveTab('reader')}
          class="p-6 rounded-3xl bg-[#FFFFFF] dark:bg-[#18181D] border border-[#E8E2D5] dark:border-[#2C271E] shadow-xs hover:border-[#9E7418] dark:hover:border-[#D4AF37] transition-all cursor-pointer group"
        >
          <div class="w-10 h-10 rounded-2xl bg-[#9E7418]/10 dark:bg-[#D4AF37]/20 text-[#9E7418] dark:text-[#D4AF37] flex items-center justify-center mb-3">
            <BookOpen class="w-5 h-5" />
          </div>
          <h3 class="font-cinzel font-bold text-[#1F1C18] dark:text-[#F6F4EE] text-lg group-hover:text-[#9E7418] dark:group-hover:text-[#D4AF37] transition-colors">
            Raízes
          </h3>
          <p class="text-xs text-[#6B6357] dark:text-[#A39D90] mt-1 font-sans leading-relaxed">
            Leitura & Estudo Profundo & Prática Diária dos 66 livros bíblicos com comentários integrados.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('plans')}
          class="p-6 rounded-3xl bg-[#FFFFFF] dark:bg-[#18181D] border border-[#E8E2D5] dark:border-[#2C271E] shadow-xs hover:border-[#9E7418] dark:hover:border-[#D4AF37] transition-all cursor-pointer group"
        >
          <div class="w-10 h-10 rounded-2xl bg-[#9E7418]/10 dark:bg-[#D4AF37]/20 text-[#9E7418] dark:text-[#D4AF37] flex items-center justify-center mb-3">
            <Target class="w-5 h-5" />
          </div>
          <h3 class="font-cinzel font-bold text-[#1F1C18] dark:text-[#F6F4EE] text-lg group-hover:text-[#9E7418] dark:group-hover:text-[#D4AF37] transition-colors">
            Obediência
          </h3>
          <p class="text-xs text-[#6B6357] dark:text-[#A39D90] mt-1 font-sans leading-relaxed">
            Metas & Planos de Leitura estruturados por datas e sugestões cronológicas.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('profile')}
          class="p-6 rounded-3xl bg-[#FFFFFF] dark:bg-[#18181D] border border-[#E8E2D5] dark:border-[#2C271E] shadow-xs hover:border-[#9E7418] dark:hover:border-[#D4AF37] transition-all cursor-pointer group"
        >
          <div class="w-10 h-10 rounded-2xl bg-[#9E7418]/10 dark:bg-[#D4AF37]/20 text-[#9E7418] dark:text-[#D4AF37] flex items-center justify-center mb-3">
            <Bookmark class="w-5 h-5" />
          </div>
          <h3 class="font-cinzel font-bold text-[#1F1C18] dark:text-[#F6F4EE] text-lg group-hover:text-[#9E7418] dark:group-hover:text-[#D4AF37] transition-colors">
            Disciplina
          </h3>
          <p class="text-xs text-[#6B6357] dark:text-[#A39D90] mt-1 font-sans leading-relaxed">
            {totalMarcacoes} versículos destacados e anotações pessoais salvas no seu caderno.
          </p>
        </div>
      </section>
    </div>
  );
}
