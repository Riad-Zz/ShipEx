import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/Axios/useAxios';
import { SyncLoader } from 'react-spinners';
import { FaBox, FaMotorcycle, FaCheckCircle, FaMapMarkerAlt, FaSearch, FaShippingFast } from 'react-icons/fa';
import { MdOutlinePendingActions } from 'react-icons/md';
import { TbPackageOff, TbTruckDelivery } from "react-icons/tb";

const TrackParcel = () => {
    const { tracking_id } = useParams();
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    
    // State for the permanent search bar
    const [searchInput, setSearchInput] = useState(tracking_id || "");

    // Keep the input box in sync if the URL changes (e.g., user clicks "back" button)
    useEffect(() => {
        if (tracking_id) {
            setSearchInput(tracking_id);
        }
    }, [tracking_id]);

    const { data: trackingData, isLoading, isError } = useQuery({
        queryKey: ['tracking', tracking_id],
        queryFn: async () => {
            const result = await axiosInstance.get(`/parcellog/${tracking_id}`);
            return result.data;
        },
        enabled: !!tracking_id, // Only run the API call IF there is a tracking_id in the URL
        retry: false 
    });

    const formatDateTime = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const formatStatusTitle = (status) => {
        if (!status) return "Processing";
        return status
            .replace(/[_-]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const getTimelineStyle = (status) => {
        switch (status) {
            case 'awaiting_pickup':
                return { icon: <FaBox className="text-white" size={16} />, bgColor: 'bg-orange-500', desc: "Parcel is ready and waiting for a rider to pick it up." };
            case 'rider_assigned':
                return { icon: <FaMotorcycle className="text-white" size={16} />, bgColor: 'bg-blue-500', desc: "A delivery rider has been assigned to your parcel." };
            case 'picked_up':
                return { icon: <FaMapMarkerAlt className="text-white" size={16} />, bgColor: 'bg-indigo-500', desc: "The rider has successfully picked up your parcel." };
            case 'on-transit':
                return { icon: <FaShippingFast className="text-white" size={16} />, bgColor: 'bg-[#CAEB66] text-black', desc: "Your parcel is currently on the way to the destination." };
            case 'delivered':
                return { icon: <FaCheckCircle className="text-white" size={16} />, bgColor: 'bg-green-600', desc: "The parcel has been successfully delivered!" };
            default:
                return { icon: <MdOutlinePendingActions className="text-gray-500" size={16} />, bgColor: 'bg-gray-200', desc: "System processing." };
        }
    };

    // Handle Manual Search Submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/track/${searchInput.trim()}`);
        }
    };

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto'>
            <div className='min-w-full lg:max-w-[80%] border border-gray-300 shadow-lg mx-auto bg-white p-6 py-10 lg:p-16 rounded-3xl min-h-[70vh] flex flex-col'>
                
                {/* ================== PERMANENT SEARCH BAR ================== */}
                <div className="flex flex-col items-center justify-center mb-12">
                    <h1 className='text-4xl font-extrabold text-gray-800 mb-2'>Track Your Parcel</h1>
                    <p className='text-gray-500 mb-6 text-center max-w-md'>Enter your ShipEx tracking ID below to get real-time updates on your delivery status.</p>
                    
                    <form onSubmit={handleSearchSubmit} className="w-full max-w-lg relative flex items-center">
                        <input 
                            type="text" 
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="e.g. SHIPX-1234" 
                            className="w-full bg-gray-50 border border-gray-300 text-lg py-4 px-6 pr-36 rounded-full outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                        />
                        <button 
                            type="submit" 
                            disabled={!searchInput.trim()}
                            className="absolute right-2 top-2 bottom-2 bg-black text-white px-8 rounded-full font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            <FaSearch size={14} /> Track
                        </button>
                    </form>
                </div>

                {/* ================== CONTENT AREA ================== */}
                <div className="flex-1 flex flex-col border-t border-gray-100 pt-10">
                    {!tracking_id ? (
                        /* State 1: No Tracking ID entered yet (Clean initial state) */
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                            <TbTruckDelivery size={80} className="mb-4 text-gray-200" />
                            <h3 className="text-xl font-bold text-gray-600">Ready to Track</h3>
                            <p>Enter a tracking ID above to see your parcel's journey.</p>
                        </div>

                    ) : isLoading ? (
                        /* State 2: Loading */
                        <div className='flex-1 flex justify-center items-center py-20'>
                            <SyncLoader size={12} color='#CAEB66' />
                        </div>

                    ) : isError || !trackingData || trackingData.logs.length === 0 ? (
                        /* State 3: Error / Not Found */
                        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-10">
                            <div className="p-5 bg-red-50 rounded-full mb-4 text-red-400">
                                <TbPackageOff size={50} />
                            </div>
                            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Tracking Not Found</h2>
                            <p className="text-gray-500 max-w-md">
                                We couldn't find any shipping history for <span className="font-mono font-bold text-red-500 bg-red-50 px-2 py-1 rounded">{tracking_id}</span>. 
                                Please check for typos and try again.
                            </p>
                        </div>

                    ) : (
                        /* State 4: SUCCESS - Show Timeline */
                        <>
                            {/* Parcel Info Summary */}
                            {trackingData.parcelInfo && (
                                <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl text-sm mb-10 max-w-2xl mx-auto w-full shadow-sm">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-gray-500 font-medium">Parcel Name:</span> 
                                        <span className="font-bold text-gray-800 text-base">{trackingData.parcelInfo.parcelname}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-gray-500 font-medium">Destination:</span> 
                                        <span className="font-bold text-gray-800 truncate max-w-[200px]" title={trackingData.parcelInfo.receiverAddress}>
                                            {trackingData.parcelInfo.receiverAddress}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-1">
                                        <span className="text-gray-500 font-medium">Current Status:</span> 
                                        <span className="font-bold text-black bg-[#CAEB66] px-3 py-1 rounded-md text-xs tracking-wide uppercase">
                                            {formatStatusTitle(trackingData.parcelInfo.deliveryStatus)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Timeline */}
                            <div className="relative pl-4 md:pl-8 max-w-2xl mx-auto w-full">
                                <div className="absolute left-8 md:left-12 top-2 bottom-2 w-1 bg-gray-100 rounded-full z-0"></div>

                                {trackingData.logs.map((log, index) => {
                                    const style = getTimelineStyle(log.deliveryStatus);
                                    const isLast = index === trackingData.logs.length - 1;

                                    return (
                                        <div key={log._id} className="relative z-10 flex gap-6 md:gap-10 mb-10 last:mb-0 group">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${style.bgColor} ${isLast ? 'ring-4 ring-[#CAEB66]/50 scale-110 transition-transform' : ''}`}>
                                                {style.icon}
                                            </div>

                                            <div className={`flex-1 bg-white p-5 rounded-2xl border ${isLast ? 'border-gray-400 shadow-md' : 'border-gray-100 shadow-sm'} transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}>
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                                    <h3 className={`text-lg font-extrabold ${isLast ? 'text-black' : 'text-gray-700'}`}>
                                                        {formatStatusTitle(log.deliveryStatus)}
                                                    </h3>
                                                    <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md mt-1 sm:mt-0 w-max">
                                                        {formatDateTime(log.loggedAt)}
                                                    </span>
                                                </div>
                                                <p className={`${isLast ? 'text-gray-600 font-medium' : 'text-gray-400'} text-sm leading-relaxed`}>
                                                    {style.desc}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TrackParcel;