import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/index.tsx'
import Login from './pages/login/index.tsx'
import App from './App.tsx'
import ErrorPage from './compenents/error/errorPage.tsx'

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children:[
        {
          path: '/',
          element: <Login />,
        },
        {
          path: '/home',
          element: <Home />,
        },
      ],
    },
  ]
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
