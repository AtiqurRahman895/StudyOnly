import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { TransferLists } from '../Contexts/TransferLists';
import useNormalAxios from './useNormalAxios';
import { AuthContext } from '../Provider/AuthProvider';
import { secureNormalAxios } from './useSecureNormalAxios';

const UseGetAllSession = () => {
    const { searchQuery } = useContext(TransferLists);
    const role=localStorage.getItem("role")
    const {user}=useContext(AuthContext)

    const fetchSessions= async() => {
        let headers={role}
        const email=user.email
        if(email){
            if(role==="admin"){
                const token=localStorage.getItem("token")
                headers={...headers,token:`Bearer ${token}`,email}
            }
        }
        const params = {
          query:searchQuery == "All"? {}: { $text: { $search: searchQuery } }, sort:{_id:-1}
        };
        
        const res=await secureNormalAxios.get("/sessions", {params,headers})
        return res.data
    };

    const { isLoading, data:sessions=[],refetch,isError,error } = useQuery(
        ['sessions', searchQuery,user],
        fetchSessions,
        {enabled: !!user} // This will ensure the query only runs if the user is defined. Insuring not geting error or false data for split seconds
    )

    const loading = user ? isLoading : false; // user can also be null which can lead to loading infinitly

    return {loading,sessions,refetch,isError,error}
};

export default UseGetAllSession;