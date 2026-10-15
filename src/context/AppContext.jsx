import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { storageService } from '../services/storageService';
import { getCapituloVersiculos, LIVROS_BIBLIA } from '../data/bibliaACF';
import { getComentarioCapitulo } from '../data/comentariosEstudo';
import { calcularPlanoPersonalizado } from '../services/planCalculator';
import { nativeService } from '../services/nativeService';
import {
  subscribeAuthState,
  subscribeCloudUserData,
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  logoutFirebase,
  saveUserDataToFirestore,
  loadUserDataFromFirestore,
  mergeUserData,
  getActiveFirebaseConfig,
  saveActiveFirebaseConfig
} from '../services/firebaseService';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Aba ativa de navegação: 'home' | 'reader' | 'plans' | 'profile'
  const [activeTab, setActiveTab] = useState('home');

  // Posicao de leitura bíblica
  const [posicao, setPosicao] = useState(() => storageService.getPosicaoLeitura());
  
  // Configurações de leitura
  const [settings, setSettings] = useState(() => storageService.getSettings());

  // Progresso de capítulos lidos
  const [progressoCapitulos, setProgressoCapitulos] = useState(() => storageService.getProgressoCapitulos());

  // Versículos Marcados (Highlights e Bloco de Notas)
  const [versiculosMarcados, setVersiculosMarcados] = useState(() => storageService.getVersiculosMarcados());

  // Plano de Leitura Ativo
  const [planoAtivo, setPlanoAtivo] = useState(() => storageService.getPlanoAtivo());

  // Modal de versículo selecionado { livroId, capitulo, versiculo, texto }
  const [selectedVerseModal, setSelectedVerseModal] = useState(null);

  // Modal de Configurações
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Modal de Plano Personalizado
  const [isCustomPlanOpen, setIsCustomPlanOpen] = useState(false);

  // Notificações Toast
  const [toastMessage, setToastMessage] = useState(null);

  // Usuário e sincronização em Nuvem (Google Firebase)
  const [usuarioGoogle, setUsuarioGoogle] = useState(null);
  const [syncStatusNuvem, setSyncStatusNuvem] = useState('idle'); // 'idle' | 'syncing' | 'synced' | 'error'
  const [syncErrorMessage, setSyncErrorMessage] = useState('');

  // Inicializar serviços nativos do dispositivo (Botão Voltar, Splash Screen)
  useEffect(() => {
    nativeService.init(() => {
      // Manipulador padrão de voltar: se estiver em outra aba, volta para home
      if (selectedVerseModal) {
        setSelectedVerseModal(null);
        return true;
      }
      if (isSettingsOpen) {
        setIsSettingsOpen(false);
        return true;
      }
      if (isCustomPlanOpen) {
        setIsCustomPlanOpen(false);
        return true;
      }
      if (activeTab !== 'home') {
        setActiveTab('home');
        return true;
      }
      return false; // Permite minimizar o app
    });
  }, [selectedVerseModal, isSettingsOpen, isCustomPlanOpen, activeTab]);

  // Atualizar tema e fonte no elemento <html> e na StatusBar do celular
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-sepia');

    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'sepia') {
      root.classList.add('theme-sepia');
    }

    // Sincroniza StatusBar nativa
    nativeService.updateTheme(settings.theme);

    // Atualizar a variável de fonte de leitura (--font-leitura)
    if (settings.fontFamily === 'sans') {
      root.style.setProperty('--font-leitura', "'Inter', sans-serif");
    } else {
      root.style.setProperty('--font-leitura', "'Crimson Pro', serif");
    }

    storageService.saveSettings(settings);
  }, [settings]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Navegar para capítulo específico
  const irParaCapitulo = (livroId, capituloNum) => {
    const novoPos = { livroId, capitulo: parseInt(capituloNum, 10) };
    setPosicao(novoPos);
    storageService.savePosicaoLeitura(novoPos);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Registro de Atividade Diária & Cálculo da Ofensiva (Streak)
  const [registrosAtividade, setRegistrosAtividade] = useState(() => storageService.getRegistrosAtividade());

  const registrarAtividadeHoje = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hojeStr = `${y}-${m}-${day}`;

    setRegistrosAtividade((prev) => {
      const atual = prev || {};
      if (!atual[hojeStr]) {
        const novos = { ...atual, [hojeStr]: true };
        storageService.saveRegistrosAtividade(novos);
        return novos;
      }
      return atual;
    });
  };

  // Método para calcular a ofensiva (dias consecutivos de leitura)
  const calcularOfensivaDias = (registros = {}) => {
    const formatData = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    const hoje = new Date();
    const hojeStr = formatData(hoje);

    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);
    const ontemStr = formatData(ontem);

    let dataCheck = null;
    if (registros && registros[hojeStr]) {
      dataCheck = new Date(hoje);
    } else if (registros && registros[ontemStr]) {
      dataCheck = new Date(ontem);
    } else {
      return 0; // Sem marcação explícita de leitura hoje ou ontem = 0 Dias
    }

    let count = 0;
    let guard = 0; // Prevenir loop infinito
    while (guard < 1000) {
      guard++;
      const key = formatData(dataCheck);
      if (registros && registros[key]) {
        count++;
        dataCheck.setDate(dataCheck.getDate() - 1);
      } else {
        break;
      }
    }

    return count;
  };

  const resetarOfensiva = () => {
    storageService.resetarRegistrosAtividade();
    setRegistrosAtividade({});
  };

  // Sincronizar e zerar a atividade se não houver leitura/marcação real
  useEffect(() => {
    const ativ = storageService.getRegistrosAtividade();
    setRegistrosAtividade(ativ);
  }, [versiculosMarcados, progressoCapitulos, planoAtivo]);

  const ofensivaDias = calcularOfensivaDias(registrosAtividade);

  // Função para sincronizar o status dos dias do plano ativo com os capítulos lidos
  const sincronizarPlanoComProgresso = (plano, progressoCaps) => {
    if (!plano || !plano.metasDiarias || plano.metasDiarias.length === 0) return plano;

    const progressoDiasAtualizado = { ...(plano.progressoDias || {}) };
    let houveAlteracao = false;

    plano.metasDiarias.forEach((meta) => {
      const caps = meta.capitulos || [];
      if (caps.length > 0) {
        const todosCapsLidos = caps.every(c => !!progressoCaps[`${c.livroId}-${c.capitulo}`]);
        const diaJaMarcado = !!progressoDiasAtualizado[meta.dia];

        if (todosCapsLidos !== diaJaMarcado) {
          progressoDiasAtualizado[meta.dia] = todosCapsLidos;
          houveAlteracao = true;
        }
      }
    });

    if (houveAlteracao) {
      return { ...plano, progressoDias: progressoDiasAtualizado };
    }

    return plano;
  };

  // Alternar capítulo lido e sincronizar automaticamente o módulo de Obediência (Plano Ativo)
  const toggleCapituloLido = (livroId, capituloNum) => {
    const capNum = Number(capituloNum);
    const key = `${livroId}-${capNum}`;
    const estaLido = !progressoCapitulos[key];
    const novoProgresso = { ...progressoCapitulos, [key]: estaLido };

    setProgressoCapitulos(novoProgresso);
    storageService.saveProgressoCapitulos(novoProgresso);

    if (estaLido) {
      registrarAtividadeHoje();
    }

    const livroNome = LIVROS_BIBLIA.find(l => l.id === livroId)?.nome || livroId;

    // Evolução automática do plano ativo (Obediência)
    if (planoAtivo && planoAtivo.metasDiarias) {
      const planoAtualizado = sincronizarPlanoComProgresso(planoAtivo, novoProgresso);
      
      // Verificar se esse capítulo concluiu a meta de algum dia específico
      let diaConcluidoAgora = null;
      if (estaLido) {
        planoAtivo.metasDiarias.forEach((meta) => {
          const caps = meta.capitulos || [];
          const pertenceAoDia = caps.some(c => c.livroId === livroId && Number(c.capitulo) === capNum);
          if (pertenceAoDia) {
            const todosLidosAgora = caps.every(c => !!novoProgresso[`${c.livroId}-${c.capitulo}`]);
            const jaEstavaConcluido = !!planoAtivo.progressoDias?.[meta.dia];
            if (todosLidosAgora && !jaEstavaConcluido) {
              diaConcluidoAgora = meta.dia;
            }
          }
        });
      }

      if (planoAtualizado !== planoAtivo) {
        setPlanoAtivo(planoAtualizado);
        storageService.savePlanoAtivo(planoAtualizado);
      }

      if (diaConcluidoAgora) {
        showToast(`🎉 Capítulo lido! Meta do Dia ${diaConcluidoAgora} do plano concluída!`);
      } else if (estaLido) {
        showToast(`Capítulo de ${livroNome} ${capNum} marcado como lido!`);
      } else {
        showToast(`Capítulo de ${livroNome} ${capNum} desmarcado.`);
      }
    } else {
      if (estaLido) {
        showToast(`Capítulo de ${livroNome} ${capNum} marcado como lido!`);
      } else {
        showToast(`Capítulo de ${livroNome} ${capNum} desmarcado.`);
      }
    }
    sincronizarComNuvem({ progressoCapitulos: novoProgresso });
  };

  // Salvar / atualizar destaque ou nota de um versículo
  // Salvar / atualizar destaque ou nota de um ou múltiplos versículos
  const salvarVersiculoMarcado = ({ livroId, capitulo, versiculo, versiculos, cor, nota }) => {
    const capNum = Number(capitulo);
    const listaVersiculos = Array.isArray(versiculos) && versiculos.length > 0
      ? [...new Set(versiculos.map(Number))].sort((a, b) => a - b)
      : (versiculo !== undefined && versiculo !== null ? [Number(versiculo)] : []);

    if (listaVersiculos.length === 0) return;

    const dataAtual = new Date().toISOString();
    const grupoId = listaVersiculos.length > 1
      ? `grupo_${livroId}_${capNum}_${listaVersiculos[0]}_${listaVersiculos[listaVersiculos.length - 1]}`
      : null;

    let atualizados = [...versiculosMarcados];
    const notaLimpa = (nota || '').trim();

    if (!cor && notaLimpa === '') {
      // Remover os versículos selecionados
      atualizados = atualizados.filter(v => {
        const mesmoCap = v.livroId === livroId && Number(v.capitulo) === capNum;
        return !(mesmoCap && listaVersiculos.includes(Number(v.versiculo)));
      });
      showToast(listaVersiculos.length > 1 ? 'Anotações dos versículos removidas' : 'Marcação removida');
    } else {
      listaVersiculos.forEach(vNum => {
        const id = `v_${livroId}_${capNum}_${vNum}`;
        const index = atualizados.findIndex(
          v => v.id === id || (v.livroId === livroId && Number(v.capitulo) === capNum && Number(v.versiculo) === vNum)
        );

        const itemAntigo = index >= 0 ? atualizados[index] : null;

        const novoItem = {
          id,
          livroId,
          capitulo: capNum,
          versiculo: vNum,
          versiculos: listaVersiculos,
          grupoId,
          cor: cor !== undefined ? cor : (itemAntigo ? itemAntigo.cor : null),
          nota: nota !== undefined ? (nota || '') : (itemAntigo ? itemAntigo.nota : ''),
          data: dataAtual
        };

        if (index >= 0) {
          atualizados[index] = novoItem;
        } else {
          atualizados.push(novoItem);
        }
      });

      registrarAtividadeHoje();
      showToast(
        listaVersiculos.length > 1
          ? `Anotação salva para ${listaVersiculos.length} versículos!`
          : (notaLimpa !== '' ? 'Anotação salva com sucesso!' : 'Versículo destacado com sucesso!')
      );
    }

    setVersiculosMarcados(atualizados);
    storageService.saveVersiculosMarcados(atualizados);
    sincronizarComNuvem({ versiculosMarcados: atualizados });
    setSelectedVerseModal(null);
  };

  // Remover marcação/anotação de um versículo ou conjunto de versículos
  const removerVersiculoMarcado = (livroId, capitulo, versiculoOuLista) => {
    const capNum = Number(capitulo);
    const lista = Array.isArray(versiculoOuLista)
      ? versiculoOuLista.map(Number)
      : [Number(versiculoOuLista)];

    // Se algum versículo pertencer a um grupo ou tiver versiculos associados, remove todos do conjunto
    const versiculosParaRemover = new Set(lista);
    versiculosMarcados.forEach(v => {
      if (v.livroId === livroId && Number(v.capitulo) === capNum && lista.includes(Number(v.versiculo))) {
        if (Array.isArray(v.versiculos)) {
          v.versiculos.forEach(num => versiculosParaRemover.add(Number(num)));
        }
      }
    });

    const atualizados = versiculosMarcados.filter(
      v => !(v.livroId === livroId && Number(v.capitulo) === capNum && versiculosParaRemover.has(Number(v.versiculo)))
    );

    setVersiculosMarcados(atualizados);
    storageService.saveVersiculosMarcados(atualizados);
    sincronizarComNuvem({ versiculosMarcados: atualizados });
    showToast(versiculosParaRemover.size > 1 ? 'Anotações dos versículos removidas' : 'Marcação removida');
  };

  // Marcar uma lista de livros inteiros como lidos no progresso global (capítulo por capítulo)
  const marcarLivrosComoLidos = (livrosIdsArray) => {
    if (!livrosIdsArray || livrosIdsArray.length === 0) return;
    
    let novoProgresso = { ...progressoCapitulos };
    let totalNovosCaps = 0;

    livrosIdsArray.forEach(livroId => {
      const lObj = LIVROS_BIBLIA.find(l => l.id === livroId);
      if (lObj) {
        for (let c = 1; c <= lObj.capitulos; c++) {
          const key = `${livroId}-${c}`;
          if (!novoProgresso[key]) {
            novoProgresso[key] = true;
            totalNovosCaps++;
          }
        }
      }
    });

    if (totalNovosCaps > 0) {
      setProgressoCapitulos(novoProgresso);
      storageService.saveProgressoCapitulos(novoProgresso);

      if (planoAtivo) {
        const planoAtualizado = sincronizarPlanoComProgresso(planoAtivo, novoProgresso);
        if (planoAtualizado !== planoAtivo) {
          setPlanoAtivo(planoAtualizado);
          storageService.savePlanoAtivo(planoAtualizado);
        }
      }
    }
  };

  // Ativar plano pré-definido ou personalizado
  const ativarPlano = (novoPlano) => {
    // Sincronizar com capítulos já lidos anteriormente
    const planoSincronizado = sincronizarPlanoComProgresso(novoPlano, progressoCapitulos);
    setPlanoAtivo(planoSincronizado);
    storageService.savePlanoAtivo(planoSincronizado);

    // Se o plano tiver livros marcados como já lidos, contabilizá-los imediatamente no progresso da Bíblia
    if (novoPlano.livrosLidosIds && novoPlano.livrosLidosIds.length > 0) {
      marcarLivrosComoLidos(novoPlano.livrosLidosIds);
    }

    showToast(`Plano "${novoPlano.titulo}" ativado com sucesso!`);
  };

  // Sincronizar automaticamente o plano ativo com o progresso de capítulos ao carregar
  useEffect(() => {
    if (planoAtivo && planoAtivo.metasDiarias && planoAtivo.metasDiarias.length > 0) {
      const sincronizado = sincronizarPlanoComProgresso(planoAtivo, progressoCapitulos);
      if (sincronizado !== planoAtivo) {
        setPlanoAtivo(sincronizado);
        storageService.savePlanoAtivo(sincronizado);
      }
    }
  }, [planoAtivo?.id, planoAtivo?.titulo]);

  // Excluir plano de leitura ativo
  const excluirPlano = () => {
    setPlanoAtivo(null);
    storageService.removerPlanoAtivo();
    showToast('Plano de leitura excluído.');
  };

  // Alternar conclusão de dia no plano ativo
  const toggleDiaPlanoAtivo = (diaNum) => {
    if (!planoAtivo) return;
    const progressoAtual = planoAtivo.progressoDias || {};
    const isAgoraLido = !progressoAtual[diaNum];
    const novoProg = { ...progressoAtual, [diaNum]: isAgoraLido };
    
    const planoAtualizado = { ...planoAtivo, progressoDias: novoProg };
    setPlanoAtivo(planoAtualizado);
    storageService.savePlanoAtivo(planoAtualizado);

    if (isAgoraLido) {
      registrarAtividadeHoje();
    }

    // Sincronizar capítulos da meta do dia com o progressoCapitulos da Bíblia
    const metasList = planoAtivo.metasDiarias || planoAtivo.dias || [];
    const diaObj = metasList.find(d => d.dia === diaNum);
    const caps = diaObj?.metasDiarias || diaObj?.capitulos || diaObj?.lectio || [];

    if (caps.length > 0) {
      let novoProgCap = { ...progressoCapitulos };
      caps.forEach(item => {
        const key = `${item.livroId}-${item.capitulo}`;
        if (isAgoraLido) {
          novoProgCap[key] = true;
        }
      });
      setProgressoCapitulos(novoProgCap);
      storageService.saveProgressoCapitulos(novoProgCap);
    }

    if (isAgoraLido) {
      showToast(`Metas do Dia ${diaNum} marcadas como concluídas!`);
    }
  };

  // Recarregar tudo do localStorage para atualizar a interface imediatamente
  const recarregarTudoDoStorage = () => {
    setSettings(storageService.getSettings());
    setPosicao(storageService.getPosicaoLeitura());
    setProgressoCapitulos(storageService.getProgressoCapitulos());
    setVersiculosMarcados(storageService.getVersiculosMarcados());
    setPlanoAtivo(storageService.getPlanoAtivo());
    setRegistrosAtividade(storageService.getRegistrosAtividade());
  };

  const exportarBackup = () => {
    return storageService.exportarTodosDados();
  };

  const importarBackup = (jsonString) => {
    const res = storageService.importarTodosDados(jsonString);
    if (res.sucesso) {
      recarregarTudoDoStorage();
      showToast('🎉 Progresso e dados restaurados com sucesso!');
      return true;
    } else {
      showToast(`⚠️ ${res.erro || 'Falha ao restaurar dados.'}`);
      return false;
    }
  };

  const recuperarDadosLegados = () => {
    const recuperou = storageService.recuperarDadosLegadosGerais();
    if (recuperou) {
      recarregarTudoDoStorage();
      showToast('🎉 Dados e marcações anteriores recuperados com sucesso!');
    } else {
      showToast('Nenhum dado legado adicional encontrado neste navegador.');
    }
    return recuperou;
  };

  // Flag para evitar loops de reenvio quando os dados chegam da nuvem
  const isUpdatingFromCloudRef = useRef(false);

  // Observador de Autenticação e Ouvinte em Tempo Real do Firebase (Nuvem Google)
  useEffect(() => {
    let cloudUnsub = null;

    const authUnsub = subscribeAuthState(async (user) => {
      setUsuarioGoogle(user);
      if (cloudUnsub) {
        cloudUnsub();
        cloudUnsub = null;
      }

      if (user) {
        setSyncStatusNuvem('syncing');

        // 1. Carga inicial e mesclagem bidirecional (sem perda de capítulos ou notas)
        try {
          const cloudRes = await loadUserDataFromFirestore(user.uid);
          if (cloudRes?.erro) {
            console.warn('Erro ao carregar dados do Firestore:', cloudRes.erro);
            setSyncErrorMessage(cloudRes.erro);
            setSyncStatusNuvem('error');
          } else {
            const cloudData = cloudRes?.dados;
            const localData = {
              progressoCapitulos: storageService.getProgressoCapitulos(),
              versiculosMarcados: storageService.getVersiculosMarcados(),
              planoAtivo: storageService.getPlanoAtivo(),
              registrosAtividade: storageService.getRegistrosAtividade(),
              ofensivaDias: calcularOfensivaDias(storageService.getRegistrosAtividade())
            };

            const merged = mergeUserData(localData, cloudData);

            isUpdatingFromCloudRef.current = true;
            storageService.saveProgressoCapitulos(merged.progressoCapitulos);
            storageService.saveVersiculosMarcados(merged.versiculosMarcados);
            if (merged.planoAtivo) storageService.savePlanoAtivo(merged.planoAtivo);
            if (merged.registrosAtividade) storageService.saveRegistrosAtividade(merged.registrosAtividade);

            setProgressoCapitulos(merged.progressoCapitulos);
            setVersiculosMarcados(merged.versiculosMarcados);
            if (merged.planoAtivo) setPlanoAtivo(merged.planoAtivo);
            if (merged.registrosAtividade) setRegistrosAtividade(merged.registrosAtividade);

            // Garante que a nuvem tenha a soma completa de celular + computador
            const saveRes = await saveUserDataToFirestore(user.uid, merged);
            if (saveRes?.sucesso) {
              setSyncErrorMessage('');
              setSyncStatusNuvem('synced');
            } else {
              setSyncErrorMessage(saveRes?.erro || 'Erro ao gravar dados no Firestore');
              setSyncStatusNuvem('error');
              console.warn('Erro ao salvar no Firestore:', saveRes?.erro);
            }
            setTimeout(() => { isUpdatingFromCloudRef.current = false; }, 400);
          }
        } catch (e) {
          console.error('Erro na sincronização inicial do Firebase:', e);
          setSyncErrorMessage(e.message || String(e));
          setSyncStatusNuvem('error');
          isUpdatingFromCloudRef.current = false;
        }

        // 2. Ouvinte em tempo real (onSnapshot): atualizações feitas no celular aparecem no computador e vice-versa
        cloudUnsub = subscribeCloudUserData(user.uid, (cloudData, hasPendingWrites) => {
          if (hasPendingWrites || !cloudData) return;

          setSyncStatusNuvem('syncing');
          isUpdatingFromCloudRef.current = true;

          if (cloudData.progressoCapitulos) {
            setProgressoCapitulos(prev => {
              const updated = { ...prev, ...cloudData.progressoCapitulos };
              storageService.saveProgressoCapitulos(updated);
              return updated;
            });
          }

          if (Array.isArray(cloudData.versiculosMarcados)) {
            setVersiculosMarcados(prev => {
              const map = new Map();
              (cloudData.versiculosMarcados || []).forEach(v => {
                if (v && (v.id || v.versiculo)) {
                  const chave = v.id || `v_${v.livroId}_${v.capitulo}_${v.versiculo}`;
                  map.set(chave, { ...v, id: chave });
                }
              });
              (prev || []).forEach(v => {
                if (v && (v.id || v.versiculo)) {
                  const chave = v.id || `v_${v.livroId}_${v.capitulo}_${v.versiculo}`;
                  if (map.has(chave)) {
                    const c = map.get(chave);
                    const nota = (v.nota && v.nota.trim()) ? v.nota : (c.nota || '');
                    map.set(chave, { ...c, ...v, id: chave, nota });
                  } else {
                    map.set(chave, { ...v, id: chave });
                  }
                }
              });
              const uniao = Array.from(map.values());
              storageService.saveVersiculosMarcados(uniao);
              return uniao;
            });
          }

          if (cloudData.planoAtivo !== undefined) {
            setPlanoAtivo(cloudData.planoAtivo);
            storageService.savePlanoAtivo(cloudData.planoAtivo);
          }

          if (cloudData.registrosAtividade) {
            setRegistrosAtividade(prev => {
              const updated = { ...prev, ...cloudData.registrosAtividade };
              storageService.saveRegistrosAtividade(updated);
              return updated;
            });
          }

          setSyncStatusNuvem('synced');
          setTimeout(() => { isUpdatingFromCloudRef.current = false; }, 400);
        }, (err) => {
          console.warn('Erro no observador Firestore onSnapshot:', err);
          setSyncStatusNuvem('error');
        });
      } else {
        setSyncStatusNuvem('idle');
      }
    });

    return () => {
      authUnsub && authUnsub();
      cloudUnsub && cloudUnsub();
    };
  }, []);

  // Enviar alterações para a nuvem automaticamente quando o usuário estiver logado
  const sincronizarComNuvem = async (dadosExtras = {}, manual = false) => {
    if (!usuarioGoogle?.uid || isUpdatingFromCloudRef.current) return;
    setSyncStatusNuvem('syncing');
    try {
      const payload = {
        progressoCapitulos: storageService.getProgressoCapitulos(),
        versiculosMarcados: storageService.getVersiculosMarcados(),
        planoAtivo: storageService.getPlanoAtivo(),
        registrosAtividade: storageService.getRegistrosAtividade(),
        ofensivaDias: calcularOfensivaDias(storageService.getRegistrosAtividade()),
        ...dadosExtras
      };
      const res = await saveUserDataToFirestore(usuarioGoogle.uid, payload);
      if (res?.sucesso) {
        setSyncErrorMessage('');
        setSyncStatusNuvem('synced');
        if (manual) showToast('Sincronizado com a nuvem com sucesso!');
      } else {
        setSyncErrorMessage(res?.erro || 'Permissão negada ou falha de escrita no Firestore');
        setSyncStatusNuvem('error');
        console.warn('Erro ao salvar no Firestore:', res?.erro);
        if (manual) showToast(`Erro ao gravar na nuvem: ${res?.erro || 'Permissão negada no Firestore'}`);
      }
    } catch (e) {
      console.error('Erro ao sincronizar com nuvem:', e);
      setSyncErrorMessage(e.message || String(e));
      setSyncStatusNuvem('error');
      if (manual) showToast('Erro de conexão ao sincronizar com nuvem.');
    }
  };

  const loginGoogle = async () => {
    try {
      const user = await loginWithGoogle();
      showToast(`Conectado como ${user.displayName || user.email}!`);
      return true;
    } catch (err) {
      console.error(err);
      showToast(`Erro ao entrar com Google: ${err.message || 'Falha na autenticação'}`);
      return false;
    }
  };

  const loginEmail = async (email, password, isSignUp = false, nome = '') => {
    try {
      if (isSignUp) {
        await registerWithEmail(email, password, nome);
        showToast('Conta criada com sucesso e sincronizada!');
      } else {
        await loginWithEmail(email, password);
        showToast('Login realizado com sucesso!');
      }
      return true;
    } catch (err) {
      console.error(err);
      showToast(`Erro de autenticação: ${err.message || 'Falha'}`);
      return false;
    }
  };

  const logoutGoogle = async () => {
    try {
      await logoutFirebase();
      showToast('Sessão encerrada.');
    } catch (err) {
      console.error(err);
      showToast('Erro ao sair da conta.');
    }
  };

  // Obter versículos do capítulo atual
  const versiculosAtuais = getCapituloVersiculos(posicao.livroId, posicao.capitulo);
  const comentarioAtual = getComentarioCapitulo(posicao.livroId, posicao.capitulo);
  const livroAtual = LIVROS_BIBLIA.find(l => l.id === posicao.livroId) || LIVROS_BIBLIA[0];

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        posicao,
        livroAtual,
        versiculosAtuais,
        comentarioAtual,
        settings,
        setSettings,
        progressoCapitulos,
        toggleCapituloLido,
        marcarLivrosComoLidos,
        versiculosMarcados,
        salvarVersiculoMarcado,
        removerVersiculoMarcado,
        planoAtivo,
        ativarPlano,
        excluirPlano,
        toggleDiaPlanoAtivo,
        irParaCapitulo,
        selectedVerseModal,
        setSelectedVerseModal,
        isSettingsOpen,
        setIsSettingsOpen,
        isCustomPlanOpen,
        setIsCustomPlanOpen,
        toastMessage,
        showToast,
        ofensivaDias,
        registrarAtividadeHoje,
        resetarOfensiva,
        exportarBackup,
        importarBackup,
        recuperarDadosLegados,
        recarregarTudoDoStorage,
        usuarioGoogle,
        syncStatusNuvem,
        syncErrorMessage,
        loginGoogle,
        loginEmail,
        logoutGoogle,
        sincronizarComNuvem,
        getActiveFirebaseConfig,
        saveActiveFirebaseConfig
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
