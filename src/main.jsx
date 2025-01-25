import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import Base from "./components/BaseComponent/Base";
import ErrorPage from "./components/ErrorPageComponent/ErrorPage";
import Login from "./components/AuthenticationComponent/Login";
import Register from "./components/AuthenticationComponent/Register";
import AuthProvider from "./Provider/AuthProvider";
import PrivateRoute from "./components/AuthenticationComponent/PrivateRoute";
// import UpdateProfile from "./components/AuthenticationComponent/UpdateProfile";
import ChangePassword from "./components/AuthenticationComponent/ChangePassword";
import ForgotPassword from "./components/AuthenticationComponent/ForgotPassword";
import Home from "./components/HomeComponent/Home";
import Payment from "./components/PaymentComponent/Payment";
import DashboardBase from "./components/BaseComponent/DashboardBase";
import Dashboard from "./components/DashboardComponent/Dashboard";
import CreatSession from "./components/CreatSessionComponent/CreatSession";
import TutorRoute from "./components/AuthenticationComponent/tutorRoute";
import AllSessions from "./components/AllSessionsComponent/Allsessions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Session from "./components/SessionComponent/Session";
import ResubmitSession from "./components/ModifySessionComponent/ResubmitSession";
import AllNotes from "./components/AllNotesComponent/AllNotes";
import CreatNote from "./components/CreatNoteComponent/CreatNote";
import UpdateNote from "./components/UpdateNoteComponent/UpdateNote";
import MySessions from "./components/MySessionsComponent/MySessions";
import BookedSessions from "./components/BookedSessionsComponent/BookedSessions";
import AllMaterials from "./components/AllMaterialsComponent/AllMaterials";
import AdminRoute from "./components/AuthenticationComponent/AdminRoute";
import AllUsers from "./components/AllUsersComponent/AllUsers";
import DashboardRoute from "./components/AuthenticationComponent/DashboardRoute";
const role  = localStorage.getItem("role")

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/payment/:amount/:session_id/:email",
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
      // {
      //   path: "/update-profile",
      //   element: (
      //     <PrivateRoute>
      //       <UpdateProfile />
      //     </PrivateRoute>
      //   ),
      // },
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
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardBase />,
    errorElement: <ErrorPage />,
    
    children: [
      {
        path: "/dashboard",
        element: (
          <DashboardRoute>
              <Dashboard />
          </DashboardRoute>
          
        ),
      },
      {
        path: "/dashboard/all_users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
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
      {
        path: "/dashboard/all_sessions",
        element:(
          <PrivateRoute>
            <AllSessions />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/session/:_id",
        element: (
          <PrivateRoute>
            <Session />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/modify_session/:_id",
        element: (
          <TutorRoute>
            <ResubmitSession />
          </TutorRoute>
        ),
      },
      {
        path: "/dashboard/booked_session",
        element: (
          <PrivateRoute>
            <BookedSessions />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my_sessions",
        element: (
          <TutorRoute>
            <MySessions />
          </TutorRoute>
        ),
      },
      {
        path: "/dashboard/creat_note",
        element: (
          <PrivateRoute>
            <CreatNote />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all_notes",
        element: (
          <PrivateRoute>
            <AllNotes />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update_note/:_id",
        element: (
          <PrivateRoute>
            <UpdateNote />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all_materials",
        element: (
          <PrivateRoute>
            <AllMaterials />
          </PrivateRoute>
        ),
      },
      
      
    ],
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
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
);
