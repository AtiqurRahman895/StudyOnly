import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import Base from './components/BaseComponent/Base'
import ErrorPage from './components/ErrorPageComponent/ErrorPage'
import Login from "./components/AuthenticationComponent/Login";
import Register from "./components/AuthenticationComponent/Register";
import AuthProvider from "./Provider/AuthProvider";
import PrivateRoute from "./components/AuthenticationComponent/PrivateRoute";
import UpdateProfile from "./components/AuthenticationComponent/UpdateProfile";
import ChangePassword from "./components/AuthenticationComponent/ChangePassword";
import ForgotPassword from "./components/AuthenticationComponent/ForgotPassword";
import Home from './components/HomeComponent/Home';
import Payment from './components/PaymentComponent/Payment';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Base/>,
    errorElement: <ErrorPage/>,

    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },

      // Authentication
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/change-password",
        element: (
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        ),
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ToastContainer position="top-center" />
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
