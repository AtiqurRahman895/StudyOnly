import { AiFillHome } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { TransferLists } from "../../Contexts/TransferLists";
import { MdSpaceDashboard } from "react-icons/md";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { PiListNumbersFill, PiNotebookFill } from "react-icons/pi";
import { RiLogoutBoxRFill, RiStickyNoteAddFill } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";

const DashboardMenus = () => {
  const { user } = useContext(AuthContext);
  const { logoutUser } = useContext(AuthContext);
  const { role } = useContext(TransferLists);
  const location = useLocation();
  const path = location.pathname;
  const normalClass = `hover:bg-transparent flex items-center gap-1 pb-1 mb-1`;
  // const ActiveClass = `border-b-2 rounded-none`;
  const ActiveClass = ``;

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
          className={`${path.includes("/dashboard") && "!border-b-2 pb-2.5 !rounded-none"} ${normalClass}`}
        >
          <MdSpaceDashboard />
          Dashboard
        </NavLink>
      </li>

      {/* Common */}

      <li className="w-fit">
        <NavLink
          to={"/all_sessions"}
          className={`${
            path === "/all_sessions" && ActiveClass
          } ${normalClass}`}
        >
          <PiListNumbersFill />
          All Sessions
        </NavLink>
      </li>

      {/* Student */}

      {
        (role==="student")&&(
          <>

            <li className="w-fit">
              <NavLink
                to={"/dashboard/booked_session"}
                className={`${
                  path === "/dashboard/booked_session" && ActiveClass
                } ${normalClass}`}
              >
                <FaChalkboardTeacher />
                Booked Sessions
              </NavLink>
            </li>

          </>
        )
      }

      {/* Tutor */}

      {
        (role==="tutor")&&(
          <>
            <li className="w-fit">
              <NavLink
                to={"/dashboard/creat_session"}
                className={`${
                  path === "/dashboard/creat_session" && ActiveClass
                } ${normalClass}`}
              >
                <TiPlus />
                Creat Session
              </NavLink>
            </li>

            <li className="w-fit">
              <NavLink
                to={"/dashboard/my_sessions"}
                className={`${
                  path === "/dashboard/my_sessions" && ActiveClass
                } ${normalClass}`}
              >
                <FaChalkboardTeacher />
                My Sessions
              </NavLink>
            </li>
          </>
        )
      }

      {/* common */}

      <li className="w-fit">
        <NavLink
          to={"/dashboard/all_materials"}
          className={`${
            path === "/dashboard/all_materials" && ActiveClass
          } ${normalClass}`}
        >
          <FaFolderOpen />
          All Materials
        </NavLink>
      </li>
      

      {/* Admin */}

      {
        (role==="admin")&&(
          <>
            <li className="w-fit">
              <NavLink
                to={"/dashboard/all_users"}
                className={`${
                  path === "/dashboard/all_users" && ActiveClass
                } ${normalClass}`}
              >
                <FaUsers />
                All Users
              </NavLink>
            </li>
          </>
        )
      }

      {/* Common */}

      <li className="w-fit">
        <NavLink
          to={"/dashboard/creat_note"}
          className={`${
            path === "/dashboard/creat_note" && ActiveClass
          } ${normalClass}`}
        >
          <RiStickyNoteAddFill />
          Creat Note
        </NavLink>
      </li>

      <li className="w-fit">
        <NavLink
          to={"/dashboard/all_notes"}
          className={`${
            path === "/dashboard/all_notes" && ActiveClass
          } ${normalClass}`}
        >
          <PiNotebookFill />
          All Notes
        </NavLink>
      </li>

      <li className="w-fit sm:hidden">
        <p onClick={logoutUser} className="flex items-center">
          <RiLogoutBoxRFill />
          Log Out
        </p>
      </li>

      

      {/* <li className="w-fit">
        <NavLink
          to={"/dashboard/upload_materials"}
          className={`${
            path === "/dashboard/upload_materials" && ActiveClass
          } ${normalClass}`}
        >
          <IoNewspaper />
          Upload Materials
        </NavLink>
      </li> */}

    </>
  );
};

export default DashboardMenus;
