import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { use, useRef, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import useAxios from '../../../Hooks/Axios/useAxios';
import { FaShippingFast } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { VscChecklist } from "react-icons/vsc";
import { useNavigate } from 'react-router';
import { SyncLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { MdAssignmentTurnedIn } from "react-icons/md";

const AssignRider = () => {
    const { user } = use(AuthContext);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const modalRef = useRef();
    const queryClient = useQueryClient();
    const [currentParcel, setCurrentParcel] = useState(null);

    // ********** Fetch All Parcel Data *************** 
     const { data: allParcel = [], refetch, isLoading } = useQuery({
        queryKey: ['parcel', `${user?.email}`],
        queryFn: async () => {
            // Fetch ALL parcels so we can split them into Unassigned and Assigned
            const result = await axiosInstance.get(`/parcel`)
            return result.data;
        }
    })

    // ********** Filter Parcels *************** 
    const unassignedParcels = allParcel.filter(p => p.deliveryStatus === 'awaiting_pickup');
    // If a parcel has a rider_id, it means it has been assigned
    const assignedParcels = allParcel.filter(p => p.rider_id);

    // ********** Fetch All Available Rider Data *************** 
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
        setCurrentParcel(parcel);
        modalRef.current.showModal();
    }

    //* Handle Parcel Assignment 
    const handleAssign = (rider) => {
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
                        queryClient.invalidateQueries({ queryKey: ['rider', currentParcel?.SenderDistrict, 'available'] });
                        queryClient.invalidateQueries({ queryKey: ['parcel', user?.email] });
                        Swal.fire({
                            title: "Assigned!",
                            text: `${rider.name} has been successfully assigned.`,
                            icon: "success",
                        });
                        refetch();
                    }
                })
            }
        });
    }

    // Helper function to format status strings beautifully
    const formatStatus = (status) => {
        if (!status) return "Processing";
        return status
            .replace(/[_-]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto '>
            <div className='min-w-full lg:max-w-[95%] border border-gray-300 shadow-md mx-auto bg-[#f7fafd] p-5 py-10 lg:p-20 rounded-2xl'>
                
                <h1 className='text-secondary text-4xl font-extrabold text-center mb-2'>Assign Rider</h1>
                <p className='max-w-xl mx-auto text-center mb-4'> Manage all paid parcels awaiting pickup and quickly assign available riders for smooth and timely deliveries.</p>
                
                {/* -----------------Parent Div of Statistics----------------- */}
                <div className='flex flex-wrap justify-center items-center gap-5 mb-10'>
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <FaShippingFast className='text-xl'></FaShippingFast>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Total Parcel </p>
                            <p className='font-extrabold text-2xl text-black text-center'>{allParcel.length}</p>
                        </div>
                    </div>

                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <MdPendingActions className='text-xl text-warning'></MdPendingActions>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Awaiting Pickup</p>
                            <p className='font-extrabold text-2xl text-black text-center'>{unassignedParcels.length}</p>
                        </div>
                    </div>

                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <VscChecklist className='text-xl text-success'></VscChecklist>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Assigned Parcels</p>
                            <p className='font-extrabold text-2xl text-black text-center'>{assignedParcels.length}</p>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className='min-w-full flex justify-center items-center my-10'>
                        <SyncLoader size={10} color='#CAEB66' />
                    </div>
                ) : (
                    <div className="flex flex-col gap-12">
                        
                        {/* ==================== TABLE 1: AWAITING PICKUP ==================== */}
                        <div className='w-full'>
                            <div className='flex items-center gap-2 mb-4 text-xl font-bold text-gray-800 ml-2'>
                                <MdPendingActions className='text-warning text-2xl' /> Needs Assignment ({unassignedParcels.length})
                            </div>
                            
                            {unassignedParcels.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 bg-white border border-gray-300 rounded-2xl shadow-sm">
                                    <MdPendingActions className="text-6xl text-gray-300 mb-4" />
                                    <p className="text-xl font-bold text-gray-700">No Pending Parcels</p>
                                    <p className="text-gray-500 mt-1">All paid parcels have been assigned to riders!</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto border border-gray-300 rounded-2xl bg-white shadow-sm">
                                    <table className="table table-zebra w-full">
                                        <thead className='text-center bg-secondary text-white'>
                                            <tr>
                                                <th className='py-4 rounded-tl-xl'>No.</th>
                                                <th>Tracking ID</th>
                                                <th>Parcel Name</th>
                                                <th>Delivery Status</th>
                                                <th>District</th>
                                                <th className='rounded-tr-xl'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {unassignedParcels.map((parcel, index) => (
                                                <tr key={parcel._id} className='text-black hover:bg-gray-100 text-center'>
                                                    <th>{index + 1}</th>
                                                    <td className="font-semibold text-gray-600">{parcel.tracking_id || `#SPX-${(parcel._id.slice(-4)).toUpperCase()}`}</td>
                                                    <td className="font-medium text-gray-800">{parcel.parcelname}</td>
                                                    <td className="font-semibold text-warning">{formatStatus(parcel.deliveryStatus)}</td>
                                                    <td>{parcel.SenderDistrict}</td>
                                                    <td className='flex justify-center gap-2'>
                                                        <button onClick={() => handleAvailableRider(parcel)} className='btn btn-sm h-10 bg-primary text-black font-bold border-none'>Assign Rider</button>
                                                        <button onClick={() => navigate(`/details/${parcel._id}`)} className='btn btn-sm h-10 bg-[#94c6cb38] text-black border-none'>View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>


                        {/* ==================== TABLE 2: ASSIGNED & IN TRANSIT ==================== */}
                        <div className='w-full'>
                            <div className='flex items-center gap-2 mb-4 text-xl font-bold text-gray-800 ml-2'>
                                <MdAssignmentTurnedIn className='text-success text-2xl' /> Assigned Parcels ({assignedParcels.length})
                            </div>
                            
                            {assignedParcels.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 bg-white border border-gray-300 rounded-2xl shadow-sm">
                                    <VscChecklist className="text-6xl text-gray-300 mb-4" />
                                    <p className="text-xl font-bold text-gray-700">No Assigned Parcels</p>
                                    <p className="text-gray-500 mt-1">Assign riders to parcels to see them here.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto border border-gray-300 rounded-2xl bg-white shadow-sm">
                                    <table className="table table-zebra w-full">
                                        <thead className='text-center bg-[#1E293B] text-white'>
                                            <tr>
                                                <th className='py-4 rounded-tl-xl'>No.</th>
                                                <th>Tracking ID</th>
                                                <th>Parcel Name</th>
                                                <th>Assigned Rider</th>
                                                <th>Current Status</th>
                                                <th className='rounded-tr-xl'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assignedParcels.map((parcel, index) => (
                                                <tr key={parcel._id} className='text-black hover:bg-gray-100 text-center'>
                                                    <th>{index + 1}</th>
                                                    <td className="font-semibold text-gray-600">{parcel.tracking_id || `#SPX-${(parcel._id.slice(-4)).toUpperCase()}`}</td>
                                                    <td className="font-medium text-gray-800">{parcel.parcelname}</td>
                                                    <td className="font-bold">{parcel.rider_name}</td>
                                                    <td className="font-semibold text-gray-700">{formatStatus(parcel.deliveryStatus)}</td>
                                                    <td className='flex justify-center gap-2'>
                                                        <button onClick={() => navigate(`/details/${parcel._id}`)} className='btn btn-sm h-10 bg-[#94c6cb38] text-black border-none'>View Details</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                    </div>
                )}


                {/* ==================== MODAL: AVAILABLE RIDERS ==================== */}
                <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box w-11/12 max-w-2xl">
                        <h3 className="font-bold text-lg mb-4 text-center">Available Riders</h3>

                        {riders.length === 0 ? (
                            <div className="bg-blue-50 border-l-4 border-primary text-secondary p-4 rounded shadow-sm">
                                <p className="font-semibold">No riders available at the moment.</p>
                                <p className="text-sm">Please check back later or refresh the list.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2">
                                {riders.map((rider, index) => (
                                    <div
                                        key={rider._id?.$oid || index}
                                        className="flex flex-col sm:flex-row items-center justify-between bg-base-200/50 border border-base-300 p-4 rounded-xl gap-4"
                                    >
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
                                                    <span className={`px-2 py-1 rounded-md font-bold capitalize ${rider.work_status === 'available' ? 'bg-success/20 text-secondary' : 'bg-warning/20 text-warning'}`}>
                                                        {rider.work_status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

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