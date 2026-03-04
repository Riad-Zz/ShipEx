import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/Error/Error";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Coverage from "../Pages/Coveeage/Coverage";
import Loader from "../Pages/Shared/Loader/Loader";
import Register from "../Pages/Authentication/Register";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login";
import BeRider from "../Pages/BeRider/BeRider";
import PrivateRoutes from "../Providers/PrivateRoutes/PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import Pricing from "../Pages/Pricing/Pricing";
import Dashboard from "../Layouts/Dashboard";
import Overview from "../Pages/DashboardPages/Overview/Overview";
import Deliveries from "../Pages/DashboardPages/Deliveries/Deliveries";
import ParcelDetails from "../Pages/DashboardPages/ParcelDetails/ParcelDetails";
import paymentSuccess from "../Pages/DashboardPages/Payment/paymentSuccess";
import paymentCancell from "../Pages/DashboardPages/Payment/paymentCancell";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        HydrateFallback: Loader,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            { index: true, Component: Home },
            { path: '/aboutus', Component: AboutUs },
            { path: '/coverage', Component: Coverage, loader: () => fetch('/locations.json').then(res => res.json()) },
            {
                path: '/berider',
                element: <PrivateRoutes><BeRider></BeRider> </PrivateRoutes> , 
                loader : () => fetch('/locations.json') 
            },
            {
                path : '/sendparcel' ,
                Component : SendParcel ,
                loader :()=> fetch('/locations.json')
            } ,
            {
                path : '/pricing' ,
                Component : Pricing ,
                loader :()=> fetch('/locations.json')
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            { path: '/register', Component: Register },
            { path: '/login', Component: Login },
        ]
    },
    {
        path: '*',
        Component: ErrorPage
    },
    {
        path : '/' ,
        element : <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes> ,
        errorElement : <ErrorPage></ErrorPage>,
        children : [
            {path :'dashboard' , Component:Overview},
            {path:'deliveries',Component:Deliveries} ,
            {path:'details/:id' , Component : ParcelDetails} ,
            {path :'paymentsuccess', Component : paymentSuccess},
            {path:'paymentcancel',Component : paymentCancell} ,
        ]
    }
])