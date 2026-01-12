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

export const router = createBrowserRouter([
    {
        path : '/' ,
        Component : Root ,
        HydrateFallback : Loader ,
        errorElement : <ErrorPage></ErrorPage> ,
        children : [
            {index : true , Component : Home} ,
            {path : '/aboutus' , Component : AboutUs} ,
            {path : '/coverage' , Component : Coverage , loader : ()=>fetch('/locations.json').then(res => res.json())} ,
            {path:'/berider' , Component : BeRider} ,
        ]
    },
    {
        path : '/' ,
        Component : AuthLayout ,
        errorElement : <ErrorPage></ErrorPage> ,
        children : [
            {path : '/register' , Component : Register} ,
            {path : '/login' , Component : Login} ,
        ]
    } ,
    {
        path : '*' ,
        Component : ErrorPage
    }
])