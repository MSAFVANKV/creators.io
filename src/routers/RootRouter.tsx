import App from "@/App";
import Home from "@/pages/userSide/Home";
import Folder from "@/pages/userSide/todos/ToDo";
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
            // {
            //     path:"/todo",
            //     element: <Folder title="dasda" content="asdasdada"/>
            // },
        ]
    }
])

export default rootRouter;