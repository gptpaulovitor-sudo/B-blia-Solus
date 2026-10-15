import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Download, 
  Upload, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  HardDrive, 
  FileJson,
  AlertCircle,
  Cloud,
  LogOut,
  Mail,
  Lock,
  User,
  Settings,
  ExternalLink
} from 'lucide-react';

export default function BackupSyncModal({ isOpen, onClose, initialTab = 'cloud' }) {
  const { 
    exportarBackup, 
    importarBackup, 
    recuperarDadosLegados, 
    progressoCapitulos, 
    versiculosMarcados, 
    ofensivaDias,
    showToast,
    usuarioGoogle,
    syncStatusNuvem,
    loginGoogle,
    loginEmail,
    logoutGoogle,
    sincronizarComNuvem,
    getActiveFirebaseConfig,
    saveActiveFirebaseConfig
  } = useApp();

  const [activeTab, setActiveTab] = useState(initialTab); // 'cloud' | 'export' | 'import'
  const [backupCodeInput, setBackupCodeInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  
  // Email login / sign up state
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  // Firebase Config custom
  const [showConfigCustom, setShowConfigCustom] = useState(false);
  const [customConfigText, setCustomConfigText] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab || (usuarioGoogle ? 'cloud' : 'cloud'));
      const cfg = getActiveFirebaseConfig();
      if (cfg) {
        setCustomConfigText(JSON.stringify(cfg, null, 2));
      }
    }
  }, [isOpen, initialTab, usuarioGoogle]);

  if (!isOpen) return null;

  const totalCapitulos = Object.keys(progressoCapitulos || {}).length;
  const totalMarcacoes = (versiculosMarcados || []).length;

  const handleGoogleLogin = async () => {
    setIsLoggingInGoogle(true);
    try {
      await loginGoogle();
    } finally {
      setIsLoggingInGoogle(false);
    }
  };

  const handleEmailAuthSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      showToast('Preencha e-mail e senha.');
      return;
    }
    if (passwordInput.length < 6) {
      showToast('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    setIsEmailSubmitting(true);
    try {
      const ok = await loginEmail(emailInput, passwordInput, isSignUp, nameInput);
      if (ok) {
        setEmailInput('');
        setPasswordInput('');
        setNameInput('');
        setShowEmailForm(false);
      }
    } finally {
      setIsEmailSubmitting(false);
    }
  };

  const handleSaveCustomConfig = () => {
    try {
      if (!customConfigText.trim()) {
        saveActiveFirebaseConfig(null);
        showToast('Configuração resetada para padrão oficial.');
        return;
      }
      const parsed = JSON.parse(customConfigText);
      if (!parsed.apiKey || !parsed.projectId) {
        showToast('Objeto inválido. Deve conter apiKey e projectId.');
        return;
      }
      saveActiveFirebaseConfig(parsed);
      showToast('Configuração do Firebase salva com sucesso!');
    } catch (e) {
      showToast('Erro de sintaxe no JSON colado.');
    }
  };

  const handleCopyBackup = () => {
    const jsonStr = exportarBackup();
    if (!jsonStr) {
      showToast('Erro ao gerar código de backup.');
      return;
    }
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopied(true);
      showToast('Código de backup copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {
      showToast('Não foi possível copiar automaticamente.');
    });
  };

  const handleDownloadFile = () => {
    const jsonStr = exportarBackup();
    if (!jsonStr) return;
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dataHoje = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `backup_solus_christus_${dataHoje}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Arquivo de backup baixado com sucesso!');
  };

  const handleImportText = () => {
    if (!backupCodeInput.trim()) {
      showToast('Cole o código do backup antes de restaurar.');
      return;
    }
    const sucesso = importarBackup(backupCodeInput.trim());
    if (sucesso) {
      setBackupCodeInput('');
      onClose();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        if (typeof content === 'string') {
          const sucesso = importarBackup(content);
          if (sucesso) {
            onClose();
          }
        }
      } catch (err) {
        showToast('Falha ao ler arquivo de backup.');
      }
    };
    reader.readAsText(file);
  };

  const handleScanLegacy = () => {
    setIsScanning(true);
    setTimeout(() => {
      recuperarDadosLegados();
      setIsScanning(false);
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#9E7418] dark:text-amber-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                Sincronização & Nuvem
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Vincule sua conta Google ou faça backup dos seus dados
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resumo de Dados Atuais */}
        <div className="my-3.5 grid grid-cols-3 gap-2 p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 text-center">
          <div>
            <span className="block text-base font-bold text-[#9E7418] dark:text-amber-400">
              {totalCapitulos}
            </span>
            <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
              Capítulos
            </span>
          </div>
          <div>
            <span className="block text-base font-bold text-[#9E7418] dark:text-amber-400">
              {totalMarcacoes}
            </span>
            <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
              Marcações & Notas
            </span>
          </div>
          <div>
            <span className="block text-base font-bold text-[#9E7418] dark:text-amber-400">
              {ofensivaDias}d
            </span>
            <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
              Ofensiva
            </span>
          </div>
        </div>

        {/* Tabs de Navegação */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 mb-4">
          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex-1 pb-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'cloud'
                ? 'border-[#9E7418] text-[#9E7418] dark:border-amber-500 dark:text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Nuvem Google</span>
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 pb-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'export'
                ? 'border-[#9E7418] text-[#9E7418] dark:border-amber-500 dark:text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 pb-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'import'
                ? 'border-[#9E7418] text-[#9E7418] dark:border-amber-500 dark:text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Restaurar</span>
          </button>
        </div>

        {/* Conteúdo das Abas */}
        <div className="overflow-y-auto pr-1 space-y-4 flex-1">
          {activeTab === 'cloud' && (
            <div className="space-y-4">
              {usuarioGoogle ? (
                <div className="p-4 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {usuarioGoogle.foto ? (
                        <img 
                          src={usuarioGoogle.foto} 
                          alt={usuarioGoogle.nome} 
                          className="w-12 h-12 rounded-2xl border-2 border-emerald-500 shadow-sm object-cover" 
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                          {usuarioGoogle.nome?.charAt(0) || 'G'}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                            {usuarioGoogle.nome}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Conectado</span>
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                          {usuarioGoogle.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${syncStatusNuvem === 'syncing' ? 'bg-amber-500 animate-spin' : syncStatusNuvem === 'error' ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`}></div>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">
                        {syncStatusNuvem === 'syncing' 
                          ? 'Sincronizando com a Nuvem...' 
                          : syncStatusNuvem === 'error' 
                            ? 'Aguardando liberação de escrita no Firestore' 
                            : 'Progresso sincronizado em tempo real na nuvem'}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400">Google Firestore</span>
                  </div>

                  {syncStatusNuvem === 'error' && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-2.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 font-bold">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Status da Nuvem: Pendente</span>
                        </div>
                        <button
                          onClick={() => sincronizarComNuvem({}, true)}
                          disabled={syncStatusNuvem === 'syncing'}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-md"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${syncStatusNuvem === 'syncing' ? 'animate-spin' : ''}`} />
                          <span>🔄 Tocar Aqui para Sincronizar Agora</span>
                        </button>
                      </div>

                      <p className="text-[11px] leading-relaxed">
                        Se você acabou de salvar as regras no Firebase, toque no botão verde acima para confirmar a conexão com a nuvem!
                      </p>
                      <div className="p-2.5 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-amber-200 dark:border-amber-900 text-[11px] space-y-1">
                        <p className="font-bold text-amber-950 dark:text-amber-300">Como liberar a nuvem definitivamente:</p>
                        <p>1. Acesse <u>console.firebase.google.com</u> &gt; projeto <b>biblia-online-8bce0</b></p>
                        <p>2. Vá em <b>Firestore Database</b> &gt; aba <b>Regras (Rules)</b></p>
                        <p>3. Substitua por esta regra (libera leitura e escrita):</p>
                        <pre className="p-1.5 bg-stone-100 dark:bg-stone-800 rounded font-mono text-[10px] select-all overflow-x-auto text-amber-950 dark:text-amber-200">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
                        </pre>
                        <p className="text-[10px] text-stone-500 dark:text-stone-400">4. Clique no botão azul <b>Publicar (Publish)</b> no Firebase Console.</p>
                      </div>
                      <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
                        <button
                          onClick={() => sincronizarComNuvem({}, true)}
                          disabled={syncStatusNuvem === 'syncing'}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${syncStatusNuvem === 'syncing' ? 'animate-spin' : ''}`} />
                          <span>Testar / Sincronizar Agora</span>
                        </button>

                        <button
                          onClick={() => setActiveTab('export')}
                          className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                        >
                          Exportar Backup JSON
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => sincronizarComNuvem({}, true)}
                      disabled={syncStatusNuvem === 'syncing'}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${syncStatusNuvem === 'syncing' ? 'animate-spin' : ''}`} />
                      <span>Sincronizar Agora</span>
                    </button>

                    <button
                      onClick={logoutGoogle}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/40 text-stone-600 dark:text-stone-400 font-bold text-xs transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sair da Conta</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-2xl bg-[#9E7418]/10 dark:bg-[#D4AF37]/20 text-[#9E7418] dark:text-amber-400 shrink-0">
                      <Cloud className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                        Vincular com Conta Google
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mt-1">
                        Faça login para que seus capítulos lidos, versículos destacados e anotações fiquem sempre salvos na nuvem e sincronizados entre seu celular e computador.
                      </p>
                    </div>
                  </div>

                  {/* Botão Entrar com Google */}
                  <button
                    onClick={handleGoogleLogin}
                    disabled={isLoggingInGoogle}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:border-[#9E7418] dark:hover:border-amber-500 shadow-sm transition-all active:scale-98 font-sans font-bold text-sm text-stone-800 dark:text-stone-100 cursor-pointer"
                  >
                    {isLoggingInGoogle ? (
                      <RefreshCw className="w-5 h-5 animate-spin text-[#9E7418] dark:text-amber-400" />
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                    )}
                    <span>{isLoggingInGoogle ? 'Conectando ao Google...' : 'Entrar com Conta Google'}</span>
                  </button>

                  {/* Alternativa E-mail e Senha */}
                  <div className="pt-2 border-t border-amber-200/50 dark:border-amber-900/30">
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(!showEmailForm)}
                      className="w-full flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-[#9E7418] dark:hover:text-amber-400 transition-colors py-1 cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-stone-400" />
                        <span>Ou entrar com E-mail e Senha</span>
                      </span>
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 px-2 py-0.5 rounded-full font-sans">
                        {showEmailForm ? 'Fechar' : 'Abrir formulário'}
                      </span>
                    </button>

                    {showEmailForm && (
                      <form onSubmit={handleEmailAuthSubmit} className="mt-3 space-y-2.5 animate-fade-in">
                        {isSignUp && (
                          <div className="relative">
                            <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                            <input
                              type="text"
                              placeholder="Seu Nome (opcional)"
                              value={nameInput}
                              onChange={(e) => setNameInput(e.target.value)}
                              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-[#9E7418] dark:focus:border-amber-500"
                            />
                          </div>
                        )}
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                          <input
                            type="email"
                            placeholder="Seu e-mail (ex: seuemail@gmail.com)"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            required
                            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-[#9E7418] dark:focus:border-amber-500"
                          />
                        </div>
                        <div className="relative">
                          <Lock className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                          <input
                            type="password"
                            placeholder="Sua senha (mínimo 6 caracteres)"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            required
                            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-[#9E7418] dark:focus:border-amber-500"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isEmailSubmitting}
                          className="w-full py-2.5 rounded-xl bg-[#9E7418] hover:bg-[#825e11] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        >
                          {isEmailSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                          <span>{isSignUp ? 'Criar Conta e Sincronizar' : 'Entrar com E-mail'}</span>
                        </button>
                        <div className="text-center pt-1">
                          <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-[11px] text-[#9E7418] dark:text-amber-400 hover:underline font-medium cursor-pointer"
                          >
                            {isSignUp ? 'Já possui conta? Clique para entrar' : 'Primeira vez aqui? Clique para criar conta'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500 dark:text-stone-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Seus dados salvos neste aparelho serão combinados com a nuvem sem perder capítulos ou notas.</span>
                  </div>
                </div>
              )}

              {/* Configurações Avançadas do Firebase */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowConfigCustom(!showConfigCustom)}
                  className="flex items-center justify-between w-full text-[11px] text-stone-500 dark:text-stone-400 hover:text-[#9E7418] py-1 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <Settings className="w-3.5 h-3.5" />
                    <span>Configurações do Firebase (Projeto Nuvem)</span>
                  </span>
                  <span>{showConfigCustom ? 'Ocultar' : 'Ver'}</span>
                </button>

                {showConfigCustom && (
                  <div className="mt-2.5 p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2 text-xs animate-fade-in">
                    <p className="text-[11px] text-stone-600 dark:text-stone-400">
                      Projeto vinculado: <strong className="text-[#9E7418] dark:text-amber-400">biblia-online-8bce0</strong>. Para usar seu próprio projeto Firebase Console, cole o objeto abaixo:
                    </p>
                    <textarea
                      value={customConfigText}
                      onChange={(e) => setCustomConfigText(e.target.value)}
                      rows={4}
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-[11px] font-mono text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#9E7418]"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveCustomConfig}
                        className="flex-1 py-1.5 rounded-lg bg-[#9E7418] hover:bg-[#825e11] text-white text-[11px] font-bold"
                      >
                        Salvar Credenciais
                      </button>
                      <button
                        onClick={() => {
                          saveActiveFirebaseConfig(null);
                          setShowConfigCustom(false);
                          showToast('Credenciais restauradas para o padrão oficial.');
                        }}
                        className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-[11px] text-stone-600 dark:text-stone-400"
                      >
                        Restaurar Padrão
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  <p className="font-bold text-stone-900 dark:text-stone-100 mb-0.5">
                    Backup Offline em Arquivo (.json):
                  </p>
                  Você pode baixar uma cópia completa dos seus dados para guardar no seu computador ou transferir manualmente a qualquer momento sem depender de internet.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={handleDownloadFile}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#9E7418] hover:bg-[#D4AF37] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <FileJson className="w-4 h-4" />
                  <span>Baixar Arquivo (.json)</span>
                </button>

                <button
                  onClick={handleCopyBackup}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs transition-all active:scale-95 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copiado!' : 'Copiar Código de Backup'}</span>
                </button>
              </div>

              {/* Botão de recuperação legado */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs">
                    <p className="font-bold text-stone-800 dark:text-stone-200">
                      Leu nos dias anteriores neste navegador?
                    </p>
                    <p className="text-stone-500 text-[11px]">
                      Faz uma varredura para recuperar dados de versões antigas do app.
                    </p>
                  </div>
                  <button
                    onClick={handleScanLegacy}
                    disabled={isScanning}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 transition-all shrink-0 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                    <span>Recuperar</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  Importar um backup mesclará seus capítulos lidos, marcações, anotações e ofensiva com os dados atuais sem sobrescrever nada indevidamente.
                </div>
              </div>

              {/* Upload de Arquivo */}
              <div>
                <input
                  type="file"
                  accept=".json,application/json"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#9E7418] dark:hover:border-amber-500 text-stone-700 dark:text-stone-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-stone-500" />
                  <span>Selecionar Arquivo de Backup (.json)</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-stone-400 text-xs my-2">
                <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800"></div>
                <span>OU COLE O CÓDIGO</span>
                <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800"></div>
              </div>

              {/* Colar Código JSON */}
              <div className="space-y-2">
                <textarea
                  value={backupCodeInput}
                  onChange={(e) => setBackupCodeInput(e.target.value)}
                  placeholder="Cole o código do backup aqui..."
                  rows={4}
                  className="w-full p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-[#9E7418]"
                />
                <button
                  onClick={handleImportText}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#9E7418] hover:bg-[#D4AF37] text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  Restaurar Dados a Partir do Código
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-300 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
