import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from './SignIn';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Mock the Firebase auth methods
jest.mock('firebase/auth', () => {
  const actualAuth = jest.requireActual('firebase/auth');
  return {
    ...actualAuth,
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
  };
});

// Mock the window.alert method
global.alert = jest.fn();

describe('SignIn Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders SignIn component', () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    expect(screen.getByRole('heading', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('handles sign in with correct credentials', async () => {
    // Mock the signInWithEmailAndPassword to return a resolved promise
    signInWithEmailAndPassword.mockImplementation(() => {
      return Promise.resolve();
    });

    render(
      <Router>
        <SignIn />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    });

    // Expect alert to have been called with correct message
    expect(global.alert).toHaveBeenCalledWith('Logged in successfully!');
  });

  test('handles sign in with incorrect credentials', async () => {
    // Mock the signInWithEmailAndPassword to return a rejected promise
    signInWithEmailAndPassword.mockImplementation(() => {
      return Promise.reject({ code: 'auth/invalid-credential', message: 'Invalid email or password. Please try again.' });
    });

    render(
      <Router>
        <SignIn />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    // Verify the error message is rendered
    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password. Please try again./i)).toBeInTheDocument();
    });
  });
});
