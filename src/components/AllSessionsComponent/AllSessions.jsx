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

const AllSessions = () => {
    const {loading,sessions,isError,error}=UseGetAllSession()
    const { searchQuery } = useContext(TransferLists);

    const screenWidth = useScreenWidth();
    const [columnsCount, setColumnsCount] = useState();

    useEffect(() => {
        if (screenWidth >= 1024) {
          setColumnsCount(3);
        } else if (screenWidth >= 640) {
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
            <TitleSection title={"All Sessions"}/>

            <section className="container space-y-12">
                <div className="container space-y-10">
                    <TopScrollBar sessionCount={sessions?.length}/>
                </div>

                {
                (loading) ? (<Loading/>):(

                    (sessions?.length === 0)? (
                        <NotFound  NotFoundText={searchQuery==="All"?"Unable to load sessions for some reasion!":"No session found!"}/>
                    )
                    :
                    (   <Masonry columnsCount={columnsCount} className="!gap-4 md:!gap-6">
                            {sessions.map((session, index) => (
                                // <h1 >{session.title}</h1>
                                <SessionCard key={index} session={session}/>
                            ))}
                        </Masonry>
                    )
                )  
                }
            </section>

        </main>

    )
}

export default AllSessions;