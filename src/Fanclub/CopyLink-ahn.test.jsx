import { render, screen, fireEvent } from '@testing-library/react';
import Fanclub from './Fanclub';
import { useAuth } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';

jest.mock('../Firebase');
jest.mock('firebase/firestore');

const mockUser = {
  displayName: 'Jack Daenzer',
  uid: 'j7QkHjG5FEcxj95fr7CVHfAw8vo2',
};

const mockManager = {
  displayName: 'Jack Daenzer',
  uid: 'j7QkHjG5FEcxj95fr7CVHfAw8vo2',
};

const mockDMs = [];

const mockFanClubMembers = [mockUser];

const mockFanClubDoc = {
  data: () => ({
    members: mockFanClubMembers,
    athlete: 'Connor',
    manager: mockManager,
    direct_messages: mockDMs
  }),
  exists: () => (true)
};

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

test('copyInviteLink should put copy link in the clipboard', async () => {
  useAuth.mockReturnValue(mockUser);
  getDoc.mockReturnValue(mockFanClubDoc);

  render(<Fanclub />);

  // Mock  current URL
  delete window.location;
  window.location = {
    href: 'https://rally-time-ea874.firebaseapp.com/fanclub/zQf4SQNa8AjUw9nfUiGg',
  };

  const copyButton = screen.getByText('Copy Invite Link');
  fireEvent.click(copyButton);

  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
    'https://rally-time-ea874.firebaseapp.com/fanclub/zQf4SQNa8AjUw9nfUiGg'
  );

  // Check if the "Copied!" text is displayed
  const copiedText = await screen.findByText('Copied!');
  expect(copiedText).toBeInTheDocument();
});

// //THIS TEST IS SUPPOSED TO FAIL
// test('copyInviteLink should put copy link in the clipboard', async () => {
//   useAuth.mockReturnValue(mockUser);
//   getDoc.mockReturnValue(mockFanClubDoc);

//   render(<Fanclub />);

//   // Mock  current URL
//   delete window.location;
//   window.location = {
//     href: 'https://rally-time-ea874.firebaseapp.com/fanclub/abcdefghijk',
//   };

//   const copyButton = screen.getByText('Copy Invite Link');
//   fireEvent.click(copyButton);

//   expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
//     'https://rally-time-ea874.firebaseapp.com/fanclub/zQf4SQNa8AjUw9nfUiGg'
//   );

//   // Check if the "Copied!" text is displayed
//   const copiedText = await screen.findByText('Copied!');
//   expect(copiedText).toBeInTheDocument();
// });