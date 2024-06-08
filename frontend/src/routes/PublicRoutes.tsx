import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthUser } from '../context/auth-context';

const PublicRoutes: React.FC = () => {
    const { isAuthenticated } = useAuthUser();
    return isAuthenticated() ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;