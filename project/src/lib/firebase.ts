// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  projectId: 'studio-6716360659-1333d',
  appId: '1:445021978015:web:6d40f699fc43589ae751aa',
  storageBucket: 'studio-6716360659-1333d.firebasestorage.app',
  apiKey: 'AIzaSyA67ucrTe-9lhjC-vUbi0STsK0IYxNGfRw',
  authDomain: 'studio-6716360659-1333d.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '445021978015',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
