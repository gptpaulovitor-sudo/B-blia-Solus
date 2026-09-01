import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle, Share, MoreVertical, PlusSquare, Sparkles, Check } from 'lucide-react';
import { nativeService } from '../../services/nativeService';

export default function InstallAppModal({ isOpen, onClose, onInstalledAck }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isContentUri, setIsContentUri] = useState(false);

  useEffect(() => {
    // Detecta plataforma
    const ua = navigator.userAgent || '';
    const isIosDevice = /iphone|ipad|ipod/i.test(ua);
    const isAndroidDevice = /android/i.test(ua);
    setIsIOS(isIosDevice);
    setIsAndroid(isAndroidDevice);

    // Detecta se abriu direto do WhatsApp / Gerenciador de arquivos como content:// ou file://
    const href = window.location.href || '';
    const isContentOrFile = href.startsWith('content://') || href.startsWith('file://');
    setIsContentUri(isContentOrFile);

    // Detecta se já está rodando como app standalone (instalado)
    const isInStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      window.navigator.standalone === true ||
      localStorage.getItem('solus_christus_installed') === 'true';

    setIsStandalone(isInStandalone);

    // Captura evento beforeinstallprompt se disponível
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen || isStandalone) return null;

  const handleInstallClick = async () => {
    nativeService.haptic('medium');
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('solus_christus_installed', 'true');
        setDeferredPrompt(null);
        if (onInstalledAck) onInstalledAck();
        onClose();
      }
    }
  };

  const handleDismissForever = () => {
    nativeService.haptic('light');
    localStorage.setItem('solus_christus_installed', 'true');
    if (onInstalledAck) onInstalledAck();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-[#F9F7F1] dark:bg-[#1C1C1E] border border-[#E4E4E7] dark:border-[#27272A] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-[#7A151C] to-[#8B1C24] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-white/15 backdrop-blur-xs text-white shadow-inner">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-base tracking-wide flex items-center gap-1.5">
                <span>Instalar no Celular</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </h3>
              <p className="text-xs text-white/80 font-sans">Fixar aplicativo em tela cheia e offline</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-[#232323] dark:text-[#EAE6DF]">
          
          {/* Botão de instalação com 1 clique (se o navegador suportar o evento direto) */}
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 px-4 bg-[#7A151C] hover:bg-[#8B1C24] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#7A151C]/30 hover:shadow-xl transition-all active:scale-95"
            >
              <Download className="w-5 h-5" />
              Instalar Aplicativo com 1 Toque
            </button>
          )}

          {/* Guia para Android (incluindo quando abre pelo WhatsApp) */}
          {(!isIOS || isAndroid) && (
            <div className="space-y-3 font-sans">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#7A151C] dark:text-[#EAE6DF] border-b border-[#E4E4E7] dark:border-[#27272A] pb-2">
                <Smartphone className="w-4 h-4 text-[#7A151C] dark:text-[#8B1C24]" />
                <span>Como Fixar no seu Celular Android:</span>
              </div>

              {isContentUri && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-[11px] text-amber-900 dark:text-amber-300 leading-relaxed space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <span>💡 Você abriu o arquivo pelo WhatsApp / Gerenciador:</span>
                  </p>
                  <p>
                    O Chrome oculta o botão direto em arquivos de mídia, mas você pode fixar facilmente seguindo os passos abaixo:
                  </p>
                </div>
              )}

              <div className="space-y-2.5">
                {/* Passo 1 */}
                <div className="flex items-start gap-3 p-3 bg-[#FFFFFF] dark:bg-[#121212] rounded-2xl border border-[#E4E4E7] dark:border-[#27272A]">
                  <div className="w-6 h-6 rounded-full bg-[#7A151C] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                    1
                  </div>
                  <div className="text-xs leading-relaxed">
                    Toque nos <strong>3 pontinhos (<MoreVertical className="w-3.5 h-3.5 inline mx-0.5 text-[#7A151C] dark:text-[#8B1C24]" />)</strong> no canto superior direito do navegador.
                  </div>
                </div>

                {/* Passo 2 */}
                <div className="flex items-start gap-3 p-3 bg-[#FFFFFF] dark:bg-[#121212] rounded-2xl border border-[#E4E4E7] dark:border-[#27272A]">
                  <div className="w-6 h-6 rounded-full bg-[#7A151C] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                    2
                  </div>
                  <div className="text-xs leading-relaxed">
                    {isContentUri ? (
                      <>Toque na opção <strong>"Compartilhar..." (<Share className="w-3.5 h-3.5 inline mx-0.5 text-blue-500" />)</strong> e escolha <strong>"Criar Atalho / Adicionar à Tela Inicial"</strong>.</>
                    ) : (
                      <>Toque em <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar aplicativo"</strong>.</>
                    )}
                  </div>
                </div>

                {/* Passo 3 */}
                <div className="flex items-start gap-3 p-3 bg-[#FFFFFF] dark:bg-[#121212] rounded-2xl border border-[#E4E4E7] dark:border-[#27272A]">
                  <div className="w-6 h-6 rounded-full bg-[#7A151C] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                    3
                  </div>
                  <div className="text-xs leading-relaxed">
                    Confirme em <strong>"Adicionar"</strong>. Pronto! O ícone sagrado do app aparecerá na tela do seu celular.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guia para iPhone / iPad */}
          {isIOS && (
            <div className="space-y-3 font-sans">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#7A151C] dark:text-[#EAE6DF] border-b border-[#E4E4E7] dark:border-[#27272A] pb-2">
                <Share className="w-4 h-4 text-blue-500" />
                <span>No iPhone / iPad (Safari):</span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 bg-[#FFFFFF] dark:bg-[#121212] rounded-2xl border border-[#E4E4E7] dark:border-[#27272A]">
                  <div className="w-6 h-6 rounded-full bg-[#7A151C] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-xs leading-relaxed">
                    Toque no botão de <strong>Compartilhar (<Share className="w-3.5 h-3.5 inline mx-0.5 text-blue-500" />)</strong> na barra inferior do Safari.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FFFFFF] dark:bg-[#121212] rounded-2xl border border-[#E4E4E7] dark:border-[#27272A]">
                  <div className="w-6 h-6 rounded-full bg-[#7A151C] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs leading-relaxed">
                    Role a lista e toque em <strong>"Adicionar à Tela de Início" (<PlusSquare className="w-3.5 h-3.5 inline mx-0.5" />)</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FFFFFF] dark:bg-[#121212] rounded-2xl border border-[#E4E4E7] dark:border-[#27272A]">
                  <div className="w-6 h-6 rounded-full bg-[#7A151C] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="text-xs leading-relaxed">
                    Toque em <strong>"Adicionar"</strong> no canto superior direito.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vantagens */}
          <div className="p-3.5 bg-[#7A151C]/5 dark:bg-[#8B1C24]/10 rounded-2xl border border-[#7A151C]/15 dark:border-[#8B1C24]/20 space-y-1.5 font-sans">
            <div className="font-bold text-xs text-[#7A151C] dark:text-[#EAE6DF] flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#7A151C] dark:text-[#8B1C24]" />
              <span>Vantagens do App no seu Celular:</span>
            </div>
            <ul className="text-[11px] text-[#52525B] dark:text-[#A1A1AA] space-y-1 list-disc list-inside">
              <li>Abre em <strong>tela cheia</strong> sem barras de navegador.</li>
              <li>Funciona <strong>100% offline</strong> sem gastar seus dados móveis.</li>
              <li>Salva todas as suas leituras, notas e planos no celular.</li>
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-[#FFFFFF] dark:bg-[#121212] border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between gap-2">
          <button
            onClick={handleDismissForever}
            className="text-[11px] text-[#7A151C] dark:text-[#8B1C24] hover:underline font-bold px-2 py-1"
          >
            Já instalei / Não mostrar mais
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-[#232323] dark:text-[#EAE6DF] rounded-xl text-xs font-bold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
