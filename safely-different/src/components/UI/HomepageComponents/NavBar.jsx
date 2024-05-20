import { useState } from "react";
import { BsSun } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { Link } from 'react-router-dom';
// import { useAuth } from "../../AuthDetails";
import useDarkMode from "./useDarkMode";
import AuthDetails from "../../AuthDetails";


function NavBar(props) {
 // const {Mobile} = props;
  const [openMenu, setOpenMenu] = useState(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  // const { currentUser } = useAuth();
  const handleMenu = () => {
    setOpenMenu(!openMenu);
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
                  className="md:w-[150px] w-[130px]"
                />
              </a>
            </div>
            {isDarkMode?
            (<BsSun size={"30px"} color="#e9c46a" className="cursor-pointer"  onClick={()=>toggleDarkMode()}/>):
            (<FaMoon size={"30px"} color="#e9c46a" className="cursor-pointer"  onClick={()=>toggleDarkMode()}/>)}
             
            
          </div>
      
          <ul className="ml-auto ">            {/* Open menu from set state, if Mobile is from props, if it is mobile and openmueny, close icon is displayed */}
            {openMenu && props.Mobile ? (             
              <MdClose
                size={"30px"}
                color="grey"
                className="cursor-pointer"
                onClick={handleMenu}
              />
            ) : !openMenu && props.Mobile ?(
              <HiOutlineMenu
                size={"30px"}
                color="gray"
                className="cursor-pointer"
                onClick={handleMenu}
              />
            ):(
              <>
              <div className="flex text-[20px] text-black dark:text-slate-100">
              <li className="mx-4 hover:text-purple-500 transition-all font-mono cursor-pointer">Home</li>
              <li className="mx-4 hover:text-purple-500 transition-all font-mono cursor-pointer">Price</li>
              <li className="mx-4 hover:text-purple-500 transition-all font-mono cursor-pointer">Our-Team</li>
              <Link to="../auth/SignIn">Sign-In</Link>

              {/* <li className="mx-20 hover:text-purple-500 transition-all font-mono cursor-pointer">Sign-In</li> */}
              </div>
              
              </>
            )}
{/* if openmenu open and required, then display the bottom  */}
            {openMenu && (
              <div className="fixed right-2 bg-slate-100  p-8 text-center text-15 text-black">
                <li className="hover:text-purple-500 transition-all cursor-pointer">Home</li>
                <li className="hover:text-purple-500 transition-all cursor-pointer">Price</li>
                <li className="hover:text-purple-500 transition-all cursor-pointer">Our Team</li>
                <Link to="../auth/SignIn">Sign-In</Link>
              </div>
            )}
          </ul>
        </nav>
        <AuthDetails/>
      
    </>
  );
}

export default NavBar;
