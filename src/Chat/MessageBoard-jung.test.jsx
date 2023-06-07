import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ChatRoom from './ChatRoom';
import { useAuth } from '../Firebase'

jest.mock('../Firebase')
jest.mock('firebase/firestore')

const mockUser = {
  uid: 'j7QkHjG5FEcxj95fr7CVHfAw8vo2',
  displayName: 'Jack Daenzer',
};

const mockFanclubData = {
  group_messages: [
    {
      userID: 'user1',
      userName: 'User 1',
      content: 'Message 1',
      likes: [],
    },
    {
      userID: 'user2',
      userName: 'User 2',
      content: 'Message 2',
      likes: [],
    },
  ],
};

test('adds new message to group message list', async () => {
	useAuth.mockReturnValue(mockUser)
  render(<ChatRoom docid="fanclub123" data={mockFanclubData} />);

  // Simulate typing a new message
  const inputElement = screen.getByPlaceholderText('Type your message');
  fireEvent.change(inputElement, { target: { value: 'New message' } });

  // Simulate submitting the form
  const submitButton = screen.getByText('Send');
  fireEvent.click(submitButton);

  // Assert
  expect(await screen.findByText('New message')).toBeVisible();
});
