import { useState } from "react";
import useSecureAxios from "../../Hooks/useSecureAxios";
import { toast } from "react-toastify";
import ReactStars from "react-stars";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const UpdateReviewSection = ({studentReview,refetch}) => {
    const secureAxios =useSecureAxios()

    const [rating,setRating]=useState(studentReview.rating)
    const [review,setReview]=useState(studentReview.review)
    const [showForm,setShowForm]=useState(false)

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const review_word_count = review
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/).length;

    if (review_word_count < 5) {
      toast.warning(
        `Please lenghten review to 3 or more word! (Currently has ${review_word_count} words)`
      )
      return;
    }

    const {session_id,email,name,image}=studentReview

    const credentials={session_id,email,name,image,rating,review}

    try {
        await secureAxios.put(`/updateReview/${studentReview._id}`,credentials)
        toast.success("Successfully updated your review in this session!")
        refetch()
        e.target.reset();
        setShowForm(false)
    } catch (error) {
        console.error("Failed to update your review in this session!", error);
        toast.error(
        "Failed to update your review!"
        );
    }
  }


    return(
        <div className="flex flex-col items-center w-full relative">
            <button className={`${showForm&&"scale-y-0 absolute"} origin-top duration-500 primaryButton activePrimaryButton !py-2.5  min-w-32`} onClick={()=>setShowForm(true)} >Update your Review</button>
            <div className={`${showForm?"scale-y-100":"scale-y-0 absolute"} origin-top w-full duration-500`}>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="form-control">
                        <label htmlFor="rating" className="label w-fit text-white space-x-2">
                            <span className="">Your rating</span>
                            <div className="flex gap-2 items-center">
                                <ReactStars
                                    count={5}
                                    value={rating||0} 
                                    size={18} 
                                    edit={false} 
                                    isHalf={true} 
                                    halfIcon={<IoStarHalf />} 
                                    emptyIcon={<IoStarOutline />} 
                                    fullIcon={<IoStar />} 
                                    color1="#7b3ff24c" 
                                    color2="#7c3ff2" 
                                />
                                {/* <span className="text-custom-primary">({rating||0})</span> */}
                            </div>
                        </label>
                        <input
                            type="number"
                            onChange={(e)=>setRating(e.target.value)}
                            value={rating}
                            name="rating"
                            id="rating"
                            min={0}
                            max={5}
                            step={0.01}
                            className="input input-ghost input-bordered max-w-xs"
                            required
                        />
                    </div>

                    <div className="form-control flex-1">
                        <label htmlFor="review" className="label w-fit text-white">
                            <span className="">Your review</span>
                        </label>
                        <textarea
                            onChange={(e) => setReview(e.target.value)}
                            value={review}
                            placeholder="Write your review"
                            name="review"
                            id="review"
                            className="textarea textarea-ghost textarea-bordered h-32"
                            required
                        />
                    </div>

                    <div className="pt-4 flex flex-wrap justify-center xs:justify-start gap-4">
                        <button disabled={!showForm} type="submit" className="primaryButton activePrimaryButton">Update review</button>
                        <button type="button" className="primaryButton activePrimaryButton" onClick={()=>setShowForm(false)}>Cancel update</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )


};

export default UpdateReviewSection;