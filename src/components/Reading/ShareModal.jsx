import React, { useState } from 'react';
import { X, Download, Share2, Check, ExternalLink } from 'lucide-react';
import { handleShareCardImageOnly } from '../../services/shareService';

export default function ShareModal({
  isOpen,
  onClose,
  cardRef,
  versiculoTexto,
  referencia,
  notaUsuario,
  showToast
}) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const notaLimpa = (notaUsuario || '').trim();
  let textoWhatsApp = `*SOLUS CHRISTUS • Estudo Diário*\n\n"${versiculoTexto}"\n— *${referencia}*`;
  if (notaLimpa) {
    textoWhatsApp += `\n\n✍️ *Minha Anotação / Estudo:*\n${notaLimpa}`;
  }
  textoWhatsApp += `\n\n🕊️ _Estudo diário no aplicativo Solus Christus_`;

  const handleOpenWhatsApp = () => {
    // Copiar também para o clipboard para garantir
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textoWhatsApp);
    }
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textoWhatsApp)}`;
    window.open(waUrl, '_blank');
    if (showToast) showToast('Abrindo WhatsApp com o texto completo!');
  };

  const handleDownloadImage = async () => {
    try {
      setDownloading(true);
      await handleShareCardImageOnly({ cardElement: cardRef.current, showToast });
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(textoWhatsApp);
      setCopied(true);
      if (showToast) showToast('Texto copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.warn('Erro ao copiar:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FFFFFF] dark:bg-[#1C1C1E] border border-[#E4E4E7] dark:border-[#27272A] w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header do Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
          <div>
            <span className="text-[11px] font-bold text-[#7A151C] dark:text-[#8B1C24] uppercase tracking-wider">
              Solus Christus
            </span>
            <h3 className="font-cinzel text-lg font-bold text-[#232323] dark:text-[#EAE6DF]">
              Compartilhar Estudo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prévia do Cartão Oficial */}
        <div className="p-4 rounded-2xl bg-[#7A151C] border border-[#F9F7F1]/30 text-center space-y-2.5 shadow-lg">
          <div className="text-[10px] font-bold text-[#F9F7F1]/80 uppercase tracking-wider">
            Prévia do Cartão Oficial (1080x1080)
          </div>
          <div className="border border-[#F9F7F1]/40 p-3.5 rounded-xl bg-[#7A151C] text-[#F9F7F1] space-y-2">
            <div className="text-xs font-bold text-[#F9F7F1] uppercase tracking-widest font-cinzel">
              SOLUS CHRISTUS
            </div>
            <div className="inline-block border border-[#F9F7F1]/70 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider text-[#F9F7F1]">
              VERSÍCULOS BASE DO ESTUDO
            </div>
            <div className="font-serif text-sm text-[#F9F7F1] line-clamp-3 leading-relaxed">
              “{versiculoTexto}”
            </div>
            <div className="text-[11px] font-bold text-[#F9F7F1]/90">
              — {referencia} (ACF)
            </div>
            <div className="inline-block bg-[#F9F7F1] text-[#7A151C] text-[10px] font-bold px-3 py-1 rounded-md mt-1">
              Estudo e Anotações na mensagem
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3">
          {/* Botão 1: Enviar Mensagem no WhatsApp */}
          <button
            onClick={handleOpenWhatsApp}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.13 7.39C8.95 7.39 8.66 7.46 8.42 7.72C8.17 7.99 7.48 8.63 7.48 9.94C7.48 11.24 8.43 12.5 8.56 12.68C8.7 12.85 10.42 15.5 13.06 16.64C13.69 16.91 14.18 17.07 14.56 17.19C15.2 17.39 15.78 17.36 16.24 17.3C16.76 17.22 17.83 16.65 18.06 16.01C18.28 15.37 18.28 14.82 18.21 14.71C18.15 14.59 17.97 14.52 17.7 14.39C17.43 14.25 16.11 13.6 15.86 13.51C15.62 13.42 15.44 13.38 15.26 13.64C15.08 13.91 14.57 14.52 14.41 14.7C14.26 14.89 14.1 14.91 13.83 14.77C13.56 14.64 12.69 14.35 11.66 13.43C10.86 12.72 10.32 11.84 10.16 11.57C10.01 11.31 10.15 11.16 10.28 11.03C10.4 10.91 10.56 10.7 10.7 10.53C10.84 10.37 10.88 10.25 10.97 10.07C11.06 9.89 11.02 9.73 10.95 9.6C10.88 9.47 10.34 8.15 10.12 7.61C9.9 7.08 9.68 7.15 9.52 7.14C9.37 7.14 9.19 7.39 9.13 7.39Z" />
            </svg>
            <span>1. Enviar Estudo no WhatsApp</span>
          </button>

          {/* Botão 2: Baixar Imagem Oficial */}
          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-[#7A151C] hover:bg-[#681117] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-75"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Gerando Imagem...' : '2. Baixar Imagem do Cartão (1080x1080)'}</span>
          </button>

          {/* Botão 3: Copiar Texto */}
          <button
            onClick={handleCopyText}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Texto do Estudo Copiado!</span>
              </>
            ) : (
              <>
                <span>📋 Copiar Texto Completo do Estudo</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center italic">
          Toque em "Enviar Estudo no WhatsApp" para enviar o texto completo e anexe a imagem baixada na conversa.
        </p>
      </div>
    </div>
  );
}
