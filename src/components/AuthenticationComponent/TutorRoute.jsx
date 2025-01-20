import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { toast } from "react-toastify";


const TutorRoute = ({children}) => {
    const navigate = useNavigate();
    const {user,loading,logoutUser}=useContext(AuthContext)
    const role=localStorage.getItem("role")
    if(loading){
        return <Loading/>
    }
    if(user&&role){
        if(role==="tutor"){
            return children
        }else{
            logoutUser();
            toast.error("You are not authorized to enter this page!");
            navigate("/login");
        }
    }
    return <Navigate to={"/login"}></Navigate>
};

export default TutorRoute;