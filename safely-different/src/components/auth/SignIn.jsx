// This component is used to sign in a user using their email and password.

import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase';
import { sendPasswordResetEmail } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  // Function to handle sign in
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
    } catch (error) {
      alert('Error signing in:', error.message);
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

  // Sign in form
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
        <button onClick={handleResetPassword} style={{ marginTop: '10px' }}>
          Forgot Password?
      </button>
      </form>
    </div>
  );
};

export default SignIn;