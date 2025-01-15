

import { AiFillHome } from "react-icons/ai";
import { IoNewspaper } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { TransferLists } from "../../Contexts/TransferLists";

const NavMenus = () => {
  const {user}=useContext(AuthContext)
  const {role}=useContext(TransferLists)


  return (
    <>
      <li className="w-fit">
        <NavLink to={"/"} className="hover:bg-transparent flex items-center gap-1 pb-1 mb-1"><AiFillHome /> Home</NavLink>
      </li>
      
      <li className="w-fit">
        <NavLink to={"/dashboard"} className="hover:bg-transparent flex items-center gap-1 pb-1 mb-1"><IoNewspaper />Dashboard</NavLink>
      </li>      

    </>
  );
};

export default NavMenus;
