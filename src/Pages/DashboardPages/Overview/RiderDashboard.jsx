import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/Axios/useAxios';
import { SyncLoader } from 'react-spinners';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaMoneyBillWave, FaBoxOpen } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { VscInbox } from "react-icons/vsc";
import { useNavigate } from 'react-router';

const RiderDashboard = ({ email }) => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    
    const { data: stats, isLoading } = useQuery({
        queryKey: ['rider-stats', email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/rider-stats/${email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className='flex justify-center py-10'><SyncLoader color='#CAEB66' /></div>;

    const renderStatusPill = (status) => {
        if (!status) return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">Processing</span>;
        const cleanStatus = status.replace(/[_-]/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (status === 'delivered') return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{cleanStatus}</span>;
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{cleanStatus}</span>;
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="text-center mb-2">
                <h2 className="text-3xl font-extrabold text-gray-800">Rider Dashboard</h2>
                <p className="text-gray-500">Track your delivery performance and earnings.</p>
            </div>

            {/* 1. STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2">
                    <div className="p-4 bg-green-100 text-green-600 rounded-full mb-2"><FaMoneyBillWave size={32} /></div>
                    <p className="text-gray-500 font-bold">Total Earnings</p>
                    <p className="text-3xl font-extrabold text-gray-800">৳{stats?.totalEarnings}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2">
                    <div className="p-4 bg-blue-100 text-blue-600 rounded-full mb-2"><FaBoxOpen size={32} /></div>
                    <p className="text-gray-500 font-bold">Delivered Parcels</p>
                    <p className="text-3xl font-extrabold text-gray-800">{stats?.deliveredCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2">
                    <div className="p-4 bg-orange-100 text-orange-600 rounded-full mb-2"><MdOutlinePendingActions size={32} /></div>
                    <p className="text-gray-500 font-bold">Active Tasks</p>
                    <p className="text-3xl font-extrabold text-gray-800">{stats?.activeCount}</p>
                </div>
            </div>

            {/* 2. SPLIT SECTION: CHART & TABLE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
                
                {/* Earning Chart */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Earnings Trend</h3>
                    {stats?.chartData && stats.chartData.length > 0 ? (
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.chartData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
                                    <YAxis tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="Earnings" fill="#CAEB66" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[200px] text-gray-400">
                            <p>No earnings data yet.</p>
                        </div>
                    )}
                </div>

                {/* Recent Tasks */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Recent Tasks</h3>
                        <button onClick={() => navigate('/mytask')} className="btn btn-sm bg-[#CAEB66] border-none text-black hover:bg-[#b5d35b]">View All</button>
                    </div>
                    {stats?.recentTasks?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table w-full text-sm">
                                <thead>
                                    <tr className="text-gray-500 border-b border-gray-200 text-left">
                                        <th className="py-3 font-semibold">Tracking ID</th>
                                        <th className="py-3 font-semibold">Destination</th>
                                        <th className="py-3 font-semibold">Earning</th>
                                        <th className="py-3 font-semibold text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentTasks.map((parcel) => (
                                        <tr key={parcel._id} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-4 font-mono text-gray-600">{parcel.tracking_id || `#SPX-${parcel._id.slice(-4).toUpperCase()}`}</td>
                                            <td className="py-4 text-gray-800 truncate max-w-[150px]" title={parcel.receiverAddress}>{parcel.receiverAddress}</td>
                                            <td className="py-4 font-bold text-green-600">৳{parcel.rider_earning || 0}</td>
                                            <td className="py-4 text-center">{renderStatusPill(parcel.deliveryStatus)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                            <VscInbox size={36} className="mb-2 text-gray-300" />
                            <p>No tasks assigned to you yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RiderDashboard;