import React, { useContext } from 'react';
import { AuthContext } from '../AppContext/AppContext';
const UserLink = () => {
  const { signOutUser, user, userData } = useContext(AuthContext);
  if (!userData) {
    return <div className='flex justify-center items-center'>Loading...</div>; // Placeholder while loading
  }
  return (
    <div className='flex justify-center items-center cursor-pointer'>
      <div className='hover:translate-y-1 duration-500 ease-in-out hover:text-blue-300'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
      </div>
      <p className='ml-4 text-sm text-black font-medium'>{userData.email}</p>
    </div>
  )
}

export default UserLink
