import React from 'react';
import { set, useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

const Pricing = () => {

    const allLocation = useLoaderData() ;
    // console.log(allLocation) ; 

    const allRegionsDup = allLocation.map(loc => loc.region)  ; 
    const allRegions =[...new Set(allRegionsDup) ]; 
    // console.log(allRegions) ;

    const { register, handleSubmit, watch, formState: { errors } } = useForm()


    const handleCalculate = (data, e) => {
        console.log(data);
    } 

    const distrcitByRegion = (region) => {
        const tempDist = allLocation.filter(loc => loc.region === region) ;
        const allDistricts = tempDist.map(reg => reg.district) ;
        return allDistricts ;
    }

    const senderRegion = watch('senderRegion') ;
    console.log(senderRegion) ;

    return (
        <div className='max-w-11/12 xl:max-w-7xl mx-auto'>
            <div className='p-8 lg:p-20 bg-white rounded-4xl my-7'>
                <p className='text-4xl text-secondary font-bold'>About Us</p>
                <p className='mt-4  max-w-xl '>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                <hr className='border my-12 border-[#0000001a]' />
                <p className='text-secondary text-2xl font-extrabold text-center'>Calculate Your Cost</p>
                <form onSubmit={handleSubmit(handleCalculate)}>
                    <div className='flex gap-10 flex-col md:flex-row w-full max-w-2xl mx-auto items-center'>
                        {/* input fields div  */}
                        <div className='flex-1'>
                            {/* Percel Type  */}
                            <div>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A] block">
                                    Parcel Type
                                </label>
                                <select className='select  border-[#94A3B8] outline-none' {...register('type', { required: true })}>
                                    <option value={""}>Select Parcel Type</option>
                                    <option value={'document'}>Document</option>
                                    <option value={'non-document'}>Non-Document</option>
                                </select>
                                {errors.type && (
                                    <p className="text-red-600 text-sm mt-1">Select Parcel Type</p>
                                )}
                            </div>
                            
                            {/* Sender Info  */}
                            <div className='flex gap-2'>
                                <div className='mt-2 flex-1'> 
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A] block" >
                                    Sender Region
                                </label>
                                <select className='select  border-[#94A3B8] outline-none ' {...register('senderRegion',{required:true} )}>
                                    <option value={""}>Select Sender Region</option>
                                    {
                                        allRegions.map(reg => <option value={reg}>{reg}</option>)
                                    }
                                </select>
                                {
                                    errors.senderRegion &&(
                                        <p className="text-red-600 text-sm mt-1">Select Sender Region</p>
                                    )
                                }
                            </div>

                            <div className='mt-2 flex-1'> 
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A] block" >
                                    Sender District
                                </label>
                                <select className='select  border-[#94A3B8] outline-none' {...register('senderDistrict',{required:true} )}>
                                    <option value={""}>Select Sender District</option>
                                    {
                                        distrcitByRegion(senderRegion).map(reg => <option value={reg}>{reg}</option>)
                                    }
                                </select>
                                {
                                    errors.senderDistrict &&(
                                        <p className="text-red-600 text-sm mt-1">Select Sender District</p>
                                    )
                                }
                            </div>
                            </div>
                            
                            

                        </div>
                        {/* Cost Div  */}
                        <div className='flex-1'>
                            <p className='text-7xl text-black font-extrabold'>50 tk</p>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Pricing;