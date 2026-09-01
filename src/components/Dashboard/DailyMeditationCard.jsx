import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getCapituloVersiculos, LIVROS_BIBLIA } from '../../data/bibliaACF';
import { getComentarioCapitulo } from '../../data/comentariosEstudo';
import { Sparkles, HeartHandshake, ArrowRight, Quote, Calendar, Lightbulb, Loader2 } from 'lucide-react';
import WhatsAppShareCard from '../Reading/WhatsAppShareCard';
import { handleShareWhatsApp } from '../../services/shareService';

export default function DailyMeditationCard() {
  const { posicao, irParaCapitulo, versiculosMarcados, showToast } = useApp();
  const [isSharing, setIsSharing] = useState(false);
  const cardRef = useRef(null);

  const livroObj = LIVROS_BIBLIA.find(l => l.id === posicao.livroId) || LIVROS_BIBLIA[0];
  const capituloAtual = posicao.capitulo;

  // 1. Obter versículos do capítulo em leitura
  const versiculosCap = getCapituloVersiculos(posicao.livroId, capituloAtual);
  
  // 2. Verificar se há estudo profundo & prática diária/curadoria para este capítulo
  const comentarioCap = getComentarioCapitulo(posicao.livroId, capituloAtual);

  let versiculoNumero = 1;
  let versiculoTexto = versiculosCap[0]?.t || "No princípio era o Verbo, e o Verbo estava com Deus.";
  let meditarInsight = null;
  let referenciaTexto = `${livroObj.nome} ${capituloAtual}:${versiculoNumero}`;

  if (comentarioCap && comentarioCap.analiseVersiculos && comentarioCap.analiseVersiculos.length > 0) {
    const analise = comentarioCap.analiseVersiculos[0];
    versiculoNumero = analise.numero || 1;
    const matchV = versiculosCap.find(v => Number(v.v) === Number(versiculoNumero));
    if (matchV) {
      versiculoTexto = matchV.t;
    }
    referenciaTexto = analise.referenciaCompleta || `${livroObj.nome} ${capituloAtual}:${versiculoNumero}`;
    meditarInsight = analise.conexaoHumana || analise.profundidadeExegetica || analise.aplicacaoPratica;
  } else {
    // Verificar se o usuário marcou algum versículo especificamente neste capítulo
    const marcacao = (versiculosMarcados || []).find(v => v.livroId === posicao.livroId && Number(v.capitulo) === Number(capituloAtual));
    if (marcacao) {
      versiculoNumero = marcacao.versiculo;
      const matchV = versiculosCap.find(v => Number(v.v) === Number(versiculoNumero));
      if (matchV) {
        versiculoTexto = matchV.t;
      }
      referenciaTexto = `${livroObj.nome} ${capituloAtual}:${versiculoNumero}`;
      if (marcacao.nota && marcacao.nota.trim() !== '') {
        meditarInsight = marcacao.nota;
      }
    }
  }

  const handleShareDailyMeditation = async () => {
    try {
      setIsSharing(true);
      await handleShareWhatsApp({
        notaUsuario: meditarInsight || '',
        versiculoDoDia: {
          texto: versiculoTexto,
          referencia: referenciaTexto
        },
        cardElement: cardRef.current,
        showToast
      });
    } catch (err) {
      console.error('Erro ao compartilhar meditação diária:', err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div class="relative overflow-hidden bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-amber-500/20">
      {/* Background Decorative Glow */}
      <div class="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
      
      {/* Top Tag Header */}
      <div class="flex items-center justify-between gap-2 mb-6">
        <div class="flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles class="w-3.5 h-3.5" />
          <span>Palavra do Dia • {livroObj.nome}</span>
        </div>
        <div class="flex items-center gap-1 text-xs text-amber-200/70 font-sans">
          <Calendar class="w-3.5 h-3.5" />
          <span class="capitalize">{new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}</span>
        </div>
      </div>

      {/* Scripture Quote */}
      <div class="mb-5 relative z-10 space-y-3">
        <Quote class="w-8 h-8 text-amber-500/40" />
        <blockquote class="font-serif italic text-lg md:text-xl text-amber-50 leading-relaxed">
          "{versiculoTexto}"
        </blockquote>
        <div class="text-sm font-bold text-amber-400 font-sans flex items-center gap-2">
          <span>— {referenciaTexto} (Versão ACF)</span>
        </div>
      </div>

      {/* Optional Devotional Insight */}
      {meditarInsight && (
        <div class="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed font-sans flex items-start gap-3">
          <Lightbulb class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong class="text-amber-300 block mb-0.5 font-bold uppercase tracking-wider text-[11px]">
              Reflexão de {livroObj.nome}
            </strong>
            <p class="italic">{meditarInsight}</p>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div class="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-amber-500/20">
        <div class="flex items-center gap-2 text-xs text-amber-200/80 font-sans">
          <HeartHandshake class="w-4 h-4 text-amber-400" />
          <span>Meditação ancorada na sua leitura ({livroObj.nome} {capituloAtual})</span>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleShareDailyMeditation}
            disabled={isSharing}
            title="Compartilhar Cartão no WhatsApp"
            class="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#7A151C] hover:bg-[#681117] text-white font-bold text-xs shadow-md transition-all scale-100 active:scale-95 cursor-pointer disabled:opacity-75"
          >
            {isSharing ? (
              <>
                <Loader2 class="w-4 h-4 animate-spin" />
                <span>Gerando...</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" class="shrink-0">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.13 7.39C8.95 7.39 8.66 7.46 8.42 7.72C8.17 7.99 7.48 8.63 7.48 9.94C7.48 11.24 8.43 12.5 8.56 12.68C8.7 12.85 10.42 15.5 13.06 16.64C13.69 16.91 14.18 17.07 14.56 17.19C15.2 17.39 15.78 17.36 16.24 17.3C16.76 17.22 17.83 16.65 18.06 16.01C18.28 15.37 18.28 14.82 18.21 14.71C18.15 14.59 17.97 14.52 17.7 14.39C17.43 14.25 16.11 13.6 15.86 13.51C15.62 13.42 15.44 13.38 15.26 13.64C15.08 13.91 14.57 14.52 14.41 14.7C14.26 14.89 14.1 14.91 13.83 14.77C13.56 14.64 12.69 14.35 11.66 13.43C10.86 12.72 10.32 11.84 10.16 11.57C10.01 11.31 10.15 11.16 10.28 11.03C10.4 10.91 10.56 10.7 10.7 10.53C10.84 10.37 10.88 10.25 10.97 10.07C11.06 9.89 11.02 9.73 10.95 9.6C10.88 9.47 10.34 8.15 10.12 7.61C9.9 7.08 9.68 7.15 9.52 7.14C9.37 7.14 9.19 7.39 9.13 7.39Z" />
                </svg>
                <span>Compartilhar</span>
              </>
            )}
          </button>

          <button
            onClick={() => irParaCapitulo(posicao.livroId, capituloAtual)}
            class="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all scale-100 active:scale-95 cursor-pointer"
          >
            <span>Ler {livroObj.nome} {capituloAtual} Completo</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cartão Padrão Oculto para Renderização de Imagem 1080x1080px */}
      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '1080px',
          height: '1080px',
          pointerEvents: 'none',
          zIndex: -100
        }}
        aria-hidden="true"
      >
        <WhatsAppShareCard
          ref={cardRef}
          versiculoTexto={versiculoTexto}
          referencia={referenciaTexto}
          notaUsuario={meditarInsight || ''}
        />
      </div>
    </div>
  );
}
