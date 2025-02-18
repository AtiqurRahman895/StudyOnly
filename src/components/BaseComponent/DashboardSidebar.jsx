import { Link, Outlet, useLocation } from "react-router-dom";
import NavMenus from "./NavMenus";
import DashboardHeader from "./DashboardHeader";
import DashboardMenus from "./DashboardMenus";
import { useContext, useEffect, useRef } from "react";
import { TransferLists } from "../../Contexts/TransferLists";

const DashboardSideBar = () => {
  const location = useLocation();
  const {pageRef}=useContext(TransferLists)
  useEffect(() => {
    // console.log("works")
    pageRef.current.scrollTo(0, 0); // Scroll to the top of the page
  }, [location.pathname]); // Trigger when the route changes

  return (
    <section>
      <div ref={pageRef} className="drawer lg:drawer-open lg:h-svh lg:hide-scrollbar lg:overflow-y-auto">
        <input
          id="DashboardNavSideBar"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content ">
          <DashboardHeader />
          <div className="container lg:!px-[5%] min-h-screen pb-10">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side z-50 lg:bg-custom-primary">
          <label
            htmlFor="DashboardNavSideBar"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="bg-custom-primary text-white p-4 lg:bg-transparent min-h-screen w-[70svw] xs:w-80 sm:w-96 lg:w-80 flex flex-col justify-between gap-8">
            <div className="text-center">
              <Link
                to={"/"}
                className={`btn btn-ghost p-0 hover:bg-transparent font-fugaz text-3xl text-white uppercase`}
              >
                {/* <img src={logo} alt="Discount Pro" className="w-[100px]"/> */}
                Study Only
              </Link>
            </div>

            <ul className="menu !list-none !space-y-0 !m-0">
              {/* <NavMenus /> */}
              <DashboardMenus />
            </ul>

            <div className="footer footer-center gap-3 text-white">
                <nav>
                  <div className="grid grid-flow-col gap-4">
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </a>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                    </a>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                      </svg>
                    </a>
                  </div>
                </nav>
                <aside className="footerCopyRights">
                  <p>
                    All right reserved ©Study Only -{new Date().getFullYear()}.
                    <br className="lg:hidden" /> Developed by{" "}
                    <a href="https://atiqur.pages.dev/">
                      <b>Atiqur Rahman</b>
                    </a>
                  </p>
                </aside>
            </div>

          </div>

        </div>
        
      </div>
    </section>
  );
};

export default DashboardSideBar;
