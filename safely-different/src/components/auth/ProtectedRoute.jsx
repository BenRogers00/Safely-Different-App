// This component is used to protect routes that require authentication. 
// If the user is not authenticated, they will be redirected to the sign-in page.

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthDetails';

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuth();

  return authUser ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
