import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useGetNote = (_id) => {
    const secureAxios =useSecureAxios()
    const fetchNote= async() => {
        const res=await secureAxios.get(`/note/${_id}`)
        const data=res.data
        if (!data) {
            const error = new Error("Session not found");
            error.status = 404;
            throw error;
        }
        return data
    };
    const { isLoading:loading, data:userNote={},refetch,isError,error } = useQuery(
        ['note',_id],
        fetchNote,
    )
    return {loading,userNote,refetch,isError,error}
};

export default useGetNote;