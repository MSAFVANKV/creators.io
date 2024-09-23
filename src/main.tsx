
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import rootRouter from './routers/RootRouter.tsx'
import axios from 'axios'
import { AuthProvider } from './context/AuthContext.tsx'

// axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL = 'https://creator-io-server-6ush.vercel.app/';


createRoot(document.getElementById('root')!).render(
    <AuthProvider>
    <RouterProvider router={rootRouter} />
  </AuthProvider>
)
