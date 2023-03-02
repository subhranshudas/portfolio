import { initializeApp, getApps, getApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}


function createFirebaseApp(config: any) {
    try {
      return getApp()
    } catch {
      return initializeApp(config)
    }
}

// const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = createFirebaseApp(firebaseConfig)


/**
 * AUTH EXPORTS
 */
export const auth = getAuth(firebaseApp)



/**
 * FIRESTORE EXPORTS
 */
export const db = getFirestore(firebaseApp);
