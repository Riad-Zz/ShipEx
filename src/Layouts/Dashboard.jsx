import React, { use } from 'react';
import { Outlet } from 'react-router';
import Logo from '../Components/Logo/Logo';
import logoo from '../assets/Others/logo.png';
import { AuthContext } from '../Providers/AuthProvider/AuthProvider';
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoSidebarCollapse } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";

const Dashboard = () => {
    const { user } = use(AuthContext)
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar flex justify-between w-full bg-white">
                    <div>
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <GoSidebarCollapse className='text-3xl text-black font-bold'></GoSidebarCollapse>
                        </label>
                    </div>

                    <div>
                        <div className="cursor-pointer flex gap-4 items-center">
                            <div className='rounded-full bg-[#F5F5F5] hover:bg-gray-300 p-3'>
                                <IoMdNotificationsOutline className='text-2xl'></IoMdNotificationsOutline>
                            </div>
                            <div className='flex gap-1'>
                                <img src={user.photoURL} alt="User Avatar" className='w-11 h-11 rounded-full' />
                                <div className='flex flex-col justify-center items-center'>
                                    <p className='font-bold text-black'>{user.displayName}</p>
                                    <p className=''>Admin</p>
                                </div>
                                <MdKeyboardArrowDown className='text-4xl font-bold text-black'></MdKeyboardArrowDown>
                            </div>

                        </div>
                    </div>

                </nav>
                {/* Page content here */}
                <div className='bg-[#EAECED] h-screen'>
                    <Outlet></Outlet>
                </div>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow midLinks">
                        {/* List item */}

                        <div className='pl-3 p-1 w-full is-drawer-close:hidden'>
                            <Logo textClassName='text-gray-700'></Logo>
                        </div>
                        <div className='is-drawer-open:hidden p-1'>
                            <img src={logoo} alt="" />
                        </div>


                        {/* List item */}
                        {/* <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;