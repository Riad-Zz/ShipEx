import React from 'react';
import icon1 from '../../../assets/Others/bookingIcon.png'
import { IoCashOutline } from "react-icons/io5";

const Works = () => {

    const allCards = [
        {
            logo: icon1,
            title: 'Booking Pick & Drop',
            description: 'Easily schedule pickup and drop-off for any parcel with quick confirmation and seamless doorstep service.'
        },
        {
            logo: icon1,
            title: 'Cash On Delivery',
            description: 'Offer your customers a secure and convenient Cash On Delivery option with real-time payment updates.'
        },
        {
            logo: icon1,
            title: 'Delivery Hub',
            description: 'Manage all your deliveries from one centralized hub with faster processing, tracking, and routing.'
        },
        {
            logo: icon1,
            title: 'Booking SME & Corporate',
            description: 'Reliable and scalable delivery solutions tailored for SMEs and corporate clients to support daily operations.'
        }
    ];


    return (
        <div className='max-w-11/12 xl:max-w-7xl mx-auto my-10'>
            <p className='text-secondary font-extrabold text-3xl text-center'>How it Works</p>
            <p className='font-medium text-base-content text-center mt-1 mb-2'>Everything you need to know about how our service works.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 my-5 gap-6'>
                {
                    allCards.map((card, index) => (
                        <div key={index} className='bg-white p-8 rounded-3xl hover:scale-102 transition-all duration-100 cursor-pointer'>
                            <img src={card.logo} alt="" />
                            <p className='font-bold text-xl text-secondary mt-4 mb-3'>{card.title}</p>
                            <p className='font-medium text-base-content text-[16px]'>{card.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Works;