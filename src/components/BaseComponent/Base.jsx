// import React from 'react';
// import PropTypes from 'prop-types';

import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import { TransferLists } from "../../Contexts/TransferLists";
import NavSideBar from "./NavSidebar";
import { secureAxios } from "../../Hooks/useSecureAxios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { normalAxios } from "../../Hooks/useNormalAxios";
const Base = () => {

  const adminUsers=["emonhassan895@gmail.com","atiqemon98@gmail.com"] 

  const {logoutUser,user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [lightTheme, setLightTheme]=useState(false)  

  const [appointmentCredentials, setAppointmentCredentials]=useState()
  const [amount,setAmount]=useState(40)

  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(false);

  const token=localStorage.getItem("token")


    useEffect(() => {
      const email=user?.email

      if (!email || !token) {
        setLoading(false);
        setRole("guest")
        return;
      }

      setLoading(true);
      normalAxios.get(`/user/${email}`,{headers:{
        token:`Bearer ${token}`,
        email,
      }})
        .then((res) => {

          if (res.data?.role) {
            setRole(res.data.role)
          } else {
            logoutUser();
            // toast.error("User role was not found for some reason. Login again!");
            navigate("/login");
          }
        })
        .catch((error) => {
          if (error.response?.status === 401 || error.response?.status === 403) {
            logoutUser();
            toast.error(error.data.message);
            navigate("/login");
          }
          console.error("Error finding user role:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [user?.email,token]);

  const value={
    adminUsers,
    lightTheme, setLightTheme,
    appointmentCredentials, setAppointmentCredentials,
    amount,setAmount,
    role, setRole,
    loading, setLoading,
  }

  return (
    <>
      <TransferLists.Provider value={value}>
          <NavSideBar>

            {/* Navbar */}
            <Header />
            {/* Page content here */}
            <Outlet />
            <Footer />
            
          </NavSideBar>

      </TransferLists.Provider>

    </>
  );
};

// Base.propTypes = {

// };

export default Base;
