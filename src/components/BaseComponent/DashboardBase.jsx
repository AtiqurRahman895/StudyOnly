import { TransferLists } from "../../Contexts/TransferLists";
import DashboardSideBar from "./DashboardSidebar";
import useGetUserRole from "../../Hooks/useGetUserRole";
import { useRef } from "react";

const DashboardBase = () => {
  const { role } = useGetUserRole();
  const pageRef=useRef(null)

  const value = {
    role,
    pageRef
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
