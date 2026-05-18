import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/Axios/useAxios';
import { SyncLoader } from 'react-spinners';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaShippingFast, FaUsers, FaMotorcycle, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";

const AdminDashboard = () => {
    const axiosInstance = useAxios();
    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosInstance.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) return <div className='flex justify-center py-10'><SyncLoader color='#CAEB66' /></div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="text-center mb-4">
                <h2 className="text-3xl font-extrabold text-gray-800">Admin Overview</h2>
                <p className="text-gray-500">Monitor system revenue and overall statistics.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-green-100 text-green-600 rounded-full"><FaMoneyBillWave size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Revenue</p>
                        <p className="text-2xl font-extrabold">৳{stats.totalRevenue}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-blue-100 text-blue-600 rounded-full"><FaShippingFast size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Shipments</p>
                        <p className="text-2xl font-extrabold">{stats.totalParcels}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-orange-100 text-orange-600 rounded-full"><FaMotorcycle size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Riders</p>
                        <p className="text-2xl font-extrabold">{stats.totalRiders}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-purple-100 text-purple-600 rounded-full"><FaUsers size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Users</p>
                        <p className="text-2xl font-extrabold">{stats.totalUsers}</p>
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue Trend (Last 7 Days)</h3>
                {stats.chartData && stats.chartData.length > 0 ? (
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="Revenue" stroke="#CAEB66" strokeWidth={4} activeDot={{ r: 8 }} />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                        <MdOutlinePendingActions size={48} className="mb-2" />
                        <p>No revenue data available to display chart.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;