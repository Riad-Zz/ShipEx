import React from 'react';
import image1 from '../../../assets/Others/live-tracking.png'
import image2 from '../../../assets/Others/callCenter.png'
import image3 from '../../../assets/Others/safe-delivery.png'

const MoreUs = () => {

    const allUs = [
        {
            icon: image3,
            title: '100% Safe Delivery',
            description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time. "
        },
        {
            icon: image1,
            title: 'Live Parcel Tracking',
            description: "Stay updated in real-time with our live parcel tracking feature.From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
        },
        {
            icon: image2,
            title: '24/7 Call Center Support',
            description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
        }
    ];

    return (
        <div className='max-w-11/12 xl:max-w-7xl mx-auto my-20'>

            <div className='border-b-2 border-dashed mb-10'></div>

            {/* MAP ALL CARDS */}
            {allUs.map((item, index) => (
                <div key={index} className='bg-white flex flex-col md:flex-row md:justify-start justify-center items-center rounded-4xl p-8 gap-10 mb-5'>

                    {/* LEFT IMAGE */}
                    <div>
                        <img src={item.icon} className='h-50 w-50' alt="" />
                    </div>

                    {/* VERTICAL DASHED LINE */}
                    <div className="border-l-2 border-dashed h-50 border-gray-300 hidden md:block"></div>

                    {/* RIGHT TEXT */}
                    <div>
                        <p className="font-extrabold text-3xl text-secondary">{item.title}</p>
                        <p className="text-[#606060] my-4 max-w-5xl">{item.description}</p>
                    </div>

                </div>
            ))}

            <div className='border-b-2 border-dashed mt-10'></div>

        </div>
    );
};

export default MoreUs;
