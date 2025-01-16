import { useState } from "react";

const useGetNextDay = () => {
    const [nextday, setNextday] = useState('');
    const getNextDay=(dateString)=> {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
      
        const formatDate = (d) => d.toISOString().split('T')[0];
      
        setNextday(formatDate(date));
    }
    return {nextday,getNextDay}
};

export default useGetNextDay;