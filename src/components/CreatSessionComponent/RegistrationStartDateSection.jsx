import { useEffect, useState } from "react";
import { MdRateReview } from "react-icons/md";
import useGetTodayTomorrowNextweek from "../../Hooks/useGetTodayTomorrowNextweek";

const RegistrationStartDateSection = ({registration_start_date, setRegistration_start_date}) => {
    const {today}=useGetTodayTomorrowNextweek()

    return (

        <div className="input-box flex relative">

            <div className="input-field form-control min-w-[250px] absolute focus-within:static scale-0 focus-within:scale-100">
                <input 
                    type="date"
                    onChange={(e)=>setRegistration_start_date(e.target.value)} 
                    value={registration_start_date} 
                    min={today}
                    placeholder='Session Description' 
                    name="registration_start_date" 
                    id="registration_start_date" 
                    className="input input-ghost input-bordered" 
                    required
                />
            </div>
            <label htmlFor="registration_start_date" className="input-label label py-0 gap-2 items-center [&_svg]:hover:animate-none [&_svg]:animate-pulse">
                <b className="text-custom-primary">Registration start Date:</b>
                <p>
                    {registration_start_date?`${registration_start_date}`:"Pick start date"}
                    <MdRateReview className='text-xl ![animation-duration:1.5s] inline ml-2 text-custom-primary ' />
                </p>
            </label>

        </div>
    )
};

export default RegistrationStartDateSection;