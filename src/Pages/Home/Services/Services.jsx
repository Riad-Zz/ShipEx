import React from 'react';
import { CiDeliveryTruck } from "react-icons/ci";
import { AiOutlineSolution } from "react-icons/ai";
import { IoCashOutline } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { TbTruckReturn } from "react-icons/tb";

const Services = () => {

    const icon1 = <div className='bg-[#EEEDFC] rounded-full h-18 w-18 flex justify-center items-center p-2'>
        <CiDeliveryTruck className='text-4xl'></CiDeliveryTruck>
    </div>

    const icon2 = <div className='bg-[#EEEDFC] rounded-full h-18 w-18 flex justify-center items-center p-2'>
        <AiOutlineSolution className='text-4xl'></AiOutlineSolution>
    </div>
    const icon3 = <div className='bg-[#EEEDFC] rounded-full h-18 w-18 flex justify-center items-center p-2'>
        <IoCashOutline className='text-4xl'></IoCashOutline>
    </div>
    const icon4 = <div className='bg-[#EEEDFC] rounded-full h-18 w-18 flex justify-center items-center p-2'>
        <GrServices className='text-4xl'></GrServices>
    </div>
    const icon5 = <div className='bg-[#EEEDFC] rounded-full h-18 w-18 flex justify-center items-center p-2'>
        <TbTruckReturn className='text-4xl'></TbTruckReturn>
    </div>

    const allService = [
        {
            icons: icon1,
            title: 'Express  & Standard Delivery',
            description: 'We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.'
        }
        ,
        {
            icons : icon2 ,
            title : 'Fulfillment Solution' ,
            description : 'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.'
        },
        {
            icons :icon3  ,
            title : 'Cash on Home Delivery',
            description : '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.'
        },
        {
            icons : icon4 ,
            title : 'Corporate Service / Contract In Logistics' ,
            description : 'Customized corporate services which includes warehouse and inventory management support.'
        },
        {
            icons : icon1 ,
            title : 'Nationwide Delivery' ,
            description : 'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.'
        },
        {
            icons : icon5 ,
            title : 'Parcel Return' ,
            description : 'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.'
        }
    ]

    return (
        <div className='max-w-11/12 md:max-w-10/12 mx-auto bg-[#03373D] my-20 xl:p-18 md:p-7 px-3 py-18 rounded-4xl'>
            <p className='text-white text-center font-extrabold text-4xl'>Our Services </p>
            <p className='text-center text-[#DADADA] my-3 max-w-2xl mx-auto'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-10 '>
                {
                    allService.map((service, index) => (
                        <div key={index} className='bg-white rounded-3xl py-9 px-6 hover:bg-primary hover:cursor-pointer transition-all hover:scale-102 duration-150'>
                            <div className='flex justify-center'>{service.icons}</div>
                            <p className='text-center text-secondary font-bold text-2xl max-w-sm mx-auto my-2'>{service.title}</p>
                            <p className='text-center max-w-sm text-[#606060] text-[16px] mx-auto'>{service.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Services;