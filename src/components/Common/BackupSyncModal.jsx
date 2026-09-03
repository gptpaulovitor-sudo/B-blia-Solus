import React, { useState, useRef } from 'react';
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
  HelpCircle,
  FileJson,
  AlertCircle
} from 'lucide-react';

export default function BackupSyncModal({ isOpen, onClose }) {
  const { 
    exportarBackup, 
    importarBackup, 
    recuperarDadosLegados, 
    progressoCapitulos, 
    versiculosMarcados, 
    planoAtivo, 
    ofensivaDias,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('export'); // 'export' | 'import'
  const [backupCodeInput, setBackupCodeInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const totalCapitulos = Object.keys(progressoCapitulos || {}).length;
  const totalMarcacoes = (versiculosMarcados || []).length;

  // Gerar backup atual em texto
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
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                Sincronização & Backup
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Gerencie seus salvamentos e transfira seu progresso
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
        <div className="my-4 grid grid-cols-3 gap-2 p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 text-center">
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
              Marcações
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

        {/* Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 mb-4">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 pb-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'export'
                ? 'border-[#9E7418] text-[#9E7418] dark:border-amber-500 dark:text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Exportar Dados</span>
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
            <span>Restaurar Dados</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="overflow-y-auto pr-1 space-y-4 flex-1">
          {activeTab === 'export' ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  <p className="font-bold text-stone-900 dark:text-stone-100 mb-0.5">
                    Como funciona o salvamento:
                  </p>
                  Os navegadores isolam os dados por link e dispositivo. Ao exportar o backup, você garante que não perde nada e pode transferir tudo para seu celular, outro computador ou link do GitHub em segundos.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={handleDownloadFile}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#9E7418] hover:bg-[#D4AF37] text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <FileJson className="w-4 h-4" />
                  <span>Baixar Arquivo (.json)</span>
                </button>

                <button
                  onClick={handleCopyBackup}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs transition-all active:scale-95"
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
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 transition-all shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                    <span>Recuperar</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  Importar um backup mesclará seus capítulos lidos, marcações, anotações e ofensiva com os dados atuais sem sobrescrever nada indevidamente.
                </div>
              </div>

              {/* Opção 1: Upload de Arquivo */}
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
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-[#9E7418] dark:hover:border-amber-500 text-stone-700 dark:text-stone-300 font-bold text-xs transition-colors"
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

              {/* Opção 2: Colar Código JSON */}
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
                  className="w-full py-2.5 px-4 rounded-xl bg-[#9E7418] hover:bg-[#D4AF37] text-white font-bold text-xs shadow-sm transition-all active:scale-95"
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
            className="px-5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-300 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
