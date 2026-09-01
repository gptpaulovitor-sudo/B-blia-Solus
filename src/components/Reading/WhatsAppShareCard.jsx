import React, { forwardRef } from 'react';

/**
 * Componente do Cartão Oficial para Compartilhamento no WhatsApp
 * Resolução fixa: 1080x1080px (Quadrado de Alta Fidelidade)
 * Fundo: #7A151C (Carmesim Padrão do Solus Christus)
 * Textos e Elementos: #F9F7F1 (Alabastro Nobre)
 * Tipografia: Versículo em 'Crimson Pro' / 'Lora', peso normal 400, text-transform normal (sem all-caps)
 */
const WhatsAppShareCard = forwardRef(({ versiculoTexto, referencia, notaUsuario, dataStr }, ref) => {
  const dataFormatada = dataStr || new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Capitalizar primeira letra da data
  const dataExibicao = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  // Escala dinâmica suave para o texto do versículo caso contenha múltiplos versículos longos
  const fontSizeVersiculo = !versiculoTexto ? '32px' :
    versiculoTexto.length > 400 ? '22px' :
    versiculoTexto.length > 280 ? '26px' :
    versiculoTexto.length > 180 ? '29px' : '32px';

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
        backgroundColor: '#7A151C',
        border: '2px solid #F9F7F1',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '60px',
        color: '#F9F7F1',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Moldura Interna sutil para acabamento de quadro sagrado */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px',
          bottom: '24px',
          border: '1px solid rgba(249, 247, 241, 0.25)',
          borderRadius: '12px',
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }}
      />

      {/* 2. CABEÇALHO (Logo Invertido e Título) */}
      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '8px',
          width: '100%',
          marginTop: '8px'
        }}
      >
        {/* SVG com fundo transparente e ícones claros fornecido */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="40"
            height="40"
          >
            <path
              d="M 25 70 Q 50 85 50 60 Q 50 85 75 70 L 75 75 Q 50 90 50 65 Q 50 90 25 75 Z"
              fill="#F9F7F1"
            />
            <rect x="46" y="25" width="8" height="40" rx="2" fill="#F9F7F1" />
            <rect x="34" y="38" width="32" height="8" rx="2" fill="#F9F7F1" />
          </svg>
        </div>

        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: '700',
            fontSize: '22px',
            color: '#F9F7F1',
            letterSpacing: '4px',
            textTransform: 'uppercase'
          }}
        >
          SOLUS CHRISTUS
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: '400',
            color: 'rgba(249, 247, 241, 0.7)',
            letterSpacing: '0.5px'
          }}
        >
          {dataExibicao}
        </div>
      </header>

      {/* 3. MIOLO (O Conteúdo Central) */}
      <section
        style={{
          width: '100%',
          maxWidth: '920px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          margin: 'auto 0'
        }}
      >
        {/* Pílula/Tag Superior: VERSÍCULOS BASE DO ESTUDO */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: '600',
            color: '#F9F7F1',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            backgroundColor: 'transparent',
            border: '1px solid #F9F7F1',
            borderRadius: '20px',
            padding: '6px 16px',
            marginBottom: '40px'
          }}
        >
          VERSÍCULOS BASE DO ESTUDO
        </div>

        {/* Texto do Versículo: 'Crimson Pro' / 'Lora', cor #F9F7F1, normal case, normal weight 400 */}
        <blockquote
          style={{
            fontFamily: "'Crimson Pro', 'Lora', serif",
            fontSize: fontSizeVersiculo,
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#F9F7F1',
            margin: 0,
            padding: '0 20px',
            textAlign: 'center',
            textTransform: 'none',
            letterSpacing: '0.2px'
          }}
        >
          “{versiculoTexto || 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.'}”
        </blockquote>

        {/* Endereço Bíblico */}
        <cite
          style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '16px',
            letterSpacing: '1.5px',
            color: 'rgba(249, 247, 241, 0.9)',
            textTransform: 'uppercase',
            marginTop: '24px',
            display: 'block'
          }}
        >
          — {referencia || 'JOÃO 1:1'} (ACF)
        </cite>
      </section>

      {/* 4. RODAPÉ */}
      <footer
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Pílula/Aviso Inferior: Fundo sólido #F9F7F1, texto #7A151C, sem emojis */}
        <div
          style={{
            backgroundColor: '#F9F7F1',
            color: '#7A151C',
            borderRadius: '8px',
            padding: '12px 24px',
            marginBottom: '40px',
            fontWeight: 'bold',
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            letterSpacing: '0.5px'
          }}
        >
          Estudo e Anotações na mensagem
        </div>

        {/* Assinatura Final */}
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: '700',
            fontSize: '14px',
            color: '#F9F7F1',
            letterSpacing: '2.5px',
            textTransform: 'uppercase'
          }}
        >
          SOLUS CHRISTUS • ESTUDO DIÁRIO
        </div>

        {/* Slogan */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'italic',
            fontSize: '12px',
            color: 'rgba(249, 247, 241, 0.7)',
            marginTop: '6px'
          }}
        >
          “Cristo no centro. A Palavra como fundamento. A fé como caminho.”
        </div>
      </footer>
    </div>
  );
});

export default WhatsAppShareCard;
