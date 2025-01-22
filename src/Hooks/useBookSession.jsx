import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import useSecureAxios from "./useSecureAxios";

const useBookSession = () => {
  const navigate = useNavigate();
  const secureAxios = useSecureAxios();
  const { logoutUser } = useContext(AuthContext);

  const bookSession = (credentials) => {
    // console.log(credentials)
    secureAxios.post("/bookSession", credentials)
      .then(() => {
        toast.success(`You have successfully booked an session!`);
        navigate("/");
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 403) {
          logoutUser();
          toast.error(error.response.data.message);
          navigate("/login");
        }
        console.error("Error booking the session:", error);
        toast.error(
          error.response?.data?.message || `Failed to book the session!`
        );
      });
  };
  return bookSession;
};

export default useBookSession;
