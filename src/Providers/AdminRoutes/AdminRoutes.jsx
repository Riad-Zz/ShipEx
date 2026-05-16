import React, { use } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useRole from '../../Hooks/Role/useRole';
import { useLocation } from 'react-router';
import Loader from '../../Pages/Shared/Loader/Loader';
import Forbidden from '../../Pages/Shared/Forbidden/Forbidden';

const AdminRoutes = ({children}) => {
    const { user, loading } = use(AuthContext) ;
    const {role , isLoading} = useRole() ;
    const location = useLocation() ;
    
    const userRole = role.role ;
    if(loading || isLoading){
        <Loader></Loader>
    }
    if(userRole != 'admin'){
        return <Forbidden></Forbidden>
    }

    return children ;
};

export default AdminRoutes;