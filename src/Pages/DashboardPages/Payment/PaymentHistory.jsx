import React, { use, useEffect, useState } from 'react';
import useAxios from '../../../Hooks/Axios/useAxios';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { SyncLoader } from 'react-spinners';
import { GiCash } from "react-icons/gi"; // Imported an icon for the empty state

const PaymentHistory = () => {
    // const [allPayment,setAllPayment] = useState([]) ;
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const { user } = use(AuthContext);

    // useEffect(()=>{
    //     axiosInstance.get(`/payhistory?email=${user.email}`)
    //     .then(result=>{
    //         // console.log(result.data)
    //         setAllPayment(result.data) ;
    //     })
    // },[axiosInstance,user.email])

    const { data: allPayment = [], refetch, isLoading } = useQuery({
        queryKey: ["payhistory", `${user.email}`],
        queryFn: async () => {
            const result = await axiosInstance.get(`/payhistory?email=${user.email}`)
            return result.data;
        }
    })

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto '>
            <div className='min-w-full lg:max-w-[95%] border border-gray-300 shadow-md mx-auto bg-[#f7fafd] p-5 py-10 lg:p-20 rounded-2xl'>
                <h1 className='text-secondary text-4xl font-extrabold text-center mb-2'>Payment History</h1>
                <p className='max-w-xl mx-auto text-center mb-4'>Keep track of all your payments in one place. Review your transactions, track your parcels, and manage your orders effortlessly.</p>
                {
                    isLoading ? (
                        <div className='min-w-full flex justify-center items-center my-10'>
                            <SyncLoader size={10} color='#CAEB66' />
                        </div>
                    ) : allPayment.length === 0 ? (
                        /*------------------- Empty State When No Payment History Exists -----------------------------*/
                        <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-300 rounded-2xl my-7 shadow-sm">
                            <GiCash className="text-6xl text-gray-300 mb-4" />
                            <p className="text-2xl font-bold text-gray-700">No Payment History</p>
                            <p className="text-gray-500 mt-2 text-center max-w-md">You haven't made any parcel payments yet. Once you complete a transaction, your receipts will appear here.</p>
                        </div>
                    ) : (
                        <div>
                            <div className="overflow-x-auto border border-gray-300 rounded-2xl my-7 ">
                                <table className="table table-zebra">
                                    {/* ------------- Tables head (Columns) --------------------*/}
                                    <thead className='text-center bg-secondary text-white'>
                                        <tr >
                                            <th className='py-4 rounded-tl-xl'>No.</th>
                                            <th>Parcel ID</th>
                                            <th>Receipent Info</th>
                                            <th>Tracking ID</th>
                                            <th>Amount</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            // ==================== Table Information(Rows) =================== 
                                            allPayment.map((payment, index) =>
                                                <tr key={index} className='text-black hover:bg-gray-100 text-center'>
                                                    <th>{index + 1}</th>
                                                    <td>#SPX-{(payment.parcel_id.slice(-4)).toUpperCase()}</td>
                                                    <td >{
                                                        <div>
                                                            <p className="font-bold">{payment.receiverName}</p>
                                                            <p className="text-xs text-gray-500">{payment.receiverAddress}</p>
                                                            <p className="text-xs text-gray-500">{payment.receiverContact}</p>
                                                        </div>
                                                    }</td>
                                                    <td className="font-semibold text-gray-700">{payment.tracking_id}</td>
                                                    <td className='flex justify-center'>{<div className='flex gap-1 items-center'>
                                                        <p className="font-bold">৳{payment.amount}</p>
                                                        <p className='text-green-600 font-bold text-xs'>( {(payment.payment_status).toUpperCase()} )</p>
                                                    </div>}</td>
                                                    <td>
                                                        <button onClick={() => navigate(`/details/${payment.parcel_id}`)} className='btn bg-[#94c6cb38] text-black '>View</button>
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

export default PaymentHistory;