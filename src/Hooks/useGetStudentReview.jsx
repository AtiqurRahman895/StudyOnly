import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useGetStudentReview = (session_id) => {
    const secureAxios=useSecureAxios()

    const fetchStudentReview=async()=>{
        const res=await secureAxios.get(`/review/${session_id}`)
        return res.data
    }
    const {isLoading:loading,data:studentReview=false,refetch,isError,error}=useQuery(
        ['studentReview'],
        fetchStudentReview,
    )

    return {loading,studentReview,refetch,isError,error}
};

export default useGetStudentReview;