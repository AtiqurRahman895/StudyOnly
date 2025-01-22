import UpdateMaterialModal from "./UpdateMaterialModal";
import { AuthContext } from "../../Provider/AuthProvider";
import { TransferLists } from "../../Contexts/TransferLists";
import { useContext } from "react";
import ImageDownloadButton from "./ImageDownloadButton";
import DeleteMaterial from "./DeleteMaterial";

const MaterialCard = ({material, index, refetch , fixedWidh=false}) => {

    const {role}=useContext(TransferLists)
    const {user}=useContext(AuthContext)

    return (
        <div className={`${fixedWidh&&"max-w-96"} rounded-md text-white h-fit space-y-4`}>
            <img src={material.image} alt={material.title} className="w-full aspect-[3/2] object-cover object-center rounded-md bg-custom-primary" />
            <h5 className="text-custom-primary">{material.title}</h5>

            <div className="space-y-4">
                <a href={material.material_link} target="_blank" className="break-words break-all overflow-wrap-anywhere">
                    <b className="text-custom-primary">Resources link: </b> 
                    <span className="hover:underline underline-offset-2">{material.material_link}</span> 
                </a>
            </div>
            <div className="flex justify-center gap-3">

                {
                    (role==="tutor" && material.tutor_email===user?.email) &&(
                        <UpdateMaterialModal material={material} index={index} refetch={refetch} />
                    ) 
                }
                {
                    (role==="admin" || role==="tutor" && material.tutor_email===user?.email) &&(
                        <DeleteMaterial _id={material._id} refetch={refetch} />
                    ) 
                }
                <ImageDownloadButton imgUrl={material.image} />

            </div>
        </div>
    );
};

export default MaterialCard;