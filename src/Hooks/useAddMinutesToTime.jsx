import { useState } from "react";

const useAddMinutesToTime = () => {
    const [finalTime, setFinalTime] = useState("");

    const addMinutes = (timeString, minutesToAdd) => {
        const [hours, minutesPart] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutesPart + minutesToAdd);

        const newHours = date.getHours().toString().padStart(2, '0');
        const newMinutes = date.getMinutes().toString().padStart(2, '0');

        const newTime = `${newHours}:${newMinutes}`;
        setFinalTime(newTime);
    };

    return { finalTime, addMinutes };
};

export default useAddMinutesToTime;
