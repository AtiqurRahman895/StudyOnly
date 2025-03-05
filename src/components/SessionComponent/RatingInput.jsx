import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import ReactStars from "react-stars";

const RatingInput = ({rating,setRating}) => {
    return (
        <div className="form-control">
            <label htmlFor="rating" className="label w-fit text-black dark:text-white space-x-2">
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
                className="input customInput max-w-xs"
                required
            />
        </div>
    );
};

export default RatingInput;