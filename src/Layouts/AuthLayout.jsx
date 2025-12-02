import React, { useState } from 'react';
import authModel from '../assets/Others/authImage.png'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
   
    return (
        <div className='min-h-90vh'>
        
            <div className='flex justify-between items-center'>
                <div className='bg-white flex-1 '>
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