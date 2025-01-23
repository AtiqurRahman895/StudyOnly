import { useEffect, useState} from "react";
import UseGetBookedSessions from "../../Hooks/UseGetBookedSessions";
import TopScrollBar from "../CommonComponent/TopScrollBar";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import useGetBookedSessionsIds from "../../Hooks/useGetBookedSessionsIds";
import SessionMaterials from "./SessionMaterials";

const AllMaterialsForStudent = () => {
    const {ids}=useGetBookedSessionsIds()
    const {loading,sessions,isError,error}=UseGetBookedSessions()
    const [NotFoundText, setNotFoundText] = useState("");


    useEffect(() => {
        const idsL=ids.length
        if (idsL === 0 ) {
            setNotFoundText("You have not booked any sessions yet!");
        } else {
          setNotFoundText("No session found!");
        }
    }, [ids.length]);

    if (isError ) {
        console.error(error);
        // throw error;
    }
    return (
        <section className="space-y-6">
            <div className="space-y-10">
                <TopScrollBar sessionCount={sessions?.length} showAllStatusName={"student"} />
            </div>
            {
            (loading) ? (<Loading/>):(

                (sessions?.length === 0)? (
                    <NotFound NotFoundText={NotFoundText}/>
                )
                :
                (   <div className="">
                        {sessions.map((session, index) => (
                            <SessionMaterials key={index} session={session} lastSession={sessions.length===index+1} />
                        ))}
                    </div>
                )
            )  
            }
        </section>
    );
};

export default AllMaterialsForStudent;