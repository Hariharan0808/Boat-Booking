import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isLogged = useSelector(state => state.auth.isLogged);
  const user = useSelector(state => state.auth.user);

  // Check if user is logged in and if user is admin
  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  if (user?.email !== 'admin@123') {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
