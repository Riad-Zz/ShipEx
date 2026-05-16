import React, { use } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import useAxios from '../Axios/useAxios';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user} = use(AuthContext) ;
    const axiosInstance = useAxios() ;
    const {data : role = 'user' , isLoading} = useQuery({
        queryKey :[ 'usersRole' , user?.email],
        queryFn : async()=>{
            const result = await axiosInstance.get(`users/${user?.email}/role`) 
            return result.data ;
        }
    })
    return {role , isLoading } ;
};

export default useRole;