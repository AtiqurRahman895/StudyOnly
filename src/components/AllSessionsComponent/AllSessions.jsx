import { useEffect, useState } from "react";
import UseGetAllSession from "../../Hooks/UseGetAllSession";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import TitleSection from "../CommonComponent/TitleSection";
import TopScrollBar from "../CommonComponent/TopScrollBar";
import useScreenWidth from "../../Hooks/useScreenWidth";
import Masonry from "react-responsive-masonry";
import SessionCard from "../CommonComponent/sessionCard";
import UseUrlQuery from "../../Hooks/UseUrlQuery";

const AllSessions = () => {
    const {loading,sessions,refetch,isError,error}=UseGetAllSession()
    const searchQuery = UseUrlQuery();
    const role=localStorage.getItem("role")
    const screenWidth = useScreenWidth();
    const [columnsCount, setColumnsCount] = useState();


    useEffect(() => {
         if (screenWidth >= 640) {
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
        <main className="lg:pb-10 mt-8">
            <TitleSection title={"All Sessions"} />

            <section className="">
                <div className="space-y-12">
                    <div className="space-y-6">

                        <h3 className="text-custom-primary sectionHeaderWidth text-center">
                            All Sessions
                        </h3>
                        <TopScrollBar sessionCount={sessions?.length} showAllStatusName={role==="admin"&&"all"} />
                    </div>
                    {
                        (loading) ? (<Loading/>):(

                            (sessions?.length === 0)? (
                                <NotFound  NotFoundText={searchQuery==="All"?"Unable to load sessions for some reasion!":"No session found!"}/>
                            )
                            :
                            (   <Masonry columnsCount={columnsCount} gutter="24px">
                                    {sessions.map((session, index) => (
                                        // <h1 >{session.title}</h1>
                                        <SessionCard key={index} session={session} refetch={refetch} />
                                    ))}
                                </Masonry>
                            )
                        )  
                    }
                </div>
            </section>

        </main>

    )
}

export default AllSessions;