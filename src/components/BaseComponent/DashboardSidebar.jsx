import { Outlet, useLocation } from "react-router-dom";
import NavMenus from "./NavMenus";
import DashboardHeader from "./DashboardHeader";
import DashboardMenus from "./DashboardMenus";
import { useEffect, useRef } from "react";

const DashboardSideBar = () => {
  const location = useLocation();
  const drawerRef=useRef(null)

  useEffect(() => {
    console.log("works")
    drawerRef.current.scrollTo(0, 0); // Scroll to the top of the page
  }, [location.pathname]); // Trigger when the route changes

  return (
    <section>
      <DashboardHeader />
      <div ref={drawerRef} className="container drawer lg:drawer-open lg:gap-x-6 min-h-[90svh] lg:max-h-[90svh] lg:hide-scrollbar overflow-y-scroll">
        <input
          id="DashboardNavSideBar"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content pb-8">
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
              {/* <NavMenus /> */}
              <DashboardMenus />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSideBar;
