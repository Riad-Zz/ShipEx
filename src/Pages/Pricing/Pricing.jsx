import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

const Pricing = () => {

    const allLocation = useLoaderData();
    const allRegionsDup = allLocation.map(loc => loc.region);
    const allRegions = [...new Set(allRegionsDup)];
    const { register, handleSubmit, watch, reset ,formState: { errors } } = useForm()
    const [charge, setCharge] = useState(0);



    // ======================= Calcultate On Form Submit Form ======================
    const handleCalculate = (data, e) => {
        const weight = Number(data.parcelweight);
        let chargeAmount = 0;

        // ===== Document =====
        if (
            data.parceltype === 'document' &&
            data.senderDistrict === data.receiverDistrict
        ) {
            chargeAmount = 60;
        } else if (data.parceltype === 'document') {
            chargeAmount = 80;
        }

        // ===== Non-Document =====
        if (data.parceltype === 'non-document') {
            if (weight <= 3) {
                chargeAmount =
                    data.senderDistrict === data.receiverDistrict ? 110 : 150;
            } else {
                const extra = weight - 3;
                chargeAmount =
                    data.senderDistrict === data.receiverDistrict
                        ? 110 + extra * 40
                        : 150 + extra * 40 + 40;
            }
        }

        setCharge(chargeAmount);
        // e.target.reset();
    };

    // ================== Reset formn on button =======================
    const handleReset = () => {
        reset() ;
        setCharge(0) ;
    }

    // ======================= Get District By Region ==============================
    const distrcitByRegion = (region) => {
        const tempDist = allLocation.filter(loc => loc.region === region);
        const allDistricts = tempDist.map(reg => reg.district);
        return allDistricts;
    }

    // =================== Watch Over the Sender and Receiver Region ===========================
    const senderRegion = watch('senderRegion');
    const receiverRegion = watch('receiverRegion');

    // console.log(senderRegion);
    // console.log(receiverRegion);

    return (
        <div className='max-w-11/12 xl:max-w-7xl mx-auto'>
            <div className='p-8 lg:p-20 bg-white rounded-4xl my-7'>
                <p className='text-4xl text-secondary font-bold'>About Us</p>
                <p className='mt-4  max-w-xl '>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                <hr className='border my-12 border-[#0000001a]' />
                <p className='text-secondary text-2xl font-extrabold text-center'>Calculate Your Cost</p>
                <form onSubmit={handleSubmit(handleCalculate)}>
                    <div className='flex gap-5 md:gap-12 flex-col-reverse mt-4 md:mt-0 md:flex-row w-full max-w-3xl mx-auto items-center'>
                        {/* input fields div  */}
                        <div className='flex-1'>
                            {/* Percel Type  */}
                            <div>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A] block">
                                    Parcel Type
                                </label>
                                <select className='select w-full  border-[#94A3B8] outline-none' {...register('parceltype', { required: true })}>
                                    <option value={""}>Select Parcel Type</option>
                                    <option value={'document'}>Document</option>
                                    <option value={'non-document'}>Non-Document</option>
                                </select>
                                {errors.parceltype && (
                                    <p className="text-red-600 text-sm mt-1">Select Parcel Type</p>
                                )}
                            </div>

                            {/* Sender Info  */}
                            <div className='flex gap-2'>
                                <div className='mt-2 flex-1'>
                                    <label className="label font-bold text-[14px] mb-1 text-[#0F172A] block" >
                                        Sender Region
                                    </label>
                                    <select className='select  border-[#94A3B8] outline-none ' {...register('senderRegion', { required: true })}>
                                        <option value={""}>Select Sender Region</option>
                                        {
                                            allRegions.map(reg => <option key={reg} value={reg}>{reg}</option>)
                                        }
                                    </select>
                                    {
                                        errors.senderRegion && (
                                            <p className="text-red-600 text-sm mt-1">Select Sender Region</p>
                                        )
                                    }
                                </div>

                                <div className='mt-2 flex-1'>
                                    <label className="label font-bold text-[14px] mb-1 text-[#0F172A] block" >
                                        Sender District
                                    </label>
                                    <select className='select  border-[#94A3B8] outline-none' {...register('senderDistrict', { required: true })}>
                                        <option value={""}>Select Sender District</option>
                                        {
                                            distrcitByRegion(senderRegion).map(reg => <option key={reg} value={reg}>{reg}</option>)
                                        }
                                    </select>
                                    {
                                        errors.senderDistrict && (
                                            <p className="text-red-600 text-sm mt-1">Select Sender District</p>
                                        )
                                    }
                                </div>
                            </div>

                            {/* Receiver Info  */}
                            <div className='flex gap-2'>
                                <div className='mt-2 flex-1'>
                                    <label className="label font-bold text-[14px] mb-1 text-[#0F172A] block" >
                                        Receiver Region
                                    </label>
                                    <select className='select  border-[#94A3B8] outline-none ' {...register('receiverRegion', { required: true })}>
                                        <option value={""}>Select Receiver Region</option>
                                        {
                                            allRegions.map(reg => <option key={reg} value={reg}>{reg}</option>)
                                        }
                                    </select>
                                    {
                                        errors.receiverRegion && (
                                            <p className="text-red-600 text-sm mt-1">Select Receiver Region</p>
                                        )
                                    }
                                </div>

                                <div className='mt-2 flex-1'>
                                    <label className="label font-bold text-[14px] mb-1 text-[#0F172A] block" >
                                        Receiver District
                                    </label>
                                    <select className='select  border-[#94A3B8] outline-none' {...register('receiverDistrict', { required: true })}>
                                        <option value={""}>Select Sender District</option>
                                        {
                                            distrcitByRegion(receiverRegion).map(reg => <option value={reg} key={reg}>{reg}</option>)
                                        }
                                    </select>
                                    {
                                        errors.receiverDistrict && (
                                            <p className="text-red-600 text-sm mt-1">Select Receiver District</p>
                                        )
                                    }
                                </div>
                            </div>

                            {/* Parcel Weight  */}
                            <div className='mt-2'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Parcel Weight (KG)</label>
                                <input
                                    type="text"
                                    placeholder="Parcel Weight (KG)"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('parcelweight', { required: true })}
                                />
                                {errors.parcelweight && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your Parcel Weight</p>
                                )}
                            </div>

                            {/* Submit and Reset Button  */}
                            <div className='flex gap-2'>
                                {/* Reset */}
                                <div className='flex-1'>
                                    <button onClick={handleReset}
                                        type='button'
                                        className="mt-4 cursor-pointer text-[#8FA748] w-full py-3  border font-bold rounded-lg hover:bg-primary hover:text-black hover:border-none">
                                        Reset
                                    </button>
                                </div>

                                <div className='flex-2'>
                                    <button
                                        type='submit'
                                        className="mt-4 cursor-pointer text-black w-full py-3 bg-primary font-bold rounded-lg">
                                        Calculate
                                    </button>
                                </div>
                            </div>

                        </div>
                        {/* Cost Div  */}
                        <div className='flex-1'>
                            <p className='text-7xl md:text-9xl text-black font-bold'>৳{charge}</p>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default Pricing;