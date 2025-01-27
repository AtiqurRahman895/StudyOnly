import { useEffect, useMemo, useState } from "react";
import UseGetAllSession from "../../Hooks/UseGetAllSession";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import TitleSection from "../CommonComponent/TitleSection";
import TopScrollBar from "../CommonComponent/TopScrollBar";
import useScreenWidth from "../../Hooks/useScreenWidth";
import Masonry from "react-responsive-masonry";
import SessionCard from "../CommonComponent/sessionCard";
import UseUrlQuery from "../../Hooks/UseUrlQuery";
import NextPreButtons from "../CommonComponent/NextPreButtons";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../Hooks/useSecureAxios";

const AllSessions = () => {
    const secureAxios= useSecureAxios()
    const limit=4
    const {loading,sessions,refetch,isError,error}=UseGetAllSession(limit)
    const {searchQuery} = UseUrlQuery();
    const role=localStorage.getItem("role")
    const screenWidth = useScreenWidth();
    const [columnsCount, setColumnsCount] = useState();
    

    const memorizedSearchQuery=useMemo(()=> searchQuery,[searchQuery])
    const fetchSessionCount=async()=>{
        const params = {
            query:memorizedSearchQuery == "All"? {}: { $text: { $search: memorizedSearchQuery } },
        };
        const res=await secureAxios.get("/sessions-count", {params})
        return res.data
    }
    const {data:sessionsCount=0}=useQuery(
            ['sessionsCount',memorizedSearchQuery],
            fetchSessionCount,
    )

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
                        <TopScrollBar sessionCount={sessionsCount} showAllStatusName={role==="admin"&&"all"} />
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
                    <NextPreButtons limit={limit} totalContents={sessionsCount} />
                </div>
            </section>

        </main>

    )
}

export default AllSessions;