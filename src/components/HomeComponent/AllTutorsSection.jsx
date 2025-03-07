import { useQuery } from "@tanstack/react-query";
import useNormalAxios from "../../Hooks/useNormalAxios";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import Marquee from "react-fast-marquee";
import { useContext } from "react";
import { TransferLists } from "../../Contexts/TransferLists";

const AllTutorsSection = () => {
    const normalAxios=useNormalAxios()
    const {lightTheme} =useContext(TransferLists)

    const fetchAllTutors=async()=>{
        const res=await normalAxios.get("/allTutors")
        return res.data
    }
    const {isLoading:loading, data:tutors=[],isError,error}=useQuery(
            ['tutors'],
            fetchAllTutors,
    )

    if (isError ) {
        console.error(error);
        // throw error;
    }
    // console.log(tutors)
    return (
        <section className="">
            <div className=" space-y-12 text-center">
                <div className="sectionHeaderWidth text-center">
                    <h3 className="text-custom-primary">Meet Our Expert Tutors</h3>
                    <b>Our tutors bring years of experience and passion to help you succeed. Find a tutor who can guide.</b>
                </div>
            {loading ? (
                <Loading />
            ) : (
                (tutors?.length === 0)? (
                    <NotFound  NotFoundText={"Unable to load Tutors for some ression!"}/>
                )
                : (
                    <div className="flex items-center gap-6">
                        <Marquee
                            pauseOnHover={true}
                            gradient={true}
                            gradientColor={lightTheme?"#ffffffb6":"#1C0F23"}
                            gradientWidth={`clamp(1.25rem, -2.2500000000000004rem + 8.75vw, 5.625rem)`}
                            className="bg-transparent"
                            speed={40}
                        >
                            {
                                tutors.map((tutor, index) => (
                                    <div key={index} className="text-center mx-8 lg:mx-14 xl:mx-18">
                                        <div className="bg-white max-w-40 md:max-w-56 aspect-square rounded-full overflow-hidden">
                                            <img src={tutor.image||"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={`${tutor.name}'s image`} className="" />
                                        </div>
                                        <h6 className="text-custom-primary mt-4">{tutor.name}</h6>
                                        <p>{tutor.email}</p>
                                    </div>
                                ))
                            }
                        </Marquee>
                    </div>
                )
            )}
            </div>
        </section>
    );
};

export default AllTutorsSection;