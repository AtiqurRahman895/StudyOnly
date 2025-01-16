import { useEffect, useState } from "react";
import { MdRateReview } from "react-icons/md";
import useGetTodayTomorrowNextweek from "../../Hooks/useGetTodayTomorrowNextweek";
import useGetNextDay from "../../Hooks/useGetNextDay";

const RegistrationEndDateSection = ({registration_start_date, registration_end_date, setRegistration_end_date}) => {
    const {tomorrow}=useGetTodayTomorrowNextweek()
    const {nextday,getNextDay}=useGetNextDay()
    useEffect(()=>{
        if(registration_start_date){
            getNextDay(registration_start_date)
        }
    },[getNextDay,registration_start_date])

    return (

        <div className="input-box flex relative">

            <div className="input-field form-control min-w-[250px] absolute focus-within:static scale-0 focus-within:scale-100">
                <input 
                    type="date"
                    onChange={(e)=>setRegistration_end_date(e.target.value)} 
                    value={registration_end_date} 
                    min={nextday?nextday:tomorrow}
                    placeholder='Session Description' 
                    name="registration_end_date" 
                    id="registration_end_date" 
                    className="input input-ghost input-bordered" 
                    required
                />
            </div>
            <label htmlFor="registration_end_date" className="input-label label py-0 gap-2 items-center [&_svg]:hover:animate-none [&_svg]:animate-pulse">
                <b className="text-custom-primary">Registration end Date:</b>
                <p>
                    {registration_end_date?`${registration_end_date}`:"Pick end date"}
                    <MdRateReview className='text-xl ![animation-duration:1.5s] inline ml-2 text-custom-primary ' />
                </p>
            </label>

        </div>
    )
};

export default RegistrationEndDateSection;