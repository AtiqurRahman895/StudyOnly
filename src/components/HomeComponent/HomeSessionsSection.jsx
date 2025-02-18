import { useEffect, useState } from "react";
import useNormalAxios from "../../Hooks/useNormalAxios";
import useScreenWidth from "../../Hooks/useScreenWidth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import Masonry from "react-responsive-masonry";
import SessionCard from "../CommonComponent/sessionCard";
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import { MdDoubleArrow } from "react-icons/md";

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
                <div className="sectionHeaderWidth text-center">
                    <h3 className="text-custom-primary">Explore the Latest Study Sessions</h3>
                    <b>Discover fresh study sessions from expert tutors to stay on top of your learning.</b>
                </div>
                {
                (loading) ? (<Loading/>):(

                    (sessions?.length === 0)? (
                        <NotFound  NotFoundText={"Unable to load sessions for some ression!"}/>
                    )
                    :
                    (   
                    <div className="space-y-12">
                        <Masonry columnsCount={columnsCount} gutter="28px">
                            {sessions.map((session, index) => (
                                <SessionCard key={index} session={session} refetch={refetch} />
                            ))}
                        </Masonry>

                        <div className="mt-2 flex justify-center">
                            <Link to={"/all_sessions"} type="button" className="primaryButton activePrimaryButton flex items-center gap-[2px] hover:gap-[4px]" >
                                View More <MdDoubleArrow className="text-[18px]"/>
                            </Link>
                        </div>
                    </div>
                    )
                )  
                }
            </div>
        </section>
    );
};

export default HomeSessionsSection;