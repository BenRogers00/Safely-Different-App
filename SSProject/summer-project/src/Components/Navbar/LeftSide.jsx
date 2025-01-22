import React, { useContext } from 'react';
import { AuthContext } from '../AppContext/AppContext';

const LeftSide = () => {
  const { signOutUser, user, userData } = useContext(AuthContext);
  return (
    <div className='flex flex-col h-screen bg-gray-100-100 pb-4 border-2 rounded-r-xl shadow-lg'>
    <div className='flex flex-col items-center relative'>
    <img
    className='h-28 w-full rounded-r-xl' 
    src={userData?.image } alt="Logo" />
    </div>

    <div>
   
    </div>
    </div>
  )
}

export default LeftSide
