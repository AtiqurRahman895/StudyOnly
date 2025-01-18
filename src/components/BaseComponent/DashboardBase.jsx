import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { TransferLists } from "../../Contexts/TransferLists";
import DashboardSideBar from "./DashboardSidebar";
import useGetUserRole from "../../Hooks/useGetUserRole";
const DashboardBase = () => {
  const { role } = useGetUserRole();

  const value = {
    role,
  };

  return (
    <>
      <TransferLists.Provider value={value}>
        <DashboardSideBar />
        <Footer />
      </TransferLists.Provider>
    </>
  );
};

// DashboardBase.propTypes = {

// };

export default DashboardBase;
