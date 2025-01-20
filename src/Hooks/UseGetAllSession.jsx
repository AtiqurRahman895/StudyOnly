import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { TransferLists } from '../Contexts/TransferLists';
import { AuthContext } from '../Provider/AuthProvider';
import useSecureNormalAxios from './useSecureNormalAxios';

const UseGetAllSession = () => {
    const { searchQuery } = useContext(TransferLists);
    const secureNormalAxios= useSecureNormalAxios()

    const role=localStorage.getItem("role")
    const {user}=useContext(AuthContext)
    const fetchSessions= async() => {

        let headers={role}
        const email=user?.email
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

    const { isLoading:loading, data:sessions=[],refetch,isError,error } = useQuery(
        ['sessions', searchQuery,user],
        fetchSessions,
    )

    // const loading = user ? isLoading : false; // user can also be null which can lead to loading infinitly

    return {loading,sessions,refetch,isError,error}
};

export default UseGetAllSession;