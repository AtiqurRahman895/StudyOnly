import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { TransferLists } from "../Contexts/TransferLists";
import useSecureAxios from "./useSecureAxios";

const useAddAppointment = () => {
    const navigate = useNavigate();
    const secureAxios = useSecureAxios();
    const {logoutUser } = useContext(AuthContext);
    const {appointmentCredentials,setAppointmentCredentials}=useContext(TransferLists)

    const addAppointment=()=>{
        secureAxios
          .post("/addAppointment", appointmentCredentials)
          .then(() => {
            toast.success(`You have successfully booked an appointment!`);
            setAppointmentCredentials()
            navigate("/myAppoinments")
          })
          .catch((error) => {
            if (error.status === 401 || error.status === 403) {
              logoutUser();
              toast.error(error.response.data.message);
              navigate("/login");
            }
            console.error("Error booking an appointment:", error);
            toast.error(
              error.response?.data?.message || `Failed to book an appointment!`
            );
          });
    }
    return addAppointment
};

export default useAddAppointment;