import { useLocation } from 'react-router-dom';

const UseUrlQuery = (defaultValue="All") => {
    const query = new URLSearchParams(useLocation().search);
    const searchQuery = query.get("searchQuery") || defaultValue;
    return searchQuery;
};

export default UseUrlQuery;