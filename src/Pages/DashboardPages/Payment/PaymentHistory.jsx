import React, { use, useEffect, useState } from 'react';
import useAxios from '../../../Hooks/Axios/useAxios';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';

const PaymentHistory = () => {
    const [allPayment,setAllPayment] = useState([]) ;
    const axiosInstance = useAxios() ;
    const navigate = useNavigate() ;
    const {user} = use(AuthContext) ;
    
    useEffect(()=>{
        axiosInstance.get(`/payhistory?email=${user.email}`)
        .then(result=>{
            // console.log(result.data)
            setAllPayment(result.data) ;
        })
    },[axiosInstance,user.email])


    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto '>
            <div className='min-w-full lg:max-w-[95%] border border-gray-300 shadow-md mx-auto bg-[#f7fafd] p-5 py-10 lg:p-20 rounded-2xl'>
                <h1 className='text-secondary text-4xl font-extrabold text-center mb-2'>Payment History</h1>
                <p className='max-w-xl mx-auto text-center mb-4'>Keep track of all your payments in one place. Review your transactions, track your parcels, and manage your orders effortlessly.</p>

                <div className="overflow-x-auto border border-gray-300 py-2  rounded-2xl my-7 ">
                    <table className="table table-zebra">
                        {/* ------------- Tables head (Columns) --------------------*/}
                        <thead className='text-center'>
                            <tr className='text-black'>
                                <th >No.</th>
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
                                                <p>{payment.receiverName}</p>
                                                <p>{payment.receiverAddress}</p>
                                                <p>{payment.receiverContact}</p>
                                            </div>
                                        }</td>
                                        <td>{payment.tracking_id}</td>
                                        <td className='flex justify-center'>{<div className='flex gap-1'>
                                            <p>{payment.amount} {payment.currency}</p>
                                            <p className='text-green-600 font-bold'>( {(payment.payment_status).toUpperCase()} )</p> 
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
        </div>
    );
};

export default PaymentHistory;