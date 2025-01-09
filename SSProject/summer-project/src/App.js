import Pages from "./Components/Pages/Pages"
import { BrowserRouter } from "react-router-dom"
import AppContext from "./Components/AppContext/AppContext"

export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <BrowserRouter>
      <AppContext></AppContext>
      <Pages></Pages>
      </BrowserRouter>
      
    </h1>
  )
}