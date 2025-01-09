import React from 'react'

const Main = () => {
  return (
    <div className="flex flex-col items-center">
    <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
      <div className="flex items-center pl-4 w-full pb-2">
    
          <img class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="/worklogin.png" alt="Bordered avatar"></img>
        <form className="w-full" >
          <div className="flex justify-between items-center">
            <div className="w-full ml-4">
              <input
                type="text"
                name="text"
                placeholder={`Whats on your mind`}
                className="outline-none w-full bg-white rounded-md"
                
              ></input>
            </div>
            <div className="mx-4">
              
            </div>
            <div className="mr-4">
              <button variant="text" type="submit" className='flex items-center justify-center h-10 w-32 rounded-full bg-gray-200 text-gray-500'>
                Share
              </button>
            </div>
          </div>
        </form>
        </div>
        <hr />
        <div className='flex justify-center items-center pt-2'>
        <label htmlFor='addImage' className='flex items-center cursor-pointer justify-center h-10 w-32 rounded-full bg-gray-200 text-blue-500 '>
                Pdf
                <input 
                id='addImage'
                type="file"
                style={{display:"none"}} />
              </label>
       </div>

        </div>
      </div>
  )
}

export default Main
