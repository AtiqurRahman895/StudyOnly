import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { normalAxios } from "./useNormalAxios";
import { toast } from "react-toastify";

const useGetUserRole = () => {
    const {logoutUser,user,loading} = useContext(AuthContext);
    const navigate = useNavigate();
    const [role, setRole] = useState();
    // const [loading, setLoading] = useState(false);
  
    const token=localStorage.getItem("token")
  
      useEffect(() => {
        const email=user?.email

        if(!loading){
          if (!email || !token) {
            setRole("guest")
            localStorage.setItem("role","guest")
            return;
          }else{
            normalAxios.get(`/user/${email}`,{headers:{
              token:`Bearer ${token}`,
              email,
            }})
              .then((res) => {
      
                if (res.data?.role) {
                  setRole(res.data.role)
                  localStorage.setItem("role",res.data.role)
                } else {
                  logoutUser();
                  // toast.error("User role was not found for some reason. Login again!");
                  navigate("/login");
                }
              })
              .catch((error) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                  logoutUser();
                  toast.error(error.data.message);
                  navigate("/login");
                }
                console.error("Error finding user role:", error);
              })
          }
        }
  


      }, [user?.email,token,loading]);

      return{role, setRole, loading}
};

export default useGetUserRole;