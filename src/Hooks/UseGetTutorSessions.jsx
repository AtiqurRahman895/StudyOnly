import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { TransferLists } from '../Contexts/TransferLists';
import useSecureAxios from './useSecureAxios';

const UseGetTutorSessions = () => {
    const { searchQuery } = useContext(TransferLists);
    const secureAxios= useSecureAxios()

    const fetchSessions= async() => {
        const params = {
          query:searchQuery == "All"? {}: {$text: { $search: searchQuery } }, sort:{_id:-1}
        };
        const res=await secureAxios.get("/tutorSessions", {params})
        return res.data
    };

    const { isLoading:loading, data:sessions=[],refetch,isError,error } = useQuery(
        ['sessions', searchQuery],
        fetchSessions,
    )
    return {loading,sessions,refetch,isError,error}
};

export default UseGetTutorSessions;

