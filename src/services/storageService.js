import { LIVROS_BIBLIA } from '../data/bibliaACF';

// Chaves atuais do LocalStorage
const KEYS = {
  SETTINGS: 'solus_settings',
  POSICAO: 'solus_posicao_leitura',
  PROGRESSO_CAPITULOS: 'solus_progresso_capitulos',
  VERSICULOS_MARCADOS: 'solus_versiculos_marcados',
  PLANO_ATIVO: 'solus_plano_ativo',
  ATIVIDADE: 'biblia_estudo_atividade'
};

// Chaves legadas (versões anteriores do aplicativo)
const LEGACY_KEYS = {
  SETTINGS: 'biblia_estudo_settings',
  POSICAO: 'biblia_estudo_posicao',
  PROGRESSO_CAPITULOS: 'biblia_estudo_progresso',
  VERSICULOS_MARCADOS: 'biblia_estudo_marcacoes',
  PLANO_ATIVO: 'biblia_estudo_plano_ativo',
  ATIVIDADE: 'solus_atividade'
};

// Configurações padrão
const DEFAULT_SETTINGS = {
  theme: 'light', // light | dark | sepia
  fontSize: 'medium', // small | medium | large | xlarge
  fontFamily: 'serif', // serif | sans
  layoutMode: 'side' // side | inline
};

// Posição inicial de leitura
const DEFAULT_POSICAO = {
  livroId: 'genesis',
  capitulo: 1
};

