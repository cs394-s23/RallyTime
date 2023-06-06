import { render, screen, fireEvent } from '@testing-library/react';
import Fanclub from './Fanclub/Fanclub';

jest.mock('./Firebase')
jest.mock('firebase/firestore')

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

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

test('copyInviteLink should put copy link in the clipboard', () => {
  render(<Fanclub />);
  useAuth.mockReturnValue(mockUser)
  getDocs.mockReturnValue(mockFanclubDocList)

  // Mock the current URL
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
  const copiedText = screen.getByText('Copied!');
  expect(copiedText).toBeInTheDocument();
});