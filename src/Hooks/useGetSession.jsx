import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useSecureNormalAxios from "./useSecureNormalAxios";

const useGetSession = (_id) => {
    const {user}=useContext(AuthContext)
    const secureNormalAxios= useSecureNormalAxios()
    const role=localStorage.getItem("role")
    const token=localStorage.getItem("token")

    const fetchSession= async() => {
        let headers={role}
        const email=user?.email
        if(email){
            if(role==="tutor" || role==="admin"){
                headers={...headers,token:`Bearer ${token}`,email}
            }
        }
        const res=await secureNormalAxios.get(`/session/${_id}`, {headers})
        const data=res.data
        if (!data) {
            const error = new Error("Session not found");
            error.status = 404;
            throw error;
        }
        return data

    };
    const { isLoading:loading, data:session={},refetch,isError,error } = useQuery(
        ['session',role,token,user,_id],
        fetchSession,
    )

    return {loading,session,refetch,isError,error}
};

export default useGetSession;