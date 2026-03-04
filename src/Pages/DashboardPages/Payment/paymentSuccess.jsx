import React, { useEffect } from 'react';
import paysucess from '../../../assets/Others/paymentDone.png'
import { Link, useParams, useSearchParams } from 'react-router';
import axios from 'axios';
import useAxios from '../../../Hooks/Axios/useAxios';


// Status Update After a Payment is Complete like unpaid -> paid
const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get("session_id");
    console.log(session_id) ;
    const axiosInstance = useAxios() ;

    useEffect(()=>{
        if(session_id){
            axiosInstance.patch(`/session-status?session_id=${session_id}`)
            .then(res => {
                console.log(res.data) ; 
            })
        }
    },[session_id,axiosInstance])

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto '>
            <div className='min-w-full lg:max-w-[95%] mx-auto bg-white p-5 py-10 lg:p-20 rounded-2xl'>
                <div className='flex justify-center items-center'>
                    <img src={paysucess} alt="" className='h-80 w-80' />
                </div>
                <p className='text-center text-secondary font-extrabold text-3xl md:text-4xl'>Payment Succeesfull !!</p>
                <p className='text-center font-xl my-3 text-secondary font-medium'>Transaction Approved</p>
                <div className='flex justify-center'>
                    <Link to={'/deliveries'}>
                        <button className='btn btn-primary text-black font-bold px-10 my-1'>Dismiss</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;