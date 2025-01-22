import React, { useState, useRef, useEffect, useContext } from 'react';
import UserLink from './UserLink';
import { AuthContext } from '../AppContext/AppContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { signOutUser } = useContext(AuthContext);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setIsDropdownOpen(false);
    } catch (err) {
      console.error('Error signing out:', err.message);
    }
  };

  return (
    <div className='flex items-center border-b border-gray-100 w-full px-20 py-2 relative'>
      <div className='text-3xl font-extrabold text-black'>
        Brand Name
      </div>

      <div className='absolute left-1/2 transform -translate-x-1/2 text-3xl font-extrabold text-black'>
        Logo
      </div>

      <div className="ml-auto relative" ref={dropdownRef}>
        <button 
          className="text-black font-semibold hover:text-gray-700" 
          onClick={toggleDropdown}
        >
          <UserLink />
        </button>
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
            <ul className="py-2">
              <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={handleSignOut}
              >Sign Out</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;