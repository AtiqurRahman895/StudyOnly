import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import useSecureAxios from "../../Hooks/useSecureAxios";

const DeleteMaterial = ({_id,refetch}) => {
    const secureAxios=useSecureAxios()
    const handleClick= async()=>{
        const deleteMaterial = window.confirm(
            `Are you sure about deleting this material?`
          );
          if (deleteMaterial) {
            try {
                await secureAxios.delete(`/deleteMaterial/${_id}`)
                refetch()
                toast.info(`You have successfully deleted one material`);
            } catch (error) {
                toast.error(`Failed to delete one material`);
                console.error(error)
            }
          }
    }
    return (
        <>
            <button
                onClick={handleClick}
                className={`downloadImage primaryButton2 activePrimaryButton2 p-1.5 !w-fit`}
                target="_blank"
            >
                <RiDeleteBin2Fill className={`text-lg`} />
            </button>
            <Tooltip
                anchorSelect=".downloadImage"
                className="!bg-custom-primary"
            >
                Delete this material
            </Tooltip>
        </>
    );
};

export default DeleteMaterial;