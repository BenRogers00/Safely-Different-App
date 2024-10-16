import React from 'react';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageUI from './components/UI/HomepageComponents/HomePageUI';
import AuthDetails from './components/AuthDetails';
import UserProfile from './components/profile/UserProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import BlogWriter from './components/blogPosts/blogWriter';
import BlogDisplay from './components/blogPosts/blogPostDisplay.jsx';
import Payment from './components/payment/Payment';
import ContactPage from './components/UI/HomepageComponents/ContactPage.jsx';
import MessagePage from './components/UI/HomepageComponents/MessagePage.jsx'; // Import MessagePage component
import DrawingBoard from './components/drawing/DrawingBoard';
import PayPal from './components/payment/purchase.js';
import AdminPage from './components/admin/adminPage.jsx';
import AboutUs from './components/UI/HomepageComponents/AboutUs.jsx';
import PdfMain from './components/blogPosts/pdfMain.jsx';
function App() {
  return (
    <div /*style={{ backgroundColor: '#282c34' }}*/>
      <div className="App">
        <Router>
          <AuthDetails>
            <Routes>
              <Route path="/" element={<HomePageUI />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/price" element={<PayPal/>} />
              <Route path="/drawing" element={<ProtectedRoute><DrawingBoard /></ProtectedRoute>} />
              <Route path="/blogWriter" element={<ProtectedRoute><BlogWriter /></ProtectedRoute>} />
              <Route path="/blogPosts" element={<ProtectedRoute><BlogDisplay /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/memberPricing" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
              <Route path="/contact" element={<ContactPage />} /> 
              <Route path="/message/:id" element={<MessagePage />} /> 
              <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>}/>
              <Route path="/about us" element={<ProtectedRoute><AboutUs /></ProtectedRoute>}/>
              <Route path="/PDF template" element={<ProtectedRoute><PdfMain /></ProtectedRoute>}/>
              
            </Routes>
          </AuthDetails>
        </Router>
      </div>
    </div>
  );
}

export default App;
