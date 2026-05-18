import React, { use } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useRole from '../../Hooks/Role/useRole';
import { useLocation } from 'react-router';
import Forbidden from '../../Pages/Shared/Forbidden/Forbidden';
import Loader from '../../Pages/Shared/Loader/Loader';

const RiderRoutes = ({children}) => {
    const { user, loading } = use(AuthContext);
    const { role, isLoading } = useRole();
    const location = useLocation();

    const userRole = role.role;
    if (loading || isLoading) {
        <Loader></Loader>
    }
    if (userRole != 'rider' && userRole != 'admin') {
        return <Forbidden></Forbidden>
    }
    return children;
};

export default RiderRoutes;