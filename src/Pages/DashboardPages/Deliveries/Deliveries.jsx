import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
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
    const { data: allParcel = [] , refetch } = useQuery({
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

    // ------------------ Handle Delete Operation  -----------------------
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
                            refetch() ;
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

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto '>
            <div className='min-w-full lg:max-w-[95%] mx-auto bg-white p-5 py-10 lg:p-20 rounded-2xl'>
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
                                            <p className='text-[#F99D25]'>Unpaid</p> :
                                            <p className='text-[#0AB010]'>Paid</p>
                                        }</td>
                                        <td className='flex justify-center gap-2'>
                                            {parcel.paymentStatus === "unpaid" && <button className='btn btn-primary text-black '>Pay</button>}
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