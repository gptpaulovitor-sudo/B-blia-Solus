import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PLANOS_PREDEFINIDOS } from '../../data/planosPreset';
import { calcularPlanoPersonalizado } from '../../services/planCalculator';
import CustomPlanForm from './CustomPlanForm';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  History, 
  BookOpenCheck,
  ChevronRight,
  Flame,
  Award,
  Trash2
} from 'lucide-react';

export default function PlansView() {
  const { 
    planoAtivo, 
    ativarPlano, 
    excluirPlano,
    toggleDiaPlanoAtivo, 
    setIsCustomPlanOpen,
    irParaCapitulo,
    progressoCapitulos
  } = useApp();

  const [expandedDay, setExpandedDay] = useState(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [filtroMetas, setFiltroMetas] = useState('pendentes'); // 'todos' | 'pendentes' | 'concluidos'
  const [pageMetas, setPageMetas] = useState(30);

  const iconesMap = {
    Calendar: Calendar,
    History: History,
    BookOpenCheck: BookOpenCheck
  };

  const handleAtivarPreset = (preset) => {
    const hoje = new Date();
    const dataFim = new Date();
    dataFim.setDate(hoje.getDate() + preset.duracaoDias);

    const novoPlano = calcularPlanoPersonalizado({
      titulo: preset.titulo,
      dataInicio: hoje.toISOString().split('T')[0],
      dataFim: dataFim.toISOString().split('T')[0],
      livrosIds: preset.livrosRecomendados
    });

    ativarPlano(novoPlano);
  };

  // Cálculo de progresso do plano ativo
  let totalDias = 365;
  let diasConcluidos = 0;
  let percentual = 0;

  if (planoAtivo) {
    totalDias = planoAtivo.duracaoDias || 365;
    diasConcluidos = Object.values(planoAtivo.progressoDias || {}).filter(Boolean).length;
    percentual = Math.min(100, Math.round((diasConcluidos / Math.max(1, totalDias)) * 100));
  }

  return (
    <div class="min-h-screen pb-28 md:pb-12 pt-4 px-4 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FFFFFF] dark:bg-[#18181D] rounded-3xl p-6 border border-[#E8E2D5] dark:border-[#2C271E] shadow-xs">
        <div>
          <div class="flex items-center gap-2 text-[#9E7418] dark:text-[#D4AF37] font-bold text-xs uppercase tracking-widest">
            <Target class="w-4 h-4" />
            <span>Solus Christus • Módulo de Obediência</span>
          </div>
          <h1 class="font-cinzel font-black text-2xl md:text-3xl text-[#1F1C18] dark:text-[#F6F4EE] tracking-tight mt-1">
            Obediência (Metas & Planos Bíblicos)
          </h1>
          <p class="text-[#6B6357] dark:text-[#A39D90] text-xs md:text-sm mt-1 font-sans">
            Acompanhe o seu progresso diário ou crie um plano sob medida para sua rotina de discipulado.
          </p>
        </div>

        <button
          onClick={() => setIsCustomPlanOpen(true)}
          class="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#9E7418] dark:bg-[#D4AF37] hover:bg-[#855F0E] dark:hover:bg-[#9E7418] text-white font-bold text-xs shadow-md transition-all scale-100 active:scale-95 shrink-0"
        >
          <Plus class="w-4 h-4" />
          <span>Criar Plano Personalizado</span>
        </button>
      </div>

      {/* Active Reading Plan Progress Dashboard */}
      {planoAtivo && (
        <section aria-label="Plano de Leitura Ativo" class="bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
            <div>
              <span class="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                Plano em Andamento
              </span>
              <h2 class="font-serif font-bold text-xl md:text-2xl text-stone-900 dark:text-stone-100 mt-2">
                {planoAtivo.titulo}
              </h2>
              <p class="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Período: {planoAtivo.dataInicio} até {planoAtivo.dataFim} ({totalDias} Dias)
              </p>
            </div>

            <div class="flex items-center gap-3">
              <div class="text-right">
                <div class="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-serif">
                  {percentual}%
                </div>
                <div class="text-[11px] text-stone-500 font-medium">
                  {diasConcluidos} de {totalDias} Dias
                </div>
              </div>

              {!isConfirmingDelete ? (
                <button
                  onClick={() => setIsConfirmingDelete(true)}
                  title="Excluir este plano"
                  class="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors ml-2"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              ) : (
                <div class="flex items-center gap-1 bg-red-50 dark:bg-red-950/60 p-1.5 rounded-xl border border-red-200 dark:border-red-900/60 animate-fade-in">
                  <span class="text-[11px] text-red-700 dark:text-red-300 font-semibold px-1">Confirmar?</span>
                  <button
                    onClick={() => {
                      excluirPlano();
                      setIsConfirmingDelete(false);
                    }}
                    class="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
                  >
                    Sim, Excluir
                  </button>
                  <button
                    onClick={() => setIsConfirmingDelete(false)}
                    class="px-2 py-1 text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                  >
                    Não
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div class="space-y-2">
            <div class="w-full bg-stone-100 dark:bg-stone-800 h-4 rounded-full overflow-hidden p-0.5">
              <div
                class="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-500 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${percentual}%` }}
              ></div>
            </div>
          </div>

          {/* Daily Schedule List */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                Lista de Metas Diárias
              </h3>
              <div className="flex gap-1 text-xs font-bold">
                {['todos', 'pendentes', 'concluidos'].map(f => (
                  <button
                    key={f}
                    onClick={() => { setFiltroMetas(f); setPageMetas(30); }}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      filtroMetas === f
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    {f === 'todos' ? 'Todos' : f === 'pendentes' ? 'Pendentes' : 'Concluídos'}
                  </button>
                ))}
              </div>
            </div>

            {(() => {
              const hojeISO = new Date().toISOString().split('T')[0];
              const metasFiltradas = (planoAtivo.metasDiarias || []).filter(meta => {
                const isConcluido = !!planoAtivo.progressoDias?.[meta.dia];
                if (filtroMetas === 'pendentes') return !isConcluido;
                if (filtroMetas === 'concluidos') return isConcluido;
                return true;
              });
              const metasVisiveis = metasFiltradas.slice(0, pageMetas);
              return (
                <>
                  <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                    {metasVisiveis.map((meta) => {
              const isConcluido = !!planoAtivo.progressoDias?.[meta.dia];
              const isExpanded = expandedDay === meta.dia;
              const isHoje = meta.isoDate === hojeISO;

              return (
                <div
                  key={meta.dia}
                  className={`p-4 rounded-2xl border transition-all ${
                    isHoje
                      ? 'ring-2 ring-amber-400 bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700'
                      : isConcluido
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                      : 'bg-stone-50 dark:bg-stone-950/40 border-stone-200/80 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleDiaPlanoAtivo(meta.dia)}
                        title={isConcluido ? 'Desmarcar dia' : 'Marcar dia como concluído'}
                        className="p-1 text-stone-400 hover:text-emerald-600 transition-colors"
                      >
                        <CheckCircle2 className={`w-6 h-6 ${isConcluido ? 'text-emerald-500 fill-emerald-500/20' : ''}`} />
                      </button>

                      <div>
                        <div className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                          Dia {meta.dia}
                          {isHoje && <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-500 text-stone-950">Hoje</span>}
                          <span className="text-xs font-normal text-stone-500">({meta.dataFormatted})</span>
                        </div>
                        <div className="text-xs text-stone-600 dark:text-stone-400 font-serif">
                          {meta.capitulos.map(c => `${c.livroNome} ${c.capitulo}`).join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (meta.capitulos && meta.capitulos.length > 0) {
                            const capPendente = meta.capitulos.find(c => !progressoCapitulos[`${c.livroId}-${c.capitulo}`]) || meta.capitulos[0];
                            irParaCapitulo(capPendente.livroId, capPendente.capitulo);
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>Ir Ler</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setExpandedDay(isExpanded ? null : meta.dia)}
                        className="px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 text-xs font-semibold transition-colors"
                      >
                        {isExpanded ? 'Ocultar' : 'Ver Capítulos'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded list of daily chapters */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-stone-200/60 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fade-in">
                      {meta.capitulos.map((c) => (
                        <button
                          key={`${c.livroId}-${c.capitulo}`}
                          onClick={() => irParaCapitulo(c.livroId, c.capitulo)}
                          className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-left text-xs font-serif font-bold text-stone-800 dark:text-stone-200 hover:border-amber-500 flex items-center justify-between"
                        >
                          <span>{c.livroNome} cap. {c.capitulo}</span>
                          <ChevronRight className="w-4 h-4 text-amber-600" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
                  </div>
                  {pageMetas < metasFiltradas.length && (
                    <button
                      onClick={() => setPageMetas(p => p + 30)}
                      className="mt-3 w-full py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-amber-500 hover:text-stone-950 transition-all"
                    >
                      Ver mais {Math.min(30, metasFiltradas.length - pageMetas)} dias ({metasFiltradas.length - pageMetas} restantes)
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </section>
      )}

      {/* Empty State Banner when no plan is active */}
      {!planoAtivo && (
        <div class="bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 border border-stone-200/80 dark:border-stone-800 text-center space-y-3 shadow-xs">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center">
            <Target class="w-6 h-6" />
          </div>
          <h3 class="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
            Nenhum Plano de Leitura Ativo
          </h3>
          <p class="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            Você não possui um plano ativo no momento. Escolha um dos modelos pré-definidos abaixo ou clique no botão acima para personalizar o seu próprio plano!
          </p>
        </div>
      )}

      {/* Preset Plan Models */}
      <section aria-label="Modelos Pré-definidos de Planos de Leitura" class="space-y-4">
        <div>
          <h2 class="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
            Modelos de Planos Pré-definidos
          </h2>
          <p class="text-xs text-stone-500 dark:text-stone-400">
            Selecione uma lógica estruturada para iniciar seu estudo imediatamente.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANOS_PREDEFINIDOS.map((preset) => {
            const Icon = iconesMap[preset.icone] || Calendar;
            return (
              <div
                key={preset.id}
                class="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col justify-between hover:border-amber-400 transition-all group"
              >
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <Icon class="w-5 h-5" />
                    </div>
                    <span class={`text-[11px] font-bold px-2.5 py-1 rounded-full ${preset.corBadge}`}>
                      {preset.duracaoDias} Dias
                    </span>
                  </div>

                  <h3 class="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors">
                    {preset.titulo}
                  </h3>

                  <p class="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                    {preset.descricao}
                  </p>
                </div>

                <div class="pt-6 mt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={() => handleAtivarPreset(preset)}
                    class="w-full py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 text-stone-800 dark:text-stone-200 text-xs font-bold transition-all text-center"
                  >
                    Ativar Este Plano
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Plan Modal Component */}
      <CustomPlanForm />
    </div>
  );
}
