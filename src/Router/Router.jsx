import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/Error/Error";

export const router = createBrowserRouter([
    {
        path : '/' ,
        Component : Root ,
        errorElement : <ErrorPage></ErrorPage> ,
        children : [
            {index : true , Component : Home}
        ]
    },
    {
        path : '*' ,
        Component : ErrorPage
    }
])