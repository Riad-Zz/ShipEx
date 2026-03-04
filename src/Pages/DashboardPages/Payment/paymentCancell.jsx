import React from 'react';
import payfail from '../../../assets/Others/failed.png'
import { Link} from 'react-router';

const PaymentCancell = () => {
    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto '>
            <div className='min-w-full lg:max-w-[95%] mx-auto bg-white p-5 py-10 lg:p-20 rounded-2xl'>
                <div className='flex justify-center items-center'>
                    <img src={payfail} alt="" className='h-80 w-80' />
                </div>
                <p className='text-center text-secondary font-extrabold text-3xl md:text-4xl'>Payment Failed !!</p>
                <p className='text-center font-xl my-3 font-bold text-red-500'>Transaction Cancelled</p>
                <div className='flex justify-center'>
                    <Link to={'/deliveries'}>
                        <button className='btn btn-primary text-black font-bold px-10 my-1'>Try Again</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancell;