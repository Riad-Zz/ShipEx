import React, { use } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useLocation } from 'react-router';
import Loader from '../../Pages/Shared/Loader/Loader';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation();

    if (loading) {
        return <Loader></Loader>
    }
    if (user && user?.email) {
        return children
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoutes;