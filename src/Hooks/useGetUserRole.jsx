import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { normalAxios } from "./useNormalAxios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const useGetUserRole = () => {
    const {logoutUser,user} = useContext(AuthContext);
    const navigate = useNavigate();
  
    const token=localStorage.getItem("token")
    const email=localStorage.getItem("email")
  
    const fetchUserRole= async () => {
      let role="guest"
      if (!email || !token) {
        localStorage.setItem("role","guest")
        return role
      }else{
        const res =await normalAxios.get(`/user/${email}`,{headers:{
          token:`Bearer ${token}`,
          email,
        }})
        if (res.data?.role) {
          role= res.data.role
          localStorage.setItem("role",res.data.role)
          return role
        } else {
          logoutUser();
          // toast.error("User role was not found for some reason. Login again!");
          navigate("/login");
        }
      }
    };

    const {isLoading:loading,data:role,refetch,isError,error}=useQuery(
            ['userRole',user],
            fetchUserRole
    )

    if(isError){
      if (error.response?.status === 401 || error.response?.status === 403) {
        logoutUser();
        toast.error(error.data.message);
        navigate("/login");
      }
      console.error("Error finding user role:", error);
    }
    return {loading,role,refetch,isError,error}
    // return{role, setRole, loading}
};

export default useGetUserRole;