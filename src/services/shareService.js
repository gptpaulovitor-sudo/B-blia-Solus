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
    backgroundColor: '#9E7418',
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
  const notaLimpa = (notaUsuario || '').trim();

  // 1. Montar texto completo da mensagem para o WhatsApp com quebras de linha e destaques
  let textoCompartilhamento = `*SOLUS CHRISTUS • Estudo Diário*\n\n"${versiculoTexto}"\n— *${versiculoRef}*`;
  
  if (notaLimpa) {
    textoCompartilhamento += `\n\n✍️ *Minha Anotação / Estudo:*\n${notaLimpa}`;
  }
  
  textoCompartilhamento += `\n\n🕊️ _Estudo diário no aplicativo Solus Christus_`;

  // 2. Copiar o texto do estudo para a área de transferência como segurança
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(textoCompartilhamento);
    } catch (clipErr) {
      console.warn('Clipboard write error:', clipErr);
    }
  }

  // 3. Renderizar e baixar a imagem oficial de Saudação & Versículo (1080x1080)
  if (cardElement) {
    try {
      const blob = await renderCardToBlob(cardElement);
      const dataIso = new Date().toISOString().split('T')[0];
      const fileName = `solus-christus-saudacao-${dataIso}.png`;

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
    } catch (cardErr) {
      console.warn('Aviso na renderização do cartão:', cardErr);
    }
  }

  // 4. Abrir o WhatsApp diretamente com o texto completo já inserido na mensagem
  // api.whatsapp.com/send?text= abre o app do WhatsApp no celular ou web no PC com 100% do texto digitado
  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textoCompartilhamento)}`;
  window.open(waUrl, '_blank');

  if (showToast) {
    showToast('Estudo e anotação enviados para o WhatsApp! Cartão salvo na sua galeria.');
  }

  return { success: true, method: 'whatsapp-direct-message' };
}

/**
 * Função para compartilhar especificamente o arquivo de imagem (1080x1080)
 * Ideal para postar no Status do WhatsApp, Stories ou Instagram
 */
export async function handleShareCardImageOnly({
  cardElement,
  showToast
}) {
  try {
    const blob = await renderCardToBlob(cardElement);
    const dataIso = new Date().toISOString().split('T')[0];
    const fileName = `solus-christus-saudacao-${dataIso}.png`;
    const imageFile = new File([blob], fileName, { type: 'image/png' });

    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function' &&
      typeof navigator.canShare === 'function' &&
      navigator.canShare({ files: [imageFile] })
    ) {
      await navigator.share({
        files: [imageFile],
        title: 'Solus Christus • Saudação do Dia'
      });
      if (showToast) showToast('Imagem do cartão compartilhada!');
      return { success: true };
    }

    // Fallback: download da imagem
    const fileUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setTimeout(() => URL.revokeObjectURL(fileUrl), 10000);

    if (showToast) showToast('Cartão de imagem salvo no seu dispositivo!');
    return { success: true };
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Erro ao compartilhar imagem:', err);
    }
    return { success: false };
  }
}
