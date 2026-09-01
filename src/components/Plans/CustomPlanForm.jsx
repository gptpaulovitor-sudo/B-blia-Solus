import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LIVROS_BIBLIA } from '../../data/bibliaACF';
import { calcularPlanoPersonalizado } from '../../services/planCalculator';
import { X, Calendar, BookOpen, Sparkles, Check, CheckCircle2, Compass, ArrowRight } from 'lucide-react';

const SUGESTOES_ORDEM = [
  {
    id: 'sequencial',
    titulo: 'Sequencial Canônico',
    descricao: 'Lê na ordem tradicional da Bíblia (Gênesis a Apocalipse).',
    icon: '📜'
  },
  {
    id: 'cronologica',
    titulo: 'Ordem Cronológica',
    descricao: 'Organiza pela ordem histórica dos acontecimentos.',
    icon: '⏳'
  },
  {
    id: 'alternado',
    titulo: 'Alternado (AT & NT)',
    descricao: 'Intercala capítulos do Antigo e Novo Testamento.',
    icon: '🔄'
  },
  {
    id: 'nt_primeiro',
    titulo: 'Novo Testamento Primeiro',
    descricao: 'Conclui todo o Novo Testamento antes do Antigo.',
    icon: '✝️'
  }
];

export default function CustomPlanForm() {
  const { isCustomPlanOpen, setIsCustomPlanOpen, ativarPlano, progressoCapitulos } = useApp();

  const hoje = new Date().toISOString().split('T')[0];
  const proximoAno = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [titulo, setTitulo] = useState('');
  const [dataInicio, setDataInicio] = useState(hoje);
  const [dataFim, setDataFim] = useState(proximoAno);
  
  // Livros marcados como "Já Lidos até esta Data"
  const [livrosLidosIds, setLivrosLidosIds] = useState([]);
  
  // Sugestão de Ordem de Leitura para os Livros Restantes
  const [ordemSugestao, setOrdemSugestao] = useState('sequencial');

  // Filtro opcional de livros no escopo inicial (padrão: toda a bíblia)
  const [selecionarTodos, setSelecionarTodos] = useState(true);
  const [livrosSelecionados, setLivrosSelecionados] = useState([]);

  if (!isCustomPlanOpen) return null;

  // Toggle de livro na lista de "Já Lidos"
  const handleToggleLivroLido = (id) => {
    if (livrosLidosIds.includes(id)) {
      setLivrosLidosIds(livrosLidosIds.filter(l => l !== id));
    } else {
      setLivrosLidosIds([...livrosLidosIds, id]);
    }
  };

  // Detectar automaticamente quais livros já possuem capítulos lidos no histórico
  const handleDetectarLidosDoProgresso = () => {
    const lidosDetectados = LIVROS_BIBLIA.filter(l => {
      // Considera lido se pelo menos 80% dos capítulos do livro estiverem marcados, ou 1 capítulo se for livro pequeno
      let lidos = 0;
      for (let c = 1; c <= l.capitulos; c++) {
        if (progressoCapitulos[`${l.id}-${c}`]) {
          lidos++;
        }
      }
      return lidos === l.capitulos; // Livro 100% concluído
    }).map(l => l.id);

    setLivrosLidosIds(lidosDetectados);
  };

  const handleToggleLivro = (id) => {
    if (selecionarTodos) setSelecionarTodos(false);
    if (livrosSelecionados.includes(id)) {
      setLivrosSelecionados(livrosSelecionados.filter(l => l !== id));
    } else {
      setLivrosSelecionados([...livrosSelecionados, id]);
    }
  };

  const handleToggleTodos = () => {
    if (!selecionarTodos) {
      setSelecionarTodos(true);
      setLivrosSelecionados([]);
    } else {
      setSelecionarTodos(false);
    }
  };

  // Cálculos dinâmicos em tempo real para o resumo
  const livrosEscopo = selecionarTodos ? LIVROS_BIBLIA : LIVROS_BIBLIA.filter(l => livrosSelecionados.includes(l.id));
  const livrosRestantes = livrosEscopo.filter(l => !livrosLidosIds.includes(l.id));
  const capitulosRestantesCount = livrosRestantes.reduce((acc, l) => acc + l.capitulos, 0);

  const inicioDate = new Date(dataInicio);
  const fimDate = new Date(dataFim);
  const diffTempo = Math.max(fimDate.getTime() - inicioDate.getTime(), 1000 * 60 * 60 * 24);
  const diasCalculados = Math.max(1, Math.ceil(diffTempo / (1000 * 60 * 60 * 24)) + 1);
  const capitulosPorDiaEstimado = Math.ceil(capitulosRestantesCount / diasCalculados);

  const handleSubmit = (e) => {
    e.preventDefault();

    const livrosIdsFinal = selecionarTodos ? ['todos'] : livrosSelecionados;
    if (!selecionarTodos && livrosIdsFinal.length === 0) {
      alert('Selecione pelo menos um livro no escopo do seu plano!');
      return;
    }

    const novoPlano = calcularPlanoPersonalizado({
      titulo: titulo.trim() || 'Meu Plano Personalizado',
      dataInicio,
      dataFim,
      livrosIds: livrosIdsFinal,
      livrosLidosIds,
      ordemSugestao
    });

    ativarPlano(novoPlano);
    setIsCustomPlanOpen(false);
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        class="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div class="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div class="flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-amber-600" />
            <h3 class="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Personalizar Novo Plano de Leitura
            </h3>
          </div>
          <button
            onClick={() => setIsCustomPlanOpen(false)}
            class="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} class="space-y-5 overflow-y-auto flex-1 py-4 pr-1">
          {/* Title */}
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
              Nome do Plano
            </label>
            <input
              type="text"
              placeholder="Ex: Leitura dos Livros Restantes em 6 meses"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              class="w-full px-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
          </div>

          {/* Date Range Inputs */}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1 flex items-center gap-1">
                <Calendar class="w-3.5 h-3.5 text-amber-600" />
                Data de Início
              </label>
              <input
                type="date"
                required
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                class="w-full px-4 py-2 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1 flex items-center gap-1">
                <Calendar class="w-3.5 h-3.5 text-amber-600" />
                Data de Término
              </label>
              <input
                type="date"
                required
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                class="w-full px-4 py-2 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              />
            </div>
          </div>

          {/* Section: Livros Já Lidos */}
          <div class="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label class="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  <CheckCircle2 class="w-4 h-4 text-emerald-500" />
                  <span>Livros Já Lidos (Desconsiderar no Plano)</span>
                </label>
                <p class="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  Marque os livros que você já concluiu para agendar apenas os capítulos restantes.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDetectarLidosDoProgresso}
                class="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Sparkles class="w-3.5 h-3.5 text-emerald-500" />
                <span>Detectar do Histórico</span>
              </button>
            </div>

            {/* Summary Badge */}
            <div class="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span class="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                {livrosLidosIds.length} de {livrosEscopo.length} livros lidos
              </span>
              <span class="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                {livrosRestantes.length} livros restantes ({capitulosRestantesCount} cap.)
              </span>
            </div>

            {/* Book Checkbox Grid */}
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
              {LIVROS_BIBLIA.map((l) => {
                const isLido = livrosLidosIds.includes(l.id);
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => handleToggleLivroLido(l.id)}
                    class={`p-2 rounded-xl text-xs font-medium text-left flex items-center justify-between border transition-all ${
                      isLido
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold'
                        : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-amber-400'
                    }`}
                  >
                    <span class="truncate">{l.nome}</span>
                    {isLido && <Check class="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Sugestão de Ordem de Leitura */}
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Compass class="w-4 h-4 text-amber-600" />
              <span>Sugestão de Ordem para os Livros Restantes</span>
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SUGESTOES_ORDEM.map((sug) => {
                const isSelected = ordemSugestao === sug.id;
                return (
                  <div
                    key={sug.id}
                    onClick={() => setOrdemSugestao(sug.id)}
                    class={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-stone-900 dark:text-stone-100 shadow-xs'
                        : 'bg-stone-50 dark:bg-stone-950/60 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                    }`}
                  >
                    <div class={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-sm ${
                      isSelected ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                    }`}>
                      {sug.icon}
                    </div>
                    <div>
                      <div class="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">{sug.titulo}</div>
                      <div class="text-[11px] text-stone-500 dark:text-stone-400 leading-tight mt-0.5">{sug.descricao}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Smart Calculation Summary Card */}
          <div class="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 font-sans space-y-1">
            <div class="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <Sparkles class="w-4 h-4 text-amber-500" />
              <span>Resumo do Plano Calculado:</span>
            </div>
            <div class="text-[11px] leading-relaxed">
              • Período: <strong>{diasCalculados} dias</strong> | Agendando <strong>{capitulosRestantesCount} capítulos</strong> ({livrosRestantes.length} livros restantes).
              <br />
              • Ritmo diário estimado: <strong>~{capitulosPorDiaEstimado} capítulos por dia</strong>.
            </div>
          </div>

          {/* Submit */}
          <div class="pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCustomPlanOpen(false)}
              class="px-4 py-2.5 rounded-xl text-stone-500 hover:text-stone-800 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 cursor-pointer"
            >
              Gerar & Ativar Plano Customizado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
