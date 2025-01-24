import { useQuery } from '@tanstack/react-query';
import useSecureAxios from './useSecureAxios';
import UseUrlQuery from './UseUrlQuery';

const UseGetTutorSessions = () => {
    const searchQuery = UseUrlQuery();
    const secureAxios= useSecureAxios()

    const fetchSessions= async() => {
        const params = {
          query:searchQuery == "All"? {}: {$text: { $search: searchQuery } }, sort:{_id:-1}
        };
        const res=await secureAxios.get("/tutorSessions", {params})
        return res.data
    };

    const { isLoading:loading, data:sessions=[],refetch,isError,error } = useQuery(
        ['tutorSessions', searchQuery],
        fetchSessions,
    )
    return {loading,sessions,refetch,isError,error}
};

export default UseGetTutorSessions;

