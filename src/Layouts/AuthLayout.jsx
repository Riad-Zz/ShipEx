import React from 'react';
import authModel from '../assets/Others/authImage.png'
import { Link, Outlet } from 'react-router';
import Logo from '../Components/Logo/Logo';

const AuthLayout = () => {

    return (
        <div className='relative min-h-90vh'>
            <div className=' md:relative'>
                <Link to={'/'} className='flex justify-center lg:absolute'><Logo textClassName='text-gray-700'></Logo></Link>
            </div>
            <div className='flex justify-between items-center'>
                <div className='bg-white flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='hidden flex-1 lg:flex justify-center items-center bg-[#FAFDF0] min-h-screen'>
                    <img src={authModel} alt="" />
                </div>
            </div>
        </div>

    );
};

export default AuthLayout;