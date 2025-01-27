import { TransferLists } from "../../Contexts/TransferLists";
import DashboardSideBar from "./DashboardSidebar";
import useGetUserRole from "../../Hooks/useGetUserRole";
import Loading from "../AuthenticationComponent/Loading";
import { useRef } from "react";

const DashboardBase = () => {
  const { loading,role } = useGetUserRole();
  const pageRef=useRef(null)

  const value = {
    role,
    pageRef
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
