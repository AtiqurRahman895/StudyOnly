import { MdRateReview } from "react-icons/md";

const SessionDescriptionSection = ({session_description,setSession_description}) => {
    
    const temporary_session_description="This section is dedicated to crafting a concise and engaging summary of your session. Use at least 10 words to capture the essence of your session's message. A well-written short description will spark curiosity and encourage readers to explore further."
    
    return (
        <div className="">
            {/* Session Description */}
            <div className="input-box flex relative">
                <div className="input-field form-control w-full absolute focus-within:static scale-0 focus-within:scale-100">
                    <textarea 
                        onChange={(e)=>setSession_description(e.target.value)} 
                        value={session_description} 
                        placeholder='Session Description' 
                        name="session_description" 
                        id="session_description" 
                        className="textarea textarea-ghost textarea-bordered h-32" 
                    />
                </div>
                <label htmlFor="session_description" className="text-center input-label py-0 [&_svg]:hover:animate-none [&_svg]:animate-pulse">
                    <b>
                        <MdRateReview className='text-custom-primary text-xl ![animation-duration:1.5s] inline mr-2' />
                        Session Description: {session_description?session_description:temporary_session_description}
                    </b>

                </label>

            </div>
        </div>
    );
};

export default SessionDescriptionSection;