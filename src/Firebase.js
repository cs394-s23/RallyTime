import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react'

const firebaseConfig = {
    apiKey: "AIzaSyCY-s3E55dzANjyk5s8iPiBTwkNVKAkkR4",
    authDomain: "homehop-89111.firebaseapp.com",
    projectId: "homehop-89111",
    storageBucket: "homehop-89111.appspot.com",
    messagingSenderId: "777311341482",
    appId: "1:777311341482:web:bf09fceab582066e7bb9d3",
    measurementId: "G-0BNSQ6LDHF"
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

  