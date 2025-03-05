import { useState } from "react";
import useSecureAxios from "../../Hooks/useSecureAxios";
import { toast } from "react-toastify";
import ReactStars from "react-stars";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import RatingInput from "./RatingInput";
import ReviewInput from "./ReviewInput";

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

                    <RatingInput rating={rating} setRating={setRating}/>

                    <ReviewInput review={review} setReview={setReview}/>

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