import Pages from "./Components/Pages/Pages"
import { BrowserRouter } from "react-router-dom"


export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <BrowserRouter>
      <Pages></Pages>
      </BrowserRouter>
      
    </h1>
  )
}