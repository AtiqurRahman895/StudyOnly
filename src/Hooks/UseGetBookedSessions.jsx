import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";
// import useGetBookedSessionsIds from "./useGetBookedSessionsIds";
import UseUrlQuery from "./UseUrlQuery";
import { useMemo } from "react";


const UseGetBookedSessions = () => {
    // const {ids}=useGetBookedSessionsIds()
    const {searchQuery} = UseUrlQuery();
    const secureAxios=useSecureAxios()
    const SearchQuery= useMemo(()=>{
        return searchQuery
    },[searchQuery])

    const fetchBookedSessions=async()=>{
        // if(ids.length===0){
        //     return []
        // }
        const params = {
            query:SearchQuery == "All"? {}: {$text: { $search: SearchQuery } }, sort:{_id:-1}
        };

        const res=await secureAxios.get("/bookedSessions", {params})
        return res.data
    }
    const {isLoading:loading,data:sessions=[],refetch,isError,error}=useQuery(
        ['bookedsessions',SearchQuery],
        fetchBookedSessions,
    )

    return {loading,sessions,refetch,isError,error}
};

export default UseGetBookedSessions;