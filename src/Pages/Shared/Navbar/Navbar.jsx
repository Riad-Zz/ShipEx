import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../../Components/Logo/Logo';
import { RiMenuFill } from "react-icons/ri";
import Smalllogo from '../../../assets/logo.png'
import { MdArrowOutward } from "react-icons/md";
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';

const Navbar = () => {

    const { user } = use(AuthContext);



    const alllinks = <>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/'}>Home</NavLink></li>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/services'}>Services</NavLink></li>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/coverage'}>Coverage</NavLink></li>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/aboutus'}>About Us</NavLink></li>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/pricing'}>Pricing</NavLink></li>
        <li className='text-base-content text-[16px] font-medium mb-1'><NavLink to={'/rider'}>Be a Rider</NavLink></li>
    </>

    return (
        <div className='max-w-11/12 xl:max-w-7xl mx-auto pt-7 '>
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
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                {/* Trigger Button */}
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL} alt="User Avatar" />
                                    </div>
                                </label>

                                {/* Dropdown Content */}
                                <div
                                    tabIndex={0}
                                    className="dropdown-content z-10 menu p-4 shadow-xl bg-white text-gray-900 rounded-lg mt-5
               w-72 sm:w-80 max-w-[90vw]"
                                >
                                    {/* Section: Currently In */}
                                    <div className="px-1 mb-2">
                                        <span className="text-xs text-gray-500 font-medium">Currently in</span>
                                    </div>

                                    {/* Profile Card */}
                                    <div className="flex items-start gap-3 p-3 bg-[#F5F5F5] rounded-xl mb-2">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <img src={user.photoURL} alt="profile" className="object-cover w-full h-full" />
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-bold text-lg truncate">{user.displayName || "User"}</h3>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="#8FA748"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-gray-600 text-sm">Personal</p>
                                            <p className="text-gray-400 text-xs mt-1 truncate" title={user.email}>
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <ul className="p-0 space-y-2">
                                        {/* Section Header */}
                                        <li className="px-4 py-1 text-xs text-gray-500 font-normal uppercase tracking-wide">
                                            Your accounts
                                        </li>

                                        {/* Logout Button */}
                                        <li>
                                            <button
                                                
                                                className="w-full bg-primary py-2 text-black  flex justify-center font-bold"
                                            >
                                                Log out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>


                            : (<div className='flex gap-2'>
                                <Link to={'/login'}>
                                    <button className='btn-base border border-[#DADADA] py-3 px-4 md:px-6 hover:bg-primary transition-all hover:text-black!'>Sign In</button>
                                </Link>
                                {/* be a Rider Button  */}
                                <Link>
                                    <button className='hidden md:block btn-base py-3 text-black! px-6 bg-primary border-none'>Be a Rider</button>
                                </Link>
                            </div>)
                    }


                    {/* Random Icon  */}
                    <Link>
                        <button className='bg-black rounded-full p-2 hidden md:block'><MdArrowOutward className='text-3xl text-primary font-bold'></MdArrowOutward></button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;