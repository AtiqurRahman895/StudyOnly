// import React from 'react';
// import PropTypes from 'prop-types';

import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { TransferLists } from "../../Contexts/TransferLists";
import NavSideBar from "./NavSideBar";
import ThemeToggler from "../CommonComponent/ThemeToggler";

import useGetUserRole from "../../Hooks/useGetUserRole";
import { useState } from "react";

const Base = () => {
  const {role } = useGetUserRole();
  const [lightTheme, setLightTheme]=useState(false)

  const value = {
    role,
    lightTheme, setLightTheme
  };

  return (
    <>
      <TransferLists.Provider value={value}>
        <NavSideBar>
          <Header />
          <Outlet />
          <Footer />
          <section className="fixed bottom-[10%] right-4 z-50">
            <ThemeToggler/>
          </section>
        </NavSideBar>
      </TransferLists.Provider>
    </>
  );
};

// Base.propTypes = {

// };

export default Base;
