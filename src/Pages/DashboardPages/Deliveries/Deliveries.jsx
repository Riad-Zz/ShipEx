import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import useAxios from '../../../Hooks/Axios/useAxios';
import { FaShippingFast } from "react-icons/fa";
import { TbPaywall } from "react-icons/tb";
import { GiCash } from "react-icons/gi";
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Deliveries = () => {

    const { user } = use(AuthContext);
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    // ********** Fetch All Parcel Data using TanStack Query and Axios *************** 
    const { data: allParcel = [], refetch } = useQuery({
        queryKey: ['parcel', `${user?.email}`],
        queryFn: async () => {
            const result = await axiosInstance.get(`/parcel?email=${user.email}`)
            // console.log(result.data);
            return result.data;
        }
    })


    // ----------------- Count Total Unpaid Parcels --------------------------
    let totalUnpaid = 0, totalPaid = 0;
    allParcel.map((parcel) => {
        parcel.paymentStatus === "unpaid" ? totalUnpaid++ : totalPaid++;
    })

    // **********  Handle Delete Operation  ********** 
    const handleDelete = (id) => {

        // ------------- Sweet Aleart custom setup ----------------- 
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "swal-confirm-btn",
                cancelButton: "swal-cancel-btn"
            },
            buttonsStyling: false
        });

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#606060",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(id);


                // ----------- Calling Api to delete items by using id --------------
                axiosInstance.delete(`/parcel/${id}`)
                    .then(result => {
                        console.log(result.data);
                        if (result.data.deletedCount) {
                            refetch();
                            swalWithBootstrapButtons.fire({
                                title: "Parcel Deleted",
                                html: `<p>Your parcel has been Deleted.</p>`,
                                icon: "success",
                                confirmButtonText: "Got it!"
                            });
                        }
                    })


            }
        });
    }

    // ================ Handle Paymet Operations ====================== 
    const handlePayment = (parcel) => {

        // ==================== Sweet Alert Custom Controller for Parcel Payment ===================
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "swal-confirm-btn",
                cancelButton: "swal-cancel-btn"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Confirm Payment",
            html: `<p style="color:#0f172a; margin-bottom:8px;">You will be charged <span style="color:#16a34a; font-weight:600; font-size:18px;">৳${parcel.amount} taka</span></p> <p style="color:#64748b;">Do you want to proceed?</p>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Proceed to Payment",
            cancelButtonText: "Cancel",
            reverseButtons: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                //  ======== Procced to Payment Confirm ==============
                const paymentInfo = {
                    amount: parcel.amount,
                    parcelname: parcel.parcelname,
                    senderEmail: parcel.senderEmail,
                    id: parcel._id ,
                    receiverName : parcel.receiverName ,
                    receiverAddress : parcel.receiverAddress,
                    receiverContact : parcel.receiverContactNo
                }

                console.log(paymentInfo) ; 
                const res = await axiosInstance.post(`/create-checkout-session`, paymentInfo)
                window.location.href = res.data.url;

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                //  ============ Payment Cancel =================
                Swal.fire({
                    title: "Payment Cancelled",
                    html: `<p style="color:#d33;">Your parcel has been successfully Cancelled.</p><p style="color:#0f172a;">You can review your parcel details and try again.</p>`,
                    icon: "error",
                    confirmButtonText: "Got it!"
                });
            }
        });
    }

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto '>
            <div className='min-w-full lg:max-w-[95%] border border-gray-300 shadow-md mx-auto bg-[#f7fafd] p-5 py-10 lg:p-20 rounded-2xl'>
                <h1 className='text-secondary text-4xl font-extrabold text-center mb-2'>All Deliveries</h1>
                <p className='max-w-xl mx-auto text-center mb-4'>Everything you need to handle your orders in one place. Easily view, update, or settle your deliveries to keep your logistics moving.</p>
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
                            <p className='font-extrabold text-2xl text-black text-center'>{totalPaid}</p>
                        </div>
                    </div>

                    {/* ==================== TOtal  Unpaid Parcel ==================== */}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <TbPaywall className='text-xl'></TbPaywall>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Total Unpaid</p>
                            <p className='font-extrabold text-2xl text-black text-center'>{totalUnpaid}</p>
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
                                <th>Parcel ID</th>
                                <th>Parcel Name</th>
                                <th>Delivery Status</th>
                                <th>Amount</th>
                                <th>Payment</th>
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
                                        <td >Pending</td>
                                        <td>{parcel.amount}</td>
                                        <td>{parcel.paymentStatus === "unpaid" ?
                                            <p className='text-[#F99D25] font-bold'>Unpaid</p> :
                                            <p className='text-[#0AB010] font-bold'>Paid</p>
                                        }</td>
                                        <td className='flex justify-center gap-2'>
                                            {parcel.paymentStatus === "unpaid" && <button onClick={() => handlePayment(parcel)} className='btn btn-primary text-black '>Pay</button>}
                                            <button onClick={() => navigate(`/details/${parcel._id}`)} className='btn bg-[#94c6cb38] text-black '>View</button>
                                            <button onClick={() => handleDelete(parcel._id)} className='btn bg-[#e833301a] text-[#E83330] '>Delete</button>
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

export default Deliveries;