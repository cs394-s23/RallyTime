import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AddClub from './AddClub/AddClub'

jest.mock('./Firebase')
jest.mock('firebase/firestore')

test('mock creating club', async () => {
    render(
        <BrowserRouter>
          <AddClub/>
        </BrowserRouter>
      );
   
    expect(await screen.findByText('Athlete', {}, { timeout: 3000})).toBeVisible()
})

// //TEST THAT PURPOSEFULLY FAILS
// test('mock creating club failed', async () => {
//     render(
//         <BrowserRouter>
//           <AddClub/>
//         </BrowserRouter>
//       );
   
//     expect(await screen.findByText('Random', {}, { timeout: 3000})).toBeVisible()
// })