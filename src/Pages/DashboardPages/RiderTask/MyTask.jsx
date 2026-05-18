import React, { use } from 'react';
import Swal from 'sweetalert2';
import { VscCheck, VscChromeClose, VscInbox } from "react-icons/vsc";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form'; 
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import useAxios from '../../../Hooks/Axios/useAxios';
import { SyncLoader } from 'react-spinners'; 

const MyTask = () => {
    const { user } = use(AuthContext);
    const axiosInstance = useAxios();
    const { register, getValues } = useForm();

    const { data: tasks = [], refetch, isLoading } = useQuery({
        queryKey: ['task', `${user?.email}`],
        queryFn: async () => {
            const res = await axiosInstance.get(`/parcel?riderEmail=${user.email}`)
            return res.data;
        }
    })

    // Filtering data for the two tables
    const assignedTasks = tasks.filter(t => t.deliveryStatus !== 'delivered');
    const deliveredTasks = tasks.filter(t => t.deliveryStatus === 'delivered');

    // ----------------- Handlers -----------------

    const handleAccept = (task) => {
        axiosInstance.patch(`/parcel/rider-update/${task._id}`, { action: 'accept' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Accepted!",
                        text: `You have accepted this ride. Expected Earning: ৳${res.data.rider_earning}`,
                        icon: "success",
                        timer: 2500,
                        showConfirmButton: false
                    });
                }
            })
    };

    const handleReject = (task) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to reject this assigned parcel?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.patch(`/parcel/rider-update/${task._id}`, { 
                    action: 'reject', 
                    rider_id: task.rider_id 
                })
                .then(() => {
                    refetch();
                    Swal.fire("Rejected!", "The parcel has been removed from your list.", "error");
                })
            }
        });
    };

    const handleStatusUpdate = (task) => {
        const newStatus = getValues(task._id); 
        if (newStatus === task.deliveryStatus) return; 

        axiosInstance.patch(`/parcel/rider-update/${task._id}`, { 
            action: 'update_status', 
            status: newStatus,
            rider_id: task.rider_id 
        })
        .then(() => {
            refetch();
            if (newStatus === 'delivered') {
                Swal.fire({
                    title: "Delivered!",
                    text: "Parcel moved to your delivered list. You can now cashout!",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Status Updated",
                    text: `Parcel is now marked as ${newStatus.replace('_', ' ')}.`,
                    icon: "info",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        })
    };

    // Updated Cashout Handler communicating with Backend
    const handleCashout = (task) => {
        Swal.fire({
            title: "Confirm Cashout",
            text: `You will withdraw ৳${task.rider_earning || 0} to your account.`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#0AB010",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cashout!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.patch(`/parcel/rider-update/${task._id}`, { action: 'cashout' })
                .then(() => {
                    refetch(); 
                    Swal.fire({
                        title: "Cashout Successful!",
                        text: `৳${task.rider_earning} has been processed.`,
                        icon: "success"
                    });
                })
            }
        });
    };

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto'>
            <div className='min-w-full lg:max-w-[95%] border border-gray-300 shadow-md mx-auto bg-[#f7fafd] p-5 py-10 lg:p-20 rounded-2xl'>

                <h1 className='text-secondary text-4xl font-extrabold text-center mb-2'>My Deliveries</h1>
                <p className='max-w-2xl mx-auto text-center mb-10 text-gray-600'>
                    Manage your assigned parcels. Accept incoming rides, update their transit status, and cash out your successfully delivered orders.
                </p>

               
                {isLoading ? (
                    <div className='flex justify-center items-center py-20'>
                        <SyncLoader size={12} color='#CAEB66' />
                    </div>
                ) : (
                    <div className='flex flex-col gap-12'>

                        {/* ==================== TABLE 1: ASSIGNED & ACTIVE TASKS ==================== */}
                        <div className='w-full'>
                            <div className='flex items-center gap-2 mb-4 text-xl font-bold text-gray-800 ml-2'>
                                <MdPendingActions className='text-secondary text-2xl' /> Active Assigned Rides ({assignedTasks.length})
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                                <table className="table w-full text-sm">
                                    <thead className='text-center bg-[#1E293B] text-white'>
                                        <tr>
                                            <th className="py-4 rounded-tl-xl text-base">Tracking ID</th>
                                            <th className="py-4 text-base">Parcel Info</th>
                                            <th className="py-4 text-base">Destination</th>
                                            <th className="py-4 rounded-tr-xl text-base">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assignedTasks.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="p-0 border-none">
                                                    <div className="flex flex-col items-center justify-center py-16 bg-gray-50/50">
                                                        <VscInbox className="text-6xl text-gray-300 mb-4" />
                                                        <p className="text-xl font-bold text-gray-700">No Active Parcels</p>
                                                        <p className="text-gray-500 mt-1">You currently have no rides assigned or in transit.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            assignedTasks.map((task) => (
                                                <tr key={task._id} className='text-black hover:bg-blue-50 text-center border-b border-gray-100 transition-colors'>
                                                    <td className="font-semibold text-base">{task.tracking_id}</td>
                                                    <td>
                                                        <p className="font-bold text-gray-800 text-base">{task.parcelname}</p>
                                                        <p className="text-sm text-gray-500 mt-1">Total Fee: <span className="font-bold text-gray-800">৳{task.amount}</span></p>
                                                    </td>
                                                    <td className="text-sm">
                                                        <p className="font-bold text-gray-800 text-base">{task.receiverName}</p>
                                                        <p className="truncate w-40 mx-auto text-gray-500 mt-1" title={task.receiverAddress}>
                                                            {task.receiverAddress}
                                                        </p>
                                                    </td>
                                                    <td className="py-4">
                                                        {task.deliveryStatus === 'rider_assigned' ? (
                                                            <div className='flex flex-col sm:flex-row justify-center gap-3'>
                                                                <button onClick={() => handleAccept(task)} className='btn btn-sm h-10 px-6 bg-primary text-black hover:bg-[#b5d35b] border-none text-sm shadow-sm'>
                                                                    <VscCheck className="text-lg" /> Accept
                                                                </button>
                                                                <button onClick={() => handleReject(task)} className='btn btn-sm h-10 px-6 bg-red-500 text-white hover:bg-red-600 border-none text-sm shadow-sm'>
                                                                    <VscChromeClose className="text-lg" /> Reject
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-3">
                                                                <select
                                                                    {...register(task._id)}
                                                                    defaultValue={task.deliveryStatus}
                                                                    className="select select-bordered select-sm h-10 w-full max-w-[150px] bg-gray-50 font-medium text-sm"
                                                                >
                                                                    <option value="picked_up">Picked Up</option>
                                                                    <option value="on-transit">On-Transit</option>
                                                                    <option value="delivered">Delivered</option>
                                                                </select>
                                                                <button
                                                                    onClick={() => handleStatusUpdate(task)}
                                                                    className="btn btn-sm h-10 bg-primary text-black hover:bg-[#b5d35b] border-none w-full max-w-[150px] text-sm shadow-sm font-bold"
                                                                >
                                                                    Update Status
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ==================== TABLE 2: DELIVERED TASKS & CASHOUT ==================== */}
                        <div className='w-full'>
                            <div className='flex items-center gap-2 mb-4 text-xl font-bold text-gray-800 ml-2'>
                                <IoCheckmarkDoneCircleOutline className='text-green-600 text-3xl' /> Delivered Parcels ({deliveredTasks.length})
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                                <table className="table w-full text-sm">
                                    <thead className='text-center bg-secondary text-white'>
                                        <tr>
                                            <th className="py-4 rounded-tl-xl text-base">Tracking ID</th>
                                            <th className="py-4 text-base">Parcel</th>
                                            <th className="py-4 text-base">Your Earning</th>
                                            <th className="py-4 rounded-tr-xl text-base">Cashout Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deliveredTasks.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="p-0 border-none">
                                                    <div className="flex flex-col items-center justify-center py-16 bg-gray-50/50">
                                                        <VscInbox className="text-6xl text-gray-300 mb-4" />
                                                        <p className="text-xl font-bold text-gray-700">No Delivered Parcels</p>
                                                        <p className="text-gray-500 mt-1">Deliver some parcels to see them here and collect your cashout!</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            deliveredTasks.map((task) => {
                                                
                                                const isCashedOut = task.cashout_status === 'yes';

                                                return (
                                                    <tr key={task._id} className='text-black hover:bg-green-50 text-center border-b border-gray-100 transition-colors'>
                                                        <td className="font-mono text-gray-600 text-sm">{task.tracking_id}</td>
                                                        <td className="font-medium text-gray-800 text-base">{task.parcelname}</td>
                                                        
                                                        {/* Displaying Rider Earning instead of Parcel Amount */}
                                                        <td className="font-bold text-green-600 text-lg">৳{task.rider_earning || 0}</td>
                                                        
                                                        <td className="py-4">
                                                            <button
                                                                onClick={() => handleCashout(task)}
                                                                disabled={isCashedOut}
                                                                className={`btn btn-sm h-10 px-8 flex items-center gap-2 mx-auto text-sm rounded-lg shadow-md font-bold ${
                                                                    isCashedOut 
                                                                    ? 'bg-gray-200 text-gray-500 border-none cursor-not-allowed shadow-none' 
                                                                    : 'bg-black text-white hover:bg-gray-800 border-none'
                                                                }`}>
                                                                
                                                                {isCashedOut ? (
                                                                    <>
                                                                        <VscCheck className="text-lg" /> Cashed Out
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <FaMoneyBillWave className="text-primary text-lg" /> Cashout
                                                                    </>
                                                                )}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTask;