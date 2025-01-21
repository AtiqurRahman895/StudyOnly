import { useState } from "react";
import { toast } from "react-toastify";
import useSecureAxios from "../../Hooks/useSecureAxios";
import { useNavigate } from "react-router-dom";

const ApproveModal = ({_id,registration_fee,status,refetch}) => {
    const secureAxios=useSecureAxios()
    const navigate = useNavigate();
    const [session_fee,setSession_fee]=useState(registration_fee)
    const [paidInputChecked,setPaidInputChecked]=useState(registration_fee>0)
    const [openModal,setOpenModal]=useState(false)
    

    const customRound=(num)=>{
        return num % 1 === 0 ? num : Number(num.toFixed(2));
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const finalFee=customRound(Number(session_fee))
        try {
            await secureAxios.put(`/approveOrChangeFee/${_id}`,{status,registration_fee:finalFee})
            toast.success(status==="Pending"?"Successfully approved this session!":"Registration fee changed!")
            setOpenModal(false)
            e.target.reset();
            refetch()
            navigate(0)

        } catch (error) {
            console.error(status==="Pending"?"Failed to Approve this session!":"Failed to change registration fee!", error);
            toast.error(
              status==="Pending"?"Failed to Approve this session!":"Failed to change registration fee!"
            );
        }
    }
    
    const handleFreeInput=(e)=>{
        setPaidInputChecked(false)
        setSession_fee(e.target.value)
    }
    const handlePaidInput=()=>{
        setPaidInputChecked(true)
        setSession_fee()
    }


    return (
        <>
            <button className="primaryButton activePrimaryButton !py-2.5 !w-full max-w-40" onClick={()=>setOpenModal(true)} >{status==="Pending"?"Approve":"Change fee"}</button>
            <dialog id="approve_modal" className="modal bg-[rgba(0,0,0,.4)]" open={openModal}>
                <div className="modal-box bg-black">
                    <button onClick={()=>setOpenModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="form-control ">
                            <label htmlFor="reason" className="label w-fit text-white">
                                <span className="">Do you want this session to be free or paid?</span>
                            </label>
                            <div className="form-control flex-1">
                                <label className="label cursor-pointer has-[input:checked]:text-blue-500">
                                    <span className="">Free</span>
                                    <input onClick={handleFreeInput} value={0} defaultChecked={registration_fee<=0} type="radio" name="session_fee" className="radio checked:bg-blue-500"/>
                                </label>
                                </div>
                                <div className="form-control">
                                <label className="label cursor-pointer has-[input:checked]:text-custom-primary">
                                    <span className="">Paid</span>
                                    <input onClick={handlePaidInput} defaultChecked={paidInputChecked} type="radio" name="session_fee" className="radio checked:bg-custom-primary"/>
                                </label>
                            </div>
                        </div>

                        {paidInputChecked?
                            <div className="form-control flex-1">
                            <label htmlFor="feedback" className="label w-fit text-white">
                                <span className="">Amount in USD</span>
                            </label>
                            <input
                                onChange={(e) => setSession_fee(e.target.value)}
                                type="number"
                                value={session_fee}
                                min={0.10}
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
                {/* <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form> */}
            </dialog>
        </>
    );
};

export default ApproveModal;