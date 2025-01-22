import Footer from "./Footer";
import { TransferLists } from "../../Contexts/TransferLists";
import DashboardSideBar from "./DashboardSidebar";
import useGetUserRole from "../../Hooks/useGetUserRole";
import Loading from "../AuthenticationComponent/Loading";
import { useState } from "react";
const DashboardBase = () => {
  const { loading,role } = useGetUserRole();
    const [searchQuery, setSearchQuery] = useState("All");

  const value = {
    role,
    searchQuery, setSearchQuery
  };

  return (
    <>
      <TransferLists.Provider value={value}>
      {
        (loading)?(<Loading />):(
          <>
            <DashboardSideBar />
            {/* <Footer /> */}
          </>
        )
      }
      </TransferLists.Provider>
    </>
  );
};

// DashboardBase.propTypes = {

// };

export default DashboardBase;
