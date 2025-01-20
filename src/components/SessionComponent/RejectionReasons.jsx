import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../Hooks/useSecureAxios";
import Loading from "../AuthenticationComponent/Loading";
import { useEffect, useState } from "react";
import Masonry from "react-responsive-masonry";
import useScreenWidth from "../../Hooks/useScreenWidth";

const RejectionReasons = ({_id}) => {
    const secureAxios=useSecureAxios()
    const screenWidth = useScreenWidth();
    const [columnsCount, setColumnsCount] = useState();

    const fetchRejections=async()=>{
        const params = {
          query:{_id}, sort:{_id:-1}
        };
        const res=await secureAxios.get("/rejections", {params})
        return res.data
    }
    const {isLoading:loading, data:rejections=[],isError,error}=useQuery(
            ['rejections'],
            fetchRejections,
    )

    useEffect(() => {
        if (screenWidth >= 1024) {
          setColumnsCount(3);
        } else if (screenWidth >= 640) {
          setColumnsCount(2);
        } else {
          setColumnsCount(1);
        }
    }, [screenWidth]);
    
    if (loading) {
        return <Loading />;
    
    }
    
    if (isError ) {
        console.error(error);
        // throw error;
    }

    if(rejections.length!==0){
        return (
            <section className="">
                <div className="container space-y-10">
                <h4 className="text-custom-primary sectionHeaderWidth text-center">
                    Rejection Reasons and Feedbacks
                </h4>
                {
                    (rejections.length<3)?(
                        <div className="flex flex-wrap justify-center !gap-4 md:!gap-6 ">
                            {rejections.map((rejection, index) => (
                                <div key={index} className="rounded-md p-4 bg-custom-primary text-white max-w-96 h-fit">
                                    <p><b className="text-black">Rejetion Date:</b> {rejection.rejection_date}</p>
                                    <p><b className="text-black">Reason:</b> {rejection.reason}</p>
                                    <p><b className="text-black">Feedback:</b> {rejection.feedback}</p>
                                </div>
                            ))}
                        </div>
                    )
                    :(
                        <Masonry columnsCount={columnsCount} className="!gap-4 md:!gap-6">
                            {rejections.map((rejection, index) => (
                                <div key={index} className="rounded-md p-4 mb-5 bg-custom-primary text-white w-full">
                                    <p><b className="text-black">Rejetion Date:</b> {rejection.rejection_date}</p>
                                    <p><b className="text-black">Reason:</b> {rejection.reason}</p>
                                    <p><b className="text-black">Feedback:</b> {rejection.feedback}</p>
                                </div>
                            ))}
                        </Masonry>
                    )
                }
            </div>
        </section>
        );
    }
};

export default RejectionReasons;