import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useGetBookedSessionsIds = () => {
    const secureAxios=useSecureAxios()

    const fetchBookedSessionsIds=async()=>{
        const res=await secureAxios.get(`/bookedSessionsIds`)
        return res.data
    }
    const {isLoading:loading,data:ids=[],refetch,isError,error}=useQuery(
        ['sessionsIds'],
        fetchBookedSessionsIds,
    )
    if (isError ) {
        console.error(error);
    }
    return {loading,ids,refetch,isError,error}
};

export default useGetBookedSessionsIds;