import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { use, useRef, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import useAxios from '../../../Hooks/Axios/useAxios';
import { FaShippingFast } from "react-icons/fa";
import { TbPaywall } from "react-icons/tb";
import { GiCash } from "react-icons/gi";
import { useNavigate } from 'react-router';
import { SyncLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const AssignRider = () => {
    const { user } = use(AuthContext);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const modalRef = useRef();
    const queryClient = useQueryClient() ;
    const [currentParcel, setCurrentParcel] = useState(null);

    // ********** Fetch All Parcel Data using TanStack Query and Axios *************** 
    const { data: allParcel = [], refetch, isLoading } = useQuery({
        queryKey: ['parcel', `${user?.email}`],
        queryFn: async () => {
            const result = await axiosInstance.get(`/parcel?deliveryStatus=awaiting_pickup`)
            // console.log(result.data);
            return result.data;
        }
    })
    // ********** Fetch All Available Rider Data using TanStack Query and Axios *************** 
    const { data: riders = [] } = useQuery({
        enabled: !!currentParcel,
        queryKey: ['rider', currentParcel?.SenderDistrict, 'available'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/riders?status=approved&work_status=available&district=${currentParcel.SenderDistrict}`)
            return res.data
        }
    })

    //* Show Available Riders 
    const handleAvailableRider = (parcel) => {
        // console.log("hello", parcel._id);
        setCurrentParcel(parcel);
        modalRef.current.showModal();
    }

    //* Handle Parcel Assignment 
    const handleAssign = (rider) => {
        console.log(`Assigning ${rider.name}...`);

        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to assign this task to ${rider.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm !",
            target: modalRef.current
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log('assigned');
                const info = {
                    parcel_id: currentParcel._id,
                    rider_id: rider._id,
                    rider_name: rider.name,
                    rider_email: rider.email,
                }
                axiosInstance.patch(`/parcel/${currentParcel._id}`, info).then((res) => {
                    const result = res.data;
                    if (result.modifiedCount) {
                        if (modalRef.current) {
                            modalRef.current.close();
                        }
                        queryClient.invalidateQueries({queryKey: ['rider', currentParcel?.SenderDistrict, 'available']}) ;
                        queryClient.invalidateQueries({queryKey: ['parcel', user?.email]})
                        Swal.fire({
                            title: "Assigned!",
                            text: `${rider.name} has been successfully assigned.`,
                            icon: "success",

                        });
                    }
                })

            }
        });
    }

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto '>
            <div className='min-w-full lg:max-w-[95%] border border-gray-300 shadow-md mx-auto bg-[#f7fafd] p-5 py-10 lg:p-20 rounded-2xl'>
                <h1 className='text-secondary text-4xl font-extrabold text-center mb-2'>Assign Rider</h1>
                <p className='max-w-xl mx-auto text-center mb-4'> Manage all paid parcels awaiting pickup and quickly assign available riders for smooth and timely deliveries.</p>
                {/* -----------------Parent Div of Statistics----------------- */}
                <div className='flex flex-wrap justify-center items-center gap-5'>
                    {/* ================= Total Parcel Div ====================*/}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <FaShippingFast className='text-xl'></FaShippingFast>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Total Parcel </p>
                            <p className='font-extrabold text-2xl text-black text-center'>{allParcel.length}</p>
                        </div>
                    </div>

                    {/*==================== Total Paid Parcel ==================== */}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <GiCash className='text-xl'></GiCash>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Total Paid </p>
                            <p className='font-extrabold text-2xl text-black text-center'>10</p>
                        </div>
                    </div>

                    {/* ==================== TOtal  Unpaid Parcel ==================== */}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <TbPaywall className='text-xl'></TbPaywall>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Total Unpaid</p>
                            <p className='font-extrabold text-2xl text-black text-center'>20</p>
                        </div>
                    </div>

                </div>
                {
                    isLoading ?
                        <div className='min-w-full flex justify-center items-center my-10'>
                            <SyncLoader size={10} color='#CAEB66' />
                        </div> :
                        /*------------------- All Deleveries Table to Show Info -----------------------------*/
                        <div>
                            <div className="overflow-x-auto border border-gray-300 rounded-2xl my-7 ">
                                <table className="table table-zebra">
                                    {/* ------------- Tables head (Columns) --------------------*/}
                                    <thead className='text-center bg-secondary text-white'>
                                        <tr>
                                            <th className='py-4 rounded-tl-xl'>No.</th>
                                            <th>Parcel ID</th>
                                            <th>Parcel Name</th>
                                            <th>Delivery Status</th>
                                            <th>Amount</th>
                                            <th>District</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            //==================== Table Information(Rows) =================== 
                                            allParcel.map((parcel, index) =>
                                                <tr key={index} className='text-black hover:bg-gray-100 text-center'>
                                                    <th>{index + 1}</th>
                                                    <td>#SPX-{(parcel._id.slice(-4)).toUpperCase()}</td>
                                                    <td >{parcel.parcelname}</td>
                                                    <td >{parcel.deliveryStatus ? parcel.deliveryStatus : "Processing"}</td>
                                                    <td>{parcel.amount}</td>
                                                    <td>{parcel.SenderDistrict}</td>
                                                    <td className='flex justify-center gap-2'>
                                                        <button onClick={() => handleAvailableRider(parcel)} className='btn btn-primary text-black font-bold'>Available Riders</button>
                                                        <button onClick={() => navigate(`/details/${parcel._id}`)} className='btn bg-[#94c6cb38] text-black '>View</button>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>


                }
                <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                    {/* Increased max-width to give the flex layout room to breathe */}
                    <div className="modal-box w-11/12 max-w-2xl">
                        <h3 className="font-bold text-lg mb-4 text-center">Available Rider</h3>

                        {/* Conditional Rendering based on riders array length */}
                        {riders.length === 0 ? (
                            /* Empty State Banner */
                            <div className="bg-blue-50 border-l-4 border-primary text-secondary p-4 rounded shadow-sm">
                                <p className="font-semibold">No riders available at the moment.</p>
                                <p className="text-sm">Please check back later or refresh the list.</p>
                            </div>
                        ) : (
                            /* Riders List */
                            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2">
                                {riders.map((rider, index) => (
                                    <div
                                        key={rider._id?.$oid || index}
                                        className="flex flex-col sm:flex-row items-center justify-between bg-base-200/50 border border-base-300 p-4 rounded-xl gap-4"
                                    >
                                        {/* Left Side: Image & Info */}
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <div className="avatar">
                                                <div className="w-14 h-14 rounded-full ">
                                                    <img src={rider.photoURL} alt={rider.name} className="object-cover" />
                                                </div>
                                            </div>

                                            <div className="flex flex-col">
                                                <h4 className="font-bold text-base">{rider.name}</h4>
                                                <p className="text-sm text-gray-500 truncate max-w-[200px]">
                                                    {rider.email}
                                                </p>
                                                <div className="flex gap-2 mt-1 items-center text-xs">
                                                    <span className="bg-base-300 px-2 py-1 rounded-md font-medium">
                                                        {rider.district}
                                                    </span>
                                                    <span className={`px-2 py-1  rounded-md font-bold capitalize ${rider.work_status === 'available' ? 'bg-success/20 text-secondary' : 'bg-warning/20 text-warning'}`}>
                                                        {rider.work_status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: Action Button */}
                                        <button onClick={() => handleAssign(rider)} className="btn btn-primary font-bold text-black btn-sm w-full sm:w-auto mt-2 sm:mt-0">
                                            Assign
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

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

export default AssignRider;