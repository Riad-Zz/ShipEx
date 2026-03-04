import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import useAxios from '../../../Hooks/Axios/useAxios';

const ParcelDetails = () => {
    const { user } = use(AuthContext);
    const axiosInstance = useAxios();
    const { id } = useParams();
    
    const {data : currentParcel = []} = useQuery({
        queryKey : ['parcelDetails',`${user.email}`] ,
        queryFn : async ()=>{
            const result =await axiosInstance.get(`/parcel/${id}`) 
            console.log(result.data) ;
            return result.data
        }
    })

    return (
        <div className='p-2 md:p-8 max-w-full lg:max-w-7xl mx-auto'>
            <div className=' bg-white p-5 py-10 lg:p-20 rounded-2xl'>
                <h1 className='text-secondary text-4xl font-extrabold mb-7'>Parcel Details</h1>
                {/* =======================  Parent Div =======================  */}
                <div className='flex flex-col gap-5'>

                    <div className='flex flex-col lg:flex-row gap-5'>
                        {/* =======================  Sender Info =======================   */}
                        <div className='bg-[#F5F5F5] p-5 rounded-xl space-y-1 flex-1'>
                            <p className='text-3xl font-bold mb-3 text-black'>Sender Info </p>
                            <p className='text-[#37415180] font-bold'>Name : <span className='text-[#374151] font-semibold'>{currentParcel.senderName}</span></p>
                            <p className='text-[#37415180] font-bold'>Phone : <span className='text-[#374151] font-semibold'>{currentParcel.ContactNo}</span></p>
                            <p className='text-[#37415180] font-bold'>Email : <span className='text-[#374151] font-semibold'>{currentParcel.senderEmail}</span></p>
                            <p className='text-[#37415180] font-bold'>Region : <span className='text-[#374151] font-semibold'>{currentParcel.SenderDistrict} , {currentParcel.SenderRegion}</span></p>
                            <p className='text-[#37415180] font-bold'>Address : <span className='text-[#374151] font-semibold'>{currentParcel.Address}</span></p>
                        </div>
                        {/* =======================  Receiver Info =======================  */}
                        <div className='bg-[#F5F5F5] p-5 rounded-xl space-y-1 flex-1'>
                            <p className='text-3xl font-bold mb-3 text-black'>Receiver Info </p>
                            <p className='text-[#37415180] font-bold'>Name : <span className='text-[#374151] font-semibold'>{currentParcel.receiverName}</span></p>
                            <p className='text-[#37415180] font-bold'>Phone : <span className='text-[#374151] font-semibold'>{currentParcel.receiverContactNo}</span></p>
                            <p className='text-[#37415180] font-bold'>Email : <span className='text-[#374151] font-semibold'>{currentParcel.receiverEmail}</span></p>
                            <p className='text-[#37415180] font-bold'>Region : <span className='text-[#374151] font-semibold'>{currentParcel.receiverDistrict} , {currentParcel.receiverRegion}</span></p>
                            <p className='text-[#37415180] font-bold'>Address : <span className='text-[#374151] font-semibold'>{currentParcel.receiverAddress}</span></p>
                        </div>
                    </div>
                    {/* =======================  Parcel Details  ===================*/}
                    <div className='bg-[#F5F5F5] p-5 rounded-xl space-y-1 flex-1'>
                        <p className='text-3xl font-bold mb-3 text-black'>Parcel Details </p>
                        <p className='text-[#37415180] font-bold'>Parcel Name : <span className='text-[#374151] font-semibold'>{currentParcel.parcelname}</span></p>
                        <p className='text-[#37415180] font-bold'>Parcel Type : <span className='text-[#374151] font-semibold'>{currentParcel.parceltype}</span></p>
                        <p className='text-[#37415180] font-bold'>Weight : <span className='text-[#374151] font-semibold'>{currentParcel.parcelweight}</span></p>
                        <p className='text-[#37415180] font-bold'>Cost : <span className='text-[#374151] font-semibold'>{currentParcel.amount}</span></p>
                        <p className='text-[#37415180] font-bold'>Status : <span className='text-[#374151] font-semibold'>{currentParcel.paymentStatus}</span></p>
                        <p className='text-[#37415180] font-bold'>Pickup Instruction: <span className='text-[#374151] font-semibold'>{currentParcel.pickupInstruction === "" ? "N/A" : currentParcel.pickupInstruction}</span></p>
                        <p className='text-[#37415180] font-bold'>Delivery Instruction : <span className='text-[#374151] font-semibold'>{currentParcel.deliveryInstruction === "" ?"N/A" : currentParcel.deliveryInstruction}</span></p>
                        <p className='text-[#37415180] font-bold'>Tracking Number : <span className='text-[#374151] font-semibold'>#EY90</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParcelDetails;