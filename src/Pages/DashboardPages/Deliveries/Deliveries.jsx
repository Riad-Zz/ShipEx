import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import useAxios from '../../../Hooks/Axios/useAxios';
import { FaShippingFast } from "react-icons/fa";
import { TbPaywall } from "react-icons/tb";
import { GiCash } from "react-icons/gi";

const Deliveries = () => {

    const { user } = use(AuthContext);
    const axiosInstance = useAxios();

    const { data: allParcel = [] } = useQuery({
        queryKey: ['parcel', `${user?.email}`],
        queryFn: async () => {
            const result = await axiosInstance.get(`/parcel?email=${user.email}`)
            console.log(result.data);
            return result.data;
        }
    })

    return (
        <div className='p-2 md:p-8 '>
            <div className='min-w-full lg:max-w-[95%] mx-auto bg-white p-5 py-10 lg:p-20 rounded-2xl'>
                <h1 className='text-secondary text-4xl font-extrabold text-center mb-2'>All Deliveries</h1>
                <p className='max-w-xl mx-auto text-center mb-4'>Everything you need to handle your orders in one place. Easily view, update, or settle your deliveries to keep your logistics moving.</p>
                {/*-----------------Parent Div of Statistics-----------------*/}
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
                            <p className='font-extrabold text-2xl text-black text-center'>20</p>
                        </div>
                    </div>

                    {/* ==================== TOtal  Unpaid Parcel ==================== */}
                    <div className='w-full lg:w-auto px-10 py-5 rounded-xl flex justify-center  gap-2 items-center bg-[#F5F5F5]'>
                        <div className='rounded-full p-2 border'>
                            <TbPaywall className='text-xl'></TbPaywall>
                        </div>
                        <div>
                            <p className='font-bold text-center'>Total Unpaid</p>
                            <p className='font-extrabold text-2xl text-black text-center'>30</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Deliveries;