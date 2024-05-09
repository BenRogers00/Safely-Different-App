import { useState } from "react";
import { BsSun } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";


function NavBar(){
const[openMenu,setOpenMenu] = useState(false);
const handleMenu = ()=>{
  setOpenMenu(!openMenu);
}


    return(
        <>
        <nav className="flex items-center ">
          <div className="flex items-center">
          <div className="mr-2"><a href=" "><img src='/images/logotype_dark.PNG' alt="null" style={{ width: '100px', height: 'auto' }} /></a> </div>
          <BsSun size={"30px"} color="#e9c46a" className="cursor-pointer"/>
          </div>

          <ul className="ml-auto">
            {openMenu? (
            <MdClose size={"30px"} color="grey" className="cursor-pointer" onClick={handleMenu}/>):
            <HiOutlineMenu size={"30px"} color="grey" className="cursor-pointer" onClick={handleMenu}/>
          }
           
          </ul>
        </nav>
        </>
    )

}

export default NavBar