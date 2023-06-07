import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import DMForm from '../DM/DMForm';
import { useAuth } from '../Firebase'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../Firebase';

jest.mock('../Firebase')
jest.mock('firebase/firestore')

const mockUser = {
  uid: 'j7QkHjG5FEcxj95fr7CVHfAw8vo2',
  displayName: 'Jack Daenzer',
};

const mockFanclubData = {
  members: [
    {
      uid: 'member1',
      displayName: 'Member 1',
    },
    {
      uid: 'member2',
      displayName: 'Member 2',
    },
  ],
};

// Mock Firestore's addDoc
const mockAddDoc = addDoc;
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  addDoc: jest.fn(),
}));

test('adds new chat to the chat list in the database', async () => {
    render(<DMForm />);
    
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const inputElement = screen.getByLabelText('First Message');
      fireEvent.change(inputElement, { target: { value: 'Hello there' } });
      
      const checkboxElement = screen.getByLabelText('Member 1');
      fireEvent.click(checkboxElement);
  
      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);
    });
  

  // Assert
  const expectedChatData = {
    members: [
      {
        uid: 'member1',
        displayName: 'Member 1',
      },
      {
        uid: mockUser.uid,
        displayName: mockUser.displayName,
      },
    ],
    messages: [
      {
        content: 'Hello there',
        userID: mockUser.uid,
        userName: mockUser.displayName,
      },
    ],
  };

  expect(mockAddDoc).toHaveBeenCalledWith(
    collection(db, 'chat'),
    expectedChatData
  );

  expect(await screen.findByText('Group chat created successfully!')).toBeVisible();
});
