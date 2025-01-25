import { useContext, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const DashboardRoute = ({children}) => {
    const {user,loading,logoutUser}=useContext(AuthContext)
    const role=localStorage.getItem("role")
    // console.log(user.email, role)

    if (user && role){
        if(role === "tutor"){
            return <Navigate to={"/dashboard/my_sessions"}></Navigate>
        }if(role==="student"){
            return <Navigate to={"/dashboard/booked_session"}></Navigate>
        }
    } 

    if (loading) {
    return <Loading />;
    }
    if (user && role === "admin") {
    return children;
    }
    return <Navigate to={"/login"}></Navigate>
};

export default DashboardRoute;
