import React from 'react';
import Marquee from "react-fast-marquee";
import companyLogo1 from '../../../assets/brands/casio.png'
import companyLogo2 from '../../../assets/brands/amazon.png'
import companyLogo3 from '../../../assets/brands/moonstar.png'
import companyLogo4 from '../../../assets/brands/randstad.png'
import companyLogo5 from '../../../assets/brands/star.png'
import companyLogo6 from '../../../assets/brands/start_people.png'
import companyLogo7 from '../../../assets/brands/amazon_vector.png'

const Companies = () => {
    return (
        <div className='max-w-11/12 xl:max-w-7xl mx-auto'>
            <p className='text-center font-extrabold text-3xl text-secondary mb-10'>We've helped thousands of sales teams</p>
            <Marquee 
                loop={0}
                speed={70}
                className='my-6'
            >
                <img src={companyLogo1} className='mx-10' alt="" />
                <img src={companyLogo2} className='mx-10'  alt="" />
                <img src={companyLogo3} className='mx-10' alt="" />
                <img src={companyLogo4} className='mx-10' alt="" />
                <img src={companyLogo5} className='mx-10' alt="" />
                <img src={companyLogo6} className='mx-10' alt="" />
                <img src={companyLogo7} className='mx-10' alt="" />
                <img src={companyLogo5} className='mx-10' alt="" />
            </Marquee>
        </div>
    );
};

export default Companies;