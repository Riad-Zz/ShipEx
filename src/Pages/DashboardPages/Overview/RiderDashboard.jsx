import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/Axios/useAxios';
import { SyncLoader } from 'react-spinners';
import { FaMoneyBillWave, FaBoxOpen } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";

const RiderDashboard = ({ email }) => {
    const axiosInstance = useAxios();
    const { data: stats, isLoading } = useQuery({
        queryKey: ['rider-stats', email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/rider-stats/${email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className='flex justify-center py-10'><SyncLoader color='#CAEB66' /></div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="text-center mb-4">
                <h2 className="text-3xl font-extrabold text-gray-800">Rider Dashboard</h2>
                <p className="text-gray-500">Track your performance and total earnings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2">
                    <div className="p-4 bg-green-100 text-green-600 rounded-full mb-2"><FaMoneyBillWave size={32} /></div>
                    <p className="text-gray-500 font-bold">Total Earnings</p>
                    <p className="text-3xl font-extrabold text-gray-800">৳{stats.totalEarnings}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2">
                    <div className="p-4 bg-blue-100 text-blue-600 rounded-full mb-2"><FaBoxOpen size={32} /></div>
                    <p className="text-gray-500 font-bold">Delivered Parcels</p>
                    <p className="text-3xl font-extrabold text-gray-800">{stats.deliveredCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2">
                    <div className="p-4 bg-orange-100 text-orange-600 rounded-full mb-2"><MdOutlinePendingActions size={32} /></div>
                    <p className="text-gray-500 font-bold">Active Tasks</p>
                    <p className="text-3xl font-extrabold text-gray-800">{stats.activeCount}</p>
                </div>
            </div>

            {stats.totalEarnings === 0 && stats.activeCount === 0 && (
                <div className="bg-blue-50 text-blue-700 p-6 rounded-xl text-center border border-blue-100 mt-6">
                    <p className="font-bold text-lg">Welcome to ShipEx Rider!</p>
                    <p>You haven't completed any deliveries yet. Check your tasks to get started!</p>
                </div>
            )}
        </div>
    );
};

export default RiderDashboard;