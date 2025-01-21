import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useGetSessionMaterials = (session_id) => {
    const secureAxios=useSecureAxios()

    const fetchMaterials=async()=>{
        const res=await secureAxios.get(`/materials/${session_id}`)
        return res.data
    }
    const {isLoading:loading, data:materials=[],refetch,isError,error}=useQuery(
            ['materials',session_id],
            fetchMaterials,
    )
    return {loading,materials,refetch,isError,error}
};

export default useGetSessionMaterials;