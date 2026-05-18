import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import useAxios from '../../Hooks/Axios/useAxios';
import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [eye, setEye] = useState(false);
    const [forget, setforget] = useState(false);
    const [resetEmail, setResetEmail] = useState(""); // State for forget password email
    const [loadingAction, setLoadingAction] = useState(false); // Global Loading State

    const { emailLogin, user, setUser, googleLogin, PasswordReset } = use(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const axiosInstance = useAxios();

    const handleEyeClick = (e) => {
        e.preventDefault();
        setEye(!eye);
    }

    //------------------Login With Email and PAssword------------------
    const handleEmailLogin = (data, e) => {
        setLoadingAction(true);
        emailLogin(data.email, data.password)
            .then((result) => {
                const currentUser = result.user;
                setUser(currentUser);
                toast.success(`Welcome back, ${currentUser.displayName || 'User'}!`);
                e.target.reset();
                navigate(location.state || '/');
            })
            .catch(error => {
                toast.error(error.message.replace("Firebase:", "").trim());
            })
            .finally(() => {
                setLoadingAction(false);
            });
    }

    //--------------------------Login WIth Google--------------------------
    const handleGoogleLogin = () => {
        setLoadingAction(true);
        googleLogin()
            .then(async (result) => {
                const currentUser = result.user;
                setUser(currentUser);
                const newUser = {
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    role: "user" // Default role
                }
                await axiosInstance.post("/users", newUser);
                toast.success("Successfully logged in with Google!");
                navigate(location.state || '/');
            })
            .catch((error) => {
                toast.error(error.message.replace("Firebase:", "").trim());
            })
            .finally(() => {
                setLoadingAction(false);
            });
    }

    // ------------------Handle Forget Password -------------------
    const handleForgetPassword = () => {
        setforget(!forget);
    }

    const paswordResetEmail = () => {
        if (!resetEmail) {
            toast.error("Please enter your email address first.");
            return;
        }

        setLoadingAction(true);
        PasswordReset(resetEmail)
            .then(() => {
                toast.success("Password reset link sent! Check your email.");
                setforget(false);
            })
            .catch((error) => {
                toast.error(error.message.replace("Firebase:", "").trim());
            })
            .finally(() => {
                setLoadingAction(false);
            });
    }

    return (
        <div className='flex mt-12 items-center justify-center p-2 relative'>
            
            {/* FULL SCREEN LOADING OVERLAY */}
            {loadingAction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                    <SyncLoader size={15} color='#CAEB66' />
                </div>
            )}

            {   //--------------Forget Password Page ---------------------
                forget ?
                    <div className='py-10 px-5 border border-[#94A3B8] lg:border-none rounded-2xl lg:p-0 w-full max-w-md'>
                        <p className='font-bold text-2xl lg:text-4xl text-black text-center lg:text-left'>Forgot Password</p>
                        <p className='text-black py-4 text-center lg:text-left'>Enter your email address and we’ll send you a reset link.</p>
                        <label className="label font-bold text-[#403F3F] text-[16px] mb-2">Email</label>
                        <input
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="input mb-3 w-full bg-white border-[#94A3B8] py-4 px-4 rounded-lg outline-none"
                            placeholder="Enter your email"
                        />
                        <button onClick={paswordResetEmail} type="button" className="btn mt-2 mb-3 bg-primary transition font-bold border-none text-black w-full py-3 rounded-lg">
                            Send Reset Link
                        </button>
                        <p className='text-[#706F6F] mt-1 text-center lg:text-left'>
                            Remember your password?{' '}
                            <span onClick={handleForgetPassword} className='font-bold cursor-pointer text-[#8FA748]'>
                                Login
                            </span>
                        </p>
                    </div>
                    :
                    <form onSubmit={handleSubmit(handleEmailLogin)} className='w-full max-w-md py-10 px-5 border border-[#94A3B8] lg:border-none rounded-2xl lg:p-0'>
                        <p className='text-black text-center text-3xl md:text-4xl 2xl:text-left font-bold'>
                            Welcome Back
                        </p>
                        <p className='text-black mb-5 text-center  2xl:text-left'>Login with ShipEx</p>

                        {/* Email  */}
                        <label className="label font-bold text-[#403F3F] text-[16px] mb-2">Email</label>
                        <input
                            type="email"
                            className="input mb-3 w-full bg-white border-[#94A3B8] py-4 px-4 rounded-lg outline-none"
                            placeholder="Email"
                            name='email'
                            {...register('email', { required: true })}
                        />
                        {errors.email && <p className='text-red-600 text-sm mb-2'>Please Enter your Email</p>}
                        
                        {/* Password  */}
                        <label className="label font-bold text-[#403F3F] text-[16px] mb-2 ">Password</label>
                        <div className='relative'>
                            <input
                                type={`${eye ? "text" : "password"}`}
                                className="input mb-3 w-full bg-white border-[#94A3B8] pr-10 py-4 px-4 rounded-lg outline-none"
                                placeholder="Password"
                                name='password'
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                            />
                            {eye ? <FaEyeSlash onClick={handleEyeClick} className='z-10 absolute right-4 bottom-5 text-xl text-gray-800 cursor-pointer'></FaEyeSlash> : <FaEye onClick={handleEyeClick} className='z-10 absolute right-4 bottom-5 text-xl text-gray-800 cursor-pointer'></FaEye>}
                        </div>
                        {errors.password && (
                            <p className="text-red-600 mb-2 text-sm">{errors.password.message}</p>
                        )}
                        <div className='mt-3 flex items-center md:flex-row gap-3 justify-between'>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" className="checkbox " />
                                <p className='font-bold text-sm'>Remember me</p>
                            </div>
                            <p onClick={handleForgetPassword} className='text-gray-600 font-bold cursor-pointer hover:text-[#8FA748] text-sm'>Forget Password?</p>
                        </div>

                        <button type="submit" className="btn mt-7 mb-3 bg-primary transition font-bold border-none text-black w-full py-3 rounded-lg">
                            Login
                        </button>

                        <p className='text-center font-semibold text-gray-500 mb-4'>OR</p>

                        <button onClick={handleGoogleLogin} type='button' className="btn font-bold bg-[#E9ECF1] text-black border border-[#e5e5e5] w-full flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-gray-200 transition">
                            <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                            </svg>
                            Login with Google
                        </button>

                        <p className='text-[#706F6F] text-center mt-6'>
                            Don't have an account?{' '}
                            <Link to={'/register'} className='font-bold text-[#8FA748]'>
                                Register
                            </Link>
                        </p>
                    </form>
            }
        </div>
    );
};

export default Login;