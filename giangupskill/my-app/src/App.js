import NavBar from "./components/NavBar";
import Slogan from "./components/Slogan";
import ExpertCardsList from "./components/ExpertCardsList";
import AboutUs from "./components/AboutUs";
function App() {
  return (
    <div className="overflow-y-auto overflow-x-hidden h-screen px-4 py-8 bg-gradient-to-b from-purple-700 to bg-purple-900">
      <NavBar/>
      <Slogan/>
      <AboutUs/>

      <ExpertCardsList/>
    </div>
  );
}

export default App;
