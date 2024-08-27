/**
 * Renders the UI for the homepage.
 *
 * @returns {JSX.Element} The rendered homepage UI.
 */
import AboutUs from "./AboutUs";
import NavBar from "./NavBar";
import Slogan from "./Slogan";
import PricePanel from "./PricePanel";
import { useEffect, useState } from "react";
function HomePageUI() {
  const[windowSize,setWindowSize] = useState({width: undefined, height: undefined})

  const[isMobile, setIsMobile] = useState(false);

  useEffect(()=>{
   const handleSize = () => {
    setWindowSize({width: window.innerWidth, height: window.innerHeight});
   };
   window.addEventListener("resize", handleSize);
   handleSize();
   return () => window.removeEventListener("resize", handleSize); // code clenliness and optimism
  },[]); // finding the size of window size, dependency not calling useEffect again when it is a call back(when there is a change in state or props)
   
  useEffect(()=>{
   if(windowSize.width < 500 ){
    setIsMobile(true);
   }else{
    setIsMobile(false);
   }
  },[windowSize])
  return (
<<<<<<< HEAD
    <div className="overflow-y-auto overflow-x-hidden h-screen px-4 py-8 bg-gradient-to-b dark:from-teal-700 to bg-teal-300 from-slate-200 to bg-slate-400">
=======
    <div className="overflow-y-auto overflow-x-hidden h-screen px-4 py-8 bg-gradient-to-b dark:from-teal-500 to bg-teal-300 from-slate-200 to bg-slate-400">
>>>>>>> 98193cc3bd47a3e44eeaa03a35ec0f76068d3773
      <NavBar Mobile ={isMobile}/> {/* putting props inside mobile */}
      <Slogan/>
      <PricePanel/>
      

     
    </div>
  );
}

export default HomePageUI;
