import { useQuery } from "@tanstack/react-query";
import { normalAxios } from "../../Hooks/useNormalAxios";
import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import StudentsReviewButtons from "./StudentsReviewButtons";
import ReactStars from "react-stars";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const SessionReviewRatingSection = ({booked=false,session_id}) => {

    const fetchReviews=async()=>{
        const res=await normalAxios.get(`/reviews/${session_id}`)
        return res.data
    }
    const {isLoading:loading, data:reviews=[],refetch,isError,error}=useQuery(
            ['reviews'],
            fetchReviews,
    )

    if (isError ) {
    console.error(error);
    // throw error;
    }

    return (
        <section className="">
            <div className="space-y-10">
                <div className="space-y-5">
                    <h3 className="text-custom-primary sectionHeaderWidth text-center">
                        Student Reviews & Ratings
                    </h3>
                    {
                        (booked)?(
                            <StudentsReviewButtons refetch={refetch} session_id={session_id} />
                        ):""
                    }
                </div>

                {
                    (loading) ? (<Loading/>) :(
                        (reviews?.length === 0)? (
                            <NotFound  NotFoundText={"Anyone has not added any review yet!"}/>
                        ):
                        (
                            <div className="space-y-4">

                                <h5 className="text-custom-primary">Total: {reviews.length}</h5>

                                {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="bg-[#c5c0cf] rounded-md p-4 space-y-1"
                                >
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={review.image?review.image:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                            className="w-[40px] h-[40px] rounded-full place-content-center bg-black"
                                        />
                                        <div className="gird gap-1 text-black">
                                            <b className="">{review.name}</b>
                                            <p className="text-xs">{review.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <ReactStars
                                            count={5}
                                            value={review.rating} 
                                            size={18} 
                                            edit={false} 
                                            isHalf={true} 
                                            halfIcon={<IoStarHalf />} 
                                            emptyIcon={<IoStarOutline />} 
                                            fullIcon={<IoStar />} 
                                            color1="#7b3ff24c" 
                                            color2="#7c3ff2" 
                                        />
                                        <span className="text-custom-primary">({review.rating})</span>
                                    </div>
                                    <p className="text-black">{review.review}</p>
                                </div>
                                ))}
                            </div>
                        )
                    )    
                }
            </div>
        </section>
    );
};

export default SessionReviewRatingSection;