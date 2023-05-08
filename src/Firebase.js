import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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

export const handleGoogleSignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("SIGNED IN!")
            const user = result.user
            console.log(user.displayName)
        })
        .then(() => {
            window.location.href = "/dashboard"
        })
        .catch((error) => {
            console.log(error)
        })
}


export { db, storage, fbapp };