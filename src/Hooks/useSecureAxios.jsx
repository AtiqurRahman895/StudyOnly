import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TransferLists } from "../Contexts/TransferLists";

export const secureAxios = axios.create({
    baseURL: 'http://localhost:8080',
});

const useSecureAxios = (safeEmail="") => {
    const navigate = useNavigate();
    const {logoutUser,user } = useContext(AuthContext);
    const {role}=useContext(TransferLists)

    secureAxios.interceptors.request.use(function (config) {
        const token=localStorage.getItem("token")
        const email=user?.email
        if(token&&email&&role){
            config.headers={
                safeEmail,
                token:`Bearer ${token}`,
                email,
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
              toast.error(error.response.data.message);
              navigate("/login");
            }
            return Promise.reject(error);
      });

    return secureAxios

};

export default useSecureAxios;