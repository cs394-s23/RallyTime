import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import MemberForm from './MemberForm.js';
import ChatRoom from '../Chat/ChatRoom.js';

import { useAuth } from '../Firebase.js'


jest.mock('../Firebase')
jest.mock('firebase/firestore')


const mockUser = {
    uid: 'j7QkHjG5FEcxj95fr7CVHfAw8vo2',
    displayName: 'Jack Daenzer',
  };

  const mockFanclubData = {
    members: [
      { uid: 'member1', displayName: 'Judy Ahn' },
      { uid: 'member2', displayName: 'Stephenie L' },
    ],
  };

describe('MemberForm', () => {
  test('displays other members when the "View Members" button is clicked', async() => {
    useAuth.mockReturnValue(mockUser)

    render(<ChatRoom docid="fanclub123" data={mockFanclubData} />);

    const fanclubID = 'fanclub1';
    
    render(<MemberForm fanclubID={fanclubID} fanclubData={mockFanclubData} />);

    fireEvent.click(screen.getByText('View Members'));

    expect(screen.getByText('Judy Ahn')).toBeInTheDocument();
    expect(screen.getByText('Stephenie L')).toBeInTheDocument();

    const membersArray = mockFanclubData.members;
    expect(membersArray).toHaveLength(2);
  });
});