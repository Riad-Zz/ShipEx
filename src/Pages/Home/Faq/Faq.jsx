import React from 'react';
import { MdArrowOutward } from "react-icons/md";

const Faq = () => {
    return (
        <div className='max-w-11/12 xl:max-w-7xl mx-auto mb-20'>

            <p className='text-secondary font-extrabold text-center text-4xl'>Frequently Asked Question (FAQ)</p>
            <p className='text-center max-w-4xl mx-auto mt-2 mb-10 text-[#606060]'>
                Get all the essential details about how ShipEx works, including shipping guidelines, account support, rider requirements, and step-by-step delivery processes to ensure a smooth experience for both senders and recipients.
            </p>

            <div className="collapse mb-1 p-2 collapse-arrow bg-white rounded-2xl border border-base-300">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-bold text-[#03373D]">How do I send a parcel through ShipEx?</div>
                <div className="collapse-content text-sm">
                    Go to the “Send Parcel” section, enter pickup and delivery details including addresses and preferred delivery time, choose your package type and size, and confirm your shipment. You will receive a confirmation with a tracking ID immediately after booking.
                </div>
            </div>

            <div className="collapse mb-1 p-2 collapse-arrow bg-white rounded-2xl border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-bold text-[#03373D]">How can I track my shipment?</div>
                <div className="collapse-content text-sm">
                    Enter your tracking ID in the “Track Package” section to view real-time updates on your delivery status, including pickup, in-transit, and estimated delivery time. You can also receive notifications via email or SMS for added convenience.
                </div>
            </div>

            <div className="collapse mb-1 p-2 collapse-arrow bg-white rounded-2xl border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-bold text-[#03373D]">What should I do if my package is delayed?</div>
                <div className="collapse-content text-sm">
                    Check the tracking page for any updates on your parcel. If the delay continues beyond the estimated time, you can contact ShipEx Support directly via chat, email, or phone for further assistance and they will help resolve the issue as quickly as possible.
                </div>
            </div>

            <div className="collapse mb-1 p-2 collapse-arrow bg-white rounded-2xl border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-bold text-[#03373D]">Can I change the delivery address after booking?</div>
                <div className="collapse-content text-sm text-[#606060]">
                    Yes, you can request an address change by contacting ShipEx Support before the rider picks up the parcel. Make sure to provide the new address and confirm with the support team to ensure the delivery is rerouted without any delays.
                </div>
            </div>

            <div className="collapse mb-1 p-2 collapse-arrow bg-white rounded-2xl border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-bold text-[#03373D]">How do I become a ShipEx rider?</div>
                <div className="collapse-content text-sm">
                    Visit the “Become a Rider” page, fill in your personal and vehicle details, complete the verification process, and attend a short onboarding session. Once approved, you’ll be ready to start accepting deliveries and earning with ShipEx.
                </div>
            </div>


            <div className="flex gap-px justify-center my-8">
                <button className="btn-base py-2.5 sm:py-3 px-5 sm:px-6 bg-primary text-black! border-none">See More FAQ's</button>
                <button className="bg-black rounded-full p-2 sm:p-3"><MdArrowOutward className="text-2xl sm:text-3xl text-primary font-bold" /></button>
            </div>

        </div>
    );
};

export default Faq;
