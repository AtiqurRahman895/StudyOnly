import { MdRateReview } from "react-icons/md";
import useAddMinutesToTime from "../../Hooks/useAddMinutesToTime";
import { useEffect } from "react";

const ClassEndTimeSection = ({class_start_time,class_end_time,setClass_end_time}) => {

    const {finalTime:minimumEndTime, addMinutes}=useAddMinutesToTime()

    useEffect(()=>{
        if(class_start_time){
            addMinutes(class_start_time,20)
        }
    },[addMinutes,class_start_time])
    
    return (

        <div className="input-box flex relative">

            <div className="input-field form-control min-w-[250px] absolute focus-within:static scale-0 focus-within:scale-100">
                <input 
                    type="time"
                    onChange={(e)=>setClass_end_time(e.target.value)} 
                    value={class_end_time} 
                    min={minimumEndTime?minimumEndTime:''}
                    placeholder='Session Description' 
                    name="class_end_time" 
                    id="class_end_time" 
                    className="input input-ghost input-bordered inputIconChange" 
                    required
                />
            </div>
            <label htmlFor="class_end_time" className="input-label label py-0 gap-2 items-center [&_svg]:hover:animate-none [&_svg]:animate-pulse">
                <b className="text-custom-primary">Class end Time:</b>
                <p>
                    {class_end_time?`${class_end_time}`:"Pick end time"}
                    <MdRateReview className='text-xl ![animation-duration:1.5s] inline ml-2 text-custom-primary ' />
                </p>
            </label>

        </div>
    )
};

export default ClassEndTimeSection;