import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  initializeFirestore,
  doc, 
  getDoc, 
  setDoc,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCYtoCqx2KFq6dDYh02A0BTKFZ4HGsUbiA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "biblia-online-8bce0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "biblia-online-8bce0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "biblia-online-8bce0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "469916014501",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:469916014501:web:408ab6ed600a2217e43a4c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-92PERTVCBJ"
};

const STORAGE_KEY_CUSTOM_CONFIG = 'solus_firebase_custom_config';

export function getActiveFirebaseConfig() {
  try {
    const custom = localStorage.getItem(STORAGE_KEY_CUSTOM_CONFIG);
    if (custom) {
      const parsed = JSON.parse(custom);
      if (parsed && parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Erro ao carregar configuracao customizada do Firebase:', e);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

export function saveActiveFirebaseConfig(newConfig) {
  try {
    if (!newConfig) {
      localStorage.removeItem(STORAGE_KEY_CUSTOM_CONFIG);
      return true;
    }
    localStorage.setItem(STORAGE_KEY_CUSTOM_CONFIG, JSON.stringify(newConfig));
    return true;
  } catch (e) {
    console.error('Erro ao salvar config do Firebase no localStorage:', e);
    return false;
  }
}

let firebaseAppInstance = null;
let firebaseAuthInstance = null;
let firebaseDbInstance = null;

export function getFirebaseInstances() {
  try {
    const config = getActiveFirebaseConfig();
    if (!getApps().length) {
      firebaseAppInstance = initializeApp(config);
    } else {
      firebaseAppInstance = getApp();
    }
    firebaseAuthInstance = getAuth(firebaseAppInstance);
    try {
      firebaseDbInstance = initializeFirestore(firebaseAppInstance, {
        experimentalAutoDetectLongPolling: true
      });
    } catch (e) {
      firebaseDbInstance = getFirestore(firebaseAppInstance);
    }
    return { app: firebaseAppInstance, auth: firebaseAuthInstance, db: firebaseDbInstance };
  } catch (err) {
    console.error('Falha ao inicializar o Firebase:', err);
    return { app: null, auth: null, db: null, error: err };
  }
}

export async function loginWithGoogle() {
  const { auth } = getFirebaseInstances();
  if (!auth) throw new Error('Firebase Auth não inicializado.');
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function loginWithEmail(email, password) {
  const { auth } = getFirebaseInstances();
  if (!auth) throw new Error('Firebase Auth não inicializado.');
  const result = await signInWithEmailAndPassword(auth, email.trim(), password);
  return result.user;
}

export async function registerWithEmail(email, password, displayName) {
  const { auth } = getFirebaseInstances();
  if (!auth) throw new Error('Firebase Auth não inicializado.');
  const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (displayName && displayName.trim()) {
    try {
      await updateProfile(result.user, { displayName: displayName.trim() });
    } catch (e) {
      console.warn('Erro ao atualizar nome no perfil:', e);
    }
  }
  return result.user;
}

export async function logoutFirebase() {
  const { auth } = getFirebaseInstances();
  if (!auth) return;
  await signOut(auth);
}

export function subscribeAuthState(onUserChanged) {
  try {
    const { auth } = getFirebaseInstances();
    if (!auth) {
      onUserChanged(null);
      return () => {};
    }
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        onUserChanged({
          uid: user.uid,
          email: user.email,
          nome: user.displayName || user.email?.split('@')[0] || 'Irmão em Cristo',
          foto: user.photoURL || null
        });
      } else {
        onUserChanged(null);
      }
    });
  } catch (err) {
    console.warn('Erro ao registrar observador de autenticacao:', err);
    onUserChanged(null);
    return () => {};
  }
}

export async function saveUserDataToFirestore(uid, data) {
  try {
    if (!uid) return { sucesso: false, erro: 'UID não fornecido' };
    const { db } = getFirebaseInstances();
    if (!db) return { sucesso: false, erro: 'Instância do Firestore não inicializada' };

    // Remove qualquer propriedade undefined para evitar erro nativo do Firestore
    const sanitized = JSON.parse(JSON.stringify(data || {}));

    const userDocRef = doc(db, 'usuarios', uid);
    await setDoc(userDocRef, {
      ...sanitized,
      atualizadoEm: serverTimestamp()
    }, { merge: true });
    return { sucesso: true, erro: null };
  } catch (err) {
    console.error('Erro ao salvar dados no Firestore:', err);
    return { sucesso: false, erro: err.message || err.code || String(err) };
  }
}

export async function loadUserDataFromFirestore(uid) {
  try {
    if (!uid) return { dados: null, erro: 'UID não fornecido' };
    const { db } = getFirebaseInstances();
    if (!db) return { dados: null, erro: 'Instância do Firestore não inicializada' };

    const userDocRef = doc(db, 'usuarios', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return { dados: snap.data(), erro: null };
    }
    return { dados: null, erro: null };
  } catch (err) {
    console.error('Erro ao carregar dados do Firestore:', err);
    return { dados: null, erro: err.message || err.code || String(err) };
  }
}

/**
 * Ouvinte em tempo real via onSnapshot do Cloud Firestore
 * Garante que qualquer alteração no celular reflita no computador e vice-versa instantaneamente
 */
export function subscribeCloudUserData(uid, onData, onError) {
  try {
    if (!uid) return () => {};
    const { db } = getFirebaseInstances();
    if (!db) return () => {};

    const userDocRef = doc(db, 'usuarios', uid);
    return onSnapshot(userDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        onData(data, snap.metadata?.hasPendingWrites || false);
      }
    }, (err) => {
      console.warn('Observador do Firestore offline ou erro:', err);
      if (onError) onError(err);
    });
  } catch (e) {
    console.error('Falha ao registrar observador onSnapshot:', e);
    return () => {};
  }
}

