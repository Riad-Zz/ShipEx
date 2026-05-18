import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import useAxios from '../../../Hooks/Axios/useAxios';
import { SyncLoader } from 'react-spinners';
import AdminDashboard from './AdminDashboard';
import RiderDashboard from './RiderDashboard';
import UserDashboard from './UserDashboard';
const Overview = () => {
    const { user } = use(AuthContext);
    const axiosInstance = useAxios();

    // Fetch the user's role to determine which dashboard to show
    const { data: roleData, isLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/${user.email}/role`);
            return res.data;
        }
    });

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto '>
            <div className='min-w-full lg:max-w-[95%] border border-gray-300 shadow-md mx-auto bg-[#f7fafd] p-5 py-10 lg:p-20 rounded-2xl'>
                
                {isLoading ? (
                    <div className='flex justify-center items-center py-20'>
                        <SyncLoader size={10} color='#CAEB66' />
                    </div>
                ) : (
                    <>
                        {roleData?.role === 'admin' && <AdminDashboard />}
                        {roleData?.role === 'rider' && <RiderDashboard email={user.email} />}
                        {roleData?.role === 'user' && <UserDashboard email={user.email} />}
                    </>
                )}

            </div>
        </div>
    );
};

export default Overview;