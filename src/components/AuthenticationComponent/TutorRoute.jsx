import { useContext, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { toast } from "react-toastify";


const TutorRoute = ({children}) => {
    const navigate = useNavigate();
    const {user,loading,logoutUser}=useContext(AuthContext)
    const role=localStorage.getItem("role")
    // console.log(user.email, role)

    useEffect(() => {
        if (user && role && role !== "tutor") {
          logoutUser();
          toast.error("You are not authorized to enter this page!");
        }
      }, [user, role, logoutUser]);
    
      if (loading) {
        return <Loading />;
      }
    
      if (user && role === "tutor") {
        return children;
      }
    return <Navigate to={"/login"}></Navigate>
};

export default TutorRoute;