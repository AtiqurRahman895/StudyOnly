import { MdRateReview } from "react-icons/md";

const ClassStartTimeSection = ({class_start_time,setClass_start_time}) => {

    return (

        <div className="input-box flex relative">

            <div className="input-field form-control min-w-[250px] absolute focus-within:static scale-0 focus-within:scale-100">
                <input 
                    type="time"
                    onChange={(e)=>setClass_start_time(e.target.value)} 
                    value={class_start_time} 
                    placeholder='Session Description' 
                    name="class_start_time" 
                    id="class_start_time" 
                    className="input input-ghost input-bordered" 
                    required
                />
            </div>
            <label htmlFor="class_start_time" className="input-label label py-0 gap-2 items-center [&_svg]:hover:animate-none [&_svg]:animate-pulse">
                <b className="text-custom-primary">Class start Time:</b>
                <p>
                    {class_start_time?`${class_start_time}`:"Pick start time"}
                    <MdRateReview className='text-xl ![animation-duration:1.5s] inline ml-2 text-custom-primary ' />
                </p>
            </label>

        </div>
    )
};

export default ClassStartTimeSection;