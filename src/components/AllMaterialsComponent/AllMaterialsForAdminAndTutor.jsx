import { useContext, useEffect, useState } from "react";
import UseGetTutorSessions from "../../Hooks/UseGetTutorSessions";
import TopScrollBar from "../CommonComponent/TopScrollBar";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import SessionMaterials from "./SessionMaterials";
import UseUrlQuery from "../../Hooks/UseUrlQuery";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../Hooks/useSecureAxios";
import { useMemo } from "react";
import NextPreButtons from "../CommonComponent/NextPreButtons";
import { TransferLists } from "../../Contexts/TransferLists";

const AllMaterialsForAdminAndTutor = () => {
    const secureAxios= useSecureAxios()
    const limit=4
    const {loading,sessions,isError,error}=UseGetTutorSessions(limit)
    const {searchQuery} = UseUrlQuery();
    const { role } = useContext(TransferLists);
    const [NotFoundText, setNotFoundText] = useState("");

    const memorizedSearchQuery=useMemo(()=> searchQuery,[searchQuery])
    const fetchAdminTutorSessionCount=async()=>{
        const params = {
            query:memorizedSearchQuery == "All"? {}: { $text: { $search: memorizedSearchQuery } },
        };
        const res=await secureAxios.get("/tutorSessions-count", {params})
        return res.data
    }
    const {data:adminTutorSessionsCount=0}=useQuery(
            ['adminTutorSessionsCount',memorizedSearchQuery],
            fetchAdminTutorSessionCount,
    )

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
            <div className="space-y-6">
                <h3 className="text-custom-primary sectionHeaderWidth text-center">
                    All Materials
                </h3>
                <TopScrollBar sessionCount={adminTutorSessionsCount} showAllStatusName={"all"} />
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
            <NextPreButtons limit={limit} totalContents={adminTutorSessionsCount} />

        </section>



    )
};

export default AllMaterialsForAdminAndTutor;