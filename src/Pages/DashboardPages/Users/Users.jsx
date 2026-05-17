import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import useAxios from '../../../Hooks/Axios/useAxios';
import Swal from 'sweetalert2';
import { VscCheck, VscChromeClose, VscRequestChanges } from 'react-icons/vsc';
import { SyncLoader } from 'react-spinners';
import defaultProfile from '../../../assets/Others/defaultUser.jpeg'
import { IoSearchOutline } from 'react-icons/io5';

const Users = () => {
    const { user } = use(AuthContext);
    const axiosInstance = useAxios();
    const [searched,setSearched] = useState("") ;
    // console.log(searched);

    // Loading All Users Data 
    const { data: allUsers = [], refetch, isLoading } = useQuery({
        queryKey: [Users, searched],
        queryFn: async () => {
            const result = await axiosInstance.get(`/users?searched=${searched}`)
            // console.log(result.data);
            return result.data
        }
    })
    // console.log(allUsers);

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

    // ----------------- Handle Approve/Reject Functionality -----------------
    const handleSearch = (e) =>{
        e.preventDefault() ;
        setSearched(e.target.username.value) ;
    }


    // ----------------- Handle Approve/Reject Functionality -----------------
    const handleAction = (user, status) => {
        // console.log(rider , status) ;
        const updateField = { status: status }
        // console.log(updateFields);
        // console.log(user._id);
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
                console.log('approved', user._id, status);
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
                            <VscRequestChanges className='text-xl'></VscRequestChanges>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Total Applications</p>
                            <p className='font-extrabold text-2xl text-black text-center'>{allUsers.length}</p>
                        </div>
                    </div>

                    {/* ==================== Total Rejected ==================== */}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <VscCheck className='text-xl'></VscCheck >
                        </div>
                        <div>
                            <p className='font-bold text-center'>Approved Rider</p>
                            <p className='font-extrabold text-2xl text-black text-center'>10</p>
                        </div>
                    </div>

                    {/* ==================== TOtal  Approved ==================== */}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            < VscChromeClose className='text-xl'></ VscChromeClose>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Rejected</p>
                            <p className='font-extrabold text-2xl text-black text-center'>20</p>
                        </div>
                    </div>


                    {/* For medium and large device  */}
                    <form className=' relative hidden md:block' onSubmit={(e)=>handleSearch(e)}>
                        <input type="text" name='username' className=' lg:w-md bg-[#cbd5e14d] text-lg  py-3 px-5 pl-10 rounded-l-4xl outline-none' placeholder='Search here' />
                        <IoSearchOutline className='absolute top-9 left-4 text-xl'></IoSearchOutline>
                        <button  type='submit' className='bg-primary text-lg my-5 py-3 px-8  text-black font-bold rounded-r-4xl cursor-pointer'>Search</button>
                    </form>
                    {/* for small screen  */}
                    <form className="md:hidden flex flex-col justify-center items-center my-10" onSubmit={(e)=>handleSearch(e)}>
                        <div className="relative w-full">
                            <input
                                type="text"
                                name='username'
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


                </div>
                {
                    isLoading ?
                        <div className='min-w-full flex justify-center items-center my-10'>
                            <SyncLoader size={10} color='#CAEB66' />
                        </div>
                        :
                        /*------------------- All Deleveries Table to Show Info -----------------------------*/
                        <div>
                            <div className="overflow-x-auto border border-gray-300 rounded-2xl my-7 ">
                                <table className="table table-zebra">
                                    {/* ------------- Tables head (Columns) --------------------*/}
                                    <thead className='text-center bg-secondary text-white'>
                                        <tr className='text-white'>
                                            <th className='py-4 rounded-tl-xl'>No.</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>User Since</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            //==================== Table Information(Rows) =================== 
                                            allUsers.map((user, index) =>
                                                <tr key={index} className='text-black hover:bg-gray-100 text-center'>
                                                    <th>{index + 1}</th>
                                                    <th>
                                                        {
                                                            user.photoURL ? <img src={user.photoURL} alt="" className='h-10 w-10 rounded-lg' /> :
                                                                <img src={defaultProfile} alt="" className='h-10 w-10 rounded-lg' />
                                                        }

                                                    </th>
                                                    <td>{user.name || user.displayName}</td>
                                                    <td >{user.email}</td>
                                                    <td >{formatDate(user.createdAt)}</td>
                                                    <td>
                                                        {user.role === "user" ? (
                                                            <p className='text-blue-600 font-bold'>User</p>
                                                        ) : user.role === "rider" ? (
                                                            <p className='text-[#F99D25] font-bold'>Rider</p>
                                                        ) : (
                                                            <p className='text-[#0AB010] font-bold'>Admin</p>
                                                        )}
                                                    </td>
                                                    <td className='flex justify-center gap-2'>
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
                }

            </div>
        </div>
    );
};

export default Users;