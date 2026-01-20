import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleParcelForm = (data) => {
        console.log(data);
    }

    return (
        <div className='max-w-[95%] xl:max-w-7xl mx-auto bg-white mt-8 p-8 py-14 lg:p-20 rounded-2xl mb-20'>
            <h1 className='text-secondary text-5xl font-extrabold'>Sent Parcel</h1>
            <p className="max-w-xl mt-2">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                From personal packages to business shipments — we deliver on time, every time.
            </p>
            <hr className='border-t border-[#0000001a] my-5' />
            <p className='font-extrabold text-[#03373D] text-2xl'>Enter your parcel details</p>

            <form onSubmit={handleSubmit(handleParcelForm)}>
                <div className='flex mt-6'>
                    <label className='mr-10 flex items-center gap-2'>
                        <input type="radio" {...register('parceltype')} value='Document' className="radio checked:bg-[#0AB010] checked:text-white checked:border-[#0AB010]" /> Document</label>

                    <label className='mr-10 flex items-center gap-2'>
                        <input type="radio" {...register('parceltype')} value='Non-Document' className="radio checked:bg-[#0AB010] checked:text-white checked:border-[#0AB010]" />Non-Document</label>
                </div>

                {/* <button type='submit' className='btn'>Submit</button> */}
                <div className='flex gap-5 mt-3'>
                    <div className='flex-1'>
                        <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Parcel Name</label>
                        <input
                            type="text"
                            placeholder="Parcel Name"
                            className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8]"
                            {...register('parcelname', { required: true })}
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1">Please enter your Parcel Name</p>
                        )}
                    </div>
                    <div className='flex-1'>
                        <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Parcel Weight (KG)</label>
                        <input
                            type="text"
                            placeholder="Parcel Weight (KG)"
                            className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8]"
                            {...register('parcelname', { required: true })}
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1">Please enter your Parcel Name</p>
                        )}
                    </div>
                </div>

                <hr className='border-t border-[#0000001a] my-10' />
            </form>

        </div>
    );
};

export default SendParcel;