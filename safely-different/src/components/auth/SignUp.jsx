// This component is used to sign up a user using their email and password.

import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase';  // Ensure path is correct
import WriteToDatabase from '../../databaseWriting.js'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  // Function to handle sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //get user's id
        const userID = userCredential.user.uid;
        //create a path to save things under a user's id
        const userPath = 'users/'+userID
        //save their info: email and 'free' privelege as default (could be changed to paid or admin later)
        WriteToDatabase({ dataInput: email, path: userPath+'/email' });
        WriteToDatabase({ dataInput: 'free', path: userPath+'/priveleges'});
      })
      .catch((error)=>{
        //if fails with real time database, show this error message
        alert('Error saving to database \n', error.message);
      })
      alert('User created successfully!');
      
    } catch (error) {
      alert('Error signing up \n', error.message);
    }

  };

  // Sign up form
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
