import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { TransferLists } from '../Contexts/TransferLists';
import useSecureAxios from './useSecureAxios';

const UseGetAllSession = () => {
    const { searchQuery } = useContext(TransferLists);
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

    // const loading = user ? isLoading : false; // user can also be null which can lead to loading infinitly

    return {loading,sessions,refetch,isError,error}
};

export default UseGetAllSession;