import { AiFillHome } from "react-icons/ai";
import { IoNewspaper } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { TransferLists } from "../../Contexts/TransferLists";

const NavMenus = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname;
  const normalClass = `hover:bg-transparent flex items-center gap-1 pb-1 mb-1`;
  const ActiveClass = `border-b-2 rounded-none`;

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
          to={"/all_sessions"}
          className={`${
            path === "/all_sessions" && ActiveClass
          } ${normalClass}`}
        >
          <IoNewspaper />
          All Sessions
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
    </>
  );
};

export default NavMenus;
