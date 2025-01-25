import { useEffect, useState } from "react";
import useScreenWidth from "../../Hooks/useScreenWidth";
import TitleSection from "../CommonComponent/TitleSection";
import UseGetBookedSessions from "../../Hooks/UseGetBookedSessions";
import TopScrollBar from "../CommonComponent/TopScrollBar";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import Masonry from "react-responsive-masonry";
import SessionCard from "../CommonComponent/sessionCard";
import UseUrlQuery from "../../Hooks/UseUrlQuery";

const BookedSessions = () => {
    const searchQuery = UseUrlQuery();
    const {loading,sessions,refetch,isError,error}=UseGetBookedSessions()
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
        // throw error;
    }
    
    return (
        <main className="mt-8">
            <TitleSection title={"All Sessions"} />

            <section className="space-y-12">
                <div className="space-y-10">
                    <TopScrollBar sessionCount={sessions?.length} showAllStatusName={"student"} />
                </div>
                {
                (loading) ? (<Loading/>):(

                    (sessions?.length === 0)? (
                        <NotFound NotFoundText={searchQuery==="All"?"You have not booked any sessions yet!":"No session found!"}/>
                    )
                    :
                    (   <Masonry columnsCount={columnsCount} gutter="24px">
                            {sessions.map((session, index) => (
                                <SessionCard key={index} session={session} refetch={refetch} />
                            ))}
                        </Masonry>
                    )
                )  
                }
            </section>

        </main>

    )
};

export default BookedSessions;