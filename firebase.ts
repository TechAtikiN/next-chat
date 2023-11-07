// named imports
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyCenDm3N5sIsh79LcwGMR9IMcYYTqAE7MY",
  authDomain: "next-chat-74129.firebaseapp.com",
  projectId: "next-chat-74129",
  storageBucket: "next-chat-74129.appspot.com",
  messagingSenderId: "193079790828",
  appId: "1:193079790828:web:bdf72b02bc69187857e9c9",
  measurementId: "G-KSQVRKGLL7"
}; 

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const functions = getFunctions(app)

export { auth, db, functions }