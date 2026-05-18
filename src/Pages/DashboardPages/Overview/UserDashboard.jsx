import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/Axios/useAxios';
import { SyncLoader } from 'react-spinners';
import { FaShippingFast, FaMoneyBillWave, FaBoxOpen } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";

const UserDashboard = ({ email }) => {
    const axiosInstance = useAxios();
    const { data: stats, isLoading } = useQuery({
        queryKey: ['user-stats', email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/user-stats/${email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className='flex justify-center py-10'><SyncLoader color='#CAEB66' /></div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="text-center mb-4">
                <h2 className="text-3xl font-extrabold text-gray-800">My Overview</h2>
                <p className="text-gray-500">A quick glance at your shipping activity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-primary/20 text-primary rounded-full"><FaShippingFast size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Sent</p>
                        <p className="text-2xl font-extrabold">{stats.totalSent}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-warning/20 text-warning rounded-full"><MdOutlinePendingActions size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Pending Delivery</p>
                        <p className="text-2xl font-extrabold">{stats.pendingCount}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-gray-100 text-gray-600 rounded-full"><FaMoneyBillWave size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Spent</p>
                        <p className="text-2xl font-extrabold">৳{stats.totalSpent}</p>
                    </div>
                </div>
            </div>

            {stats.totalSent === 0 && (
                <div className="flex flex-col items-center justify-center py-16 bg-white border border-gray-300 rounded-2xl shadow-sm mt-6">
                    <FaBoxOpen className="text-6xl text-gray-300 mb-4" />
                    <p className="text-xl font-bold text-gray-700">No Shipments Yet</p>
                    <p className="text-gray-500 mt-1">Book your first parcel delivery to see your stats here.</p>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;