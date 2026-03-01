import React from 'react';

const Overview = () => {
    // Array of data for the statistics cards
    const stats = [
        { title: 'New Packages', value: '234' },
        { title: 'Ready for Shipping', value: '129' },
        { title: 'Completed', value: '1,325' },
        { title: 'New Clients', value: '50' },
    ];

    return (
        <div className="bg-[#eff1f4] min-h-screen p-8 font-sans">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1a1f2c] mb-1">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 text-sm">
                        You can access all your data and information from anywhere.
                    </p>
                </div>

                {/* Create Shipment Button */}
                <button className="flex items-center gap-2 bg-[#d2f36f] hover:bg-[#c1e45c] text-[#1a1f2c] px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Create Shipment
                </button>
            </div>

            {/* Dashed Divider */}
            <div className="border-t border-dashed border-gray-300 mb-8"></div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl flex items-center gap-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
                    >
                        {/* Icon Container */}
                        <div className="w-12 h-12 rounded-full border border-gray-200 bg-[#fafafa] flex items-center justify-center shrink-0">
                            {/* Ship SVG Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#6b7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {/* Ship Base/Hull */}
                                <path d="M4 14l1.5-4h13L20 14" />
                                {/* Ship Cabin */}
                                <path d="M9 10V7h6v3" />
                                {/* Funnel */}
                                <path d="M11 7V5" />
                                {/* Waves */}
                                <path d="M2 18c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1" />
                                <path d="M2 21c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1" />
                            </svg>
                        </div>

                        {/* Text Container */}
                        <div>
                            <p className="text-[#64748b] text-sm font-medium mb-1">
                                {stat.title}
                            </p>
                            <p className="text-[28px] font-extrabold text-[#1a1f2c] leading-none">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Overview;