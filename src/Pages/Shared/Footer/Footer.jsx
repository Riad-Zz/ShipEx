import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, Links } from 'react-router';
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa6";

const Footer = () => {

    const alllinks = <>
        <Link to={'/services'}>Services</Link>
        <Link to={'/coverage'}>Coverage</Link>
        <Link to={'/about'}>About Us</Link>
        <Link to={'/pricing'}>Pricing</Link>
        <Link to={'/rider'}>Be a Rider</Link>
    </>

    return (
        <div className='max-w-11/12 lg:max-w-10/12 mx-auto'>
            <footer className="footer footer-horizontal footer-center bg-[#0B0B0B] text-[#DADADA] p-7 md:p-10 rounded-4xl">
                <aside>
                    <Logo className=''></Logo>
                    <p className="md:max-w-2xl mt-3">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to   business shipments — we deliver on time, every time.
                    </p>
                    <hr className='block w-full border border-dashed border-[#03464D] mt-4' />
                    {/* <p>Copyright © {new Date().getFullYear()} - All right reserved</p> */}
                    <div className='flex flex-wrap gap-4 md:gap-7 my-3 justify-center footerLink'>
                        {alllinks}
                    </div>
                    <hr className='block w-full border border-dashed border-[#03464D]' />
                </aside>
                <nav>
                    <div className="flex flex-wrap items-center gap-4 -mt-3 ">
                        <a className='rounded-full bg-[#2489BE] p-2 cursor-pointer'>
                            <FaLinkedinIn className='text-xl'></FaLinkedinIn>
                        </a>
                        <a className='rounded-full bg-white p-2 cursor-pointer'>
                            <FaXTwitter className='text-xl text-black'></FaXTwitter>
                        </a>
                        <a className='rounded-full cursor-pointer'>
                            <FaFacebook className='text-4xl text-[#006AFF]'></FaFacebook>
                        </a>

                        <a className='rounded-full bg-[#B71C1C] p-2 cursor-pointer'>
                            <FaYoutube className='text-xl'></FaYoutube>
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;