import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/Axios/useAxios';
import { SyncLoader } from 'react-spinners';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaShippingFast, FaMoneyBillWave, FaBoxOpen } from "react-icons/fa";
import { MdOutlinePendingActions, MdPayment } from "react-icons/md";
import { VscInbox } from "react-icons/vsc";
import { useNavigate } from 'react-router';

const UserDashboard = ({ email }) => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['user-stats', email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/user-stats/${email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className='flex justify-center py-10'><SyncLoader color='#CAEB66' /></div>;

    const renderStatusPill = (status) => {
        if (!status) return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">Processing</span>;
        const cleanStatus = status.replace(/[_-]/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (status === 'delivered') return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{cleanStatus}</span>;
        if (status === 'awaiting_pickup') return <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">{cleanStatus}</span>;
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{cleanStatus}</span>;
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="text-center mb-2">
                <h2 className="text-3xl font-extrabold text-gray-800">My Dashboard</h2>
                <p className="text-gray-500">Track your shipments, expenses, and pending actions.</p>
            </div>

            {/* 1. STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-primary/20 text-secondary rounded-full"><FaShippingFast size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Sent</p>
                        <p className="text-2xl font-extrabold">{stats?.totalSent}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-warning/20 text-warning rounded-full"><MdOutlinePendingActions size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Pending Delivery</p>
                        <p className="text-2xl font-extrabold">{stats?.pendingCount}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-gray-100 text-gray-600 rounded-full"><FaMoneyBillWave size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Spent</p>
                        <p className="text-2xl font-extrabold">৳{stats?.totalSpent}</p>
                    </div>
                </div>
            </div>

            {/* 2. CHART & ALERTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
                
                {/* Expense Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Expense Trend</h3>
                    {stats?.chartData && stats.chartData.length > 0 ? (
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats.chartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                                    <Line type="monotone" dataKey="Spent" stroke="#0f172a" strokeWidth={3} activeDot={{ r: 6 }} />
                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" vertical={false} />
                                    <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
                                    <YAxis tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[200px] text-gray-400">
                            <p>No expense data to display chart.</p>
                        </div>
                    )}
                </div>

                {/* Unpaid Alerts */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Unpaid Invoices</h3>
                    </div>
                    {stats?.unpaidAlerts?.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {stats.unpaidAlerts.map((parcel) => (
                                <div key={parcel._id} className="flex items-center gap-3 p-3 border border-orange-200 bg-orange-50/50 rounded-xl">
                                    <div className="p-2 bg-orange-100 text-orange-500 rounded-full">
                                        <MdPayment size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800 text-sm truncate max-w-[120px]">{parcel.parcelname}</p>
                                        <p className="text-xs font-bold text-orange-600">৳{parcel.amount}</p>
                                    </div>
                                    <button onClick={() => navigate('/deliveries')} className="btn btn-xs bg-gray-800 text-white border-none">Pay</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 h-full text-gray-400">
                            <FaBoxOpen size={36} className="mb-2 text-gray-300" />
                            <p className="text-sm text-center">All your shipments are paid!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. RECENT SHIPMENTS TABLE */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-2">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Recent Shipments</h3>
                    <button onClick={() => navigate('/deliveries')} className="btn btn-sm bg-[#CAEB66] border-none text-black hover:bg-[#b5d35b]">View All</button>
                </div>
                {stats?.recentShipments?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full text-sm">
                            <thead>
                                <tr className="text-gray-500 border-b border-gray-200 text-left">
                                    <th className="py-3 font-semibold">Parcel Name</th>
                                    <th className="py-3 font-semibold">Receiver</th>
                                    <th className="py-3 font-semibold">Price</th>
                                    <th className="py-3 font-semibold text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentShipments.map((parcel) => (
                                    <tr key={parcel._id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="py-4 font-bold text-gray-800">{parcel.parcelname}</td>
                                        <td className="py-4 text-gray-600 truncate max-w-[150px]">{parcel.receiverName}</td>
                                        <td className="py-4 font-bold text-gray-700">৳{parcel.amount}</td>
                                        <td className="py-4 text-center">{renderStatusPill(parcel.deliveryStatus)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                        <VscInbox size={48} className="mb-2" />
                        <p>No shipments recorded yet.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default UserDashboard;