import React, { use } from 'react';
import photo from '../../assets/Others/ErrorImage.png'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const ErrorPage = () => {

    return (
        <div >
            <div className='max-w-10/12 mx-auto'>
                <div className='min-h-screen space-y-4 flex flex-col justify-center items-center '>
                    <img src={photo} alt="" className='max-h-100' />
                    <p className={` text-2xl  font-semibold text-center`}>Seems like something went wrong</p>
                    <Link to={'/'}><button className=' btn px-10 py-3 bg-primary rounded-xl text-black font-bold hover:scale-105 transition-transform'><IoMdArrowRoundBack></IoMdArrowRoundBack> Go Back</button></Link>
                </div>

            </div>
        </div>

    );
};

export default ErrorPage;