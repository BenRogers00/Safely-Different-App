import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Regsiter from "./Register";
import Profile from "../Profile/Profile";
const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Regsiter></Regsiter>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
      </Routes>
   
    </div>
  )
}

export default Pages
