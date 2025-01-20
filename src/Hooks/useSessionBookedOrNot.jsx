import { useQuery } from "@tanstack/react-query";
import { normalAxios } from "./useNormalAxios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useSessionBookedOrNot = (_id) => {
    // const {booked, setBooked}=useState(false)
    const {user}= useContext(AuthContext)
    // console.log(user)
    const checkIfStudentBooked=async()=>{
        const params = {
          query:{session_id:_id,email:user?.email||"notLoggedIn"}
        };
        const res=await normalAxios.get("/bookedSession", {params})
        return res.data
    }
    const {isLoading:loading,data:booked=false,isError,error}=useQuery(
            ['Booked',user],
            checkIfStudentBooked,
    )

    return {loading,booked,isError,error}
};

export default useSessionBookedOrNot;