import {Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const ProtectedRoute = ({children}) => {

  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;