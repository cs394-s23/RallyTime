import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState, useEffect } from 'react'
import { getDatabase } from "firebase/database";



const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
    databaseURL: "",

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
const realtime_db = getDatabase(fbapp);

const auth = getAuth(fbapp);



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