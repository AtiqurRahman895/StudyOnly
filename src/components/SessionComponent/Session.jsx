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

const Session = () => {
  const { _id } = useParams();
  const { session, loading, refetch,isError,error } = useGetSession(_id);
  const {role}=useContext(TransferLists)
  const {user}=useContext(AuthContext)
  const {booked}=useSessionBookedOrNot()
  // console.log(session)

  if (loading) {
    return <Loading />;

  }
  if (isError ) {
    console.error(error);
    throw error;
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
            <RejectionReasons _id={session._id} />
          )
          
        )
      }
      {
        (role==="admin") &&(
          <RejectionReasons _id={session._id} />
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
          <h1>materials</h1>
        )
      }
      
    </main>
  )
}

export default Session;
