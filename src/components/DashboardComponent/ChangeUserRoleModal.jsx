import { useState } from "react";
import { toast } from "react-toastify";
import { secureAxios } from "../../Hooks/useSecureAxios";

const ChangeUserRoleModal = ({user,refetch}) => {
      const [userRole,setUserRole]=useState(user.role)
      const [openModal,setOpenModal]=useState(false)

      const userRoleList=[
        `student`,
        `tutor`,
        `admin`,
      ]

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            await secureAxios.put(`/changeUserRole/${user._id}`,{role:userRole})
            toast.success(`Successfully changed ${user.name}'s role to ${userRole}!`)
            e.target.reset();
            refetch()
            setOpenModal(false)
        } catch (error) {
            console.error(`Failed to change ${user.name}'s role!`, error);
            toast.error(
              `Failed to change ${user.name}'s role!`
            );
        }
    }

    return (
        <>
            <p onClick={()=>setOpenModal(true)}>{user.role}</p>
            <dialog id="reject_modal" className="!m-0 !p-0 modal bg-[rgba(0,0,0,.4)]" open={openModal}>
                <div className="modal-box max-w-sm bg-black text-white">
                    <button onClick={()=>setOpenModal(false)} className="btn btn-sm btn-circle !bg-custom-metalic-gray absolute right-2 top-2">✕</button>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <h1 className="text-5xl font-bold">Change role!</h1>
                        <div className="form-control flex-1">
                            <label htmlFor="userRole" className="label w-fit">
                                User role
                            </label>
                            <select onChange={(e)=>setUserRole(e.target.value)} value={userRole} name="userRole" id="userRole" className="select select-ghost select-bordered" required>
                                <option value={''} disabled hidden>Pick role</option>

                                {userRoleList.map((role, index) => (
                                    <option key={index} value={role}>{role}</option>
                                ))}

                            </select>
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

export default ChangeUserRoleModal;