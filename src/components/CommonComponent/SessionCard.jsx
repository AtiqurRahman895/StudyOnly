import { useContext } from "react";
import UseGetAllSession from "../../Hooks/UseGetAllSession";
import { normalAxios } from "../../Hooks/useNormalAxios";
import Timer from "./Timer";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { FaArrowsSpin } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";
import { TransferLists } from "../../Contexts/TransferLists";
import SessionAdminButtonsSection from "../SessionComponent/SessionAdminButtonsSection";
import { AuthContext } from "../../Provider/AuthProvider";
import SessionTutorButtonsSection from "../SessionComponent/SessionTutorButtonsSection";

const SessionCard = ({session}) => {
  const {role}=useContext(TransferLists)
  const {user}=useContext(AuthContext)
  const {refetch}=UseGetAllSession()
  const {_id,image,title,session_description,status,registration_fee,tutor,tutor_email,registration_start_date,registration_end_date}=session

  const handleTimeOut=(statusToChange)=>{
      normalAxios.put(`/ongoingORcloseSession/${_id}`,{status:statusToChange})
      .then(()=>{
        refetch()
      })
      .catch((error)=>{
          console.error("Failed to update session status:", error);
      })
  }

  // let timer=(
  //   if(status !== "Closed" && status !== "Rejected"){
  //     if(status == "Ongoing"){
  //       <Timer date={registration_end_date} handleTimeOut={handleTimeOut} status={"Closed"}/>
  //     }else{
  //       <Timer date={registration_start_date} handleTimeOut={handleTimeOut} status={"Ongoing"}/>
  //     }
  //   })
  
  return (
    <div className="space-y-5 mb-6">
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
              (status == "Ongoing")?(
                <Timer date={registration_end_date} handleTimeOut={handleTimeOut} status={status} statusToChange={"Closed"} text={"Registration ends in"}/>
              )
              :(
                <Timer date={registration_start_date} handleTimeOut={handleTimeOut} status={status} statusToChange={"Ongoing"} text={"Registration starts in"}/>
              )
            }
            </>
          }
        </div>

        <div className="space-y-4 pt-1">
          {
            (role==="admin") &&(
              <SessionAdminButtonsSection session={session} refetch={refetch} incard={true} />
            )
          }

          {
            (role==="tutor" && tutor_email===user?.email) &&(
              <SessionTutorButtonsSection session={session} incard={true} />
            ) 
          }

          <Link to={`/dashboard/session/${_id}`} className="primaryButton activePrimaryButton block !py-2.5 ">View Details</Link>
        </div>

      </div>
    </div>
);
};

export default SessionCard;