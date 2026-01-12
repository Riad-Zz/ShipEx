import React from 'react';
import { useForm } from 'react-hook-form';
import riderModel from '../../assets/Others/agent-pending.png'

const BeRider = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const handleRiderRegistration = (data) => {
        console.log(data);
    }

    return (
        <div className='max-w-7xl mx-auto bg-white mt-8 p-20 rounded-2xl mb-30'>
            <p className='text-5xl text-[#03373D] font-bold'>Be a Rider</p>
            <p className='max-w-xl mt-1'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <hr className='border-t border-[#0000001a] my-10' />
            <div className='flex justify-between'>
                {/* form div */}
                <div>
                    <p className='text-xl text-[#03373D] font-extrabold'>Tell us about yourself</p>
                    <form onSubmit={handleSubmit(handleRiderRegistration)}>
                        {/* Info 01  */}
                        <div className='mt-2 flex justify-between gap-3'>
                            {/* Item 01  */}
                            <div className='w-1/2'>
                                <label className="label font-bold text-[#403F3F] text-[14px] mb-1">Your Name</label>
                                <input
                                    type="text"
                                    className="input mb-3 w-full bg-white border-[#94A3B8] py-4 px-4 rounded-lg outline-none"
                                    placeholder="Your Name"
                                    name='name'
                                    {...register('name', { required: true })}
                                />
                                {errors.email && <p className='text-red-600 text-sm mb-2'>Please Enter your Name</p>}
                            </div>
                            <div className='w-1/2'>
                                {/* Item 02  */}
                                <label className="label font-bold text-[#403F3F] text-[14px] mb-1">Your Age</label>
                                <input
                                    type="number"
                                    className="input mb-3 w-full bg-white border-[#94A3B8] py-4 px-4 rounded-lg outline-none"
                                    placeholder="Your Age"
                                    name='age'
                                    {...register('age', { required: true })}
                                />
                                {errors.email && <p className='text-red-600 text-sm mb-2'>Please Enter your age</p>}
                            </div>
                        </div>
                        {/* Info 02  */}
                        <div className='mt-1 flex justify-between gap-3'>
                            {/* Item 01  */}
                            <div className='w-1/2'>
                                <label className="label font-bold text-[#403F3F] text-[14px] mb-1">Your Email</label>
                                <input
                                    type="email"
                                    className="input mb-1 w-full bg-white border-[#94A3B8] py-4 px-4 rounded-lg outline-none"
                                    placeholder="Your Email"
                                    name='email'
                                    {...register('email', { required: true })}
                                />
                                {errors.email && <p className='text-red-600 text-sm mb-1'>Please Enter your Email</p>}
                            </div>
                            <div className='w-1/2'>
                                {/* Item 02  */}
                                <label className="label font-bold text-[#403F3F] text-[14px] mb-1">Your Region</label>
                                <input
                                    type="text"
                                    className="input mb-1 w-full bg-white border-[#94A3B8] py-4 px-4 rounded-lg outline-none"
                                    placeholder="Your Region"
                                    name='Region'
                                    {...register('Region', { required: true })}
                                />
                                {errors.email && <p className='text-red-600 text-sm mb-2'>Please Enter your Region</p>}
                            </div>
                        </div>

                        {/* Info 03  */}
                        <div className='mt-1 flex justify-between gap-3'>
                            {/* Item 01  */}
                            <div className='w-1/2'>
                                <label className="label font-bold text-[#403F3F] text-[14px] mb-1">NID No</label>
                                <input
                                    type="text"
                                    className="input mb-1 w-full bg-white border-[#94A3B8] py-4 px-4 rounded-lg outline-none"
                                    placeholder="NID"
                                    name='nid'
                                    {...register('nid', { required: true })}
                                />
                                {errors.email && <p className='text-red-600 text-sm mb-1'>Please Enter your NID</p>}
                            </div>
                            <div className='w-1/2'>
                                {/* Item 02  */}
                                <label className="label font-bold text-[#403F3F] text-[14px] mb-1">Contact</label>
                                <input
                                    type="text"
                                    className="input mb-1 w-full bg-white border-[#94A3B8] py-4 px-4 rounded-lg outline-none"
                                    placeholder="Contact"
                                    name='contact'
                                    {...register('contact', { required: true })}
                                />
                                {errors.email && <p className='text-red-600 text-sm mb-2'>Please Enter your Contact</p>}
                            </div>
                        </div>
                        {/* Last  */}
                        <div>
                            <label className="label font-bold text-[#403F3F] text-[14px] mb-1">Which wire-house you want to work?</label>
                            <input
                                type="text"
                                className="input mb-3 w-full bg-white border-[#94A3B8] py-4 px-4 rounded-lg outline-none"
                                placeholder="Selct a Wirehouse"
                                name='wirehouse'
                                {...register('wirehouse', { required: true })}
                            />
                        </div>
                        {/* Submit Buttton  */}
                        <button type="submit" className="btn mt-3 bg-primary transition font-bold border-none text-black w-full py-3 rounded-lg">
                            Submit
                        </button>
                    </form>
                </div>
                {/* image div  */}
                <div>
                    <img src={riderModel} alt="" />
                </div>
            </div>
        </div>
    );
};

export default BeRider;