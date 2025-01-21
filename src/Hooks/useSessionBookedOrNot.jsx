import { useQuery } from "@tanstack/react-query";
import { normalAxios } from "./useNormalAxios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useSessionBookedOrNot = (session_id) => {
    const {user}= useContext(AuthContext)

    const checkIfStudentBooked=async()=>{
        const params = {
          query:{session_id,email:user?.email||"notLoggedIn"}
        };
        const res=await normalAxios.get("/sessionBooked", {params})
        return res.data
    }
    const {isLoading:loading,data:booked=false,isError,error}=useQuery(
            ['booked',user],
            checkIfStudentBooked,
    )

    return {loading,booked,isError,error}
};

export default useSessionBookedOrNot;