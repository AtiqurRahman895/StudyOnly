// import PropTypes from 'prop-types';

import { Link, useLocation } from "react-router-dom";
import NavMenus from "./NavMenus";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { RiVerifiedBadgeFill } from "react-icons/ri";
// import { GoUnverified } from "react-icons/go";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [path]); // Trigger when the route changes

  const [scrollY, setScrollY] = useState(0);
  const headerRef = useRef(null);
  const { user, logoutUser, verifyAccount } = useContext(AuthContext);

  useEffect(() => {
    const changeHeaderColor = () => {
      setScrollY(window.scrollY);
      if (window.scrollY >= 16) {
        document;
        headerRef.current?.classList.add(`headerSectionAnimation`);
      } else {
        document;
        headerRef.current?.classList.remove(`headerSectionAnimation`);
      }
    };

    window.addEventListener(`scroll`, changeHeaderColor);
  }, []);

  // console.log(location.pathname)

  return (
    <header
      ref={headerRef}
      className={`${
        path === "/" ? "fixed" : "sticky"
      } text-white top-0 z-50 w-full py-2`}
    >
      <div className={`navbar container`}>
        <div className="navbar-start space-x-4">

          {
            (user?.email)&&(
              <label
                htmlFor="navSideBar" aria-label="open sidebar"
                className="p-1.5 border border-custom-primary rounded-md lg:hidden"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#7c3ff2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
            )
          }

          <Link
            to={"/"}
            className={`btn btn-ghost hover:bg-transparent font-fugaz pl-0 text-3xl text-custom-primary hover:text-custom-primary uppercase`}
          >
            <img src={"https://i.ibb.co.com/nQ396hD/study-only-logo.png"} alt="logo" className="w-[45px] hidden lg:block"/>
            Study Only
          </Link>
        </div>

        {
          (user?.email)&&(
            <div className="navbar-center hidden lg:inline-block">
              <ul className="menu menu-horizontal px-1 grid lg:flex items-center justify-items-center !list-none !space-y-0 !m-0">
                <NavMenus />
              </ul>
            </div>
          )
        }

        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="dropdown dropdown-end dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="indicator hover:shadow-xl sm:mx-4"
                >
                  <div className="w-10 aspect-square rounded-full overflow-hidden bg-white">
                    <img
                      alt="User Photo"
                      // className="place-self-start"
                      src={
                        user.photoURL
                          ? `${user.photoURL}`
                          : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                  {user.emailVerified && (
                    <RiVerifiedBadgeFill className="text-sky-500 text-[16px] indicator-item top-2 right-0" />
                  )}
                </div>
                <div className="dropdown-content bg-white rounded-box z-[1] min-w-52 p-2 shadow space-y-2">
                  <div className="space-y-1 text-center w-full">
                    {user.displayName && (
                      <div className="flex justify-center text-black">
                        <h5 className="font-bold">{user.displayName}</h5>
                        {/* {user.emailVerified?<RiVerifiedBadgeFill className="text-sky-500" />:<RiVerifiedBadgeFill className="text-red-500" />} */}
                        {/* {user.emailVerified && <RiVerifiedBadgeFill className="text-sky-400" />} */}
                      </div>
                    )}

                    <p className="text-custom-primary font-bold">
                      {user.email && user.email}
                    </p>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm text-black !list-none !space-y-1 !m-0"
                  >
                    {user.emailVerified || (
                      <li className="hover:scale-105 duration-200">
                        <p
                          onClick={verifyAccount}
                          className="font-bold text-black"
                        >
                          {" "}
                          Verify now{" "}
                        </p>
                      </li>
                    )}

                    {/* <li>
                      <Link to={"/update-profile"} className="">
                        Update Profile
                      </Link>
                    </li> */}
                    <li>
                      <Link to={"/change-password"} className="">
                        Change Password
                      </Link>
                    </li>
                    <li className="hover:scale-105 duration-200 sm:hidden">
                      <p onClick={logoutUser}>Log Out</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                onClick={logoutUser}
                className="primaryButton activePrimaryButton hidden sm:inline-block"
              >
                Log Out
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to={"/login"}
                className={`primaryButton activePrimaryButton`}
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className={`hidden sm:inline-block primaryButton activePrimaryButton`}
              >
                Registration
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// Footer.propTypes = {

// };

export default Header;
