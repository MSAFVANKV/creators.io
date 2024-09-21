
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import rootRouter from './routers/RootRouter.tsx'
createRoot(document.getElementById('root')!).render(
<RouterProvider router={rootRouter} />
)
