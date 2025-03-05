import { useQuery } from "@tanstack/react-query";
import useNormalAxios from "../../Hooks/useNormalAxios";
import CommonHeroSection from "../CommonComponent/CommonHeroSection";
import TitleSection from "../CommonComponent/TitleSection";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";

const Tutors = () => {
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

    return (
        <main className="space-y-14 mb-12">

            <TitleSection title={"Tutors"} />
            <CommonHeroSection title={"Tutors"} subtext={"Explore our network of experienced tutors across various subjects and find the perfect tutor for your learning journey."}/>

            <section className="">
                <div className="container space-y-12">
                {loading ? (
                    <Loading />
                ) : (
                    (tutors?.length === 0)? (
                        <NotFound  NotFoundText={"Unable to load Tutors for some ression!"}/>
                    )
                    : (
                        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-10 sm:gap-x-16 md:gap-x-10 lg:gap-x-14 xl:gap-x-18 px-[15%] xs:px-0">
                            {
                                tutors.map((tutor, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className="bg-white w-full aspect-square rounded-full overflow-hidden">
                                            <img src={tutor.image||"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={`${tutor.name}'s image`} className="w-full" />
                                        </div>
                                        <h6 className="text-custom-primary mt-4">{tutor.name}</h6>
                                        <p>{tutor.email}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )
                )}

                </div>
            </section>

        </main>
    );
};

export default Tutors;