import { useContext, useEffect, useMemo, useState } from "react";
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
import useSecureNormalAxios from "../../Hooks/useSecureNormalAxios";
import { AuthContext } from "../../Provider/AuthProvider";
import { TransferLists } from "../../Contexts/TransferLists";
import CommonHeroSection from "../CommonComponent/CommonHeroSection";

const AllSessions = () => {
  const secureNormalAxios = useSecureNormalAxios();
  const limit = 6;
  const { loading, sessions, refetch, isError, error } =
    UseGetAllSession(limit);
  const { searchQuery } = UseUrlQuery();
  
  const { role } = useContext(TransferLists);
  // console.log(role)
  const {loading:shouldFetch}=useContext(AuthContext)

  const screenWidth = useScreenWidth();
  const [columnsCount, setColumnsCount] = useState();
  const memorizedSearchQuery = useMemo(() => searchQuery, [searchQuery]);

  const fetchSessionCount = async () => {
    const params = {
      query:
        memorizedSearchQuery == "All"
          ? {}
          : { $text: { $search: memorizedSearchQuery } },
    };
    const res = await secureNormalAxios.get("/sessions-count", { params });
    return res.data;
  };
  
  const { data: sessionsCount = 0 } = useQuery(
    ["sessionsCount", memorizedSearchQuery],
    fetchSessionCount,
    {
        enabled: !shouldFetch, // Prevent fetching when user is still loading
    }
  );

  useEffect(() => {
    if (screenWidth >= 1024) {
      setColumnsCount(3);
  } else if(screenWidth >= 640) {
    setColumnsCount(2);
  } else {
    setColumnsCount(1);
  }
  }, [screenWidth]);

  if (isError) {
    console.error(error);
    // throw error;
  }

  return (
    <main className="space-y-12 mb-12">
      <TitleSection title={"All Sessions"} />
      <CommonHeroSection title={"All Sessions"} subtext={"Find the right session for your learning needs, check schedules, and book sessions with expert tutors."}/>
      <section className="">
        <div className="container space-y-12">
            <TopScrollBar
              sessionCount={sessionsCount}
              showAllStatusName={role === "admin" && "all"}
            />
          {loading ? (
            <Loading />
          ) : sessions?.length === 0 ? (
            <NotFound
              NotFoundText={
                searchQuery === "All"
                  ? "Unable to load sessions for some reasion!"
                  : "No session found!"
              }
            />
          ) : (
            <Masonry columnsCount={columnsCount} gutter="24px">
              {sessions.map((session, index) => (
                // <h1 >{session.title}</h1>
                <SessionCard key={index} session={session} refetch={refetch} />
              ))}
            </Masonry>
          )}
          <NextPreButtons limit={limit} totalContents={sessionsCount} />
        </div>
      </section>
    </main>
  );
};

export default AllSessions;
