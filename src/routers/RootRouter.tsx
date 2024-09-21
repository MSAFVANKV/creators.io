import App from "@/App";
import Home from "@/pages/userSide/Home";
import { createBrowserRouter } from "react-router-dom";


const rootRouter = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                index:true,
                path:"/",
                element: <Home/>
            },
        ]
    }
])