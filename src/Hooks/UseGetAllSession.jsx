import { useQuery } from '@tanstack/react-query';
import useSecureAxios from './useSecureAxios';
import UseUrlQuery from './UseUrlQuery';


const UseGetAllSession = () => {
    // const { searchQuery } = useContext(TransferLists);
    const searchQuery = UseUrlQuery();
    const secureAxios= useSecureAxios()

    const fetchSessions= async() => {
        const params = {
          query:searchQuery == "All"? {}: { $text: { $search: searchQuery } }, sort:{_id:-1}
        };
        const res=await secureAxios.get("/sessions", {params})
        return res.data
    };

    const { isLoading:loading, data:sessions=[],refetch,isError,error } = useQuery(
        ['sessions', searchQuery],
        fetchSessions,
    )


    return {loading,sessions,refetch,isError,error}
};

export default UseGetAllSession;