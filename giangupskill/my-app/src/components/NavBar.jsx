import { useState } from "react";
import { BsSun } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";

function NavBar(props) {
  const {isMobile} = props;
  const [openMenu, setOpenMenu] = useState(false);
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
              <li className="mx-2">Home</li>
              <li className="mx-2">Price</li>
              <li className="mx-2">About</li>
              <li className="mx-2">Sign-In</li>
              </div>
              
              </>
            )}

            {openMenu && (
              <div className="fixed right-2 bg-slate-100  p-8 text-center text-13 text-black">
                <li>Home</li>
                <li>Price</li>
                <li>About</li>
                <li>Sign-In</li>
              </div>
            )}
          </ul>
        </nav>
      
    </>
  );
}

export default NavBar;