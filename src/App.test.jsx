import { render, screen } from '@testing-library/react'
import React from 'react'
import App from './App'

test('renders App', async () => {
    render(<App />)
    //expect(screen.getByText('RallyTime')).toBeInTheDocument()
    //await screen.findByText('RallyTime');
    expect(await screen.findByText('Welcome to RallyTime')).toBeVisible()
})