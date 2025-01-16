import { useState } from "react";

const useClassDuration = () => {
    const [duration, setDuration] = useState("");

    const calculateDuration = (startTime, endTime) => {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const startDate = new Date();
        const endDate = new Date();

        startDate.setHours(startHours, startMinutes);
        endDate.setHours(endHours, endMinutes);

        let diffInMinutes = (endDate - startDate) / (1000 * 60);
        if (diffInMinutes < 0) {
            diffInMinutes += 24 * 60; // handle overnight duration
        }

        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        setDuration(`${hours} hour and ${minutes} minute`);
    };

    return { duration, calculateDuration };
};

export default useClassDuration;
