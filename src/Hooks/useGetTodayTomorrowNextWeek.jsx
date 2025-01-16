import { useEffect, useState } from "react";

const useGetTodayTomorrowNextWeek = () => {
    const [today, setToday] = useState('');
    const [tomorrow, setTomorrow] = useState('');
    const [nextWeek, setNextWeek] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const tomorrowDate = new Date(currentDate);
        const nextWeekDate = new Date(currentDate);

        tomorrowDate.setDate(currentDate.getDate() + 1);
        nextWeekDate.setDate(currentDate.getDate() + 7);

        // Format dates to YYYY-MM-DD
        const formatDate = (d) => d.toISOString().split('T')[0];

        setToday(formatDate(currentDate));
        setTomorrow(formatDate(tomorrowDate));
        setNextWeek(formatDate(nextWeekDate));
    }, []);

    return { today, tomorrow, nextWeek };
};

export default useGetTodayTomorrowNextWeek;
