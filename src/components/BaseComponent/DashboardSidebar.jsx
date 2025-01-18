import { Outlet } from "react-router-dom";
import NavMenus from "./NavMenus";
import DashboardHeader from "./DashboardHeader";
import DashboardMenus from "./DashboardMenus";

const DashboardSideBar = () => {
  return (
    <section>
      <DashboardHeader />

      <div className="container drawer lg:drawer-open lg:gap-4">
        <input
          id="DashboardNavSideBar"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side z-50 lg:bg-custom-primary rounded-md lg:py-20">
          <label
            htmlFor="DashboardNavSideBar"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-custom-primary lg:bg-transparent text-white min-h-full w-[70svw] xs:w-80 sm:w-96 lg:w-80 grid items-center pl-4 xs:pl-12">
            <ul className="menu h-fit !list-none !space-y-0 !m-0">
              <NavMenus />
              <DashboardMenus />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSideBar;
