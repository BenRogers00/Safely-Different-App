// This component is used to sign in a user using their email and password.

import React, { useState } from 'react';
import app from '../../firebase/firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const auth = getAuth(app);

  // Function to handle sign in
  const handleSignIn = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError('');

    // Check if email and password are provided
    if (!email || !password) {
      alert('Please enter your email and password to sign in.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      navigate('/');
    } catch (error) {
      // Log the error code and message for debugging
      console.log('Error code:', error.code);
      console.log('Error message:', error.message);

      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please try again.');
          break;
        default:
          setError('Error signing in. Please try again.');
      }
    }
  };

  // Function to send a password reset email
  const handleResetPassword = async () => {
    if (!email) {
      alert('Please enter your email address to reset your password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error) {
      alert('Failed to send password reset email:', error.message);
    }
  };


return (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Sign In</h1>
    {error && <p className="text-red-500">{error}</p>}
    <form onSubmit={handleSignIn}>
      <div className="mb-4">
      <label htmlFor="email" className="block mb-2">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <label htmlFor="password" className="block mb-2">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mr-4">
        Sign In
      </button>
      <button onClick={handleResetPassword} className="px-4 py-2 bg-blue-500 text-white rounded">
        Forgot Password?
      </button>

    </form>
  </div>
);
}


export default SignIn;
