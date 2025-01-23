import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";
import { useContext } from "react";
import { TransferLists } from "../Contexts/TransferLists";
import useGetBookedSessionsIds from "./useGetBookedSessionsIds";


const UseGetBookedSessions = () => {
    const {ids}=useGetBookedSessionsIds()
    const { searchQuery } = useContext(TransferLists);
    const secureAxios=useSecureAxios()

    const fetchBookedSessions=async()=>{
        // if(ids.length===0){
        //     return []
        // }
        const params = {
            query:searchQuery == "All"? {}: {$text: { $search: searchQuery } }, ids, sort:{_id:-1}
        };

        const res=await secureAxios.get("/bookedSessions", {params})
        return res.data
    }
    const {isLoading:loading,data:sessions=[],refetch,isError,error}=useQuery(
        ['bookedsessions',ids,searchQuery],
        fetchBookedSessions,
    )

    return {loading,sessions,refetch,isError,error}
};

export default UseGetBookedSessions;