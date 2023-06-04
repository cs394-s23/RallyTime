import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
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
        userName: 'Connor',
        content: 'Agile 394',
        likes: ['hJzIwltqc1Rn10JKxQhT1hA2kTM2']
      }
    ]
  };

test('user can like a message and their ID is added to the likes array', async () => {

    useAuth.mockReturnValue(mockUser);
  
    render(<ChatRoom docid="fanclub123" data={mockFanclubData} />);
    
    // Select all buttons with a 'data-testid' that matches the pattern 'heart-button-{index}'
    const likeButtons = screen.getAllByRole('button',{id : (/^heart-button-\d+$/)}) 
  
    likeButtons.forEach((button) => {
      if (button.id === 'heart-button-0') {
        fireEvent.click(button);
  
        waitFor(() => {
          const updatedLikes = mockFanclubData.group_messages[0].likes;
          //making sure likes array has length of 2
          expect(updatedLikes).toHaveLength(2);
          expect(updatedLikes).toContain(mockUser.uid);
        });
      }
    });
  });


  


 