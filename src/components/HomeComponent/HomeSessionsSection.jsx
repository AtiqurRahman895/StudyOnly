import { useEffect, useState } from "react";
import useNormalAxios from "../../Hooks/useNormalAxios";
import useScreenWidth from "../../Hooks/useScreenWidth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import Masonry from "react-responsive-masonry";
import SessionCard from "../CommonComponent/sessionCard";

const HomeSessionsSection = () => {
    const normalAxios=useNormalAxios()
    const screenWidth = useScreenWidth();
    const [columnsCount, setColumnsCount] = useState();
    const fetchLatestSessions=async()=>{
        const res=await normalAxios.get("/latestSessions")
        return res.data
    }
    const {isLoading:loading, data:sessions=[],refetch,isError,error}=useQuery(
            ['latestSessions'],
            fetchLatestSessions,
    )

    useEffect(() => {
        if (screenWidth >= 1024) {
            setColumnsCount(3);
        } else if(screenWidth >= 640) {
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
        <section className="">
            <div className="container space-y-12">
                <h3 className="text-center text-custom-primary">
                    Latest Study sessions
                </h3>
                {
                (loading) ? (<Loading/>):(

                    (sessions?.length === 0)? (
                        <NotFound  NotFoundText={"Unable to load sessions for some ression!"}/>
                    )
                    :
                    (   
                        <Masonry columnsCount={columnsCount} gutter="24px">
                            {sessions.map((session, index) => (
                                <SessionCard key={index} session={session} refetch={refetch} />
                            ))}
                        </Masonry>
                    )
                )  
                }
            </div>
        </section>
    );
};

export default HomeSessionsSection;