
import { useState, useContext } from "react";
import { BsSun } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from '../../AuthDetails';

function NavBar(props) {
  const {isMobile} = props;
  const [openMenu, setOpenMenu] = useState(false);
  const { authUser, userSignOut } = useContext(AuthContext); 
  
  // Set the openMenu state to the opposite of its current value
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  // Function to handle user sign out
  const handleSignOut = () => {
    userSignOut().then(() => {
      console.log("Logged out successfully");
      // Additional logout handling if needed
    }).catch((error) => {
      console.error("Logout error", error);
    });
  };

  return (
    <>
      <nav className="  flex items-center ">
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
    
        <ul className="ml-auto gap-4">
          {openMenu && isMobile ? (
            <MdClose
              size={"30px"}
              color="grey"
              className="cursor-pointer"
              onClick={handleMenu}
            />
          ) : !openMenu && isMobile ?(
            <HiOutlineMenu
              size={"30px"}
              color="grey"
              className="cursor-pointer"
              onClick={handleMenu}
            />
          ):(
            <>
            <div className="flex ">
              <li className="mx-2">
                <Link to="/">Home</Link></li>
              <li className="mx-2">
                <Link to="/price">Price</Link></li>
              <li className="mx-2">
                <Link to="/about">About</Link></li>
              <li className="mx-2">
                <Link to="/blogWriter">Blog</Link></li>
              <li className="mx-2">
                <Link to="/blogPosts">Blog Posts</Link></li>
              {authUser ? (
                <>
                  <li className="mx-2">{authUser.email}</li>
                  <li className="mx-2">
                    <Link to="/" onClick={handleSignOut}>Log Out</Link>
                  </li>
                </>
              ) : (
                <>
                <li className="mx-2">
                  <Link to="/SignIn">Sign-In</Link></li>
                <li className="mx-3">
                  <Link to="/SignUp">Sign-Up</Link></li>
                </>
              )}
            </div>
            
            </>
          )}

          {openMenu && (
            <div className="fixed right-2 bg-slate-100 p-8 text-center text-13 text-black">
              <li>
                <Link to="/" onClick={handleMenu}>Home</Link>
              </li>
              <li>
                <Link to="/price" onClick={handleMenu}>Price</Link>
              </li>
              <li>
                <Link to="/about" onClick={handleMenu}>About</Link>
              </li>
              {authUser ? (
                  <>
                    <li className="mx-2">{authUser.email}</li>
                    <li className="mx-2">
                      <Link to="/" onClick={handleSignOut}>Log Out</Link>
                    </li>
                  </>
                ) : (
                  <>
                  <li className="mx-2">
                    <Link to="/sign-in" onClick={handleMenu}>Sign-In</Link>
                    </li>
                  <li className="mx-3">
                    <Link to="/sign-up" onClick={handleMenu}>Sign-Up</Link>
                    </li>

                  </>
                )}
            </div>
          )}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;