/**
 * Mescla dados locais e nuvem de forma inteligente e segura (sem perda de leitura ou notas).
 */
export function mergeUserData(local = {}, cloud = {}) {
  const localProg = local.progressoCapitulos || {};
  const cloudProg = cloud.progressoCapitulos || {};
  const progressoCapitulos = { ...cloudProg, ...localProg };

  // Versículos Marcados: união inteligente por ID
  const mapVersiculos = new Map();
  const cloudMarcados = Array.isArray(cloud.versiculosMarcados) ? cloud.versiculosMarcados : [];
  const localMarcados = Array.isArray(local.versiculosMarcados) ? local.versiculosMarcados : [];

  cloudMarcados.forEach(item => {
    if (item && (item.id || item.versiculo)) {
      const chave = item.id || `v_${item.livroId}_${item.capitulo}_${item.versiculo}`;
      mapVersiculos.set(chave, { ...item, id: chave });
    }
  });

  localMarcados.forEach(item => {
    if (item && (item.id || item.versiculo)) {
      const chave = item.id || `v_${item.livroId}_${item.capitulo}_${item.versiculo}`;
      if (mapVersiculos.has(chave)) {
        const cloudItem = mapVersiculos.get(chave);
        // Preserva a nota se qualquer um dos lados tiver preenchido
        const nota = (item.nota && item.nota.trim() !== '') ? item.nota : (cloudItem.nota || '');
        const cor = item.cor || cloudItem.cor;
        const data = (item.data && (!cloudItem.data || item.data > cloudItem.data)) ? item.data : (cloudItem.data || item.data);
        mapVersiculos.set(chave, { ...cloudItem, ...item, id: chave, nota, cor, data });
      } else {
        mapVersiculos.set(chave, { ...item, id: chave });
      }
    }
  });

  // Plano Ativo: mesclar progresso de dias
  let planoAtivo = local.planoAtivo || cloud.planoAtivo || null;
  if (local.planoAtivo && cloud.planoAtivo && local.planoAtivo.id === cloud.planoAtivo.id) {
    planoAtivo = {
      ...cloud.planoAtivo,
      ...local.planoAtivo,
      progressoDias: {
        ...(cloud.planoAtivo.progressoDias || {}),
        ...(local.planoAtivo.progressoDias || {})
      }
    };
  }

  // Registros de atividade & Ofensiva
  const registrosAtividade = {
    ...(cloud.registrosAtividade || {}),
    ...(local.registrosAtividade || {})
  };
  const ofensivaDias = Math.max(local.ofensivaDias || 0, cloud.ofensivaDias || 0);

  return {
    progressoCapitulos,
    versiculosMarcados: Array.from(mapVersiculos.values()),
    planoAtivo,
    registrosAtividade,
    ofensivaDias
  };
}
