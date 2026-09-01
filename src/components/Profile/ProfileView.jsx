import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LIVROS_BIBLIA, getCapituloVersiculos } from '../../data/bibliaACF';
import { 
  User, 
  Bookmark, 
  NotebookPen, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Flame, 
  BookOpen, 
  Sparkles,
  Search,
  Filter,
  Target,
  ChevronDown,
  ChevronUp,
  Award,
  BarChart3
} from 'lucide-react';

export default function ProfileView() {
  const { 
    versiculosMarcados, 
    salvarVersiculoMarcado, 
    removerVersiculoMarcado,
    irParaCapitulo, 
    progressoCapitulos,
    marcarLivrosComoLidos,
    planoAtivo,
    setActiveTab,
    ofensivaDias
  } = useApp();

  const [activeFilterColor, setActiveFilterColor] = useState('all'); // all | yellow | green | blue | pink | notes
  const [searchTerm, setSearchTerm] = useState('');
  const [isBooksDrawerOpen, setIsBooksDrawerOpen] = useState(false);
  const [booksFilterTestament, setBooksFilterTestament] = useState('all'); // all | AT | NT

  // 1. Estatísticas de Capítulos, Livros e Versículos Lidos
  const totalCapitulosLidos = Object.keys(progressoCapitulos || {}).length;
  const totalVersiculosMarcados = (versiculosMarcados || []).length;
  const totalNotasPessoais = (versiculosMarcados || []).filter(v => v.nota && v.nota.trim() !== '').length;

  const progressoLivros = LIVROS_BIBLIA.map(livro => {
    let capsLidos = 0;
    let versiculosLidosDoLivro = 0;
    
    for (let c = 1; c <= livro.capitulos; c++) {
      if (progressoCapitulos[`${livro.id}-${c}`]) {
        capsLidos++;
        const vList = getCapituloVersiculos(livro.id, c);
        versiculosLidosDoLivro += vList.length;
      }
    }

    return {
      ...livro,
      capsLidos,
      versiculosLidosDoLivro,
      isConcluido: capsLidos === livro.capitulos,
      percentual: Math.min(100, Math.round((capsLidos / livro.capitulos) * 100))
    };
  });

  const totalLivrosConcluidos = progressoLivros.filter(l => l.isConcluido).length;
  const totalLivrosIniciados = progressoLivros.filter(l => l.capsLidos > 0 && !l.isConcluido).length;
  const totalVersiculosLidos = progressoLivros.reduce((acc, l) => acc + l.versiculosLidosDoLivro, 0);
  
  const totalLivrosATConcluidos = progressoLivros.filter(l => l.testamento === 'AT' && l.isConcluido).length;
  const totalLivrosNTConcluidos = progressoLivros.filter(l => l.testamento === 'NT' && l.isConcluido).length;

  const TOTAL_VERSICULOS_BIBLIA = 31102;
  const TOTAL_CAPITULOS_BIBLIA = 1189;

  const percentualVersiculosBiblia = ((totalVersiculosLidos / TOTAL_VERSICULOS_BIBLIA) * 100).toFixed(1);
  const percentualCapitulosBiblia = ((totalCapitulosLidos / TOTAL_CAPITULOS_BIBLIA) * 100).toFixed(1);

  // 2. Métricas do Plano de Leitura Ativo
  let infoPlanoAtivo = null;
  if (planoAtivo) {
    const totalDiasPlano = planoAtivo.duracaoDias || 365;
    const diasConcluidosPlano = Object.keys(planoAtivo.progressoDias || {}).length;
    const percentualDiasPlano = Math.min(100, Math.round((diasConcluidosPlano / Math.max(1, totalDiasPlano)) * 100));

    let totalCapitulosPlano = 0;
    let capsLidosPlano = 0;
    let versLidosPlano = 0;

    (planoAtivo.dias || []).forEach(d => {
      (d.lectio || []).forEach(item => {
        totalCapitulosPlano++;
        if (progressoCapitulos[`${item.livroId}-${item.capitulo}`]) {
          capsLidosPlano++;
          const versList = getCapituloVersiculos(item.livroId, item.capitulo);
          versLidosPlano += versList.length;
        }
      });
    });

    const percentualCapitulosPlano = totalCapitulosPlano > 0 
      ? Math.min(100, Math.round((capsLidosPlano / totalCapitulosPlano) * 100))
      : 0;

    infoPlanoAtivo = {
      titulo: planoAtivo.titulo,
      dataInicio: planoAtivo.dataInicio,
      dataFim: planoAtivo.dataFim,
      totalDias: totalDiasPlano,
      diasConcluidos: diasConcluidosPlano,
      percentualDias: percentualDiasPlano,
      totalCapitulos: totalCapitulosPlano,
      capsLidos: capsLidosPlano,
      percentualCapitulos: percentualCapitulosPlano,
      versLidos: versLidosPlano
    };
  }

  const marcacoesFiltradas = (versiculosMarcados || []).filter(v => {
    // Filtro por cor/tipo
    if (activeFilterColor === 'notes' && (!v.nota || v.nota.trim() === '')) return false;
    if (activeFilterColor !== 'all' && activeFilterColor !== 'notes' && v.cor !== activeFilterColor) return false;

    // Filtro por texto
    if (searchTerm.trim() !== '') {
      const livroObj = LIVROS_BIBLIA.find(l => l.id === v.livroId) || { nome: '' };
      const termo = searchTerm.toLowerCase();
      const matchLivro = livroObj.nome.toLowerCase().includes(termo);
      const matchNota = v.nota ? v.nota.toLowerCase().includes(termo) : false;
      return matchLivro || matchNota;
    }

    return true;
  });

  return (
    <div class="min-h-screen pb-28 md:pb-12 pt-4 px-4 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Profile Banner */}
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#FFFFFF] dark:bg-[#1C1C1E] rounded-3xl p-6 md:p-8 border border-[#E4E4E7] dark:border-[#27272A] shadow-xs">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-3xl bg-[#7A151C] dark:bg-[#8B1C24] flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0">
            <User class="w-8 h-8 text-[#EAE6DF]" />
          </div>
          <div>
            <span class="text-xs font-bold text-[#7A151C] dark:text-[#8B1C24] uppercase tracking-widest">
              Solus Christus • Módulo de Disciplina
            </span>
            <h1 class="font-cinzel font-black text-2xl md:text-3xl text-[#232323] dark:text-[#EAE6DF] tracking-tight mt-0.5">
              Disciplina (Caderno & Medidores)
            </h1>
            <p class="text-xs md:text-sm text-[#52525B] dark:text-[#A1A1AA] mt-0.5 font-sans">
              Medidores de leitura, progresso dos planos, destaques e anotações de estudo profundo & prática diária.
            </p>
          </div>
        </div>

        {/* Quick Stats Pills (5 Métricas) */}
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5 w-full md:w-auto">
          <div class="p-3 rounded-2xl bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 border border-[#7A151C]/30 dark:border-[#8B1C24]/40 text-center">
            <div class="text-lg font-extrabold text-[#7A151C] dark:text-[#8B1C24] font-cinzel flex items-center justify-center gap-1">
              <Flame class="w-4 h-4 text-[#7A151C] dark:text-[#8B1C24] fill-[#7A151C]/20" />
              <span>{ofensivaDias}d</span>
            </div>
            <div class="text-[10px] text-[#7A151C] dark:text-[#8B1C24] font-bold uppercase tracking-wider">Ofensiva</div>
          </div>
          <div class="p-3 rounded-2xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#E4E4E7] dark:border-[#27272A] text-center">
            <div class="text-lg font-extrabold text-[#7A151C] dark:text-[#8B1C24] font-cinzel">{totalVersiculosLidos.toLocaleString('pt-BR')}</div>
            <div class="text-[10px] text-[#52525B] dark:text-[#A1A1AA] font-bold uppercase tracking-wider">Versículos</div>
          </div>
          <div class="p-3 rounded-2xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#E4E4E7] dark:border-[#27272A] text-center">
            <div class="text-lg font-extrabold text-[#7A151C] dark:text-[#8B1C24] font-cinzel">{totalCapitulosLidos}</div>
            <div class="text-[10px] text-[#52525B] dark:text-[#A1A1AA] font-bold uppercase tracking-wider">Capítulos</div>
          </div>
          <div class="p-3 rounded-2xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#E4E4E7] dark:border-[#27272A] text-center">
            <div class="text-lg font-extrabold text-[#7A151C] dark:text-[#8B1C24] font-cinzel">{totalLivrosConcluidos} / 66</div>
            <div class="text-[10px] text-[#52525B] dark:text-[#A1A1AA] font-bold uppercase tracking-wider">Livros Lidos</div>
          </div>
          <div class="p-3 rounded-2xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#E4E4E7] dark:border-[#27272A] text-center">
            <div class="text-lg font-extrabold text-[#7A151C] dark:text-[#8B1C24] font-cinzel">{totalNotasPessoais}</div>
            <div class="text-[10px] text-[#52525B] dark:text-[#A1A1AA] font-bold uppercase tracking-wider">Notas</div>
          </div>
        </div>
      </div>

      {/* SECTION: MEDIDORES DE PERSEVERANÇA & PROGRESSO */}
      <section aria-label="Medidores de Progresso de Leitura" class="space-y-6">
        
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-[#7A151C] dark:text-[#8B1C24] font-bold text-xs uppercase tracking-widest">
            <BarChart3 class="w-4 h-4" />
            <span>Medidores de Leitura & Planos</span>
          </div>
          
          <button
            onClick={() => setIsBooksDrawerOpen(!isBooksDrawerOpen)}
            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFFFFF] dark:bg-[#1C1C1E] border border-[#E4E4E7] dark:border-[#27272A] text-xs font-bold text-[#7A151C] dark:text-[#8B1C24] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shadow-xs"
          >
            <span>{isBooksDrawerOpen ? "Ocultar Livros" : "Ver Detalhado dos 66 Livros"}</span>
            {isBooksDrawerOpen ? <ChevronUp class="w-4 h-4" /> : <ChevronDown class="w-4 h-4" />}
          </button>
        </div>

        {/* Grid de Medidores (Versículos, Livros e Plano) */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* MEDIDOR 1: VERSÍCULOS LIDOS */}
          <div class="p-6 rounded-3xl bg-[#FFFFFF] dark:bg-[#1C1C1E] border border-[#E4E4E7] dark:border-[#27272A] shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-2xl bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 text-[#7A151C] dark:text-[#8B1C24] flex items-center justify-center">
                  <BookOpen class="w-5 h-5" />
                </div>
                <span class="text-xs font-extrabold text-[#7A151C] dark:text-[#8B1C24] bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 px-2.5 py-1 rounded-full">
                  {percentualVersiculosBiblia}% da Bíblia
                </span>
              </div>

              <div class="mt-4">
                <div class="text-xs font-bold text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider">
                  Versículos Lidos
                </div>
                <div class="text-3xl font-cinzel font-black text-[#232323] dark:text-[#EAE6DF] mt-1">
                  {totalVersiculosLidos.toLocaleString('pt-BR')} <span class="text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans font-normal">/ 31.102</span>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <div class="w-full bg-[#F9F7F1] dark:bg-[#121212] h-2.5 rounded-full overflow-hidden border border-[#E4E4E7] dark:border-[#27272A]">
                <div 
                  class="bg-[#7A151C] dark:bg-[#8B1C24] h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentualVersiculosBiblia}%` }}
                ></div>
              </div>
              <div class="flex justify-between text-[11px] text-[#52525B] dark:text-[#A1A1AA] font-medium">
                <span>{totalCapitulosLidos} cap. lidos ({percentualCapitulosBiblia}%)</span>
                <span>Total: 1.189 cap.</span>
              </div>
            </div>
          </div>

          {/* MEDIDOR 2: LIVROS BÍBLICOS CONCLUÍDOS */}
          <div class="p-6 rounded-3xl bg-[#FFFFFF] dark:bg-[#1C1C1E] border border-[#E4E4E7] dark:border-[#27272A] shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-2xl bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 text-[#7A151C] dark:text-[#8B1C24] flex items-center justify-center">
                  <Award class="w-5 h-5" />
                </div>
                <span class="text-xs font-extrabold text-[#7A151C] dark:text-[#8B1C24] bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 px-2.5 py-1 rounded-full">
                  {totalLivrosConcluidos} de 66 Livros
                </span>
              </div>

              <div class="mt-4">
                <div class="text-xs font-bold text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider">
                  Livros Lidos
                </div>
                <div class="text-3xl font-cinzel font-black text-[#232323] dark:text-[#EAE6DF] mt-1">
                  {totalLivrosConcluidos} <span class="text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans font-normal">completo(s)</span>
                </div>
              </div>
            </div>

            <div class="space-y-2 pt-2 border-t border-[#E4E4E7] dark:border-[#27272A]">
              <div class="grid grid-cols-2 gap-2 text-center text-xs">
                <div class="p-2 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#E4E4E7] dark:border-[#27272A]">
                  <div class="font-bold text-[#7A151C] dark:text-[#8B1C24] font-cinzel">{totalLivrosATConcluidos} / 39</div>
                  <div class="text-[10px] text-[#52525B] dark:text-[#A1A1AA]">Antigo Test.</div>
                </div>
                <div class="p-2 rounded-xl bg-[#F9F7F1] dark:bg-[#121212] border border-[#E4E4E7] dark:border-[#27272A]">
                  <div class="font-bold text-[#7A151C] dark:text-[#8B1C24] font-cinzel">{totalLivrosNTConcluidos} / 27</div>
                  <div class="text-[10px] text-[#52525B] dark:text-[#A1A1AA]">Novo Test.</div>
                </div>
              </div>
              {totalLivrosIniciados > 0 && (
                <div class="text-[11px] text-[#52525B] dark:text-[#A1A1AA] text-center font-medium">
                  + {totalLivrosIniciados} livro(s) em andamento
                </div>
              )}
              {planoAtivo && planoAtivo.livrosLidosIds && planoAtivo.livrosLidosIds.length > 0 && (
                <button
                  onClick={() => marcarLivrosComoLidos(planoAtivo.livrosLidosIds)}
                  class="mt-2 w-full py-1.5 px-2.5 rounded-xl bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 hover:bg-[#7A151C]/20 text-[#7A151C] dark:text-[#8B1C24] font-bold text-[11px] border border-[#7A151C]/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 class="w-3.5 h-3.5" />
                  <span>Sincronizar {planoAtivo.livrosLidosIds.length} livro(s) do Plano Ativo</span>
                </button>
              )}
            </div>
          </div>

          {/* MEDIDOR 3: PLANOS INICIADOS E EM ANDAMENTO */}
          <div class="p-6 rounded-3xl bg-[#FFFFFF] dark:bg-[#1C1C1E] border border-[#E4E4E7] dark:border-[#27272A] shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-2xl bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 text-[#7A151C] dark:text-[#8B1C24] flex items-center justify-center">
                  <Target class="w-5 h-5" />
                </div>
                <span class="text-xs font-extrabold text-[#7A151C] dark:text-[#8B1C24] bg-[#7A151C]/10 dark:bg-[#8B1C24]/20 px-2.5 py-1 rounded-full">
                  {infoPlanoAtivo ? "Plano em Andamento" : "Sem Plano Ativo"}
                </span>
              </div>

              <div class="mt-4">
                <div class="text-xs font-bold text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider">
                  Plano de Leitura
                </div>
                {infoPlanoAtivo ? (
                  <div class="mt-1">
                    <div class="text-base font-cinzel font-bold text-[#232323] dark:text-[#EAE6DF] line-clamp-1">
                      {infoPlanoAtivo.titulo}
                    </div>
                    <div class="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5">
                      {infoPlanoAtivo.capsLidos} de {infoPlanoAtivo.totalCapitulos} cap. ({infoPlanoAtivo.percentualCapitulos}%)
                    </div>
                  </div>
                ) : (
                  <div class="text-sm font-medium text-[#52525B] dark:text-[#A1A1AA] mt-1">
                    Nenhum plano em andamento no momento.
                  </div>
                )}
              </div>
            </div>

            {infoPlanoAtivo ? (
              <div class="space-y-2">
                <div class="w-full bg-[#F9F7F1] dark:bg-[#121212] h-2.5 rounded-full overflow-hidden border border-[#E4E4E7] dark:border-[#27272A]">
                  <div 
                    class="bg-[#7A151C] dark:bg-[#8B1C24] h-full rounded-full transition-all duration-500"
                    style={{ width: `${infoPlanoAtivo.percentualCapitulos}%` }}
                  ></div>
                </div>
                <div class="flex items-center justify-between text-[11px] text-[#52525B] dark:text-[#A1A1AA] font-medium">
                  <span>{infoPlanoAtivo.diasConcluidos} de {infoPlanoAtivo.totalDias} dias ({infoPlanoAtivo.percentualDias}%)</span>
                  <span>{infoPlanoAtivo.versLidos.toLocaleString('pt-BR')} vers.</span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('plans')}
                class="w-full py-2.5 rounded-xl bg-[#7A151C] dark:bg-[#8B1C24] hover:bg-[#681117] dark:hover:bg-[#7A151C] text-white font-bold text-xs shadow-md transition-all text-center block"
              >
                Iniciar um Plano na Obediência &rarr;
              </button>
            )}
          </div>

        </div>

        {/* EXPANSÍVEL: DETALHAMENTO DOS 66 LIVROS */}
        {isBooksDrawerOpen && (
          <div class="p-6 rounded-3xl bg-[#FFFFFF] dark:bg-[#1C1C1E] border border-[#E4E4E7] dark:border-[#27272A] shadow-xs space-y-4 animate-fade-in">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
              <div>
                <h3 class="font-cinzel font-bold text-lg text-[#232323] dark:text-[#EAE6DF]">
                  Progresso Detalhado dos 66 Livros Bíblicos
                </h3>
                <p class="text-xs text-[#52525B] dark:text-[#A1A1AA]">
                  Status individual de leitura e conclusão de cada livro.
                </p>
              </div>

              {/* Filtro AT / NT */}
              <div class="flex items-center gap-1 bg-[#F9F7F1] dark:bg-[#121212] p-1 rounded-xl border border-[#E4E4E7] dark:border-[#27272A]">
                <button
                  onClick={() => setBooksFilterTestament('all')}
                  class={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    booksFilterTestament === 'all'
                      ? 'bg-[#7A151C] dark:bg-[#8B1C24] text-white shadow-xs'
                      : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#232323]'
                  }`}
                >
                  Todos (66)
                </button>
                <button
                  onClick={() => setBooksFilterTestament('AT')}
                  class={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    booksFilterTestament === 'AT'
                      ? 'bg-[#7A151C] dark:bg-[#8B1C24] text-white shadow-xs'
                      : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#232323]'
                  }`}
                >
                  Antigo Test. (39)
                </button>
                <button
                  onClick={() => setBooksFilterTestament('NT')}
                  class={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    booksFilterTestament === 'NT'
                      ? 'bg-[#7A151C] dark:bg-[#8B1C24] text-white shadow-xs'
                      : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#232323]'
                  }`}
                >
                  Novo Test. (27)
                </button>
              </div>
            </div>

            {/* Grid dos Livros */}
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-1">
              {progressoLivros
                .filter(l => booksFilterTestament === 'all' || l.testamento === booksFilterTestament)
                .map(livro => (
                  <div 
                    key={livro.id}
                    onClick={() => irParaCapitulo(livro.id, 1)}
                    class={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      livro.isConcluido 
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' 
                        : livro.capsLidos > 0 
                          ? 'bg-[#F9F7F1] dark:bg-[#121212] border-[#7A151C]/40 dark:border-[#8B1C24]/50'
                          : 'bg-[#F9F7F1]/60 dark:bg-[#121212]/60 border-[#E4E4E7] dark:border-[#27272A] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div class="flex items-center justify-between gap-1">
                      <span class="font-serif font-bold text-xs text-[#232323] dark:text-[#EAE6DF] truncate">
                        {livro.nome}
                      </span>
                      <div class="flex items-center gap-1 shrink-0">
                        {livro.isConcluido ? (
                          <span class="text-[10px] font-black bg-emerald-600 text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                            <CheckCircle2 class="w-3 h-3" />
                            <span>100%</span>
                          </span>
                        ) : (
                          <>
                            <span class="text-[10px] font-semibold text-[#52525B] dark:text-[#A1A1AA]">
                              {livro.capsLidos}/{livro.capitulos} cap
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                marcarLivrosComoLidos([livro.id]);
                              }}
                              title="Marcar todos os capítulos deste livro como lidos"
                              class="p-1 rounded-md text-stone-400 hover:text-emerald-600 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                            >
                              <CheckCircle2 class="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div class="w-full bg-stone-200 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden mt-2">
                      <div 
                        class={`h-full rounded-full transition-all duration-300 ${
                          livro.isConcluido ? 'bg-emerald-600' : 'bg-[#7A151C] dark:bg-[#8B1C24]'
                        }`}
                        style={{ width: `${livro.percentual}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* Main Saved Verses & Notes Feed */}
      <div class="bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-6">
        
        {/* Filter Controls Bar */}
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
          
          {/* Color & Notes Filters */}
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveFilterColor('all')}
              class={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilterColor === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              Todos ({totalVersiculosMarcados})
            </button>

            <button
              onClick={() => setActiveFilterColor('notes')}
              class={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeFilterColor === 'notes'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <NotebookPen class="w-3.5 h-3.5" />
              <span>Apenas Notas ({totalNotasPessoais})</span>
            </button>

            <button
              onClick={() => setActiveFilterColor('yellow')}
              class={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                activeFilterColor === 'yellow' ? 'ring-2 ring-yellow-500 font-bold' : ''
              } bg-yellow-100 text-yellow-900 border-yellow-300`}
            >
              Amarelo
            </button>

            <button
              onClick={() => setActiveFilterColor('green')}
              class={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                activeFilterColor === 'green' ? 'ring-2 ring-emerald-500 font-bold' : ''
              } bg-emerald-100 text-emerald-900 border-emerald-300`}
            >
              Verde
            </button>

            <button
              onClick={() => setActiveFilterColor('blue')}
              class={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                activeFilterColor === 'blue' ? 'ring-2 ring-blue-500 font-bold' : ''
              } bg-blue-100 text-blue-900 border-blue-300`}
            >
              Azul
            </button>

            <button
              onClick={() => setActiveFilterColor('pink')}
              class={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                activeFilterColor === 'pink' ? 'ring-2 ring-pink-500 font-bold' : ''
              } bg-pink-100 text-pink-900 border-pink-300`}
            >
              Rosa
            </button>
          </div>

          {/* Search Bar */}
          <div class="relative w-full sm:w-64">
            <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar em notas e livros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              class="w-full pl-9 pr-3 py-1.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 dark:text-stone-100"
            />
          </div>
        </div>

        {/* Verses Feed */}
        {marcacoesFiltradas.length === 0 ? (
          <div class="py-12 text-center space-y-3">
            <div class="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 mx-auto flex items-center justify-center">
              <Bookmark class="w-6 h-6" />
            </div>
            <p class="text-sm font-semibold text-stone-600 dark:text-stone-400">
              Nenhuma marcação ou anotação encontrada neste filtro.
            </p>
            <p class="text-xs text-stone-400">
              Toque em qualquer versículo na tela de leitura para destacar ou adicionar anotações pessoais.
            </p>
          </div>
        ) : (
          <div class="space-y-4">
            {marcacoesFiltradas.map((item) => {
              const livroObj = LIVROS_BIBLIA.find(l => l.id === item.livroId) || { nome: item.livroId };
              const versiculos = getCapituloVersiculos(item.livroId, item.capitulo);
              const versiculoObj = versiculos.find(v => Number(v.v) === Number(item.versiculo)) || { t: "Texto bíblico" };

              const highlightBgClass = item.cor ? `highlight-${item.cor}` : '';

              return (
                <div
                  key={item.id}
                  class="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 space-y-3 transition-all hover:border-amber-400"
                >
                  {/* Verse Reference Header */}
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <span class="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                        {livroObj.nome} {item.capitulo}:{item.versiculo}
                      </span>
                      {item.cor && (
                        <span class={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${highlightBgClass}`}>
                          {item.cor}
                        </span>
                      )}
                    </div>

                    <div class="flex items-center gap-2">
                      <button
                        onClick={() => irParaCapitulo(item.livroId, item.capitulo)}
                        class="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        <span>Abrir no Texto</span>
                        <ExternalLink class="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => removerVersiculoMarcado(item.livroId, item.capitulo, item.versiculo)}
                        title="Excluir marcação"
                        class="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Verse Text Quote */}
                  <blockquote class="font-serif italic text-sm text-stone-800 dark:text-stone-200 pl-3 border-l-2 border-amber-500 leading-relaxed">
                    "{versiculoObj.t}"
                  </blockquote>

                  {/* Personal Note */}
                  {item.nota && item.nota.trim() !== '' && (
                    <div class="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700/60 text-xs text-stone-700 dark:text-stone-300 font-sans space-y-1">
                      <div class="font-bold text-[10px] uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <NotebookPen class="w-3 h-3" />
                        <span>Minha Anotação Pessoal</span>
                      </div>
                      <p class="whitespace-pre-line">{item.nota}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
