import { AiFillHome } from "react-icons/ai";
import { IoNewspaper } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

const NavMenus = () => {
  const location = useLocation();
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
          <IoNewspaper />
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
          <IoNewspaper />
          All Sessions
        </NavLink>
      </li>
    </>
  );
};

export default NavMenus;
