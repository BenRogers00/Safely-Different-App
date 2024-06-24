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

//   // Sign in form
//   return (
//     <div>
//       <h1>Sign In</h1>
//       <form onSubmit={handleSignIn}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">Sign In</button>
//         <button onClick={handleResetPassword} style={{ marginTop: '10px' }}>
//           Forgot Password?
//       </button>
//       </form>
//     </div>
//   );
// };

return (
  /*<div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Sign In</h1>
    {error && <p className="text-red-500">{error}</p>}
    <form onSubmit={handleSignIn}>
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
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mr-4">
        Sign In
      </button>
      <button onClick={handleResetPassword} className="px-4 py-2 bg-blue-500 text-white rounded">
        Forgot Password?
      </button>

    </form>
  </div>*/
<form onSubmit={handleSignIn}>
  <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0"> 
  <div className="flex bg-green-50 rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-5xl lg:h-1/2 w-full">
     <div className="hidden md:block lg:w-1/2 bg-cover bg-blue-700">
     <img
              src="images/login_image.jpg"
              alt="workplace"
              className=" w-full h-full"
              
            />
     </div>
   <div className="w-full p-8 lg:w-1/2">
     <p className="text-xl text-gray-600 text-center">Welcome back!</p> 
     <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
            />
      </div>      
     <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
            />
            <button onClick={handleResetPassword} className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2">
        Forgot Password?
           </button>
      </div>  

      <div className="mt-8">
            <button type="submit" className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
              Login
            </button>
          </div>

   </div>
  </div>
</div>
</form>

);
}


export default SignIn;
