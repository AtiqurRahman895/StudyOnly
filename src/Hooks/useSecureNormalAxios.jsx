import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

export const secureNormalAxios = axios.create({
    baseURL: 'https://study-only-server.vercel.app',
    // baseURL: 'http://localhost:8080',
});


const useSecureNormalAxios = () => {
    const navigate = useNavigate();
    const {logoutUser } = useContext(AuthContext);
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