import { render, screen } from '@testing-library/react'
import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import { useAuth } from '../Firebase'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { BrowserRouter } from 'react-router-dom'
jest.mock('../Firebase')
jest.mock('firebase/firestore')
//THIS FILE TESTS BOTH MOCK USER AND MOCK DATA
const mockUser = {
    "displayName": "Jack Daenzer",
    "uid": "j7QkHjG5FEcxj95fr7CVHfAw8vo2"
}
// const mockManager = {
//     "displayName": "Jack Daenzer",
//     "uid": "j7QkHjG5FEcxj95fr7CVHfAw8vo2"
// }
const mockFanClubMembers = [mockUser]
const mockFanClubDoc = {
    data: () => ({"members": mockFanClubMembers, "athlete": "Test Athlete Name", "manager": mockUser})
}
const mockFanclubDocList = [mockFanClubDoc]
// //THIS ONE IS SUPPOSED TO FAIL, AS IT DOESN'T SIGN IN A USER. UNCOMMENT IT TO SEE!
// test('no user on dashboard, requires signin', async () => {
//     getDocs.mockReturnValue(mockFanclubDocList)
//     // jest.fn().mockReturnValue(mockFanClubData)
//     render(
//         <BrowserRouter>
//           <Dashboard />
//         </BrowserRouter>
//       );
//     expect(await screen.findByText('See More', {}, { timeout: 3000})).toBeVisible()
// })
test('mock user on dashboard', async () => {
    useAuth.mockReturnValue(mockUser)
    getDocs.mockReturnValue(mockFanclubDocList)
    render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    expect(await screen.findByText('Enter Club', {}, { timeout: 3000})).toBeVisible()
})