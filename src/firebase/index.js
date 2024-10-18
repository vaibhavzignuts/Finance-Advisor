// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCDW7XI0Jr0NERub5IY0eDl0x7vuGWRD4M',
  authDomain: 'finance-71959.firebaseapp.com',
  projectId: 'finance-71959',
  storageBucket: 'finance-71959.appspot.com',
  messagingSenderId: '732055807771',
  appId: '1:732055807771:web:973e76d44665b99e5d15be',
  measurementId: 'G-0QGWF8026B'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, auth, storage }
