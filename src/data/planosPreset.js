// Modelos pré-definidos de planos de leitura bíblica

export const PLANOS_PREDEFINIDOS = [
  {
    id: 'plano-1-ano',
    titulo: 'Bíblia em 1 Ano (Gênesis a Apocalipse)',
    subtitulo: 'Leitura contínua da criação até a restauração em 365 dias.',
    descricao: 'Leia toda a Escritura Sagrada em ordem sequencial do livro de Gênesis até Apocalipse com uma média de 3 a 4 capítulos por dia.',
    duracaoDias: 365,
    tipo: 'Sequencial',
    icone: 'Calendar',
    corBadge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    livrosRecomendados: ['todos']
  },
  {
    id: 'plano-cronologico',
    titulo: 'Ordem Cronológica',
    subtitulo: 'Acompanhe a história da salvação na sequência em que os eventos ocorreram.',
    descricao: 'Este plano reorganiza as passagens bíblicas conforme o tempo histórico de sua ocorrência, integrando os Salmos e Profetas aos livros históricos.',
    duracaoDias: 365,
    tipo: 'Cronológico',
    icone: 'History',
    corBadge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    livrosRecomendados: ['todos']
  },
  {
    id: 'plano-historico-profetico',
    titulo: 'Histórico & Profético',
    subtitulo: 'Combinação equilibrada do Antigo e Novo Testamento.',
    descricao: 'Uma abordagem balanceada agrupando a história dos Patriarcas, os Evangelhos de Jesus Cristo e as cartas apostólicas para uma vivência diária rica.',
    duracaoDias: 180,
    tipo: 'Misto',
    icone: 'BookOpenCheck',
    corBadge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    livrosRecomendados: ['genesis', 'exodo', 'salmos', 'proverbios', 'mateus', 'marcos', 'lucas', 'joao', 'atos', 'romanos', 'apocalipse']
  }
];
