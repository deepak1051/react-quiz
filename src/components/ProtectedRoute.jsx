// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('quizUser'));

  if (!user) {
    // If no user, redirect to login
    return <Navigate to="/login" />;
  }

  // Otherwise, render the children components
  return children;
};

export default ProtectedRoute;
