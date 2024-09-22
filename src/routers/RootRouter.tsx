import App from "@/App";
import ProtectedRoute from "@/middlewares/ProtectedRoute";
import UserLogin from "@/pages/auth/UserLogin";
import UserRegister from "@/pages/auth/UserRegister";
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
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path:"/login",
                element: <UserLogin/>
            },
            {
                path:"/register",
                element: <UserRegister/>
            },
        ]
    }
])

export default rootRouter;