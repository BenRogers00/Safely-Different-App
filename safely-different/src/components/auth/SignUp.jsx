// This component is used to sign up a user using their email and password.

import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from '../../firebase/firebase';
import WriteToDatabase from '../../databaseWriting.js'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const auth = getAuth(app);

  // Function to handle sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password === passwordRepeat) {
      if (password.length >= 6) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const userID = userCredential.user.uid;
          const userPath = 'users/' + userID;
          WriteToDatabase({ dataInput: email, path: userPath + '/email' });
          WriteToDatabase({ dataInput: 'free', path: userPath + '/privileges' });
          WriteToDatabase({ dataInput: displayName, path: userPath + '/displayName' });
          WriteToDatabase({ dataInput: new Date().toISOString(), path: userPath + '/registrationDate' });
          
          await sendEmailVerification(userCredential.user);
          alert('User created successfully! Please verify your email before logging in.');
          navigate('/signin');
        } catch (error) {
          setError(`Error signing up: ${error.message}`);
        }
      } else {
        setError('Password is too short, must be at least 6 characters long');
      }
    } else {
      setError("Passwords don't match");
    }
  };

return (
  // Sign up form
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
    {error && <p className="text-red-500">{error}</p>}
    {success && <p className="text-green-500">{success}</p>}
    <form onSubmit={handleSignUp}>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Confirm Password</label>
        <input
          type="password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Display name</label>
        <input
          type="name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Sign Up
      </button>
    </form>
  </div>
);
};

export default SignUp;