import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import useSecureAxios from "../../Hooks/useSecureAxios";
import ReactStars from "react-stars";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

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
                            color1="#e8092e4c" 
                            color2="#e8092e" 
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

            <div className=" pt-4">
                <button type="submit" className="primaryButton activePrimaryButton mx-auto">Add review</button>
            </div>
            
        </form>
    </div>
  );
};

export default AddReviewSection;