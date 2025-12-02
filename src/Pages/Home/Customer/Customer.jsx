import React from 'react';
import image1 from '../../../assets/Others/location-merchant.png'
import { MdArrowOutward } from "react-icons/md";
import overlay from '../../../assets/Others/be-a-merchant-bg.png'

const Customer = () => {
    return (
        <div className='max-w-11/12 xl:max-w-7xl mx-auto bg-[#03373D] rounded-4xl 
                        p-5 py-8 md:py-15 md:px-7 lg:p-20 
                        flex flex-col-reverse md:flex-row 
                        justify-between items-center 
                        gap-10 md:gap-0 
                        mb-20 relative'>

            {/* LEFT TEXT SECTION */}
            <div className='text-center md:text-left'>
                <p className='text-white text-2xl sm:text-3xl md:text-4xl font-extrabold max-w-2xl mx-auto md:mx-0'>
                    Merchant and Customer Satisfaction is Our First Priority
                </p>

                <p className='text-[#DADADA] max-w-xl mx-auto md:mx-0 my-4 text-sm sm:text-base'>
                    We offer the lowest delivery charge with the highest value along with 100% safety of your product. ShipEx courier delivers your parcels in every corner of Bangladesh right on time.
                </p>

                <div className='flex flex-col sm:flex-row gap-3 mt-5 justify-center md:justify-start flex-wrap'>
                    <button className="btn-base py-2.5 sm:py-3 px-5 sm:px-6 bg-primary text-black! border-none">
                        Become a Merchant
                    </button>

                    <button className="btn-base py-2.5 sm:py-3 px-5 sm:px-6  text-primary!  border border-primary! hover:bg-primary!  hover:text-black! transition-all">Earn with ShipEx Courier</button>

                </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className='flex justify-center md:justify-end'>
                <img src={image1} alt="" className='w-64 sm:w-80 md:w-auto' />
            </div>

            {/* OVERLAY */}
            <img
                src={overlay}
                alt=""
                className='absolute top-2 right-4 sm:right-10 md:right-12 opacity-40 w-24 sm:w-32 md:w-auto'
            />
        </div>
    );
};

export default Customer;
