import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDIkq9N007pUSqOuviCVITxoxMcUfpQW98",
  authDomain: "groovinto-8a7dd.firebaseapp.com",
  projectId: "groovinto-8a7dd",
  storageBucket: "groovinto-8a7dd.firebasestorage.app",
  messagingSenderId: "1081193328503",
  appId: "1:1081193328503:web:2bf0f9844b02962f833b72",
  measurementId: "G-8CXWNRLPEF"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export type Submission = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt?: any;
};

export async function addSubmission(sub: Submission) {
  const docRef = await addDoc(collection(db, 'submissions'), {
    ...sub,
    createdAt: Timestamp.now()
  });
  return docRef.id;
}

export async function getSubmissions() {
  const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export default db;
