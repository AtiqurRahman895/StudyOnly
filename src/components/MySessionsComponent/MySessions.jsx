import { useContext, useEffect, useState } from "react";
import UseGetAllSession from "../../Hooks/UseGetAllSession";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import TitleSection from "../CommonComponent/TitleSection";
import TopScrollBar from "../CommonComponent/TopScrollBar";
import { TransferLists } from "../../Contexts/TransferLists";
import useScreenWidth from "../../Hooks/useScreenWidth";
import Masonry from "react-responsive-masonry";
import SessionCard from "../CommonComponent/sessionCard";
import UseGetTutorSessions from "../../Hooks/UseGetTutorSessions";

const MySessions = () => {
    const {loading,sessions,isError,error}=UseGetTutorSessions()
    const { searchQuery } = useContext(TransferLists);
    const role=localStorage.getItem("role")
    const screenWidth = useScreenWidth();
    const [columnsCount, setColumnsCount] = useState();


    useEffect(() => {
        if (screenWidth >= 1280) {
            setColumnsCount(2);
        }else if (screenWidth >= 1024) {
          setColumnsCount(1);
        } else if (screenWidth >= 768) {
          setColumnsCount(2);
        } else {
          setColumnsCount(1);
        }
    }, [screenWidth]);

    if (isError ) {
        console.error(error);
        throw error;
    }
    
    return (
        <main className="mt-8">
            <TitleSection title={"All Sessions"} />

            <section className="container space-y-12">
                <div className="container space-y-10">
                    <TopScrollBar sessionCount={sessions?.length} showAllStatusName={role==="tutor"} />
                </div>
                {
                (loading) ? (<Loading/>):(

                    (sessions?.length === 0)? (
                        <NotFound  NotFoundText={searchQuery==="All"?"You have not created any sessions yet!":"No session found!"}/>
                    )
                    :
                    (   <Masonry columnsCount={columnsCount}gutter="18px">
                            {sessions.map((session, index) => (
                                <SessionCard key={index} session={session}/>
                            ))}
                        </Masonry>
                    )
                )  
                }
            </section>

        </main>

    )
};

export default MySessions;