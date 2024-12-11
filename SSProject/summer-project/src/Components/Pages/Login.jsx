import React from 'react'


const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form>
        <div className="mb-4">
          <label className="no-underline block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="justify-center bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline no-underline"
          >
            Login
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-gray-600 text-sm">
        Don't have an account? <a href="#" className="text-blue-500 hover:text-blue-700">Sign Up</a>
      </p>
    </div>
  </div>
  )
}

export default Login
