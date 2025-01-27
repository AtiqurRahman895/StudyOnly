import { useQuery } from '@tanstack/react-query';
import useSecureAxios from './useSecureAxios';
import UseUrlQuery from './UseUrlQuery';


const UseGetAllUsers = () => {
    const {searchQuery} = UseUrlQuery();
    const secureAxios= useSecureAxios()
    // console.log(searchQuery)

    const fetchUsers= async() => {
        const params = {
          query:searchQuery == "All"? {}: { $text: { $search: searchQuery } }, sort:{_id:-1}
        };
        const res=await secureAxios.get("/users", {params})
        return res.data
    };

    const { isLoading:loading, data:users=[],refetch,isError,error } = useQuery(
        ['users', searchQuery],
        fetchUsers,
    )

    return {loading,users,refetch,isError,error}
};

export default UseGetAllUsers;