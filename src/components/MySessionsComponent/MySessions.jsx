import { useEffect, useState } from "react";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import TitleSection from "../CommonComponent/TitleSection";
import TopScrollBar from "../CommonComponent/TopScrollBar";
import useScreenWidth from "../../Hooks/useScreenWidth";
import Masonry from "react-responsive-masonry";
import SessionCard from "../CommonComponent/sessionCard";
import UseGetTutorSessions from "../../Hooks/UseGetTutorSessions";
import UseUrlQuery from "../../Hooks/UseUrlQuery";

const MySessions = () => {
    const {loading,sessions,refetch,isError,error}=UseGetTutorSessions()
    const searchQuery = UseUrlQuery();
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
                <div className="space-y-6">
                    <h3 className="text-custom-primary sectionHeaderWidth text-center">
                        My Sessions
                    </h3>
                    <TopScrollBar sessionCount={sessions?.length} showAllStatusName={"all"} />
                </div>
                {
                (loading) ? (<Loading/>):(

                    (sessions?.length === 0)? (
                        <NotFound  NotFoundText={searchQuery==="All"?"You have not created any sessions yet!":"No session found!"}/>
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

export default MySessions;