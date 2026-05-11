import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';
import { TbPaywall } from 'react-icons/tb';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import { VscRequestChanges } from "react-icons/vsc";
import { VscCheck } from "react-icons/vsc";
import { VscChromeClose } from "react-icons/vsc";
import useAxios from '../../../Hooks/Axios/useAxios';

const Riders = () => {
    const { user } = use(AuthContext);
    const axiosInstance = useAxios();

    const { data: allRiders = [], refetch } = useQuery({
        queryKey: [Riders, `${user.email}`],
        queryFn: async () => {
            const result = await axiosInstance.get('/riders')
            console.log(result.data);
            return result.data
        }

    })

    var approved = 0 , rejected = 0 ;
    allRiders.map((rid)=> {
        if(rid.status === 'approved') approved++ ;
        if(rid.status === 'rejected') rejected++ ;
    })

    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto'>
            <div className='min-w-full lg:max-w-[95%] border border-gray-300 shadow-md mx-auto bg-[#f7fafd] p-5 py-10 lg:p-20 rounded-2xl'>
                <h1 className='text-secondary text-4xl font-extrabold text-center mb-2'>Rider Management</h1>
                <p className='max-w-xl mx-auto text-center mb-4'>Manage all rider applications in one place. Review rider details, approve trusted applicants, or reject requests to keep your delivery network organized and reliable.</p>
                {/* -----------------Parent Div of Statistics----------------- */}
                <div className='flex flex-wrap justify-center items-center gap-5'>

                    {/* ================= Total Rider Div ====================*/}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <VscRequestChanges className='text-xl'></VscRequestChanges>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Total Applications</p>
                            <p className='font-extrabold text-2xl text-black text-center'>{allRiders.length}</p>
                        </div>
                    </div>

                    {/*==================== Total Rejected ==================== */}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <VscCheck className='text-xl'></VscCheck >
                        </div>
                        <div>
                            <p className='font-bold text-center'>Approved Rider</p>
                            <p className='font-extrabold text-2xl text-black text-center'>{approved}</p>
                        </div>
                    </div>

                    {/* ==================== TOtal  Approved ==================== */}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            < VscChromeClose className='text-xl'></ VscChromeClose>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Rejected</p>
                            <p className='font-extrabold text-2xl text-black text-center'>{rejected}</p>
                        </div>
                    </div>

                </div>
                {/*------------------- All Deleveries Table to Show Info -----------------------------*/}
                <div className="overflow-x-auto border border-gray-300 py-2  rounded-2xl my-7 ">
                    <table className="table table-zebra">
                        {/* ------------- Tables head (Columns) --------------------*/}
                        <thead className='text-center'>
                            <tr className='text-black'>
                                <th >No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Apply Date</th>
                                <th>Status</th>
                                <th>Region</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //==================== Table Information(Rows) =================== 
                                allRiders.map((rider, index) =>
                                    <tr key={index} className='text-black hover:bg-gray-100 text-center'>
                                        <th>{index + 1}</th>
                                        <td>{rider.name}</td>
                                        <td >{rider.email}</td>
                                        <td >{formatDate(rider.createdAt)}</td>
                                        <td>{rider.status === "pending" ?
                                            <p className='text-[#F99D25] font-bold'>Pending</p> :
                                            <p className='text-[#0AB010] font-bold'>Approved</p>
                                        }</td>
                                        <td>{rider.region}</td>
                                        <td className='flex justify-center gap-2'>
                                            <button className='btn bg-primary text-black '>Approve</button>
                                            <button className='btn bg-[#e833301a] text-[#E83330] '>Reject</button>
                                            <button className='btn bg-gray text-black '>Details</button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Riders;