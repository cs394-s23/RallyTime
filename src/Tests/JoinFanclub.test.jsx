import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { useAuth } from '../Firebase'
import { collection, getDocs, getFirestore, getDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { BrowserRouter } from 'react-router-dom'
import Fanclub from '../Fanclub/Fanclub'

jest.mock('../Firebase')
jest.mock('firebase/firestore')

const mockUser = {
    "displayName": "Jack Daenzer",
    "uid": "j7QkHjG5FEcxj95fr7CVHfAw8vo2"
}

const mockUser2 = {
    "displayName": 'Test User Name',
    "uid": "123kHjG5FEcxj95fr7CVHfAw123"
}

// const mockManager = {
//     "displayName": "Jack Daenzer",
//     "uid": "j7QkHjG5FEcxj95fr7CVHfAw8vo2"
// }

const mockFanclubMembers = [mockUser2]

const mockDMs = []

const mockFanclubDoc = {
    data: () => ({"members": mockFanclubMembers, "athlete": "Test Athlete Name", "manager": mockUser2, "direct_messages": mockDMs}),
    exists: () => (true)
}

const mockFanclubDocList = [mockFanclubDoc]


test('mock user joining fanclub', async () => {
    useAuth.mockReturnValue(mockUser)
    getDoc.mockReturnValue(mockFanclubDoc)
    console.log = jest.fn()
    render(
        <BrowserRouter>
          <Fanclub />
        </BrowserRouter>
      );
    expect(await screen.findByText('View Members', {}, { timeout: 3000})).toBeVisible() 
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(console.log).toHaveBeenCalledWith("adding you to fanclub")
}) 