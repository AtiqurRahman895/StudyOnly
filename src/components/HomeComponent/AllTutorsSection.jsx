import { useQuery } from "@tanstack/react-query";
import useNormalAxios from "../../Hooks/useNormalAxios";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import Marquee from "react-fast-marquee";

const AllTutorsSection = () => {
    const normalAxios=useNormalAxios()

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
    console.log(tutors)
    return (
        <section className="pb-14">
            <div className=" space-y-12 text-center">
            <h2>Our Expert Tutors</h2>
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
                            gradientColor={"#1C0F23"}
                            gradientWidth={`clamp(1.25rem, -2.2500000000000004rem + 8.75vw, 5.625rem)`}
                            className="bg-transparent"
                            speed={40}
                        >
                            {
                                tutors.map((tutor, index) => (
                                    <div key={index} className="text-center">
                                        <img src={tutor.image||"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={`${tutor.name}'s image`} className="w-40 md:w-56 aspect-square rounded-full mx-8"/>
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