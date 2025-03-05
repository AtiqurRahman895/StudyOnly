import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

export const secureNormalAxios = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'https://study-only-server.vercel.app',
});


const useSecureNormalAxios = () => {
    const navigate = useNavigate();
    const {logoutUser } = useContext(AuthContext);

    secureNormalAxios.interceptors.request.use(function (config) {
        const token=localStorage.getItem("token")
        const role=localStorage.getItem("role")
        const email=localStorage.getItem("email")

        if(token&&email&&role){
          if(role==="admin" || role==="tutor"){
            config.headers={
              token:`Bearer ${token}`,
              email,
              role,
            }
          }
        }

        return config;
      }, function (error) {
        return Promise.reject(error);
    });

    secureNormalAxios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
            if (error.response.status === 401 || error.response.status === 403) {
              logoutUser();
              toast.error(error.response.data.message);
              navigate("/login");
            }
            return Promise.reject(error);
    });
    return secureNormalAxios
};

export default useSecureNormalAxios;