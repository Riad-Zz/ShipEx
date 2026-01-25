import React from 'react';
import { useForm } from 'react-hook-form';

const Pricing = () => {
    const {register,handleSubmit,watch,formState: { errors }} = useForm()


    const handleCalculate = (data,e)=> {
        console.log(data) ;
    }

    return (
        <div className='max-w-11/12 xl:max-w-7xl mx-auto'>
            <div className='p-8 lg:p-20 bg-white rounded-4xl my-7'>
                <p className='text-4xl text-secondary font-bold'>About Us</p>
                <p className='mt-4  max-w-xl '>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                <hr className='border my-12 border-[#0000001a]' /> 
                <p className='text-secondary text-2xl font-extrabold text-center'>Calculate Your Cost</p>
                <form onSubmit={handleSubmit(handleCalculate)}>

                </form>
            </div>
        </div>
    );
};

export default Pricing;