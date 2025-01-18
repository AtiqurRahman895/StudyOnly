import { useParams } from "react-router-dom";
import useGetSession from "../../Hooks/useGetSession";
import Loading from "../AuthenticationComponent/Loading";
import TitleSection from "../CommonComponent/TitleSection";
import SessionDetailsSection from "./SessionDetailsSection";
import SessionAdminButtonsSection from "./SessionAdminButtonsSection";

const Session = () => {
  const { _id, tutor_email } = useParams();
  const { session, loading, refetch,isError,error } = useGetSession(_id, tutor_email);


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
      <SessionAdminButtonsSection session={session} refetch={refetch}/>
    </main>
  )
}

export default Session;
