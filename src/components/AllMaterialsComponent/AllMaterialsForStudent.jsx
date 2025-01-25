import UseGetBookedSessions from "../../Hooks/UseGetBookedSessions";
import TopScrollBar from "../CommonComponent/TopScrollBar";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import SessionMaterials from "./SessionMaterials";
import UseUrlQuery from "../../Hooks/UseUrlQuery";

const AllMaterialsForStudent = () => {
    const searchQuery = UseUrlQuery();
    const {loading,sessions,isError,error}=UseGetBookedSessions()


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
                    <NotFound NotFoundText={searchQuery==="All"?"You have not booked any sessions yet!":"No session found!"}/>
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