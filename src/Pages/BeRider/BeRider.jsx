import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import riderModel from '../../assets/Others/agent-pending.png';
import { useLoaderData } from 'react-router';

const BeRider = () => {
    const { register,control ,watch ,handleSubmit, formState: { errors } } = useForm();
    const [ageError, setAgeError] = useState(false);

    const allLocation = useLoaderData();
    // console.log(allRegion) ; 
    const allRegionDup = allLocation.map(reg => reg.region);
    const allRegion = [...new Set(allRegionDup)];
    // console.log(allRegion);

    // Handle Rider Registration 
    const handleRiderRegistration = (data, e) => {
        console.log(data);
        // if (data.age != 'undefined' && data.age < 18) errors.age = true;
        e.target.reset();
    };

    // Get District based on Currently Selected Region 

    const districtByRegion = (region) => {
        const allRegionData = allLocation.filter(loc => loc.region === region);
        const district = allRegionData.map(reg => reg.district);
        return district;
    };

    // Get Wirehoue based on Currently Selected District 
    const wirehouseByDistrict = (district) => {
        const allDistrictData = allLocation.filter(loc => loc.district === district);
        const wireHosue = allDistrictData.flatMap(dis => dis.covered_area);
        return wireHosue;
    };

    const selectedRegion = useWatch({control, name:'region'});
    const selectedDistrict = useWatch({control,name:'district'});

    return (
        <div className="max-w-[95%] xl:max-w-7xl mx-auto bg-white mt-8 p-8 py-14 lg:p-20 rounded-2xl mb-20">
            <p className="text-5xl text-[#03373D] font-bold">Be a Rider</p>
            <p className="max-w-xl mt-2">
                Deliver parcels across the city, earn on your own schedule, and be part of a fast-growing, reliable delivery network trusted by thousands.
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
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
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
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('age', {
                                        required: 'Please enter your age',
                                        min: {
                                            value: 18,
                                            message: 'You should be 18 or above',
                                        },
                                    })}
                                />
                                {errors.age && (
                                    <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>
                                )}

                            </div>
                        </div>

                        {/* INFO 02 */}
                        <div className="mt-2 flex flex-col md:flex-row gap-3">
                            <div className="w-full md:w-1/2">
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A] ">Your Email</label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your email</p>
                                )}
                            </div>

                            <div className="w-full md:w-1/2">
                                <label className="label font-bold text-[14px] text-[#0F172A] mb-1">Your Region</label>

                                <select className="select border border-[#94A3B8] outline-none" {...register('region', { required: true })}>

                                    <option disabled={true} value={'Select Your Region'}>Select Your Region</option>

                                    {
                                        allRegion.map((reg, index) => <option key={index} value={reg}>{reg}</option>)
                                    }
                                </select>
                                {errors.region && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your region</p>
                                )}

                            </div>
                        </div>

                        {/* INFO 03 */}
                        <div className="mt-2 flex flex-col md:flex-row gap-3">
                            <div className="w-full md:w-1/2">
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A] outline-none">NID No</label>
                                <input
                                    type="text"
                                    placeholder="NID"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
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
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('contact', { required: true })}
                                />
                                {errors.contact && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your contact</p>
                                )}
                            </div>
                        </div>

                        {/* INFO 04 */}
                        <div className='flex gap-2 mt-2'>

                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Your District</label>
                                <select className='select border border-[#94A3B8] outline-none' {...register('district', { required: true })} >
                                    <option disabled={true}>Select your District</option>
                                    {
                                        districtByRegion(selectedRegion).map((reg, index) => <option key={index} value={reg}>{reg}</option>)
                                    }
                                </select>
                                {errors.district && (
                                    <p className="text-red-600 text-sm mt-1">Select your District</p>
                                )}
                            </div>

                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Which wire-house you want to work?</label>
                                <select className='select border border-[#94A3B8] outline-none' {...register('wirehouse', { required: true })} >
                                    <option disabled={true}>Select your Wirehouse</option>
                                    {
                                        wirehouseByDistrict(selectedDistrict).map((reg, index) => <option key={index} value={reg}>{reg}</option>)
                                    }
                                </select>
                                {errors.wirehouse && (
                                    <p className="text-red-600 text-sm mt-1">Select your District</p>
                                )}
                            </div>
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
