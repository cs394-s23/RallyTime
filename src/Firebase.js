import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react'

const firebaseConfig = {
    apiKey: "AIzaSyArqA1i--TGXyuvN1yvf5WJTEjx01V7Tkc",
    authDomain: "rally-time-ea874.firebaseapp.com",
    projectId: "rally-time-ea874",
    storageBucket: "rally-time-ea874.appspot.com",
    messagingSenderId: "732935229980",
    appId: "1:732935229980:web:963fb55172bc9beacd85d9",
    measurementId: "G-FQD742J753"
  };

export function useAuth() {
    const [userState, setUserState] = useState()
    useEffect(() => {
      onAuthStateChanged(getAuth(fbapp), setUserState)
    }, [])
    return userState
}
  
const fbapp = initializeApp(firebaseConfig);
const db = getFirestore(fbapp);
const storage = getStorage(fbapp);

export { db, storage, fbapp };

  