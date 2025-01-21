import useGetStudentReview from "../../Hooks/useGetStudentReview";
import AddReviewSection from "./AddReviewSection";
import UpdateReviewSection from "./UpdateReviewSection";

const StudentsReviewButtons = ({session_id,refetch}) => {
    const {studentReview,refetch:refetch2}= useGetStudentReview(session_id)

    return (
        <section className="container flex justify-center gap-x-8">
            {
                (studentReview)?(
                    <UpdateReviewSection studentReview={studentReview} refetch={refetch}/>
                ):
                <AddReviewSection session_id={session_id} refetch={refetch} refetch2={refetch2} />
            }
            
        </section>
    );
};

export default StudentsReviewButtons;