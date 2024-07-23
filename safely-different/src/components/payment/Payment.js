// This code simluates a payment processing system that updates a user's privileges in the database.

import React, { useState } from 'react';
// import { getAuth } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { database } from '../../firebase/firebase'; // Assuming you have this set up
import { useAuth } from '../AuthDetails';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');
  const { authUser } = useAuth();
//   const auth = getAuth();

  const handlePayment = async (e) => {
    e.preventDefault();

    // Simulate payment processing
    setMessage('Processing payment...');
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay

    // Update the user's privilege to "paid"
    if (authUser) {
      const userRef = ref(database, `users/${authUser.uid}/privileges`);
      await set(userRef, 'paid');
      setMessage('Payment successful! Your membership has been upgraded to "paid".');
    } else {
      setMessage('User not authenticated.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mock Payment</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label className="block mb-2">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Expiration Date</label>
          <input
            type="text"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="MM/YY"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="123"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
