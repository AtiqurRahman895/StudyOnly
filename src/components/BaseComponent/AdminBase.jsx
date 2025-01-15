
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useState } from "react";
import { TransferLists } from "../../Contexts/TransferLists";
import NavSideBar from "./NavSidebar";
import AdminHeader from "./adminHeader";
const AdminBase = () => {

  const [users, setUsers] = useState([]);
  const [lightTheme, setLightTheme]=useState(false)

  const value={
    users, setUsers,
    lightTheme, setLightTheme,
  }

  return (
    <>
      <TransferLists.Provider value={value}>
          <NavSideBar>

            {/* Navbar */}
            <AdminHeader />
            {/* Page content here */}
            <Outlet />
            <Footer />
            
          </NavSideBar>

      </TransferLists.Provider>

    </>
  );
};

// AdminBase.propTypes = {

// };

export default AdminBase;
