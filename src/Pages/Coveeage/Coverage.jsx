import React, { useRef } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import L from "leaflet";
import { useLoaderData } from 'react-router';

const Coverage = () => {

    const redIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });


    const locationRef = useRef(null);
    const position = [23.8103, 90.4125]
    const allLocation = useLoaderData();
    // console.log(allLocation);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchedLoacation = e.target.address.value;
        const location = allLocation.find(loc => loc.district.toLowerCase() === searchedLoacation.toLowerCase());
        // console.log(location) ;
        const position = [location.latitude, location.longitude]
        // console.log(position)
        console.log(locationRef.current.flyTo(position, 15));
    }

    return (
        <div className='max-w-11/12 md:max-w-10/12 mx-auto my-8'>
            <div className='p-7 md:p-20 bg-white rounded-4xl'>
                {/* Title */}
                <p className='font-extrabold text-5xl text-secondary'>We are available in 64 districts</p>
                <p className='max-w-xl mt-2'>Our commitment to nationwide service excellence means we have strategically established a reliable delivery presence in all 64 districts, connecting your business to every potential customer.</p>
                {/* search box  */}
                {/* For medium and large device  */}
                <form className=' relative hidden md:block' onSubmit={handleSearch}>
                    <input type="text" name='address' className=' lg:w-md bg-[#cbd5e14d] text-lg  py-3 px-5 pl-10 rounded-l-4xl outline-none' placeholder='Search here' />
                    <IoSearchOutline className='absolute top-14 left-4 text-xl'></IoSearchOutline>
                    <button type='submit' className='bg-primary text-lg my-10 py-3 px-8  text-black font-bold rounded-r-4xl cursor-pointer'>Search</button>
                </form>
                {/* for small screen  */}
                <form className="md:hidden flex flex-col justify-center items-center my-10" onSubmit={handleSearch}>
                    <div className="relative w-full">
                        <input
                            type="text"
                            name="address"
                            placeholder="Search here"
                            className="w-full bg-[#cbd5e14d] text-lg py-3 px-5 pl-10 rounded-4xl outline-none"
                        />
                        <IoSearchOutline className="absolute top-1/2 left-4 -translate-y-1/2 text-xl" />
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-primary text-lg py-3 px-8 text-black font-bold rounded-4xl cursor-pointer"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Map here   */}
                <div className='min-w-full h-[800px]'>
                    <MapContainer
                        className='h-[800px]'
                        center={position}
                        zoom={8}
                        ref={locationRef}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            allLocation.map((location, index) => (
                                <Marker icon={redIcon} key={index} position={[location.latitude, location.longitude]}>
                                    <Popup>
                                        {
                                            location.covered_area.join(" ,")
                                        }
                                    </Popup>
                                </Marker>
                            ))
                        }

                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Coverage;