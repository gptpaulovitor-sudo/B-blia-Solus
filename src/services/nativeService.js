import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { App as CapApp } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';

/**
 * Serviço de Integração Nativa (Mobile / Capacitor)
 * Permite controlar StatusBar, Haptics, Botão Voltar do Android e Splash Screen
 */
class NativeService {
  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    this.platform = Capacitor.getPlatform();
    this.backButtonListeners = [];
    this.initialized = false;
  }

  /**
   * Inicializa integrações nativas ao abrir o app
   */
  async init(onBackPressed) {
    if (this.initialized) return;
    this.initialized = true;

    if (!this.isNative) {
      console.log('[NativeService] Executando em ambiente Web/Navegador.');
      return;
    }

    try {
      // Oculta a Splash Screen com transição suave
      await SplashScreen.hide();

      // Configura o listener do botão físico/gestual de Voltar do Android
      CapApp.addListener('backButton', ({ canGoBack }) => {
        if (this.backButtonListeners.length > 0) {
          // Executa o listener de maior prioridade (ex: fechar modal aberto)
          const handled = this.backButtonListeners[this.backButtonListeners.length - 1]();
          if (handled) return;
        }

        if (typeof onBackPressed === 'function') {
          const handled = onBackPressed();
          if (handled) return;
        }

        // Se não houver mais nada para fechar e puder sair, minimiza o app
        CapApp.minimizeApp();
      });

      console.log('[NativeService] Recursos nativos do dispositivo inicializados.');
    } catch (err) {
      console.warn('[NativeService] Erro ao inicializar recursos nativos:', err);
    }
  }

  /**
   * Registra um manipulador para o botão Voltar do Android (ex: modais)
   * @param {Function} handler Retorna true se consumiu o evento
   * @returns {Function} Função para desregistrar o manipulador
   */
  registerBackHandler(handler) {
    this.backButtonListeners.push(handler);
    return () => {
      this.backButtonListeners = this.backButtonListeners.filter((h) => h !== handler);
    };
  }

  /**
   * Sincroniza a Barra de Status do celular com o tema ativo
   * @param {'light'|'dark'|'sepia'} theme 
   */
  async updateTheme(theme) {
    if (!this.isNative) return;

    try {
      if (theme === 'dark') {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#121212' });
      } else if (theme === 'sepia') {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#F4EFE6' });
      } else {
        // Light / Padrão Solus Christus
        await StatusBar.setStyle({ style: Style.Dark }); // Ícones claros sobre fundo bordô
        await StatusBar.setBackgroundColor({ color: '#9E7418' });
      }
    } catch (err) {
      console.debug('[NativeService] StatusBar sync:', err?.message);
    }
  }

  /**
   * Emite feedback tátil (vibração sutil nativa)
   * @param {'light'|'medium'|'heavy'} style 
   */
  async haptic(style = 'light') {
    if (!this.isNative) return;

    try {
      let impact = ImpactStyle.Light;
      if (style === 'medium') impact = ImpactStyle.Medium;
      if (style === 'heavy') impact = ImpactStyle.Heavy;

      await Haptics.impact({ style: impact });
    } catch {
      // Ignora silenciosamente caso o dispositivo não suporte vibração
    }
  }
}

export const nativeService = new NativeService();
