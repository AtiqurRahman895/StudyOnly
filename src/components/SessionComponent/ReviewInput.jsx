
const ReviewInput = ({review,setReview}) => {
    return (
        <div className="form-control flex-1">
            <label htmlFor="review" className="label w-fit text-black dark:text-white">
                <span className="">Your review</span>
            </label>
            <textarea
                onChange={(e) => setReview(e.target.value)}
                value={review}
                placeholder="Write your review"
                name="review"
                id="review"
                className="textarea customInput h-32"
                required
            />
        </div>
    );
};

export default ReviewInput;