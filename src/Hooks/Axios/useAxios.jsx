import axios from 'axios';
import { use, useEffect } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';


const axiosInstance = axios.create({
    baseURL: `http://localhost:3000`
    // baseURL: `https://shipex-server.vercel.app/`
})

const useAxios = () => {
    const { user,logOut } = use(AuthContext)
    const navigate = useNavigate() ;
    useEffect(() => {
        if (!user?.accessToken) return;
        // Request Intercepetor 
        const reqInterceptor = axiosInstance.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${user.accessToken}`
            return config;
        }, (error) => {
            Promise.reject(error);
        });

        // Response Intercepetor 
        const resIntercepetor = axiosInstance.interceptors.response.use((response) => {
            return response
        }, (error) => {
            const status = error?.response?.status;
            if (status === 401 || status === 403) {
                console.warn("Unauthorized or Forbidden — Logging out...");

                logOut().then(() => {
                    navigate('/');
                });
            }

            return Promise.reject(error);
        });

        // CleanUp
        return () => {
            axiosInstance.interceptors.request.eject(reqInterceptor);
            axiosInstance.interceptors.response.eject(resIntercepetor);
        };

    }, [user?.accessToken,logOut,navigate])
    return axiosInstance;
};

export default useAxios;