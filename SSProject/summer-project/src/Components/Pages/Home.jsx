import React from 'react'
import Navbar from '../Navbar/Navbar'
import LeftSide from '../Navbar/LeftSide'
import Main from '../Main/Main'
const Home = () => {
  return (
    <div>
      <div className='fixed top-0 z-10 w-full bg-white'>
      <Navbar></Navbar>
      </div>
      <div className='flex-auto w-[15%] fixed top-12'>
      <LeftSide></LeftSide>
      </div>
      <div className="flex-auto w-[60%] absolute left-[20%] top-14  rounded-xl">
          <div className="w-[80%] mx-auto">
            <Main></Main>
          </div>
          </div>
    </div>
  )
}

export default Home
