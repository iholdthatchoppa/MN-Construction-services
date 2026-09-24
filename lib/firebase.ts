import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Web app config for Firebase project mnconstruction-79450.
// These values identify the project and are safe to ship to the browser —
// access is controlled by firestore.rules, not by keeping this secret.
const firebaseConfig = {
  apiKey: 'AIzaSyBKGzT1SjwhjSY5358IOXv6EHpfpl0baHM',
  authDomain: 'mnconstruction-79450.firebaseapp.com',
  projectId: 'mnconstruction-79450',
  storageBucket: 'mnconstruction-79450.firebasestorage.app',
  messagingSenderId: '212146128824',
  appId: '1:212146128824:web:b1ff494cd047113e74314d',
  measurementId: 'G-0JJFTEQLMY',
};

// Reuse the app across hot reloads and server requests.
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
