import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/Axios/useAxios';
import { SyncLoader } from 'react-spinners';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaShippingFast, FaUsers, FaMotorcycle, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlinePendingActions, MdWarningAmber } from "react-icons/md";
import { VscInbox } from "react-icons/vsc";
import { useNavigate } from 'react-router';

const AdminDashboard = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosInstance.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) return <div className='flex justify-center py-10'><SyncLoader color='#CAEB66' /></div>;

    // Helper to format Date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Helper to format Status with colors
    const renderStatusPill = (status) => {
        if (!status) return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">Processing</span>;
        
        const cleanStatus = status.replace(/[_-]/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        
        if (status === 'delivered') return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{cleanStatus}</span>;
        if (status === 'awaiting_pickup') return <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">{cleanStatus}</span>;
        if (status === 'on-transit' || status === 'picked_up') return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{cleanStatus}</span>;
        
        return <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">{cleanStatus}</span>;
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="text-center mb-2">
                <h2 className="text-3xl font-extrabold text-gray-800">Admin Overview</h2>
                <p className="text-gray-500">Monitor system revenue, shipments, and required actions.</p>
            </div>

            {/* 1. TOP STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-green-100 text-green-600 rounded-full"><FaMoneyBillWave size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Revenue</p>
                        <p className="text-2xl font-extrabold">৳{stats?.totalRevenue}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-blue-100 text-blue-600 rounded-full"><FaShippingFast size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Shipments</p>
                        <p className="text-2xl font-extrabold">{stats?.totalParcels}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-orange-100 text-orange-600 rounded-full"><FaMotorcycle size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Riders</p>
                        <p className="text-2xl font-extrabold">{stats?.totalRiders}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="p-4 bg-purple-100 text-purple-600 rounded-full"><FaUsers size={24} /></div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold">Total Users</p>
                        <p className="text-2xl font-extrabold">{stats?.totalUsers}</p>
                    </div>
                </div>
            </div>

            {/* 2. REVENUE CHART */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-2">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue Trend (Last 7 Days)</h3>
                {stats?.chartData && stats.chartData.length > 0 ? (
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="Revenue" stroke="#CAEB66" strokeWidth={4} activeDot={{ r: 8 }} />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false} />
                                <XAxis dataKey="name" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                                <YAxis tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
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

            {/* 3. RECENT SHIPMENTS TABLE */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-2">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Recent Shipments</h3>
                    <button onClick={() => navigate('/assignrider')} className="btn btn-sm bg-[#CAEB66] border-none text-black hover:bg-[#b5d35b]">View All</button>
                </div>
                
                {stats?.recentParcels?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full text-sm">
                            <thead>
                                <tr className="text-gray-500 border-b border-gray-200 text-left">
                                    <th className="py-3 font-semibold">ID</th>
                                    <th className="py-3 font-semibold">Client</th>
                                    <th className="py-3 font-semibold">Date</th>
                                    <th className="py-3 font-semibold">Price</th>
                                    <th className="py-3 font-semibold text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentParcels.map((parcel) => (
                                    <tr key={parcel._id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="py-4 font-mono text-gray-600">{parcel.tracking_id || `#SPX-${parcel._id.slice(-4).toUpperCase()}`}</td>
                                        <td className="py-4 font-medium text-gray-800">{parcel.senderName}</td>
                                        <td className="py-4 text-gray-500">{formatDate(parcel.createdAt)}</td>
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

            {/* 4. SPLIT SECTION: RECENT PAYMENTS & ALERTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                
                {/* Recent Payments */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Payments</h3>
                    {stats?.recentPayments?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table w-full text-sm">
                                <thead>
                                    <tr className="text-gray-500 border-b border-gray-200 text-left">
                                        <th className="py-3 font-semibold">Trans. ID</th>
                                        <th className="py-3 font-semibold">Amount</th>
                                        <th className="py-3 font-semibold">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentPayments.map((payment) => (
                                        <tr key={payment._id} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-4 font-mono text-gray-500 text-xs">{payment.transaction_id.slice(-8)}...</td>
                                            <td className="py-4 font-bold text-green-600">৳{payment.amount}</td>
                                            <td className="py-4 text-gray-500 text-xs">{formatDate(payment.paidAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                            <FaMoneyBillWave size={36} className="mb-2 text-gray-300" />
                            <p>No payments recorded yet.</p>
                        </div>
                    )}
                </div>

                {/* Shipment Alerts (Awaiting Pickup) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Action Required</h3>
                        <button onClick={() => navigate('/assignrider')} className="btn btn-sm bg-[#CAEB66] border-none text-black hover:bg-[#b5d35b]">Assign Riders</button>
                    </div>
                    
                    {stats?.actionRequired?.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {stats.actionRequired.map((parcel) => (
                                <div key={parcel._id} className="flex items-center gap-4 p-4 border border-red-100 bg-red-50/50 rounded-xl">
                                    <div className="p-2 bg-red-100 text-red-500 rounded-full">
                                        <MdWarningAmber size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800 text-sm">Needs Rider Assignment</p>
                                        <p className="text-xs text-gray-500">Parcel: {parcel.tracking_id || `#SPX-${parcel._id.slice(-4).toUpperCase()}`} • District: {parcel.SenderDistrict}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 h-full text-gray-400">
                            <VscInbox size={36} className="mb-2 text-gray-300" />
                            <p>All clear! No pending assignments.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;