import React from 'react'
import Home from './Home'
import Login from './Login'
import { Route, Routes } from 'react-router-dom'
const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
   
    </div>
  )
}

export default Pages
