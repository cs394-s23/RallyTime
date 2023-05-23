import { render, screen } from '@testing-library/react'
import React from 'react'
import App from './App'
import LandingPage from './Landing'
import Dashboard from './Dashboard/Dashboard'
import { useAuth } from './Firebase'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { BrowserRouter } from 'react-router-dom'

jest.mock('./Firebase')
jest.mock('firebase/firestore')

// const firebaseConfig = {
//     apiKey: "AIzaSyArqA1i--TGXyuvN1yvf5WJTEjx01V7Tkc",
//     authDomain: "rally-time-ea874.firebaseapp.com",
//     projectId: "rally-time-ea874",
//     storageBucket: "rally-time-ea874.appspot.com",
//     messagingSenderId: "732935229980",
//     appId: "1:732935229980:web:963fb55172bc9beacd85d9",
//     measurementId: "G-FQD742J753"
// };
// const fbapp = initializeApp(firebaseConfig);
// const db = getFirestore(fbapp);
// const docs = getDocs(collection(db, "fanclub"))



test('renders App', async () => {
    render(<App />)
    //expect(screen.getByText('RallyTime')).toBeInTheDocument()
    //await screen.findByText('RallyTime');
    expect(await screen.findByText('Welcome to RallyTime')).toBeVisible()
})




