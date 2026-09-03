import React, { forwardRef } from 'react';

/**
 * Componente do Cartão Oficial para Compartilhamento no WhatsApp
 * Resolução fixa: 1080x1080px (Quadrado de Alta Fidelidade)
 * Fundo: #9E7418 (Carmesim Padrão do Solus Christus)
 * Textos e Elementos: #F9F7F1 (Alabastro Nobre)
 * Estrutura: Cabeçalho e Rodapé generosos com linhas divisórias decorativas
 */
const WhatsAppShareCard = forwardRef(({ versiculoTexto, referencia, notaUsuario, dataStr }, ref) => {
  const dataFormatada = dataStr || new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const dataExibicao = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  // Escala dinâmica para o texto do versículo
  const fontSizeVersiculo = !versiculoTexto ? '34px' :
    versiculoTexto.length > 400 ? '22px' :
    versiculoTexto.length > 280 ? '26px' :
    versiculoTexto.length > 180 ? '30px' : '34px';

  return (
    <div
      ref={ref}
      style={{
        width: '1080px',
        height: '1080px',
        minWidth: '1080px',
        minHeight: '1080px',
        maxWidth: '1080px',
        maxHeight: '1080px',
        backgroundColor: '#9E7418',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0',
        color: '#F9F7F1',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Moldura interna sutil */}
      <div
        style={{
          position: 'absolute',
          top: '22px',
          left: '22px',
          right: '22px',
          bottom: '22px',
          border: '1px solid rgba(249, 247, 241, 0.28)',
          borderRadius: '12px',
          pointerEvents: 'none',
          boxSizing: 'border-box',
          zIndex: 0
        }}
      />

      {/* ── CABEÇALHO ──────────────────────────────────────────── */}
      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          padding: '70px 80px 50px',
          gap: '0',
          boxSizing: 'border-box'
        }}
      >
        {/* SVG Cruz/Âncora em Alabastro */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="72"
            height="72"
          >
            <path
              d="M 25 70 Q 50 85 50 60 Q 50 85 75 70 L 75 75 Q 50 90 50 65 Q 50 90 25 75 Z"
              fill="#F9F7F1"
            />
            <rect x="46" y="20" width="8" height="45" rx="2" fill="#F9F7F1" />
            <rect x="30" y="36" width="40" height="8" rx="2" fill="#F9F7F1" />
          </svg>
        </div>

        {/* Título SOLUS CHRISTUS */}
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: '800',
            fontSize: '46px',
            color: '#F9F7F1',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginBottom: '22px'
          }}
        >
          SOLUS CHRISTUS
        </div>

        {/* Linha decorativa horizontal */}
        <div
          style={{
            width: '320px',
            height: '1px',
            background: 'rgba(249, 247, 241, 0.40)',
            marginBottom: '16px'
          }}
        />

        {/* Data */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '17px',
            fontWeight: '400',
            color: 'rgba(249, 247, 241, 0.70)',
            letterSpacing: '0.5px'
          }}
        >
          {dataExibicao}
        </div>
      </header>

      {/* ── MIOLO ──────────────────────────────────────────────── */}
      <section
        style={{
          width: '100%',
          maxWidth: '920px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 80px',
          boxSizing: 'border-box',
          flex: 1,
          justifyContent: 'center',
          gap: '0'
        }}
      >
        {/* Pílula "VERSÍCULOS BASE DO ESTUDO" */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: '600',
            color: '#F9F7F1',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            backgroundColor: 'transparent',
            border: '1px solid rgba(249, 247, 241, 0.70)',
            borderRadius: '999px',
            padding: '8px 20px',
            marginBottom: '36px'
          }}
        >
          VERSÍCULOS BASE DO ESTUDO
        </div>

        {/* Texto do Versículo */}
        <blockquote
          style={{
            fontFamily: "'Crimson Pro', 'Lora', Georgia, serif",
            fontSize: fontSizeVersiculo,
            fontWeight: 400,
            lineHeight: 1.55,
            color: '#F9F7F1',
            margin: 0,
            padding: 0,
            textAlign: 'center',
            textTransform: 'none',
            letterSpacing: '0.3px',
            marginBottom: '28px'
          }}
        >
          "{versiculoTexto || 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.'}"
        </blockquote>

        {/* Referência Bíblica */}
        <cite
          style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '18px',
            letterSpacing: '2px',
            color: 'rgba(249, 247, 241, 0.90)',
            textTransform: 'uppercase',
            display: 'block'
          }}
        >
          — {referencia || 'JOÃO 1:1'} (ACF)
        </cite>
      </section>

      {/* ── RODAPÉ ─────────────────────────────────────────────── */}
      <footer
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px 80px 64px',
          boxSizing: 'border-box',
          gap: '0'
        }}
      >
        {/* Linha decorativa horizontal */}
        <div
          style={{
            width: '320px',
            height: '1px',
            background: 'rgba(249, 247, 241, 0.40)',
            marginBottom: '30px'
          }}
        />

        {/* Badge "Estudo e Anotações na mensagem" */}
        <div
          style={{
            backgroundColor: '#F9F7F1',
            color: '#9E7418',
            borderRadius: '10px',
            padding: '16px 40px',
            marginBottom: '30px',
            fontWeight: '800',
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            letterSpacing: '0.3px',
            display: 'inline-block'
          }}
        >
          Estudo e Anotações na mensagem
        </div>

        {/* Assinatura */}
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: '700',
            fontSize: '16px',
            color: '#F9F7F1',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}
        >
          SOLUS CHRISTUS • ESTUDO DIÁRIO
        </div>

        {/* Slogan */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'italic',
            fontSize: '14px',
            color: 'rgba(249, 247, 241, 0.65)',
            letterSpacing: '0.2px'
          }}
        >
          "Cristo no centro. A Palavra como fundamento. A fé como caminho."
        </div>
      </footer>
    </div>
  );
});

export default WhatsAppShareCard;
