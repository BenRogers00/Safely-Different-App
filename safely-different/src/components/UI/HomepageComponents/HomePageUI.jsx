/**
 * Renders the UI for the homepage.
 *
 * @returns {JSX.Element} The rendered homepage UI.
 */
import NavBar from "./NavBar";
import Slogan from "./Slogan";
import PricePanel from "./PricePanel";
import { useEffect, useState } from "react";

function HomePageUI() {
  const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize); // code cleanliness
  }, []);

  useEffect(() => {
    if (windowSize.width < 500) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowSize]);

  return (
    <div className="overflow-y-auto overflow-x-hidden h-screen bg-gradient-to-b from-teal-400 to teal-600">
      <NavBar Mobile={isMobile} /> {/* passing props */}
      <Slogan />
      <PricePanel />
    </div>
  );
}

export default HomePageUI;
