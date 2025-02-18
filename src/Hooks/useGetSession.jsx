import { useQuery } from "@tanstack/react-query";
import useSecureNormalAxios from "./useSecureNormalAxios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useGetSession = (_id) => {
    const secureNormalAxios= useSecureNormalAxios()
    const {loading:shouldFetch}=useContext(AuthContext)

    const fetchSession= async() => {
        const res=await secureNormalAxios.get(`/session/${_id}`)
        const data=res.data
        if (!data) {
            const error = new Error("Session not found");
            error.status = 404;
            throw error;
        }
        return data
    };
    const { isLoading:loading, data:session={},refetch,isError,error } = useQuery(
        ['session',_id],
        fetchSession,
        {
            enabled: !shouldFetch, // Prevent fetching when user is still loading
        }
    )

    return {loading,session,refetch,isError,error}
};

export default useGetSession;