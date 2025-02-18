import { GiMouse } from "react-icons/gi";
import { Link } from "react-router-dom";

const HomeHeroSection = () => {
    return (
        <section>
            <div className="bg-[url('https://i.ibb.co.com/WHH3bVW/Study-Only.png')] bg-cover bg-center bg-no-repeat relative w-full h-[100svh] mx-auto">
                <div className="h-[100svh] hero-overlay bg-opacity-15">

                    <div className="sectionHeaderWidth text-center h-[100%] flex flex-col justify-center items-center gap-2 text-white">
                    <h1 className="">Collaborative Study Sessions</h1>
                    <h6 className="sectionHeaderSubtextWidth md:w-[80%]">Book, review, and collaborate with expert tutors and fellow students to enhance your learning experience.</h6>
                    <Link to={"/all_sessions"} type="button" className="primaryButton mt-4">
                        View All Sessions
                    </Link>
                    </div>

                </div>
                <div className="grid justify-items-center absolute w-full bottom-14">
                        <GiMouse className="text-4xl animate-pulse"/>
                        <p className="text-xs">Scroll Down</p>
                </div>
            </div>
      </section>
    );
};

export default HomeHeroSection;