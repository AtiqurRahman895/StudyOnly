import { useContext, useEffect, useState } from "react";
import UseGetTutorSessions from "../../Hooks/UseGetTutorSessions";
import { TransferLists } from "../../Contexts/TransferLists";
import TopScrollBar from "../CommonComponent/TopScrollBar";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import SessionMaterials from "./SessionMaterials";

const AllMaterialsForAdminAndTutor = () => {
    const {loading,sessions,isError,error}=UseGetTutorSessions()
    const { searchQuery } = useContext(TransferLists);
    const role=localStorage.getItem("role")
    const [NotFoundText, setNotFoundText] = useState("");


    useEffect(() => {
        if (searchQuery==="All" && role === "admin") {
            setNotFoundText("Unable to load sessions for some reasion!");
        } else if (searchQuery==="All" && role === "tutor") {
            setNotFoundText("You have not created any session yet!");
        } else {
            setNotFoundText("No session found!");
        }
    }, [role,searchQuery]);

    if (isError ) {
        console.error(error);
    }
    
    return (

        <section className="space-y-6">
            <div className="space-y-10">
                <TopScrollBar sessionCount={sessions?.length} showAllStatusName={"all"} />
            </div>
            {
            (loading) ? (<Loading/>):(

                (sessions?.length === 0)? (
                    <NotFound  NotFoundText={NotFoundText}/>
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



    )
};

export default AllMaterialsForAdminAndTutor;