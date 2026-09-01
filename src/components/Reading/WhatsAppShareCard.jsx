import React, { forwardRef } from 'react';

/**
 * Componente do Cartão Padrão para Compartilhamento no WhatsApp
 * Resolução fixa: 1080x1080px (Quadrado perfeito)
 * Fundo: #F9F7F1 (Alabastro/Pergaminho)
 * Moldura: 4px solid #7A151C com espaçamento de 20px das margens
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
        backgroundColor: '#F9F7F1',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '56px 64px',
        color: '#232323',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Moldura Interna de 4px sólida Carmesim (#7A151C) a 20px das margens */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          bottom: '20px',
          border: '4px solid #7A151C',
          borderRadius: '16px',
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }}
      />

      {/* Cantoneiras decorativas sutis nos 4 cantos da moldura */}
      <div style={{ position: 'absolute', top: '26px', left: '26px', width: '12px', height: '12px', borderTop: '2px solid #7A151C', borderLeft: '2px solid #7A151C', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '26px', right: '26px', width: '12px', height: '12px', borderTop: '2px solid #7A151C', borderRight: '2px solid #7A151C', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '26px', left: '26px', width: '12px', height: '12px', borderBottom: '2px solid #7A151C', borderLeft: '2px solid #7A151C', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '26px', right: '26px', width: '12px', height: '12px', borderBottom: '2px solid #7A151C', borderRight: '2px solid #7A151C', pointerEvents: 'none' }} />

      {/* TOPO DO CARTÃO: Emblema SVG centralizado + Título + Data */}
      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '8px',
          width: '100%',
          marginTop: '6px'
        }}
      >
        {/* SVG do Emblema Solus Christus */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="64"
            height="64"
            style={{ borderRadius: '16px', boxShadow: '0 4px 14px rgba(122, 21, 28, 0.25)' }}
          >
            <rect width="100" height="100" rx="20" fill="#7A151C" />
            <path d="M 25 70 Q 50 85 50 60 Q 50 85 75 70 L 75 75 Q 50 90 50 65 Q 50 90 25 75 Z" fill="#F9F7F1" />
            <rect x="46" y="25" width="8" height="40" rx="2" fill="#F9F7F1" />
            <rect x="34" y="38" width="32" height="8" rx="2" fill="#F9F7F1" />
          </svg>
        </div>

        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: '900',
            fontSize: '22px',
            color: '#7A151C',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}
        >
          SOLUS CHRISTUS
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            fontWeight: '500',
            color: '#6B7280',
            letterSpacing: '0.5px'
          }}
        >
          {dataExibicao}
        </div>
      </header>

      {/* CENTRO DO CARTÃO: O Versículo Base do Dia */}
      <section
        style={{
          width: '100%',
          maxWidth: '920px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '14px',
          margin: '12px 0'
        }}
      >
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '13px',
            fontWeight: '800',
            color: '#7A151C',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            backgroundColor: 'rgba(122, 21, 28, 0.08)',
            padding: '4px 16px',
            borderRadius: '999px',
            border: '1px solid rgba(122, 21, 28, 0.2)'
          }}
        >
          VERSÍCULO BASE DO DIA
        </div>

        <blockquote
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: (versiculoTexto && versiculoTexto.length > 180) ? '26px' : '32px',
            fontWeight: '700',
            lineHeight: 1.4,
            color: '#7A151C',
            margin: 0,
            padding: '0 20px',
            letterSpacing: '0.2px'
          }}
        >
          “{versiculoTexto || 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.'}”
        </blockquote>

        <cite
          style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '17px',
            letterSpacing: '1px',
            color: '#4B5563',
            textTransform: 'uppercase'
          }}
        >
          — {referencia || 'João 1:1'} (ACF)
        </cite>
      </section>

      {/* CORPO DO CARTÃO: Saudação Oficial do App ou Anotação Concisa */}
      <section
        style={{
          width: '100%',
          maxWidth: '920px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid rgba(122, 21, 28, 0.15)',
          padding: '24px 32px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '10px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
        }}
      >
        {notaUsuario && notaUsuario.trim().length > 0 && notaUsuario.trim().length <= 180 ? (
          // Caso a anotação seja curta: cabe por inteiro no cartão com elegância
          <>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '1.5px',
                color: '#7A151C',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>✍️ MINHA ANOTAÇÃO DO ESTUDO</span>
            </div>

            <div
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontStyle: 'italic',
                fontSize: '25px',
                lineHeight: 1.45,
                color: '#232323'
              }}
            >
              "{notaUsuario.trim()}"
            </div>
          </>
        ) : notaUsuario && notaUsuario.trim().length > 180 ? (
          // Caso a anotação seja longa: Saudação Oficial com indicação de leitura no texto da mensagem
          <>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '13px',
                fontWeight: '800',
                letterSpacing: '2px',
                color: '#7A151C',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>📖 ESTUDO & MEDITAÇÃO DIÁRIA</span>
            </div>

            <div
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontStyle: 'italic',
                fontSize: '23px',
                lineHeight: 1.4,
                color: '#374151'
              }}
            >
              “A tua palavra é lâmpada que guia os meus passos e luz no meu caminho.”
              <span style={{ fontSize: '15px', fontStyle: 'normal', color: '#6B7280', display: 'block', marginTop: '4px', fontWeight: '600' }}>
                — Salmos 119:105
              </span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#7A151C',
                color: '#FFFFFF',
                padding: '8px 22px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                marginTop: '4px',
                boxShadow: '0 2px 8px rgba(122, 21, 28, 0.25)'
              }}
            >
              <span>✍️ Anotação e Estudo Completo no Texto da Mensagem 👇</span>
            </div>
          </>
        ) : (
          // Sem anotação: Saudação Institucional Padrão do App
          <>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '13px',
                fontWeight: '800',
                letterSpacing: '2px',
                color: '#7A151C',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>🕊️ SOLUS CHRISTUS • EDIFICAÇÃO NA PALAVRA</span>
            </div>

            <div
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontStyle: 'italic',
                fontSize: '24px',
                lineHeight: 1.4,
                color: '#374151'
              }}
            >
              “Que a palavra de Cristo habite ricamente em vós em toda a sabedoria.”
              <span style={{ fontSize: '15px', fontStyle: 'normal', color: '#6B7280', display: 'block', marginTop: '4px', fontWeight: '600' }}>
                — Colossenses 3:16
              </span>
            </div>
          </>
        )}
      </section>

      {/* RODAPÉ DO CARTÃO: Linha fina decorativa + Assinatura */}
      <footer
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '8px',
          marginBottom: '4px'
        }}
      >
        {/* Linha fina decorativa */}
        <div
          style={{
            width: '400px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #7A151C, transparent)',
            opacity: 0.6,
            marginBottom: '4px'
          }}
        />

        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: '800',
            fontSize: '15px',
            color: '#7A151C',
            letterSpacing: '2.5px',
            textTransform: 'uppercase'
          }}
        >
          SOLUS CHRISTUS • ESTUDO DIÁRIO
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'italic',
            fontSize: '12px',
            color: '#71717A'
          }}
        >
          “Cristo no centro. A Palavra como fundamento. A fé como caminho.”
        </div>
      </footer>
    </div>
  );
});

export default WhatsAppShareCard;
