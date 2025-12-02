import React, { useState } from 'react';

const AboutUs = () => {
    const [activeTab, setActiveTab] = useState("story");
    return (
        <div className='max-w-11/12 xl:max-w-7xl mx-auto'>
            <div className='p-8 lg:p-20 bg-white rounded-4xl my-7'>
                <p className='text-4xl text-secondary font-bold'>About Us</p>
                <p className='mt-4  max-w-xl '>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                <hr className='border my-12 border-[#0000001a]' />

                <div className="flex flex-wrap  gap-3 md:gap-12">
                    <button

                        className={activeTab === "story" ? "text-[#5B6A2E] text-2xl font-bold cursor-pointer" : "text-2xl cursor-pointer"}
                        onClick={() => setActiveTab("story")}
                    >
                        Story
                    </button>

                    <button
                        className={activeTab === "mission" ? "text-[#5B6A2E] text-2xl font-bold cursor-pointer" : "text-2xl cursor-pointer"}
                        onClick={() => setActiveTab("mission")}
                    >
                        Mission
                    </button>

                    <button
                        className={activeTab === "success" ? "text-[#5B6A2E] text-2xl font-bold cursor-pointer" : "text-2xl cursor-pointer"}
                        onClick={() => setActiveTab("success")}
                    >
                        Success
                    </button>

                    <button
                        className={activeTab === "terms" ? "text-[#5B6A2E] text-2xl font-bold cursor-pointer" : "text-2xl cursor-pointer"}
                        onClick={() => setActiveTab("terms")}
                    >
                        Terms & Conditions
                    </button>
                </div>

                <div className="mt-4">
                    {activeTab === "story" && <p>
                        We started ShipEx in 2018 with a singular, ambitious vision: to redefine the logistics and parcel delivery experience for a modern, interconnected world. In an era where global commerce moves faster than ever, we recognized a critical market need for a shipping solution that was not only incredibly fast and reliable but also deeply committed to transparency and exceptional customer service. Our journey began when a small team of seasoned logistics experts and technology innovators came together, driven by the shared frustration of inefficient, complex, and opaque shipping processes that often hampered the growth of dynamic businesses.<br /><br />
                        We weren't merely looking to move packages; we aimed to move trust, facilitating crucial connections across continents and down the street. From those initial blueprints, we meticulously built a foundation based on three core pillars: cutting-edge technological infrastructure,unwavering operational excellence, and a genuine focus on the customer. We invested heavily in creating a proprietary global network, optimizing every single step of the supply chain, from the first-mile pickup to the final-mile delivery. This commitment allowed us to swiftly expand our footprint, offering a seamless, dependable service that quickly earned the confidence of e-commerce giants, small businesses, and individual shippers alike.<br /><br />
                        Today, ShipEx stands as a testament to that original vision—a global logistics powerhouse that continues to grow, innovate, and serve as the dependable backbone for your most critical shipments. Our history is one of continuous adaptation and a relentless pursuit of the next standard in delivery speed and reliability, always striving to deliver not just packages, but complete peace of mind.
                    </p>}
                    {activeTab === "mission" && <p>
                        The core mission of ShipEx is to be the world's most trusted and technologically advanced global logistics partner, providing scalable, sustainable solutions that power global trade and enrich communities. We are dedicated to consistently exceeding the expectations of our customers by leveraging proprietary data-driven systems to achieve industry-leading operational execution.<br /><br />
                        Our commitment is twofold: First, we aim to empower businesses of all sizes, from nascent startups to multinational corporations, with the robust logistical infrastructure required to reach any customer, anywhere, efficiently and economically. We firmly believe that shipping should be transformed from an operational hurdle into a powerful, competitive advantage for every business we serve.<br /><br />
                        Second, we are committed to the security, integrity, and timely delivery of every single parcel entrusted to us, recognizing the inherent value—both monetary and emotional—that each shipment represents. This mission is driven by a culture of innovation, integrity, and relentless customer focus, ensuring that we not only meet the current demands of the modern supply chain but actively define its future. We strive to be the standard-bearer for reliability and sustainability in the global express delivery industry.
                    </p>}
                    {activeTab === "success" && <p>
                        ShipEx measures its success not merely by the volume of parcels moved, but by the tangible positive impact we have on our customers' operations and the global economy. Our achievements are founded on consistently high key performance indicators (KPIs) that demonstrate our operational superiority.<br /><br />
                        To date, we consistently maintain an extraordinary **99.8% on-time delivery rate** across our core express services. This high metric is sustained through rigorous process control, continuous network optimization, and strategic investments in our fleet and personnel. Our proprietary tracking system, leveraging advanced AI and machine learning, processes billions of data points daily, providing customers with minute-by-minute transparency and predictive delivery estimates.<br /><br />
                        Furthermore, our success is reflected in our rapid global expansion, which now services over **220 countries and territories** and features strategically located, state-of-the-art hubs designed for maximum throughput and efficiency. We are proud of our sustained Net Promoter Score (NPS) which consistently sits above +65, reflecting the deep trust and loyalty of our extensive client base. Beyond the numbers, we celebrate the success of the businesses we have enabled to scale and the critical supplies we have delivered during challenging global events, proving that the ShipEx network is a vital component of global commerce.
                    </p>}
                    {activeTab === "terms" && <p>
                        The Terms and Conditions of Service outlined herein constitute the entire legal agreement between ShipEx Global Logistics and the Shipper (referred to collectively as "Parties") regarding the transportation and delivery of parcels. By tendering a shipment to ShipEx, the Shipper acknowledges and agrees to be bound by these comprehensive terms, including all limitations of liability, warranty disclaimers, and governing laws.<br /><br />
                        Key provisions cover service limitations and warranties, detailing the scope of our responsibility, particularly in circumstances beyond our reasonable control, such as severe weather, governmental actions, or force majeure events. The Shipper is solely responsible for ensuring that all tendered goods comply with all applicable local, national, and international regulations, including restrictions on hazardous materials and prohibited goods, and must guarantee the accuracy of all documentation and customs declarations.<br /><br />
                        ShipEx’s liability for loss, damage, or delay is strictly limited and defined by the provisions specified within the applicable Service Guide and, where pertinent, by international conventions such as the Montreal Convention. Any claims for loss or damage must be submitted in writing within a defined timeframe of the delivery date. These provisions are subject to periodic review and modification, with the most current version available on the official ShipEx website, and are governed by the laws of the State of Delaware, USA, and applicable international treaties.
                    </p>}
                </div>
            </div>

        </div>
    );
};

export default AboutUs;