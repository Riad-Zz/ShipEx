import { all } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

const SendParcel = () => {
    const allLocation = useLoaderData();
    // console.log(allLocation) ;  
    const allRegionDup = allLocation.map(loc => loc.region);
    const allRegion = [...new Set(allRegionDup)];
    // console.log(allRegion) ; 

    const { register, watch, handleSubmit, formState: { errors } } = useForm();

    // Handle parecel form 
    const handleParcelForm = (data) => {
        console.log(data);
    }

    // Get Distrcit by Region 
    const districtByRegion = (region) => {
        const District = allLocation.filter((loc) => loc.region === region);
        const allDistrict = District.map(d => d.district);
        return allDistrict;
    }

    // Get Wire Houses by district 
    const wireHouseByDistrict = (district) => {
        const Cities = allLocation.filter(loc => loc.district === district);
        const allWireHouses = Cities.flatMap(wire => wire.covered_area)
        return allWireHouses;
    };

    const senderRegion = watch('SenderRegion');
    const senderDistrict = watch('SenderDistrict');
    const receiverRegion = watch('receiverRegion');
    const receiverDistrict = watch('receiverDistrict');
    // console.log(senderDistrict) ;
    // const a = wireHouseByDistrict("Dhaka") ; 
    // console.log(a) ;

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


                <div className='flex flex-col md:flex-row gap-1 md:gap-5 mt-3'>
                    <div className='flex-1'>
                        <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Parcel Name</label>
                        <input
                            type="text"
                            placeholder="Parcel Name"
                            className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                            {...register('parcelname', { required: true })}
                        />
                        {errors.parcelname && (
                            <p className="text-red-600 text-sm mt-1">Please enter your Parcel Name</p>
                        )}
                    </div>
                    <div className='flex-1'>
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
                </div>

                <hr className='border-t border-[#0000001a] my-10' />

                {/*================= Parent div of sender and receiver ==================== */}
                <div className='flex flex-col md:flex-row justify-between gap-5'>

                    {/* ================= Receiver Info ================= */}
                    <div className='flex-1'>
                        <p className='text-secondary font-extrabold text-lg mb-2'>Sender Details</p>

                        {/* Info box 01  */}
                        <div className='flex gap-2'>
                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Sender Name</label>
                                <input
                                    type="text"
                                    placeholder="Sender Name"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('senderName', { required: true })}
                                />
                                {errors.senderName && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your Name</p>
                                )}
                            </div>
                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Sender Email</label>
                                <input
                                    type="email"
                                    placeholder="Sender Email"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('senderEmail', { required: true })}
                                />
                                {errors.senderEmail && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your Email</p>
                                )}
                            </div>
                        </div>

                        {/* Info box 2  */}
                        <div className='flex gap-2 mt-2'>
                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Address</label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('Address', { required: true })}
                                />
                                {errors.Address && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your Address</p>
                                )}
                            </div>
                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Contact No</label>
                                <input
                                    type="text"
                                    placeholder="Contact No"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('ContactNo', { required: true })}
                                />
                                {errors.ContactNo && (
                                    <p className="text-red-600 text-sm mt-1">Please enter your Contact</p>
                                )}
                            </div>
                        </div>

                        {/* Info Box 3  */}
                        <div className='flex gap-2 mt-2'>

                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Your Region</label>
                                <select className='select border border-[#94A3B8] outline-none' {...register('SenderRegion', { required: true })} >
                                    <option disabled={true}>Select your Region</option>
                                    {
                                        allRegion.map((reg, index) => <option key={index}>{reg}</option>)
                                    }
                                </select>
                                {errors.SenderRegion && (
                                    <p className="text-red-600 text-sm mt-1">Select your Region</p>
                                )}
                            </div>

                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">Your District</label>
                                <select className='select border border-[#94A3B8] outline-none' {...register('SenderDistrict', { required: true })} >
                                    <option disabled={true}>Select your District</option>
                                    {
                                        districtByRegion(senderRegion).map((reg, index) => <option key={index}>{reg}</option>)
                                    }
                                </select>
                                {errors.SenderDistrict && (
                                    <p className="text-red-600 text-sm mt-1">Select your District</p>
                                )}
                            </div>
                        </div>

                        {/* Info Box 4  */}
                        <div className="mt-2">
                            <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">
                                Sender PickUp WireHouse
                            </label>
                            <select className='select w-full border border-[#94A3B8] outline-none' {...register('senderWirehouse', { required: true })}>
                                <option disabled={true}>Select Wirehouse</option>
                                {
                                    wireHouseByDistrict(senderDistrict).map((reg, index) => <option key={index}>{reg}</option>)
                                }
                            </select>

                            {errors.senderWirehouse && (
                                <p className="text-red-600 text-sm mt-1">Please select a warehouse</p>
                            )}
                        </div>

                        {/* Info Box 5  */}
                        <div className='w-full mt-2'>
                            <label className='label font-bold text-[14px] mb-1 text-[#0F172A] block'>Pickup Instruction</label>
                            <textarea className="textarea w-full border border-[#94A3B8] outline-none" placeholder="Pickup Instruction" {...register('pickupInstruction', { required: false })}></textarea>
                        </div>
                    </div>

                    {/* ================= Receiver Info ================= */}
                    <div className='flex-1'>
                        <p className='text-secondary font-extrabold text-lg mb-2'>Receiver Details</p>



                        {/* Info box 01 */}
                        <div className='flex gap-2'>
                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">
                                    Receiver Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Receiver Name"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('receiverName', { required: true })}
                                />
                                {errors.receiverName && (
                                    <p className="text-red-600 text-sm mt-1">Please enter Receiver Name</p>
                                )}
                            </div>

                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">
                                    Receiver Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Receiver Email"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('receiverEmail', { required: true })}
                                />
                                {errors.receiverEmail && (
                                    <p className="text-red-600 text-sm mt-1">Please enter Receiver Email</p>
                                )}
                            </div>
                        </div>

                        {/* Info box 02 */}
                        <div className='flex gap-2 mt-2'>
                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('receiverAddress', { required: true })}
                                />
                                {errors.receiverAddress && (
                                    <p className="text-red-600 text-sm mt-1">Please enter Address</p>
                                )}
                            </div>

                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">
                                    Contact No
                                </label>
                                <input
                                    type="text"
                                    placeholder="Contact No"
                                    className="input w-full py-4 px-4 rounded-lg border border-[#94A3B8] outline-none"
                                    {...register('receiverContactNo', { required: true })}
                                />
                                {errors.receiverContactNo && (
                                    <p className="text-red-600 text-sm mt-1">Please enter Contact Number</p>
                                )}
                            </div>
                        </div>

                        {/* Info box 03 */}
                        <div className='flex gap-2 mt-2'>
                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">
                                    Receiver Region
                                </label>
                                <select
                                    className='select border border-[#94A3B8] outline-none'
                                    {...register('receiverRegion', { required: true })}
                                >
                                    <option disabled={true}>Select your Region</option>
                                    {allRegion.map((reg, index) => (
                                        <option key={index}>{reg}</option>
                                    ))}
                                </select>
                                {errors.receiverRegion && (
                                    <p className="text-red-600 text-sm mt-1">Select your Region</p>
                                )}
                            </div>

                            <div className='flex-1'>
                                <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">
                                    Receiver District
                                </label>
                                <select
                                    className='select border border-[#94A3B8] outline-none'
                                    {...register('receiverDistrict', { required: true })}
                                >
                                    <option disabled={true}>Select your District</option>
                                    {districtByRegion(receiverRegion).map((reg, index) => (
                                        <option key={index}>{reg}</option>
                                    ))}
                                </select>
                                {errors.receiverDistrict && (
                                    <p className="text-red-600 text-sm mt-1">Select your District</p>
                                )}
                            </div>
                        </div>

                        {/* Info box 04 */}
                        <div className="mt-2">
                            <label className="label font-bold text-[14px] mb-1 text-[#0F172A]">
                                Receiver Drop-off WireHouse
                            </label>
                            <select
                                className='select w-full border border-[#94A3B8] outline-none'
                                {...register('receiverWirehouse', { required: true })}
                            >
                                <option disabled={true}>Select Wirehouse</option>
                                {wireHouseByDistrict(receiverDistrict).map((reg, index) => (
                                    <option key={index}>{reg}</option>
                                ))}
                            </select>

                            {errors.receiverWirehouse && (
                                <p className="text-red-600 text-sm mt-1">Please select a warehouse</p>
                            )}
                        </div>

                        {/* Info box 05 */}
                        <div className='w-full mt-2'>
                            <label className='label font-bold text-[14px] mb-1 text-[#0F172A] block'>
                                Delivery Instruction
                            </label>
                            <textarea
                                className="textarea w-full border border-[#94A3B8] outline-none"
                                placeholder="Delivery Instruction"
                                {...register('deliveryInstruction', { required: false })}
                            />
                        </div>

                    </div>

                </div>

                <p className='text-black my-4 text-sm font-medium'>* PickUp Time 4pm-7pm Approx.</p>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="mt-4 cursor-pointer text-black w-full py-3 bg-primary font-bold rounded-lg"
                >
                    Proceed to Confirm Booking
                </button>

            </form>

        </div>
    );
};

export default SendParcel;