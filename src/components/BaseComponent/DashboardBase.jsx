import { TransferLists } from "../../Contexts/TransferLists";
import DashboardSideBar from "./DashboardSidebar";
import useGetUserRole from "../../Hooks/useGetUserRole";
import { useRef, useState } from "react";

const DashboardBase = () => {
  const { role } = useGetUserRole();
  const pageRef=useRef(null)
  const [lightTheme, setLightTheme]=useState(false)

  const value = {
    role,
    pageRef,
    lightTheme, setLightTheme,
  };

  return (
    <>
      <TransferLists.Provider value={value}>
        <DashboardSideBar />
        {/* <Footer /> */}
      </TransferLists.Provider>
    </>
  );
};

// DashboardBase.propTypes = {

// };

export default DashboardBase;
