import { render, screen } from '@testing-library/react';
import React from 'react';
import LikeButton from './Chat/Like'
import ChatRoom from './Chat/ChatRoom';
import { useAuth } from './Firebase'
jest.mock('./Firebase')
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

test('renders like button', () => {
  useAuth.mockReturnValue(mockUser)

  render(<ChatRoom docid="fanclub123" data={mockFanclubData}/>);

  const likeButtons = screen.getAllByText('0');
  expect(likeButtons.length).toBeGreaterThan(0);
  likeButtons.forEach((likeButton) => {
    expect(likeButton).toBeInTheDocument();
  });
});
