import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import useAxios from '../../../Hooks/Axios/useAxios';
import Swal from 'sweetalert2';
import { VscCheck, VscChromeClose, VscRequestChanges } from 'react-icons/vsc';
import { SyncLoader } from 'react-spinners';
import defaultProfile from '../../../assets/Others/defaultUser.jpeg'
import { IoSearchOutline } from 'react-icons/io5';
import { FiUsers } from "react-icons/fi"; 
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineBikeScooter } from "react-icons/md";

const Users = () => {
    const { user } = use(AuthContext);
    const axiosInstance = useAxios();
    const [searched, setSearched] = useState("");

    // Loading All Users Data 
    const { data: allUsers = [], refetch, isLoading } = useQuery({
        queryKey: ['Users', searched],
        queryFn: async () => {
            const result = await axiosInstance.get(`/users?searched=${searched}`)
            return result.data
        }
    })

    // ----------------- Count User Roles Dynamically --------------------------
    let totalAdmins = 0, totalRiders = 0, totalStandardUsers = 0;
    allUsers.forEach((u) => {
        if (u.role === 'admin') totalAdmins++;
        else if (u.role === 'rider') totalRiders++;
        else totalStandardUsers++;
    });

    // Date Formatter 
    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // ----------------- Handle Search -----------------
    const handleSearch = (e) => {
        e.preventDefault();
        // Updated to target 'address' based on your provided form snippet
        setSearched(e.target.address.value);
    }

    // ----------------- Handle Approve/Reject Functionality -----------------
    const handleAction = (user, status) => {
        const updateField = { status: status }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm !"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.post(`/users/${user._id}`, updateField).then((res) => {
                    const result = res.data;
                    if (result.modifiedCount) {
                        refetch();
                        Swal.fire({
                            title: `${status.toUpperCase()}!`,
                            text: `${status === 'user' ? `${user.name || user.displayName} has been revoked to user` : `${user.name || user.displayName} have been promoted to Admin`}`,
                            icon: "success"
                        })
                    }
                })
            };
        });
    }

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto'>

            <div className='min-w-full lg:max-w-[95%] border border-gray-300 shadow-md mx-auto bg-[#f7fafd] p-5 py-10 lg:p-20 rounded-2xl'>
                <h1 className='text-secondary text-4xl font-extrabold text-center mb-2'>User Management</h1>
                <p className='max-w-xl mx-auto text-center mb-4'>Manage all platform users from one dashboard. View user roles, monitor account activity, and control access by organizing users as admins, riders, or regular users efficiently.</p>
                
                {/* -----------------Parent Div of Statistics----------------- */}
                <div className='flex flex-wrap justify-center items-center gap-5'>

                    {/* ================= Total User Div ====================*/}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <FiUsers className='text-xl '></FiUsers>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Total Users</p>
                            <p className='font-extrabold text-2xl text-black text-center'>{allUsers.length}</p>
                        </div>
                    </div>

                    {/* ==================== Total Riders ==================== */}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <MdOutlineBikeScooter className='text-xl'></MdOutlineBikeScooter>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Total Riders</p>
                            <p className='font-extrabold text-2xl text-black text-center'>{totalRiders}</p>
                        </div>
                    </div>

                    {/* ==================== Total Admins ==================== */}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            < RiAdminLine className='text-xl'></ RiAdminLine>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Total Admins</p>
                            <p className='font-extrabold text-2xl text-black text-center'>{totalAdmins}</p>
                        </div>
                    </div>

                </div>

                {/* search box  */}
                {/* For medium and large device  */}
                <form className='relative hidden md:block text-center' onSubmit={handleSearch}>
                    <input type="text" name='address' className=' lg:w-md bg-[#cbd5e14d] text-lg  py-3 px-5 pl-10 rounded-l-4xl outline-none' placeholder='Search here' />
                    <IoSearchOutline className='absolute top-14 left:30 lg:left-26 xl:left-65 text-xl'></IoSearchOutline>
                    <button type='submit' className='bg-primary text-lg my-10 py-3 px-8  text-black font-bold rounded-r-4xl cursor-pointer'>Search</button>
                </form>
                {/* for small screen  */}
                <form className="md:hidden flex flex-col justify-center items-center my-10" onSubmit={handleSearch}>
                    <div className="relative w-full">
                        <input
                            type="text"
                            name="address"
                            placeholder="Search here"
                            className="w-full bg-[#cbd5e14d] text-lg py-3 px-5 pl-10 rounded-4xl outline-none"
                        />
                        <IoSearchOutline className="absolute top-1/2 left-4 -translate-y-1/2 text-xl" />
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-primary text-lg py-3 px-8 text-black font-bold rounded-4xl cursor-pointer"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {
                    isLoading ? (
                        <div className='min-w-full flex justify-center items-center my-10'>
                            <SyncLoader size={10} color='#CAEB66' />
                        </div>
                    ) : allUsers.length === 0 ? (
                        /*------------------- Empty State When No Users Found -----------------------------*/
                        <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-300 rounded-2xl my-7 shadow-sm">
                            <IoSearchOutline className="text-6xl text-gray-300 mb-4" />
                            <p className="text-2xl font-bold text-gray-700">No Users Found</p>
                            <p className="text-gray-500 mt-2 text-center max-w-md">
                                {searched 
                                    ? `We couldn't find any users matching "${searched}". Try a different name or email.` 
                                    : "There are currently no users registered in the system."}
                            </p>
                            {searched && (
                                <button onClick={() => {
                                    setSearched("");
                                    // Resetting the form input targeted by 'address'
                                    document.getElementsByName('address').forEach(el => el.value = '');
                                }} className="mt-4 btn btn-sm bg-gray-200 border-none text-gray-700 hover:bg-gray-300">
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        /*------------------- All Users Table -----------------------------*/
                        <div>
                            <div className="overflow-x-auto border border-gray-300 rounded-2xl my-7 ">
                                <table className="table table-zebra w-full text-sm">
                                    <thead className='text-center bg-[#1E293B] text-white'>
                                        <tr>
                                            <th className='py-4 rounded-tl-xl text-base'>No.</th>
                                            <th className='text-base'>Image</th>
                                            <th className='text-base'>Name</th>
                                            <th className='text-base'>Email</th>
                                            <th className='text-base'>User Since</th>
                                            <th className='text-base'>Role</th>
                                            <th className='rounded-tr-xl text-base'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allUsers.map((user, index) =>
                                                <tr key={user._id} className='text-black hover:bg-gray-100 text-center border-b border-gray-100'>
                                                    <th className="font-semibold">{index + 1}</th>
                                                    <td className="flex justify-center">
                                                        <div className="avatar">
                                                            <div className="w-10 h-10 rounded-full">
                                                                <img src={user.photoURL || defaultProfile} alt={user.name || user.displayName} className='object-cover' />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="font-medium text-gray-800">{user.name || user.displayName}</td>
                                                    <td className="text-gray-600">{user.email}</td>
                                                    <td className="text-gray-500">{formatDate(user.createdAt)}</td>
                                                    <td>
                                                        {user.role === "user" ? (
                                                            <p className='text-blue-600 font-bold'>User</p>
                                                        ) : user.role === "rider" ? (
                                                            <p className='text-[#F99D25] font-bold'>Rider</p>
                                                        ) : (
                                                            <p className='text-[#0AB010] font-bold'>Admin</p>
                                                        )}
                                                    </td>
                                                    <td className='flex justify-center gap-2 py-3'>
                                                        {
                                                            user.role === 'admin' ?
                                                                <button onClick={() => handleAction(user, 'user')} className='btn bg-red-700 font-bold text-white'>Revoke Access</button> :
                                                                <button onClick={() => handleAction(user, "admin")} className='btn bg-primary font-bold text-black'>Promote Admin</button>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default Users;