import { LIVROS_BIBLIA } from '../data/bibliaACF';

// Ordem cronológica aproximada dos livros da Bíblia
const ORDEM_CRONOLOGICA_IDS = [
  'jo', 'genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio', 'josue', 'juizes', 'rute',
  '1samuel', '2samuel', '1cronicas', 'salmos', 'cantares', 'proverbios', 'eclesiastes', '1reis', '2reis',
  '2cronicas', 'obadias', 'joel', 'jonas', 'amos', 'oseias', 'isaias', 'miqueias', 'naum',
  'sofonias', 'habacuc', 'jeremias', 'lamentacoes', 'ezequiel', 'daniel', 'esdras', 'neemias', 'ester',
  'hageu', 'zacarias', 'malaquias', 'tiago', 'galatas', '1tessalonicenses', '2tessalonicenses',
  '1corintios', '2corintios', 'romanos', 'efesios', 'filipenses', 'colossenses', 'filemon',
  'hebreus', '1pedro', '2pedro', 'marcos', 'mateus', 'lucas', 'joao', 'atos', '1timoteo',
  'tito', '2timoteo', '1joao', '2joao', '3joao', 'judas', 'apocalipse'
];

/**
 * Calcula automaticamente a lista de metas diárias dividindo os capítulos
 * entre a Data de Início e Data de Término, desconsiderando livros já lidos
 * e ordenando os livros restantes conforme a sugestão de leitura.
 */
export function calcularPlanoPersonalizado({ 
  titulo, 
  dataInicio, 
  dataFim, 
  livrosIds,
  livrosLidosIds = [],
  ordemSugestao = 'sequencial'
}) {
  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);
  
  // Calcular diferença de dias (mínimo 1 dia)
  const diffTempo = Math.max(fim.getTime() - inicio.getTime(), 1000 * 60 * 60 * 24);
  const totalDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24)) + 1;

  // 1. Filtrar os livros selecionados no escopo inicial
  let livrosEscopo = LIVROS_BIBLIA;
  if (livrosIds && livrosIds.length > 0 && !livrosIds.includes('todos')) {
    livrosEscopo = LIVROS_BIBLIA.filter(l => livrosIds.includes(l.id));
  }

  // 2. Excluir os livros marcados como "Já Lidos"
  let livrosParaAgendar = livrosEscopo.filter(l => !livrosLidosIds.includes(l.id));

  if (livrosParaAgendar.length === 0) {
    // Se o usuário marcou todos como lidos, resgata o escopo para não gerar plano vazio
    livrosParaAgendar = livrosEscopo;
  }

  // 3. Ordenar os livros de acordo com a sugestão de leitura escolhida
  if (ordemSugestao === 'cronologica') {
    livrosParaAgendar.sort((a, b) => {
      const idxA = ORDEM_CRONOLOGICA_IDS.indexOf(a.id);
      const idxB = ORDEM_CRONOLOGICA_IDS.indexOf(b.id);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
    });
  } else if (ordemSugestao === 'nt_primeiro') {
    livrosParaAgendar.sort((a, b) => {
      if (a.testamento === 'NT' && b.testamento === 'AT') return -1;
      if (a.testamento === 'AT' && b.testamento === 'NT') return 1;
      return 0;
    });
  }

  // 4. Mapear a sequência completa de capítulos
  let todosCapitulos = [];

  if (ordemSugestao === 'alternado') {
    // Mesclar capítulos de AT e NT de forma intercalada
    const livrosAT = livrosParaAgendar.filter(l => l.testamento === 'AT');
    const livrosNT = livrosParaAgendar.filter(l => l.testamento === 'NT');

    const capsAT = [];
    livrosAT.forEach(l => {
      for (let c = 1; c <= l.capitulos; c++) {
        capsAT.push({ livroId: l.id, livroNome: l.nome, abrev: l.abrev, capitulo: c });
      }
    });

    const capsNT = [];
    livrosNT.forEach(l => {
      for (let c = 1; c <= l.capitulos; c++) {
        capsNT.push({ livroId: l.id, livroNome: l.nome, abrev: l.abrev, capitulo: c });
      }
    });

    const maxLen = Math.max(capsAT.length, capsNT.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < capsAT.length) todosCapitulos.push(capsAT[i]);
      if (i < capsNT.length) todosCapitulos.push(capsNT[i]);
    }
  } else {
    // Sequência por livro
    livrosParaAgendar.forEach(l => {
      for (let c = 1; c <= l.capitulos; c++) {
        todosCapitulos.push({
          livroId: l.id,
          livroNome: l.nome,
          abrev: l.abrev,
          capitulo: c
        });
      }
    });
  }

  const totalCapitulos = todosCapitulos.length;
  const capitulosPorDia = Math.max(1, Math.ceil(totalCapitulos / totalDias));

  // 5. Distribuir capítulos por dia
  const metasDiarias = [];
  let capIndex = 0;

  for (let dia = 1; dia <= totalDias; dia++) {
    const dataDia = new Date(inicio);
    dataDia.setDate(inicio.getDate() + (dia - 1));

    const capsDoDia = [];
    for (let i = 0; i < capitulosPorDia && capIndex < totalCapitulos; i++) {
      capsDoDia.push(todosCapitulos[capIndex]);
      capIndex++;
    }

    if (capsDoDia.length > 0) {
      metasDiarias.push({
        dia,
        dataFormatted: dataDia.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        isoDate: dataDia.toISOString().split('T')[0],
        capitulos: capsDoDia
      });
    }
  }

  return {
    id: `custom_${Date.now()}`,
    titulo: titulo || 'Meu Plano Personalizado',
    dataInicio,
    dataFim,
    duracaoDias: metasDiarias.length,
    totalCapitulos,
    livrosIds: livrosParaAgendar.map(l => l.id),
    livrosLidosIds,
    ordemSugestao,
    metasDiarias,
    progressoDias: {}
  };
}
