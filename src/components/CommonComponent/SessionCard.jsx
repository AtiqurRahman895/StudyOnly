import { TbCoinFilled } from "react-icons/tb";
import UseGetAllSession from "../../Hooks/UseGetAllSession";
import { normalAxios } from "../../Hooks/useNormalAxios";
import Timer from "./Timer";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { FaArrowsSpin } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";

const SessionCard = ({session}) => {
  const {refetch}=UseGetAllSession()
  const {_id,image,title,session_description,status,registration_fee,tutor,tutor_email,registration_start_date,registration_end_date}=session

  const handleTimeOut=(statusToChange)=>{
      normalAxios.put('/ongingORcloseSession',{_id,status:statusToChange})
      .then(()=>{
        refetch()
      })
      .catch((error)=>{
          console.error("Failed to update session status:", error);
      })
  }

  // let timer=(
  //   if(status !== "Closed" && status !== "Rejected"){
  //     if(status == "Onging"){
  //       <Timer date={registration_end_date} handleTimeOut={handleTimeOut} status={"Closed"}/>
  //     }else{
  //       <Timer date={registration_start_date} handleTimeOut={handleTimeOut} status={"Onging"}/>
  //     }
  //   })
  
  return (
    <div className="space-y-5 mb-10">
    <img
      src={image}
      alt={title}
      className="w-full aspect-[3/2] object-cover object-center rounded-md"
    />
    <div className="space-y-2">

      <h4 className={`${location.pathname==="/"?"text-black":"text-white"} text-center px-4 font-Cinzel font-normal`}>
        {title}
      </h4>
      <p className="mt-2 first-letter:text-custom-primary first-letter:text-3xl first-letter:font-Cinzel">
        {session_description}...
      </p>

      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <FaArrowsSpin className="text-custom-primary"/>
          <p>{status}</p>
        </div>
        <div className="flex items-center gap-2">
          <BiSolidBadgeDollar className="text-custom-primary"/>
          <p>{registration_fee||"Free"}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <IoMdPerson className="text-custom-primary"/>
          <p>{tutor}</p>
        </div>
        {status == "Closed" || status == "Rejected"?"":
          <>
          {
            status == "Onging"?
            <Timer date={registration_end_date} handleTimeOut={handleTimeOut} status={status} statusToChange={"Closed"} text={"Registration ends in"}/>
            :
            <Timer date={registration_start_date} handleTimeOut={handleTimeOut} status={status} statusToChange={"Onging"} text={"egistration starts in"}/>
          }
          </>
        }
      </div>

      <Link to={`/session/${_id}/${tutor_email}`} className="primaryButton activePrimaryButton block">View Details</Link>
    </div>
  </div>
);
};

export default SessionCard;