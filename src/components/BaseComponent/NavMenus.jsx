import { useContext } from "react";
import { AiFillHome } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import { PiListNumbersFill } from "react-icons/pi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const NavMenus = () => {
  const location = useLocation();
  const { logoutUser } = useContext(AuthContext);
  const path = location.pathname;
  const normalClass = `hover:bg-transparent flex items-center gap-1 pb-1 mb-1`;
  const ActiveClass = `border-b-2 rounded-none !text-white`;

  return (
    <>
      <li className="w-fit">
        <NavLink
          to={"/"}
          className={`${path === "/" && ActiveClass} ${normalClass}`}
        >
          <AiFillHome /> Home
        </NavLink>
      </li>

      <li className="w-fit">
        <NavLink
          to={"/dashboard"}
          className={`${path === "/dashboard" && ActiveClass} ${normalClass}`}
        >
          <MdSpaceDashboard />
          Dashboard
        </NavLink>
      </li>

      <li className="w-fit">
        <NavLink
          to={"/dashboard/all_sessions"}
          className={`${
            path === "/dashboard/all_sessions" && ActiveClass
          } ${normalClass}`}
        >
          <PiListNumbersFill />
          All Sessions
        </NavLink>
      </li>


      <li className="w-fit sm:hidden">
        <p onClick={logoutUser}>
          <RiLogoutBoxRFill />
          Log Out
        </p>
      </li>
    </>
  );
};

export default NavMenus;
