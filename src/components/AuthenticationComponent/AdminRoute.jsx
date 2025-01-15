import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { TransferLists } from "../../Contexts/TransferLists";

const AdminRoute = ({children}) => {
    const navigate = useNavigate();
    const {user,loading,logoutUser}=useContext(AuthContext)
    const {adminUsers}=useContext(TransferLists)


    if(loading){
        return <Loading/>
    }
    if(user){
        if(adminUsers.includes(user.email)){
            return children
        }else{
            logoutUser();
            toast.error("You are not authorized to enter this page!");
            navigate("/login");
        }
    }
    return <Navigate to={"/login"}></Navigate>
};

export default AdminRoute;