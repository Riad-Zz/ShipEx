import React from 'react';

import headingImage from '../../../assets/Others/customer-top.png'
import quoteMark from '../../../assets/Others/reviewQuote.png'


import reviwerImage1 from '../../../assets/Others/test.jpeg'
import reviwerImage2 from '../../../assets/Others/Reviewer (1).jpeg'
import reviwerImage3 from '../../../assets/Others/Reviewer (2).jpeg'
import reviwerImage4 from '../../../assets/Others/Reviewer (3).jpeg'
import reviwerImage5 from '../../../assets/Others/Reviewer (4).jpeg'
import reviwerImage6 from '../../../assets/Others/Reviewer (5).jpeg'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination, Navigation } from 'swiper/modules';

const Reviews = () => {

    const allReviews = [
    {
        review: "ShipEx provides fast and reliable parcel delivery, ensuring that every package reaches its destination safely and on time. The website is simple to use and makes tracking effortless.",
        name: "Rafi Ahmed",
        photo: reviwerImage1,
        des: "UX Research Specialist"
    },
    {
        review: "I enjoy using ShipEx for sending important documents and packages because their tracking system is clear and updates in real time.I can always trust that my packages arrive on time. ",
        name: "Israk Jahan",
        photo: reviwerImage2,
        des: "Physiotherapy Consultant"
    },
    {
        review: "ShipEx offers a smooth and simple shipping experience, making it easy to schedule pickups and monitor deliveries efficiently. I can always trust that my packages arrive on time.",
        name: "Mahmudul Hasan",
        photo: reviwerImage3,
        des: "Ergonomics Analyst"
    },
    {
        review: "With ShipEx, I can trust that my parcels are handled carefully and delivered on schedule without any hassle. Their customer support is responsive and helpful whenever needed.",
        name: "Sadia Karim",
        photo: reviwerImage6,
        des: "Wellness Coach"
    },
    {
        review: "ShipEx makes nationwide shipping easy with a clean interface, accurate tracking, and reliable customer support. Scheduling pickups and selecting delivery options is extremely convenient.",
        name: "Tanvir Chowdhury",
        photo: reviwerImage5,
        des: "Health & Lifestyle Advisor"
    },
    {
        review: "I rely on ShipEx for timely deliveries of my business packages, as they provide a consistent and trustworthy service every time. It saves me a lot of time and gives peace of mind.",
        name: "Farhana Tasin",
        photo: reviwerImage6,
        des: "Senior Occupational Therapist"
    }
];



    return (
        <div className='max-w-11/12 md:max-w-10/12 mx-auto mb-20'>
            <div className='flex justify-center mb-3'>
                <img src={headingImage} alt="" className='object-cover' />
            </div>

            <p className='text-secondary font-extrabold text-center text-4xl'>
                What our customers are sayings
            </p>

            <p className='text-center max-w-2xl mx-auto mt-2 mb-10 text-[#606060]'>
                Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
            </p>

            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                freeMode={true}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination, Navigation]}
                className="mySwiper"

            >

                {allReviews.map((rev, index) => (
                    <SwiperSlide
                        key={index}
                        className="max-w-xs md:max-w-sm px-1"
                    >
                        <div className='p-8  mb-10 rounded-xl shadow-lg bg-[#ffffffb3]'>
                            <img src={quoteMark} alt="" />
                            <p className='text-sm '>{rev.review}</p>
                            <hr className=' border-dashed my-3 border-[#03464D]' />
                            <div className='flex gap-2 items-center'>
                                <div>
                                    <img src={rev.photo} alt="" className='w-10 h-10 rounded-full ' />

                                </div>
                                <div>
                                    <p className='font-bold text-[#03373D]'>{rev.name}</p>
                                    <p className=''>{rev.des}</p>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
};

export default Reviews;