export const storageService = {
  // Configurações
  getSettings() {
    try {
      let data = localStorage.getItem(KEYS.SETTINGS);
      if (!data) {
        data = localStorage.getItem(LEGACY_KEYS.SETTINGS);
        if (data) {
          localStorage.setItem(KEYS.SETTINGS, data);
        }
      }
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  },
  saveSettings(settings) {
    try {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  },

  // Posição de Leitura
  getPosicaoLeitura() {
    try {
      let data = localStorage.getItem(KEYS.POSICAO);
      if (!data) {
        data = localStorage.getItem(LEGACY_KEYS.POSICAO);
        if (data) {
          localStorage.setItem(KEYS.POSICAO, data);
        }
      }
      return data ? JSON.parse(data) : DEFAULT_POSICAO;
    } catch (e) {
      return DEFAULT_POSICAO;
    }
  },
  savePosicaoLeitura(posicao) {
    try {
      localStorage.setItem(KEYS.POSICAO, JSON.stringify(posicao));
    } catch (e) {
      console.error(e);
    }
  },

  // Progresso de Capítulos Lido
  getProgressoCapitulos() {
    try {
      let data = localStorage.getItem(KEYS.PROGRESSO_CAPITULOS);
      let parsed = data ? JSON.parse(data) : null;
      
      // Fallback para chave legada se a atual estiver vazia
      if (!parsed || (typeof parsed === 'object' && Object.keys(parsed).length === 0)) {
        const legacyData = localStorage.getItem(LEGACY_KEYS.PROGRESSO_CAPITULOS);
        if (legacyData) {
          const legacyParsed = JSON.parse(legacyData);
          if (legacyParsed && typeof legacyParsed === 'object' && Object.keys(legacyParsed).length > 0) {
            parsed = legacyParsed;
            localStorage.setItem(KEYS.PROGRESSO_CAPITULOS, JSON.stringify(parsed));
          }
        }
      }
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  },
  saveProgressoCapitulos(progresso) {
    try {
      localStorage.setItem(KEYS.PROGRESSO_CAPITULOS, JSON.stringify(progresso));
    } catch (e) {
      console.error(e);
    }
  },

  // Versículos Marcados / Anotações
  getVersiculosMarcados() {
    try {
      let data = localStorage.getItem(KEYS.VERSICULOS_MARCADOS);
      let parsed = data ? JSON.parse(data) : null;

      // Fallback para chave legada se a atual estiver vazia
      if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
        const legacyData = localStorage.getItem(LEGACY_KEYS.VERSICULOS_MARCADOS);
        if (legacyData) {
          const legacyParsed = JSON.parse(legacyData);
          if (Array.isArray(legacyParsed) && legacyParsed.length > 0) {
            parsed = legacyParsed;
            localStorage.setItem(KEYS.VERSICULOS_MARCADOS, JSON.stringify(parsed));
          }
        }
      }
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  },
  saveVersiculosMarcados(versiculos) {
    try {
      localStorage.setItem(KEYS.VERSICULOS_MARCADOS, JSON.stringify(versiculos));
    } catch (e) {
      console.error(e);
    }
  },

  // Plano Ativo de Leitura
  getPlanoAtivo() {
    try {
      let data = localStorage.getItem(KEYS.PLANO_ATIVO);
      if (!data || data === 'null') {
        const legacyData = localStorage.getItem(LEGACY_KEYS.PLANO_ATIVO);
        if (legacyData && legacyData !== 'null') {
          data = legacyData;
          localStorage.setItem(KEYS.PLANO_ATIVO, data);
        }
      }
      return (data && data !== 'null') ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },
  savePlanoAtivo(plano) {
    try {
      if (plano) {
        localStorage.setItem(KEYS.PLANO_ATIVO, JSON.stringify(plano));
      } else {
        localStorage.removeItem(KEYS.PLANO_ATIVO);
      }
    } catch (e) {
      console.error(e);
    }
  },
  removerPlanoAtivo() {
    try {
      localStorage.removeItem(KEYS.PLANO_ATIVO);
      localStorage.removeItem(LEGACY_KEYS.PLANO_ATIVO);
    } catch (e) {
      console.error(e);
    }
  },

  // Registro diário de leitura (Ofensiva / Streak)
  getRegistrosAtividade() {
    try {
      let data = localStorage.getItem(KEYS.ATIVIDADE);
      if (!data) {
        data = localStorage.getItem(LEGACY_KEYS.ATIVIDADE);
        if (data) {
          localStorage.setItem(KEYS.ATIVIDADE, data);
        }
      }

      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
          return parsed;
        }
      }

      const versiculos = this.getVersiculosMarcados();
      const capitulos = this.getProgressoCapitulos();
      const plano = this.getPlanoAtivo();

      const temVersiculos = Array.isArray(versiculos) && versiculos.length > 0;
      const temCapitulos = capitulos && typeof capitulos === 'object' && Object.keys(capitulos).length > 0;
      const temPlano = plano && plano.progressoDias && typeof plano.progressoDias === 'object' && Object.keys(plano.progressoDias).length > 0;

      const temAtividadeReal = temVersiculos || temCapitulos || temPlano;

      // Se o usuário ainda não tem atividade real, não precisa gravar nada
      if (!temAtividadeReal) {
        return {};
      }

      // Se há atividade real mas ainda não gravou a data de hoje, gerar registro
      const d = new Date();
      const hojeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const autoReg = { [hojeStr]: true };
      localStorage.setItem(KEYS.ATIVIDADE, JSON.stringify(autoReg));
      return autoReg;
    } catch (e) {
      return {};
    }
  },

  saveRegistrosAtividade(registros) {
    try {
      localStorage.setItem(KEYS.ATIVIDADE, JSON.stringify(registros));
    } catch (e) {
      console.error(e);
    }
  },

  resetarRegistrosAtividade() {
    try {
      localStorage.removeItem(KEYS.ATIVIDADE);
      localStorage.removeItem(LEGACY_KEYS.ATIVIDADE);
    } catch (e) {
      console.error(e);
    }
  },

  // Exportar todos os dados salvos em um formato JSON completo
  exportarTodosDados() {
    try {
      const backup = {
        app: 'Solus Christus - Bíblia Sagrada',
        versao: '2.0',
        dataExportacao: new Date().toISOString(),
        settings: this.getSettings(),
        posicao: this.getPosicaoLeitura(),
        progressoCapitulos: this.getProgressoCapitulos(),
        versiculosMarcados: this.getVersiculosMarcados(),
        planoAtivo: this.getPlanoAtivo(),
        registrosAtividade: this.getRegistrosAtividade()
      };
      return JSON.stringify(backup, null, 2);
    } catch (e) {
      console.error('Erro ao exportar backup', e);
      return null;
    }
  },

  // Importar dados de um JSON de backup com validação e restauração
  importarTodosDados(jsonString) {
    try {
      if (!jsonString || typeof jsonString !== 'string') {
        throw new Error('Conteúdo do backup inválido.');
      }
      const dados = JSON.parse(jsonString);
      if (!dados || typeof dados !== 'object') {
        throw new Error('Formato do arquivo de backup não reconhecido.');
      }

      // Restaurar configurações se válidas
      if (dados.settings && typeof dados.settings === 'object') {
        this.saveSettings(dados.settings);
      }

      // Restaurar posição de leitura
      if (dados.posicao && dados.posicao.livroId) {
        this.savePosicaoLeitura(dados.posicao);
      }

      // Restaurar progresso de capítulos (mesclar com existentes)
      if (dados.progressoCapitulos && typeof dados.progressoCapitulos === 'object') {
        const atual = this.getProgressoCapitulos();
        const mesclado = { ...atual, ...dados.progressoCapitulos };
        this.saveProgressoCapitulos(mesclado);
      }

      // Restaurar versículos marcados (mesclar sem duplicar por id)
      if (Array.isArray(dados.versiculosMarcados)) {
        const atuais = this.getVersiculosMarcados();
        const map = new Map();
        atuais.forEach(v => map.set(v.id || `${v.livroId}-${v.capitulo}-${v.versiculo}`, v));
        dados.versiculosMarcados.forEach(v => map.set(v.id || `${v.livroId}-${v.capitulo}-${v.versiculo}`, v));
        const mesclados = Array.from(map.values());
        this.saveVersiculosMarcados(mesclados);
      }

      // Restaurar plano ativo
      if (dados.planoAtivo && typeof dados.planoAtivo === 'object') {
        this.savePlanoAtivo(dados.planoAtivo);
      }

      // Restaurar histórico de ofensiva
      if (dados.registrosAtividade && typeof dados.registrosAtividade === 'object') {
        const atualAtiv = this.getRegistrosAtividade();
        const mescladoAtiv = { ...atualAtiv, ...dados.registrosAtividade };
        this.saveRegistrosAtividade(mescladoAtiv);
      }

      return { sucesso: true, mensagem: 'Dados importados com sucesso!' };
    } catch (e) {
      console.error('Erro na importação:', e);
      return { sucesso: false, erro: e.message || 'Falha ao importar dados.' };
    }
  },

  // Varredura de emergência para recuperar dados legados em qualquer chave do localStorage
  recuperarDadosLegadosGerais() {
    let recuperouAlgo = false;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;

        // Recuperar progresso de capítulos
        if (key.includes('progresso') && key !== KEYS.PROGRESSO_CAPITULOS) {
          try {
            const raw = localStorage.getItem(key);
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
              const atual = this.getProgressoCapitulos();
              this.saveProgressoCapitulos({ ...parsed, ...atual });
              recuperouAlgo = true;
            }
          } catch (e) {}
        }

        // Recuperar marcações e versículos
        if ((key.includes('marcacoes') || key.includes('versiculos')) && key !== KEYS.VERSICULOS_MARCADOS) {
          try {
            const raw = localStorage.getItem(key);
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const atuais = this.getVersiculosMarcados();
              const map = new Map();
              atuais.forEach(v => map.set(v.id || `${v.livroId}-${v.capitulo}-${v.versiculo}`, v));
              parsed.forEach(v => map.set(v.id || `${v.livroId}-${v.capitulo}-${v.versiculo}`, v));
              this.saveVersiculosMarcados(Array.from(map.values()));
              recuperouAlgo = true;
            }
          } catch (e) {}
        }

        // Recuperar plano ativo
        if (key.includes('plano_ativo') && key !== KEYS.PLANO_ATIVO) {
          try {
            const raw = localStorage.getItem(key);
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object' && (parsed.titulo || parsed.metasDiarias || parsed.dias)) {
              if (!this.getPlanoAtivo()) {
                this.savePlanoAtivo(parsed);
                recuperouAlgo = true;
              }
            }
          } catch (e) {}
        }

        // Recuperar atividade / streak
        if (key.includes('atividade') && key !== KEYS.ATIVIDADE) {
          try {
            const raw = localStorage.getItem(key);
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
              const atual = this.getRegistrosAtividade();
              this.saveRegistrosAtividade({ ...parsed, ...atual });
              recuperouAlgo = true;
            }
          } catch (e) {}
        }
      }
    } catch (e) {
      console.error(e);
    }
    return recuperouAlgo;
  }
};
