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

const Session = () => {
  const { _id, tutor_email } = useParams();
  const { session, loading, refetch,isError,error } = useGetSession(_id, tutor_email);
  const {role}=useContext(TransferLists)
  const {user}=useContext(AuthContext)


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
        role==="admin" &&
        <SessionAdminButtonsSection session={session} refetch={refetch}/>
      }
      {
        session.status==="Rejected" || session.status==="Pending" && role ==="tutor" && session.tutor_email===user.email?
        <RejectionReasons tutor_email={session.tutor_email} />:""
        
      }
      {
        role==="admin" &&
        <RejectionReasons tutor_email={session.tutor_email} />
      }
      {
        role!=="admin" && role!=="tutor" &&
        <SessionStudentButtonsSection session={session} refetch={refetch}/>
      }
      
    </main>
  )
}

export default Session;
