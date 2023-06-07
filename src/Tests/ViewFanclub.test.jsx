import { render, screen, waitFor } from '@testing-library/react';
import { useAuth } from '../Firebase';
import { collection, getDocs } from "firebase/firestore";
import Dashboard from '../Dashboard/Dashboard';
import React from 'react';
import '@testing-library/jest-dom';


jest.mock('../Firebase', () => ({
  useAuth: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

describe('Dashboard', () => {
  it('renders the user fanclubs', async () => {
    // Mock the user and fanclubs data
    const userMock = { uid: '1' };
    const fanclubsMock = [
      { id: 'fanclub1', data: () => ({ athlete: 'Athlete 1', manager: { displayName: 'Manager 1' }, members: [{ uid: '1' }] }) },
      { id: 'fanclub2', data: () => ({ athlete: 'Athlete 2', manager: { displayName: 'Manager 2' }, members: [{ uid: '1' }] }) },
    ];
    
    // Mock useAuth function to return the mock user
    useAuth.mockImplementation(() => userMock);

    // Mock getDocs function to return the mock fanclubs
    getDocs.mockResolvedValue({
      forEach: (callback) => fanclubsMock.forEach(callback),
    });

    render(<Dashboard />);
    
    // Wait for the Dashboard to finish fetching and rendering the fanclubs
    expect(await screen.findByText('Athlete: Athlete 1')).toBeInTheDocument();
    expect(await screen.findByText('Manager: Manager 1')).toBeInTheDocument();
    expect(await screen.findByText('Athlete: Athlete 2')).toBeInTheDocument();
    expect(await screen.findByText('Manager: Manager 2')).toBeInTheDocument();
  });
});