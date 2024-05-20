// This is the App.js file that will be used to render different components.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageUI from './components/UI/HomepageComponents/HomePageUI';
import React from 'react';
import SignIn from './components/auth/SignIn';
import AuthDetails from './components/AuthDetails';

function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
            <Route path="/" element={<HomePageUI />} />
            <Route path="/signin" element={<SignIn />} />
            </Routes>
        </Router>
        
    </div>
  );
}

export default App;