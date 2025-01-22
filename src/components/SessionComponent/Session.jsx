import { useParams } from "react-router-dom";
import useGetSession from "../../Hooks/useGetSession";
import Loading from "../AuthenticationComponent/Loading";
import TitleSection from "../CommonComponent/TitleSection";
import SessionDetailsSection from "./SessionDetailsSection";
import SessionAdminButtonsSection from "./SessionAdminButtonsSection";
import { useContext } from "react";
import { TransferLists } from "../../Contexts/TransferLists";
import { AuthContext } from "../../Provider/AuthProvider";
import RejectionReasons from "./RejectionReasons";
import SessionStudentButtonsSection from "./SessionStudentButtonsSection";
import useSessionBookedOrNot from "../../Hooks/useSessionBookedOrNot";
import SessionTutorButtonsSection from "./SessionTutorButtonsSection";
import MaterialsSection from "./MaterialsSection";
import SessionReviewRatingSection from "./SessionReviewRatingSection";

const Session = () => {
  const { _id } = useParams();
  const { session, loading, refetch,isError,error } = useGetSession(_id);
  const {role}=useContext(TransferLists)
  const {user}=useContext(AuthContext)
  const {booked}=useSessionBookedOrNot(_id)
  // console.log(session)


  if (isError ) {
    console.error(error);
    throw error;
  }

  if (loading) {
    return <Loading />;
  }


  return (
    <main className="space-y-8">
      <TitleSection title={`Session: ${_id}`}/>
      <SessionDetailsSection session={session} refetch={refetch}/>
      {
        (role==="admin") &&(
          <SessionAdminButtonsSection session={session} refetch={refetch}/>
        )
      }
      {
        (session.status==="Rejected" || session.status==="Pending") &&(
        
          (role ==="tutor" && session.tutor_email===user?.email) &&(
            <RejectionReasons session_id={session._id} />
          )
        )
      }
      {
        (role==="admin") &&(
          <RejectionReasons session_id={session._id} />
        )
        
      }
      {
        (role!=="admin" && role!=="tutor" && !booked) &&(
          <SessionStudentButtonsSection session={session} refetch={refetch}/>
        )
        
      }
      {
        (role==="tutor" && session.tutor_email===user?.email) &&(
          <SessionTutorButtonsSection session={session} refetch={refetch}/>
        ) 
      }
      {
        (role==="admin" || session.tutor_email===user?.email || booked) &&(
          <MaterialsSection session_id={session._id}/>
        )
      }
      <SessionReviewRatingSection booked={booked} session_id={session._id} />
      
    </main>
  )
}

export default Session;
