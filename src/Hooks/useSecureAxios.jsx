import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const secureAxios = axios.create({
    baseURL: 'https://ph-12-assignment-server.vercel.app',
    // baseURL: 'http://localhost:8080',
});

const useSecureAxios = (safeEmail="") => {
    const navigate = useNavigate();
    const {logoutUser,user } = useContext(AuthContext);
    // const {role}=useContext(TransferLists)

    secureAxios.interceptors.request.use(function (config) {
        const token=localStorage.getItem("token")
        const role=localStorage.getItem("role")
        // const email=localStorage.getItem("email")
        // console.log(email)
        if(token&&user?.email&&role){
            config.headers={
                safeEmail,
                token:`Bearer ${token}`,
                email:user.email,
                role,
            }
        }
        // console.log(config.headers)
        return config;
      }, function (error) {
        return Promise.reject(error);
    });

    secureAxios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
            if (error.response.status === 401 || error.response.status === 403) {
              logoutUser();
              toast.error(error.response.data?.message);
              navigate("/login");
            }
            return Promise.reject(error);
      });

    return secureAxios

};

export default useSecureAxios;