import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Root.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import InputForm from './components/InputForm.jsx'
import Showcase from './components/Showcase.jsx'

// router
const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/new",
        element: <InputForm />
      },
      {
        path: "/refub",
        element: <Showcase />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={mainRouter} />
  </StrictMode>,
)
