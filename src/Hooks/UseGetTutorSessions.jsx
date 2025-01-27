import { useQuery } from '@tanstack/react-query';
import useSecureAxios from './useSecureAxios';
import UseUrlQuery from './UseUrlQuery';
import { useMemo } from 'react';

const UseGetTutorSessions = (limit) => {
    const {searchQuery,pageNo} = UseUrlQuery();
    const secureAxios= useSecureAxios()

    const memorizedLimit = useMemo(() => limit, [limit]);
    const memorizedSearchQuery=useMemo(()=> searchQuery,[searchQuery])
    const memorizedPageNo=useMemo(()=> pageNo,[pageNo])

    const fetchSessions= async() => {
        const params = {
            query:memorizedSearchQuery == "All"? {}: { $text: { $search: memorizedSearchQuery } }, 
            skip:memorizedPageNo == 1? 0: (memorizedPageNo-1)*memorizedLimit, 
            limit:memorizedLimit, 
            sort:{_id:-1}
          };
        const res=await secureAxios.get("/tutorSessions", {params})
        return res.data
    };

    const { isLoading:loading, data:sessions=[],refetch,isError,error } = useQuery(
        ['tutorSessions', memorizedLimit, memorizedSearchQuery, memorizedPageNo],
        fetchSessions,
    )
    return {loading,sessions,refetch,isError,error}
};

export default UseGetTutorSessions;

