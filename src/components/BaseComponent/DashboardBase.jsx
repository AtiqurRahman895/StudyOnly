import Footer from "./Footer";
import { TransferLists } from "../../Contexts/TransferLists";
import DashboardSideBar from "./DashboardSidebar";
import useGetUserRole from "../../Hooks/useGetUserRole";
import Loading from "../AuthenticationComponent/Loading";
const DashboardBase = () => {
  const { loading,role } = useGetUserRole();
  const value = {
    role,
  };

  return (
    <>
      <TransferLists.Provider value={value}>
      {
        (loading)?(<Loading />):(
          <>
            <DashboardSideBar />
            <Footer />
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
