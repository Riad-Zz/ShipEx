import React, { use } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import Logo from '../Components/Logo/Logo';
import logoo from '../assets/Others/logo.png';
import { AuthContext } from '../Providers/AuthProvider/AuthProvider';
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoSidebarCollapse } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { BsBagDash } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { GrContact } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";

const Dashboard = () => {
    const { user } = use(AuthContext)
    return (
        <div className="drawer md:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/*------------------- Navbar -------------------------------*/}
                <nav className="navbar flex justify-between w-full bg-white">
                    <div>
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/*-----------------------Sidebar toggle icon---------------------*/}
                            <GoSidebarCollapse className='text-2xl text-black font-bold'></GoSidebarCollapse>
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
                {/*----------------------Page content here-----------------------*/}
                <div className='bg-[#EAECED] h-screen'>
                    <Outlet></Outlet>
                </div>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64">
                    {/*------------------Sidebar content here-----------------------*/}
                    <ul className="menu w-full grow dashlink">
                        {/* ------------ Logo -> when Extended ------------------*/}
                        <Link to={'/'} className='pl-3 p-1 w-full is-drawer-close:hidden'>
                            <Logo textClassName='text-gray-700'></Logo>
                        </Link>
                        {/* ------------ Logo -> when not Extended ------------------*/}
                        <Link to={'/'} className='is-drawer-open:hidden p-1 mb-1'>
                            <img src={logoo} alt="" />
                        </Link>

                        {/* ------------ List Category ------------------*/}
                        <p className='my-2 pl-2 font-medium is-drawer-close:hidden'>MENU</p>

                        {/* ================== List item - 01 ========================*/}
                        <li className='mt-2'>
                            <NavLink to={'/dashboard'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                                <TbTargetArrow className='is-drawer-open:text-xl'></TbTargetArrow>
                                <span className="is-drawer-close:hidden text-black">DashBoard</span>
                            </NavLink>
                        </li>
                        {/* ================== List item - 02 ====================*/}
                        <li className='mt-3'>
                            <NavLink
                                to="/deliveries"
                                className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right "
                                data-tip="Deliveries" >
                                <BsBagDash className='is-drawer-open:text-xl' />
                                <span className="is-drawer-close:hidden text-black ">Deliveries</span>
                            </NavLink>
                        </li>
                        {/* ================= List item - 03 ======================*/}
                        <li className='mt-3'>
                            <NavLink
                                to="/payment"
                                className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right "
                                data-tip="Payment" >
                                <MdOutlinePayments className='is-drawer-open:text-xl'></MdOutlinePayments>
                                <span className="is-drawer-close:hidden text-black block">Payment</span>
                            </NavLink>
                        </li>
                        {/* =================== List item - 04 =========================*/}
                        <li className='mt-3'>
                            <NavLink
                                to="/client"
                                className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right "
                                data-tip="Client" >
                                <GoPeople className='is-drawer-open:text-xl'></GoPeople>
                                <span className="is-drawer-close:hidden text-black block">Client</span>
                            </NavLink>
                        </li>
                        {/* ==================== List item - 05 ============================*/}
                        <li className='mt-3'>
                            <NavLink
                                to="/analytics"
                                className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right "
                                data-tip="Analytics" >
                                <TbReportAnalytics className='is-drawer-open:text-xl'></TbReportAnalytics>
                                <span className="is-drawer-close:hidden text-black block">Analytics</span>
                            </NavLink>
                        </li>

                        {/* ------------ List Category ------------------*/}
                        <p className='mt-5 mb-2 pl-2 font-medium is-drawer-close:hidden'>GENERAL</p>
                        {/* ==================== List item - 06 ============================*/}
                        <li className='mt-3'>
                            <NavLink
                                to="/changepassword"
                                className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right "
                                data-tip="Change Password" >
                                <RiLockPasswordLine className='is-drawer-open:text-xl'></RiLockPasswordLine>
                                <span className="is-drawer-close:hidden text-black block">Change Password</span>
                            </NavLink>
                        </li>
                        {/* ==================== List item - 07 ============================*/}
                        <li className='mt-3'>
                            <NavLink
                                to="/help"
                                className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right "
                                data-tip="Help" >
                                <GrContact className='is-drawer-open:text-xl'></GrContact>
                                <span className="is-drawer-close:hidden text-black block">Contact Support</span>
                            </NavLink>
                        </li>
                        {/* ==================== List item - 08 ============================*/}
                        <li className='mt-3'>
                            <button
                                className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right "
                                data-tip="Logout" >
                                <CiLogout className='is-drawer-open:text-xl' ></CiLogout>
                                <span className="is-drawer-close:hidden text-black block">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;