import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/Error/Error";
import AboutUs from "../Pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
    {
        path : '/' ,
        Component : Root ,
        errorElement : <ErrorPage></ErrorPage> ,
        children : [
            {index : true , Component : Home} ,
            {path : '/aboutus' , Component : AboutUs}
        ]
    },
    {
        path : '*' ,
        Component : ErrorPage
    }
])