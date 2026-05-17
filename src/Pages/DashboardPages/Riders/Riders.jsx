import { useQuery } from '@tanstack/react-query';
import React, { use, useRef, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import { VscRequestChanges } from "react-icons/vsc";
import { VscCheck } from "react-icons/vsc";
import { VscChromeClose } from "react-icons/vsc";
import useAxios from '../../../Hooks/Axios/useAxios';
import { SyncLoader } from 'react-spinners';
import Swal from 'sweetalert2';


const Riders = () => {
    const { user } = use(AuthContext);
    const axiosInstance = useAxios();
    const modalRef = useRef();
    const [curRider, setCurRider] = useState([]);
    // console.log(curRider) ;

    // Loading All Riders Data 
    const { data: allRiders = [], refetch, isLoading } = useQuery({
        queryKey: ['Riders', `${user.email}`],
        queryFn: async () => {
            const result = await axiosInstance.get('/riders')
            // console.log(result.data);
            return result.data
        }

    })

    // Counting Approved or Rejected Riders 
    var approved = 0, rejected = 0;
    allRiders.map((rid) => {
        if (rid.status === 'approved') approved++;
        if (rid.status === 'rejected') rejected++;
    })

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

    //------------------ Show Rider info in an modal ----------------------
    const handleDetails = (rider_id) => {
        // console.log(rider_id);
        modalRef.current.showModal();
        axiosInstance.get(`/riders/${rider_id}`).then((res) => {
            const riderInfo = res.data;
            // console.log("Rider Info : ", riderInfo)
            setCurRider(riderInfo)
        })
    }

    // ----------------- Handle Approve/Reject Functionality -----------------
    const handleAction = (rider, status) => {
        // console.log(rider , status) ;
        const updateFields = { email: rider.email, status: status }
        console.log(updateFields);
        console.log(rider._id);
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
                axiosInstance.post(`/riders/${rider._id}`, updateFields).then((res) => {
                    const result = res.data;
                    if (result.modifiedCount) {
                        refetch();
                        Swal.fire({
                            title: `${status.toUpperCase()}!`,
                            text: `The Rider has been ${status}`,
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
                {
                    isLoading ?
                        <div className='min-w-full flex justify-center items-center my-10'>
                            <SyncLoader size={10} color='#CAEB66' />
                        </div>
                        :
                        /*------------------- All Deleveries Table to Show Info -----------------------------*/
                        <div>
                            <div className="overflow-x-auto border border-gray-300  rounded-2xl my-7 ">
                                <table className="table table-zebra">
                                    {/* ------------- Tables head (Columns) --------------------*/}
                                    <thead className='text-center bg-secondary text-white'>
                                        <tr>
                                            <th className="py-4 rounded-tl-xl">No.</th>
                                            <th className="py-4">Name</th>
                                            <th className="py-4">Email</th>
                                            <th className="py-4">Apply Date</th>
                                            <th className="py-4">Status</th>
                                            <th className="py-4">Region</th>
                                            <th className="py-4 rounded-tr-xl">Actions</th>
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
                                                    <td>
                                                        {rider.status === "pending" ? (
                                                            <p className='text-[#F99D25] font-bold'>Pending</p>
                                                        ) : rider.status === "approved" ? (
                                                            <p className='text-[#0AB010] font-bold'>Approved</p>
                                                        ) : (
                                                            <p className='text-red-600 font-bold'>Rejected</p>
                                                        )}
                                                    </td>
                                                    <td>{rider.region}</td>
                                                    <td className='flex justify-center gap-2'>
                                                        {
                                                            rider.status === "pending" && <>
                                                                <button onClick={() => handleAction(rider, "approved")} className='btn bg-primary text-black '>Approve</button>
                                                                <button onClick={() => handleAction(rider, "rejected")} className='btn bg-[#e833301a] text-[#E83330] '>Reject</button>
                                                            </>
                                                        }
                                                        <button onClick={() => handleDetails(rider._id)} className='btn bg-gray text-black '>Details</button>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                }


                {/* Modal to Show Rider Details  */}
                <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div className='bg-[#F5F5F5] p-5 rounded-xl space-y-1 flex-1 font-bold'>
                            <p className='text-3xl font-bold mb-3 text-center text-secondary'>Rider Information</p>
                            <p >Name : <span className='text-[#374151] font-semibold'>{curRider.name}</span></p>
                            <p >Age : <span className='text-[#374151] font-semibold'>{curRider.age}</span></p>
                            <p >Contact : <span className='text-[#374151] font-semibold'>{curRider.contact}</span></p>
                            <p >Email : <span className='text-[#374151] font-semibold'>{curRider.email}</span></p>
                            <p >NID : <span className='text-[#374151] font-semibold'>{curRider.nid}</span></p>
                            <p >Address : <span className='text-[#374151] font-semibold'>{curRider.wirehouse} , {curRider.district} , {curRider.region}</span></p>

                            <p>Applied At : <span className='text-[#374151] font-semibold'>{formatDate(curRider.createdAt)}</span></p>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Riders;