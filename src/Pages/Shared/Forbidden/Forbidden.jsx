import React from 'react';
import fbimage from '../../../assets/Others/forbidden.png'
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto '>
            <div className='min-w-full lg:max-w-[95%] mx-auto bg-white p-5 py-10 lg:p-20 rounded-2xl'>
                <div className='flex justify-center items-center'>
                    <img src={fbimage} alt="" className='h-100 w-100' />
                </div>

                <p className='text-center text-red-600 font-extrabold text-3xl md:text-4xl'>
                    Forbidden Access !!
                </p>

                <p className='text-center font-xl mt-3 mb-1 text-secondary font-medium'>
                    You Do Not Have Permission
                </p>

                <p className='text-center font-lg max-w-lg mx-auto '>
                    Sorry, you are not authorized to access this page. Please return to the homepage or go back to your dashboard.
                </p>

                <div className='flex justify-center gap-4 mt-5 flex-wrap'>
                    <Link to={'/'}>
                        <button className='btn btn-primary text-black font-bold px-10 my-1'>
                            Home
                        </button>
                    </Link>

                    <Link to={'/dashboard'}>
                        <button className='btn btn-outline btn-primary text-black font-bold px-10 my-1'>
                            Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;