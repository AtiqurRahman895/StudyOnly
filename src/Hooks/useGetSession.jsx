import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { secureNormalAxios } from "./useSecureNormalAxios";
import { useQuery } from "@tanstack/react-query";

const useGetSession = (_id,tutor_email) => {
    const {user}=useContext(AuthContext)
    const role=localStorage.getItem("role")
    const token=localStorage.getItem("token")

    const fetchSession= async() => {
        let headers={role}
        const email=user?.email
        if(email){
            if(role==="tutor" && email===tutor_email || role==="admin"){
                headers={...headers,token:`Bearer ${token}`,email}
            }
        }
        const res=await secureNormalAxios.get(`/session/${_id}`, {headers})
        if (!res.data || res.data.length === 0) {
            const error = new Error("Session not found");
            error.status = 404;
            throw error;
        }
        return res.data

    };
    const { isLoading:loading, data:session={},refetch,isError,error } = useQuery(
        ['session',role,token,user,_id,tutor_email],
        fetchSession,
    )

    return {loading,session,refetch,isError,error}
};

export default useGetSession;