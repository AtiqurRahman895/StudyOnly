import { useLocation } from 'react-router-dom';

const UseUrlQuery = (defaultValue="All") => {
    const query = new URLSearchParams(useLocation().search);

    const searchQuery = query.get("searchQuery") || defaultValue;

    let pageNo =parseInt(query.get("page"),10);
    pageNo= isNaN(pageNo)?1:pageNo

    let sort = query.get("sort") || "None";
    // sort= sort==="null"?"None":sort


    return {sort,searchQuery,pageNo};
};

export default UseUrlQuery;