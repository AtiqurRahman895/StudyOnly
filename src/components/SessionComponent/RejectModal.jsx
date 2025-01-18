import { useState } from "react";

const RejectModal = ({refetch}) => {
      const [reason,setReason]=useState("")
      const [feedback,setFeedback]=useState("")
    
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
    return (
        <>
            <button className="primaryButton activePrimaryButton !py-2.5 !w-full max-w-40" onClick={()=>document.getElementById('reject_modal').showModal()}>Reject</button>
            <dialog id="reject_modal" className="modal">
                <div className="modal-box bg-black">
                    <form method="dialog" className="">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form className="space-y-3">
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
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

export default RejectModal;