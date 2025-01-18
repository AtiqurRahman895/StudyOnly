import { useState } from "react";

const ApproveModal = ({registration_fee,refetch}) => {
    const [session_fee,setSession_fee]=useState(registration_fee)
    return (
        <>
            <button className="primaryButton activePrimaryButton !py-2.5 !w-full max-w-40" onClick={()=>document.getElementById('approve_modal').showModal()}>Approve</button>
            <dialog id="approve_modal" className="modal">
                <div className="modal-box bg-black">
                    <form method="dialog" className="">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form className="space-y-3">
                        <div className="form-control ">
                            <label htmlFor="reason" className="label w-fit text-white">
                                <span className="">Do you want this session to be free or paid?</span>
                            </label>
                            <div className="form-control flex-1">
                                <label className="label cursor-pointer has-[input:checked]:text-blue-500">
                                    <span className="">Free</span>
                                    <input onChange={(e)=>setSession_fee(e.target.value)} checked={!session_fee||session_fee<=0} value={0} type="radio" name="session_fee" className="radio checked:bg-blue-500"/>
                                </label>
                                </div>
                                <div className="form-control">
                                <label className="label cursor-pointer has-[input:checked]:text-custom-primary">
                                    <span className="">Paid</span>
                                    <input onChange={(e)=>setSession_fee(e.target.value)} checked={session_fee>=1} value={1} type="radio" name="session_fee" className="radio checked:bg-custom-primary"/>
                                </label>
                            </div>
                        </div>

                        {session_fee>=1?
                            <div className="form-control flex-1">
                            <label htmlFor="feedback" className="label w-fit text-white">
                                <span className="">Amount in USD</span>
                            </label>
                            <input
                                onChange={(e) => setSession_fee(e.target.value)}
                                type="number"
                                value={session_fee}
                                min={1}
                                step={0.01}
                                placeholder="Type the amount"
                                name="amount"
                                id="amount"
                                className="input input-ghost input-bordered"
                                required
                            />
                            </div>:""
                        }


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

export default ApproveModal;