import { useState } from "react";
import { toast } from "react-toastify";
import { secureAxios } from "../../Hooks/useSecureAxios";
import useGetTodayTomorrowNextWeek from "../../Hooks/useGetTodayTomorrowNextweek";

const RejectModal = ({_id,status,refetch}) => {
    //   const navigate = useNavigate();
      const [reason,setReason]=useState("")
      const [feedback,setFeedback]=useState("")
      const [openModal,setOpenModal]=useState(false)
      const {today}=useGetTodayTomorrowNextWeek()

      const rejectionReasonList=[
        `Misalignment with Curriculum`,
        `External Restrictions`,
        `Technical or Resource Allocation`,
        `Inappropriate Content`,
        `Session Duplication`,
        `Insufficient Preparation Time`,
        `Resource Constraints`,
        `Policy Violations`,
        `Technical Limitations`,
        `Incomplete or Incorrect Information`,
        `Somthing Else`,
      ]

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const feedback_word_count = feedback
        .replace(/<[^>]*>/g, " ")
        .trim()
        .split(/\s+/).length;
  
  
      if (feedback_word_count < 5) {
        toast.warning(
          `Please lenghten feedback to 5 or more word! (Currently has ${feedback_word_count} words)`
        )
        return;
      }

        try {
            await secureAxios.put(`/RejectSession/${_id}`,{status,reason,feedback,rejection_date:today})
            toast.success("Successfully rejected this session!")
            refetch()
            setOpenModal(false)
            e.target.reset();
            // navigate(0)

        } catch (error) {
            console.error("Failed to Approve this session!", error);
            toast.error(
              "Failed to Approve this session!"
            );
        }
    }

    return (
        <>
            <button className="primaryButton activePrimaryButton !py-2.5 !w-full max-w-40" onClick={()=>setOpenModal(true)}>Reject</button>
            <dialog id="reject_modal" className="modal bg-[rgba(0,0,0,.4)]" open={openModal}>
                <div className="modal-box bg-black">
                    <button onClick={()=>setOpenModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="form-control flex-1">
                            <label htmlFor="reason" className="label w-fit text-white">
                                <span className="">Why are you rejecting this session</span>
                            </label>
                            <select onChange={(e)=>setReason(e.target.value)} value={reason} name="reason" id="reason" className="select select-ghost select-bordered" required>
                                <option value={''} disabled hidden>Pick Reason</option>

                                {rejectionReasonList.map((reason, index) => (
                                    <option key={index} value={reason}>{reason}</option>
                                ))}

                            </select>
                        </div>
                        <div className="form-control flex-1">
                            <label htmlFor="feedback" className="label w-fit text-white">
                                <span className="">Your feedback</span>
                            </label>
                            <textarea
                                onChange={(e) => setFeedback(e.target.value)}
                                value={feedback}
                                placeholder="Write your feedback"
                                name="feedback"
                                id="feedback"
                                className="textarea textarea-ghost textarea-bordered h-32"
                                required
                            />
                        </div>
                        <div className="flex pt-4">
                        <button type="submit" className="primaryButton activePrimaryButton mx-auto">Confirm</button>
                        </div>
                        

                    </form>
                </div>
                {/* <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form> */}
            </dialog>
        </>
    );
};

export default RejectModal;