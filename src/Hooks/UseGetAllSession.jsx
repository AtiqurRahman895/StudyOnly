import { useQuery } from '@tanstack/react-query';
// import useSecureAxios from './useSecureAxios';
import UseUrlQuery from './UseUrlQuery';
import { useContext, useMemo } from 'react';
import useSecureNormalAxios from './useSecureNormalAxios';
import { AuthContext } from '../Provider/AuthProvider';


const UseGetAllSession = (limit) => {
    const {sort,searchQuery,pageNo} = UseUrlQuery();
    const secureNormalAxios= useSecureNormalAxios()

    const {loading:shouldFetch}=useContext(AuthContext)

    const memorizedLimit = useMemo(() => limit, [limit]);
    const memorizedSort=useMemo(()=> sort,[sort])
    const memorizedSearchQuery=useMemo(()=> searchQuery,[searchQuery])
    const memorizedPageNo=useMemo(()=> pageNo,[pageNo])

    const fetchSessions= async() => {
        const params = {
          query:memorizedSearchQuery == "All"? {}: { $text: { $search: memorizedSearchQuery } }, 
          skip:memorizedPageNo == 1? 0: (memorizedPageNo-1)*memorizedLimit, 
          limit:memorizedLimit, 
          sort:memorizedSort == "None"? {}: {registration_fee:memorizedSort==="Low"?1:-1}
        };
        const res=await secureNormalAxios.get("/sessions", {params})
        return res.data
    };

    const { isLoading:loading, data:sessions=[],refetch,isError,error } = useQuery(
        ['sessions',memorizedLimit, memorizedSearchQuery, memorizedPageNo, memorizedSort],
        fetchSessions,
        {
            enabled: !shouldFetch, // Prevent fetching when user is still loading
        }
    )

    return {loading,sessions,refetch,isError,error}
};

export default UseGetAllSession;