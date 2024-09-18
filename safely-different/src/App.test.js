import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the home page', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByText(/home/i)).toBeInTheDocument());
});
