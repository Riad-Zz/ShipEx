import React from 'react';
import { useForm } from 'react-hook-form';
import riderModel from '../../assets/Others/agent-pending.png';

const BeRider = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleRiderRegistration = (data,e) => {
        console.log(data);
        e.target.reset() ; 
    };

    return (
        <div className="max-w-[95%] xl:max-w-7xl mx-auto bg-white mt-8 p-8 py-14 lg:p-20 rounded-2xl mb-20">
            <p className="text-5xl text-[#03373D] font-bold">Be a Rider</p>
            <p className="max-w-xl mt-2">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                From personal packages to business shipments — we deliver on time, every time.
            </p>

            <hr className="border-t border-[#0000001a] my-10" />

            <div className="flex flex-col lg:flex-row gap-10">
                {/* FORM */}
                <div className="flex-1">
                    <p className="text-xl text-[#03373D] font-extrabold mb-3">
                        Tell us about yourself
                    </p>

                    <form onSubmit={handleSubmit(handleRiderRegistration)}>
                        {/* INFO 01 */}
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="w-full md:w-1/2">
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8]"
                                    {...register('name', { required: true })}
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your name</p>
                                )}
                            </div>

                            <div className="w-full md:w-1/2">
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Your Age</label>
                                <input
                                    type="number"
                                    placeholder="Your Age"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8]"
                                    {...register('age', { required: true })}
                                />
                                {errors.age && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your age</p>
                                )}
                            </div>
                        </div>

                        {/* INFO 02 */}
                        <div className="mt-2 flex flex-col md:flex-row gap-3">
                            <div className="w-full md:w-1/2">
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Your Email</label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8]"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your email</p>
                                )}
                            </div>

                            <div className="w-full md:w-1/2">
                                <label className="label font-bold text-[14px] text-[#0F172A] mb-1">Your Region</label>
                                <input
                                    type="text"
                                    placeholder="Your Region"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8]"
                                    {...register('region', { required: true })}
                                />
                                {errors.region && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your region</p>
                                )}
                            </div>
                        </div>

                        {/* INFO 03 */}
                        <div className="mt-2 flex flex-col md:flex-row gap-3">
                            <div className="w-full md:w-1/2">
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">NID No</label>
                                <input
                                    type="text"
                                    placeholder="NID"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8]"
                                    {...register('nid', { required: true })}
                                />
                                {errors.nid && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your NID</p>
                                )}
                            </div>

                            <div className="w-full md:w-1/2">
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Contact</label>
                                <input
                                    type="text"
                                    placeholder="Contact"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8]"
                                    {...register('contact', { required: true })}
                                />
                                {errors.contact && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your contact</p>
                                )}
                            </div>
                        </div>

                        {/* INFO 04 */}
                        <div className="mt-2">
                            <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">
                                Which warehouse do you want to work?
                            </label>
                            <input
                                type="text"
                                placeholder="Select a warehouse"
                                className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8]"
                                {...register('warehouse', { required: true })}
                            />
                            {errors.warehouse && (
                                <p className="text-red-600 text-sm mt-1">Please select a warehouse</p>
                            )}
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="mt-4 cursor-pointer text-black w-full py-3 bg-primary font-bold rounded-lg"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* IMAGE */}
                <div className="flex-1 hidden lg:block justify-center items-center">
                    <img
                        src={riderModel}
                        alt="Rider"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default BeRider;
