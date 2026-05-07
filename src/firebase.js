import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAyaag3DWGJJ9_mb9JAVW4hVmICJkhzWg8",
  authDomain: "delta-fc328.firebaseapp.com",
  projectId: "delta-fc328",
  storageBucket: "delta-fc328.firebasestorage.app",
  messagingSenderId: "707581518906",
  appId: "1:707581518906:web:360d55dea558e522080103",
  measurementId: "G-L157SHYN2K"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
