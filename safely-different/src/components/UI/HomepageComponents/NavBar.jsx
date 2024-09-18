/**
 * Represents the navigation bar component.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isMobile - Indicates if the device is mobile.
 * @returns {JSX.Element} The rendered navigation bar.
 */

import { useState, useContext, useEffect } from "react";
import { BsSun } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from '../../AuthDetails';
import { ref, onValue } from 'firebase/database'; 
import { database } from '../../../firebase/firebase';

function NavBar(props) {
  const { isMobile } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const { authUser, userSignOut } = useContext(AuthContext); 

  //a loading function is needed to allow for conditional rendering of the admin panel
  useEffect(() => {
    if (authUser?.uid) {
      setLoading(true); // start loading
      const databaseRef = ref(database, `users/${authUser.uid}/privileges`);
      onValue(databaseRef, (snapshot) => {
        const privilege = snapshot.val();
        //check if user is admin or owner so admin panel may display 
        setIsAdmin(["admin", "Admin", "owner", "Owner"].includes(privilege));
        setLoading(false); // end loading
      });
    } else {
      setLoading(false); // end loading if user logged out
    }
  }, [authUser]);

  //set to opposite of itself
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  //handle log out
  const handleSignOut = () => {
    userSignOut(() => {
      console.log("Logged out successfully");
    });
  };

  return (
    <nav className="flex items-center bg-teal-600 border-b-2 border-zinc-700/75">
      <div className="flex items-center">
        <div className="mr-2">
          <a href=" ">
            <img
              src="/images/logotype_dark.PNG"
              alt="null"
              style={{ width: "100px", height: "auto" }}
            />
          </a>
        </div>
        <BsSun size={"30px"} color="#e9c46a" className="cursor-pointer" />
      </div>

      {loading ? (
        <div className="ml-auto">Loading...</div>
      ) : (
        <ul className="ml-auto gap-4">
          {openMenu && isMobile ? (
            <MdClose
              size={"30px"}
              color="teal"
              className="cursor-pointer"
              onClick={handleMenu}
            />
          ) : !openMenu && isMobile ? (
            <HiOutlineMenu
              size={"30px"}
              color="teal"
              className="cursor-pointer"
              onClick={handleMenu}
            />
          ) : (
            <div className="flex">
              <li className="mx-2"><Link to="/">Home</Link></li>
              <li className="mx-2"><Link to="/price">Subscribe</Link></li>
              <li className="mx-2"><Link to="/about us">About</Link></li>
              <li className="mx-2"><Link to="/blogWriter">Make Post</Link></li>
              <li className="mx-2"><Link to="/blogPosts">View Posts</Link></li>
              {authUser ? (
                <>
                  {isAdmin && (
                    //if user is an admin, render a link to the admin panel
                    <li className="mx-2"><Link to="/admin">Admin Panel</Link></li>
                  )}
                  <li className="mx-2"><Link to="/profile">My Profile</Link></li>
                  <li className="mx-2"><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
                </>
              ) : (
                <>
                {/*if user is logged out, dislpay sign in/up links */}
                  <li className="mx-2"><Link to="/SignIn">Sign In</Link></li>
                  <li className="mx-3"><Link to="/SignUp">Sign Up</Link></li>
                </>
              )}
            </div>
          )}

          {openMenu && (
            <div className="fixed right-2 bg-slate-100 p-8 text-center text-13 text-white">
              <li><Link to="/" onClick={handleMenu}>Home</Link></li>
              <li><Link to="/price" onClick={handleMenu}>Price</Link></li>
              <li><Link to="/about" onClick={handleMenu}>About</Link></li>
              {authUser ? (
                <>
                  {isAdmin && (
                    <li className="mx-2"><Link to="/admin">Admin Panel</Link></li>
                  )}
                  <li className="mx-2"><Link to="/profile">{authUser.email}</Link></li>
                  <li className="mx-2"><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
                </>
              ) : (
                <>
                  <li className="mx-2"><Link to="/sign-in" onClick={handleMenu}>Sign In</Link></li>
                  <li className="mx-3"><Link to="/sign-up" onClick={handleMenu}>Sign Up</Link></li>
                </>
              )}
            </div>
          )}
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
