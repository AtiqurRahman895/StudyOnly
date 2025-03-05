import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import useSecureAxios from "../../Hooks/useSecureAxios";
import ReactStars from "react-stars";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import RatingInput from "./RatingInput";
import ReviewInput from "./ReviewInput";

const AddReviewSection = ({session_id,refetch,refetch2}) => {
    const {user}= useContext(AuthContext)
    const secureAxios =useSecureAxios()

    const [rating,setRating]=useState()
    const [review,setReview]=useState("")

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
    const credentials={session_id,email:user.email,name:user.displayName,image:user.photoURL,rating,review}
    try {
        await secureAxios.post(`/addReview`,credentials)
        toast.success("Successfully added review in this session!")
        refetch()
        refetch2()
        e.target.reset();
    } catch (error) {
        console.error("Failed to add review!", error);
        toast.error(
        "Failed to add review!"
        );
    }
  }

  return (
    <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-3">

            <RatingInput rating={rating} setRating={setRating}/>

            <ReviewInput review={review} setReview={setReview}/>

            <div className=" pt-4">
                <button type="submit" className="primaryButton activePrimaryButton mx-auto">Add review</button>
            </div>
            
        </form>
    </div>
  );
};

export default AddReviewSection;