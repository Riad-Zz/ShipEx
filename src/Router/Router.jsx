import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/Error/Error";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Coverage from "../Pages/Coveeage/Coverage";
import Loader from "../Pages/Shared/Loader/Loader";

export const router = createBrowserRouter([
    {
        path : '/' ,
        Component : Root ,
        HydrateFallback : Loader ,
        errorElement : <ErrorPage></ErrorPage> ,
        children : [
            {index : true , Component : Home} ,
            {path : '/aboutus' , Component : AboutUs} ,
            {path : '/coverage' , Component : Coverage , loader : ()=>fetch('/locations.json').then(res => res.json())}
        ]
    },
    {
        path : '*' ,
        Component : ErrorPage
    }
])