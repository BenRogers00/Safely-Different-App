// This is the App.js file that will be used to render different components.
import React from 'react';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageUI from './components/UI/HomepageComponents/HomePageUI'
import AuthDetails from './components/AuthDetails';
import UserProfile from './components/profile/UserProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import TextField from './textFieldtoDb';
import BlogWriter from './components/blogPosts/blogWriter';
import BlogDisplay from './components/blogPosts/blogPostDisplay.jsx';

function App() {
  return (
    <div  style={{backgroundColor:'#282c34'}}>
      <div className="App">
        <Router>
          <AuthDetails>
            <Routes>
              <Route path="/" element={<HomePageUI />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/blogWriter" element={<ProtectedRoute><BlogWriter /></ProtectedRoute>} />
              <Route path="/blogPosts" element={<ProtectedRoute><BlogDisplay /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
            </Routes>
          </AuthDetails>
        </Router>
      </div>
    </div>
  );
}

export default App;