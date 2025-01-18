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
import DashboardBase from './components/BaseComponent/DashboardBase';
import Dashboard from './components/DashboardComponent/Dashboard';
import CreatSession from './components/CreatSessionComponent/CreatSession';
import TutorRoute from './components/AuthenticationComponent/tutorRoute';
import AllSessions from './components/AllSessionsComponent/Allsessions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Session from './components/SessionComponent/Session';



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
      {
        path: "/all_sessions",
        element: <AllSessions />
      },
      {
        path: "/session/:_id/:tutor_email",
        element: <Session />
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
  {
    path: "/dashboard",
    element: <DashboardBase/>,
    errorElement: <ErrorPage/>,

    children:[
      {
        path: "/dashboard",
        element:  (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/creat_session",
        element: (
          <TutorRoute>
            <CreatSession />
          </TutorRoute>
        ),
      },
    ]
  },

]);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <ToastContainer position="top-center" />
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>

  </StrictMode>
)
