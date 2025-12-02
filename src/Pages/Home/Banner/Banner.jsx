import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import deliveyMan1 from '../../../assets/banner/DeliveryMan1.png';
import deliveyMan2 from '../../../assets/banner/DeliveryMan2.png';
import deliveyMan3 from '../../../assets/banner/DeliveryMan3.png';
import { MdArrowOutward } from "react-icons/md";

const Banner = () => {

    const title1 = <>We Make Sure Your <span className='text-primary'>Parcel Arrives</span> On Time - No Fuss.</>;
    const title2 = <>Get your essentials delivered in <span className='text-primary'>30 Minutes</span> at your doorstep</>;
    const title3 = <>Experience lightning-fast <span className='text-primary'>Delivery</span> & hassle-free <span className='text-primary'>Pickup</span></>;



    const allBanners = [
        { title: title1, image: deliveyMan1, description: "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments, we handle every delivery with care and precision, ensuring your parcels arrive on time, every time, so you can stay stress-free and confident in our service" },
        { title: title2, image: deliveyMan2, description: "Get your essentials delivered in just 30 minutes — enjoy fast, safe, and reliable service right to your doorstep. From groceries to urgent parcels, we make sure every delivery is on time, hassle-free, and tracked in real-time for your peace of mind" },
        { title: title3, image: deliveyMan3, description: "Experience lightning-fast delivery and hassle-free pickup designed for your busiest days — whether it's urgent parcels, important documents, or everyday essentials, we ensure every item reaches its destination quickly, safely, and without any stress, giving you more time for what matters most." }
    ];

    return (
        <div className='max-w-11/12 xl:max-w-7xl mx-auto'>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay=
                {{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                pagination={{ clickable: true }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper my-6 rounded-4xl">
                {allBanners.map((banner, index) => (
                    <SwiperSlide key={index}>

                        <div className="flex flex-col-reverse xl:flex-row items-center justify-center xl:justify-between gap-6 sm:gap-8 md:gap-10 bg-white p-6 sm:p-8 md:p-12 xl:p-20 rounded-4xl">

                            {/*-----------------LEFT TEXT SECTION-------------------------*/}
                            <div className="text-center xl:text-left px-2 md:px-0 max-w-xl">

                                {/*-------------------Title------------------------------*/}
                                <p className="font-extrabold text-2xl mb-2 md:mb-0 sm:text-3xl md:text-4xl xl:text-6xl text-secondary">{banner.title}</p>
                                {/*-------------------------Description--------------------*/}
                                <p className="text-[#606060] hidden md:block my-3 sm:my-4 md:my-6">{banner.description}</p>

                                {/*-------------------------BUTTONS----------------------------*/}
                                <div className="flex my-3 flex-wrap gap-3 sm:gap-4 justify-center xl:justify-start">
                                    {/*--------------------------Track Parcel + Arrow-----------------------*/}
                                    <div className="flex justify-center gap-px">
                                        <button className="btn-base py-2.5 sm:py-3 px-5 sm:px-6 bg-primary text-black! border-none">Track Your Parcel</button>
                                        <button className="bg-black rounded-full p-2 sm:p-3"><MdArrowOutward className="text-2xl sm:text-3xl text-primary font-bold" /></button>
                                    </div>
                                    {/*----------------------Rider Button----------------------------*/}
                                    <button className="btn-base py-2.5 hover:bg-primary transition-all sm:py-3 px-5 sm:px-6 border border-[#DADADA] text-black!">Be a Rider</button>
                                </div>
                            </div>

                            {/*----------------------RIGHT IMAGE----------------------------*/}
                            <div className="xl:w-auto flex justify-center">
                                <img src={banner.image} alt="" />
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
