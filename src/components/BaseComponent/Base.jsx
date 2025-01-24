// import React from 'react';
// import PropTypes from 'prop-types';

import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { TransferLists } from "../../Contexts/TransferLists";
import NavSideBar from "./NavSideBar";
import useGetUserRole from "../../Hooks/useGetUserRole";
import Loading from "../AuthenticationComponent/Loading";

const Base = () => {
  const { loading,role } = useGetUserRole();

  const value = {
    role,
  };

  return (
    <>
      <TransferLists.Provider value={value}>
        {
          (loading)?(<Loading />):(
            <NavSideBar>
              <Header />
              <Outlet />
              <Footer />
            </NavSideBar>
          )

        }
      </TransferLists.Provider>
    </>
  );
};

// Base.propTypes = {

// };

export default Base;
