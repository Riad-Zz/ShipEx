import React, { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router';
import Logo from '../../Components/Logo/Logo';
import imageUpload from '../../assets/image-upload-icon.png'


const Register = () => {
    const [eye, setEye] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");
        const handleEyeClick = (e) => {
            e.preventDefault();
            setEye(!eye);
        }
    return (
        <div className='flex min-h-screen lg:min-h-auto items-center justify-center p-1 relative'>
            {/* <div className='absolute top-0'>
                <Logo></Logo>
            </div> */}
            <form className='w-full max-w-md py-10 px-5 p-2 border border-[#94A3B8] lg:border-none rounded-2xl lg:p-0'>
                <p className='text-black text-center text-3xl md:text-4xl lg:text-left font-bold'>
                    Create an Account
                </p>
                <p className='text-black mb-5 text-center  lg:text-left'>Register with ShipEx</p>
                <div className='my-4 flex flex-col items-center gap-2'>
                    <img src={imageUpload} alt="" className='cursor-pointer'/>
                    <p className='text-[#403F3F] font-bold'>Upload Your Avatar</p>
                </div>

                {/* Name  */}
                <label className="label font-bold text-[#403F3F] text-[16px] mb-2">Name</label>
                <input
                    type="text"
                    className="input mb-3 w-full bg-white border-[#94A3B8] py-4 px-4 rounded-lg outline-none"
                    placeholder="Name"
                    name='name'
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    value={currentEmail}
                />

                {/* Email  */}

                <label className="label font-bold text-[#403F3F] text-[16px] mb-2">Email</label>
                <input
                    type="email"
                    className="input mb-3 w-full bg-white border-[#94A3B8] py-4 px-4 rounded-lg outline-none"
                    placeholder="Email"
                    name='email'
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    value={currentEmail}
                />
                {/* Password  */}
                <label className="label font-bold text-[#403F3F] text-[16px] mb-2 ">Password</label>
                <div className='relative'>
                    <input
                        type={`${eye ? "text" : "password"}`}
                        className="input mb-3 w-full bg-white border-[#94A3B8] pr-10 py-4 px-4 rounded-lg outline-none"
                        placeholder="Password"
                        name='password'
                    />
                    {
                        eye ? <FaEyeSlash onClick={handleEyeClick} className='z-10 absolute right-4 bottom-5 text-xl text-gray-800'></FaEyeSlash> : <FaEye onClick={handleEyeClick} className='z-10 absolute right-4 bottom-5 text-xl text-gray-800'></FaEye>
                    }
                </div>
                <div className='mt-3 flex items-center md:flex-row gap-3 justify-between'>
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox " />
                        <p className='font-bold text-sm'>Remember me</p>
                    </div>
                    <p className='text-gray-600 font-bold cursor-pointer hover:text-[#8FA748] text-sm'>Forget Password</p>
                </div>

                <button type="submit" className="btn mt-7 mb-3 bg-primary transition font-bold border-none text-black w-full py-3 rounded-lg">
                    Register
                </button>

                <p className='text-center font-semibold text-gray-500 mb-4'>OR</p>

                <button className="btn font-bold bg-[#E9ECF1] text-black border border-[#e5e5e5] w-full flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-gray-200 transition">
                    <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                    </svg>
                    Login with Google
                </button>

                <p className='text-[#706F6F] text-center mt-6'>
                    Already have an account?{' '}
                    <Link to={'/login'} className='font-bold text-[#8FA748]'>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;