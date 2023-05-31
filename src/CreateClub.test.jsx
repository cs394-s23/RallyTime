import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import React from 'react'
import App from './App'
import LandingPage from './Landing'
import Dashboard from './Dashboard/Dashboard'
import { useAuth } from './Firebase'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { BrowserRouter } from 'react-router-dom'
import AddClub from './AddClub/AddClub'
// import { click } from '@testing-library/user-event/dist/click'
import { click } from '@testing-library/user-event';

test('mock creating club', async () => {
    render(
        <BrowserRouter>
          <AddClub/>
        </BrowserRouter>
      );
   
    expect(await screen.findByText('Athlete', {}, { timeout: 3000})).toBeVisible()
})