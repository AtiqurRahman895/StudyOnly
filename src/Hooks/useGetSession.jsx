import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useGetSession = (_id) => {
    const secureAxios= useSecureAxios()

    const fetchSession= async() => {
        const res=await secureAxios.get(`/session/${_id}`)
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
    )

    return {loading,session,refetch,isError,error}
};

export default useGetSession;