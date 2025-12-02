import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../../Components/Logo/Logo';
import { RiMenuFill } from "react-icons/ri";
import Smalllogo from '../../../assets/logo.png'
import { MdArrowOutward } from "react-icons/md";

const Navbar = () => {

    const alllinks = <>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/'}>Home</NavLink></li>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/services'}>Services</NavLink></li>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/coverage'}>Coverage</NavLink></li>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/aboutus'}>About Us</NavLink></li>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/pricing'}>Pricing</NavLink></li>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/rider'}>Be a Rider</NavLink></li>
    </>

    return (
        <div className='max-w-11/12 lg:max-w-10/12 mx-auto pt-7 '>
            <div className="navbar bg-white shadow-sm rounded-2xl py-4 md:px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden">
                            <RiMenuFill className='text-2xl'></RiMenuFill>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-gray-50 rounded-box z-10 mt-4 w-60 p-3 shadow-sm hamburger">
                            {alllinks}
                        </ul>
                    </div>
                    <Link to={'/'} className='hidden md:block relative bottom-1' ><Logo textClassName='text-black'></Logo></Link>
                    <Link to={'/'} className=' md:hidden relative -left-2' ><img src={Smalllogo}></img></Link>
                </div>
                <div className="navbar-center hidden xl:flex">
                    <ul className="flex gap-6 px-1 midLinks">
                        {alllinks}
                    </ul>
                </div>
                <div className="navbar-end gap-px md:gap-2 relative">
                    {/* Sign In Button  */}
                    <Link>
                    <button className='btn-base border border-[#DADADA] py-3 px-4 md:px-6 hover:bg-primary transition-all hover:text-black!'>Sign In</button>
                    </Link>
                    {/* be a Rider Button  */}
                    <Link>
                    <button className='hidden md:block btn-base py-3 text-black! px-6 bg-primary border-none'>Be a Rider</button>
                    </Link>
                    {/* Random Icon  */}
                    <Link>
                    <button className='bg-black rounded-full p-2'><MdArrowOutward className='text-3xl text-primary font-bold'></MdArrowOutward></button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;