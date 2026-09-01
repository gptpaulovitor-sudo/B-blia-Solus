import html2canvas from 'html2canvas';

/**
 * Renderiza um elemento DOM para Blob de imagem PNG (1080x1080px)
 * @param {HTMLElement} cardElement
 * @returns {Promise<Blob>}
 */
export async function renderCardToBlob(cardElement) {
  if (!cardElement) {
    throw new Error('Elemento do cartão para captura não encontrado.');
  }

  // Garantir que as fontes web (Cinzel, Crimson Pro, Inter) foram carregadas pelo navegador
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch (e) {
      console.warn('Aviso ao aguardar carregamento de fontes:', e);
    }
  }

  const canvas = await html2canvas(cardElement, {
    width: 1080,
    height: 1080,
    scale: 1,
    useCORS: true,
    backgroundColor: '#F9F7F1',
    logging: false
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Falha ao gerar o Blob da imagem a partir do canvas.'));
        }
      },
      'image/png',
      0.95
    );
  });
}

/**
 * Função principal de compartilhamento no WhatsApp
 * @param {Object} params
 * @param {string} params.notaUsuario - Anotação escrita pelo usuário
 * @param {Object|string} params.versiculoDoDia - Versículo { texto, referencia } ou texto
 * @param {HTMLElement} params.cardElement - Elemento HTML do cartão padrão 1080x1080
 * @param {Function} [params.showToast] - Função de exibição de feedback toast
 * @returns {Promise<{ success: boolean, method: string }>}
 */
export async function handleShareWhatsApp({
  notaUsuario = '',
  versiculoDoDia = {},
  cardElement,
  showToast
}) {
  const versiculoTexto = typeof versiculoDoDia === 'object' ? (versiculoDoDia.texto || '') : String(versiculoDoDia || '');
  const versiculoRef = typeof versiculoDoDia === 'object' ? (versiculoDoDia.referencia || '') : '';

  try {
    // 1. Gera o blob da imagem em alta resolução
    const blob = await renderCardToBlob(cardElement);
    const dataIso = new Date().toISOString().split('T')[0];
    const fileName = `solus-christus-estudo-${dataIso}.png`;
    const imageFile = new File([blob], fileName, { type: 'image/png' });

    const textoCompartilhamento = `Confira meu estudo de hoje no Solus Christus!\n\n"${versiculoTexto}"\n— ${versiculoRef}`;

    // 2. Tentar Web Share API nativa com suporte a arquivos (mobile Android/iOS)
    const canShareFiles = typeof navigator !== 'undefined' &&
                          typeof navigator.share === 'function' &&
                          typeof navigator.canShare === 'function' &&
                          navigator.canShare({ files: [imageFile] });

    if (canShareFiles) {
      try {
        await navigator.share({
          files: [imageFile],
          title: 'Estudo Diário • Solus Christus',
          text: textoCompartilhamento
        });

        if (showToast) {
          showToast('Estudo compartilhado com sucesso!');
        }

        return { success: true, method: 'web-share-files' };
      } catch (shareErr) {
        // Se o usuário simplesmente cancelou o menu nativo, não forçar fallback
        if (shareErr.name === 'AbortError') {
          return { success: false, aborted: true };
        }
        console.warn('Web Share API falhou, aplicando fallback:', shareErr);
      }
    }

    // 3. FALLBACK: Baixar a imagem automaticamente para o celular e abrir wa.me
    const fileUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setTimeout(() => {
      URL.revokeObjectURL(fileUrl);
    }, 10000);

    // Formatar texto para o link do WhatsApp
    const notaFormatada = notaUsuario.trim() ? `\n\n*Minha reflexão:*\n_${notaUsuario}_` : '';
    const textoMensagemWhatsApp = `*SOLUS CHRISTUS • Estudo Diário*\n\n"${versiculoTexto}"\n— *${versiculoRef}*${notaFormatada}\n\n📲 _(O cartão de estudo em imagem foi salvo no seu aparelho. Anexe a foto nesta conversa!)_`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(textoMensagemWhatsApp)}`;
    window.open(waUrl, '_blank');

    if (showToast) {
      showToast('Cartão baixado! Anexe a foto no WhatsApp que foi aberto.');
    }

    return { success: true, method: 'fallback-download-wa' };
  } catch (error) {
    console.error('Erro na execução de handleShareWhatsApp:', error);
    if (showToast) {
      showToast('Erro ao processar o compartilhamento do cartão.');
    }
    throw error;
  }
}
