import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSecureAxios from '../../Hooks/useSecureAxios';
import { toast } from 'react-toastify';
import { MdEditSquare } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import ImageInputSection from '../CreatSessionComponent/ImageInputSection';
import TitleInputSection from '../CreatSessionComponent/TitleInputSection';
import MaterialLinkInputSection from '../CreatSessionComponent/MaterialLinkInputSection';

const UpdateMaterialModal = ({material, index, refetch}) => {
    const [openModal, setOpenModal] = useState(false);
    const secureAxios = useSecureAxios();
    const [title, setTitle] = useState(material.title);
    const [image, setImage] = useState(material.image);
    const [material_link, setMaterial_link] = useState(material.material_link);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!image) {
        toast.warning(
          "You must upload a image. Only JPG, PNG, GIF image files are allowed, and the maximum file size is 10MB. Please select an appropriate image file to proceed!"
        );
        return;
      }
  
      const credentials = {
        session_id:material.session_id,
        tutor_email:material.tutor_email,
        title,
        image,
        material_link,
      };
      try {
        await secureAxios.put(`/updateMaterial/${material._id}`, credentials);
        toast.success("Successfully Updated a material!");
        e.target.reset();
        refetch()
        setOpenModal(false);
      } catch (error) {
        console.error("Failed to add this material!", error);
        toast.error("Failed to add this material!");
      }
    };
    return (
      <>
        <button
            className={`updateMaterial primaryButton2 activePrimaryButton2 p-1.5 !w-fit`} onClick={() => setOpenModal(true)}
        >
            <MdEditSquare className={`text-lg`} />
        </button>
        <Tooltip anchorSelect=".updateMaterial" className="!bg-custom-primary"> Update this material </Tooltip>

        <dialog id="material_modal" className="!m-0 modal bg-[rgba(0,0,0,.4)]" open={openModal}>
          <div className="modal-box bg-black">
            <button onClick={() => setOpenModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <form onSubmit={handleSubmit} className="space-y-4 pt-6">
              <ImageInputSection image={image} setImage={setImage} id={`image${index}`} defaultValue={material?.image} />
              <TitleInputSection
                title={title}
                setTitle={setTitle}
                id={`title${index}`}
                forModal={true}
              />
              
              <MaterialLinkInputSection
                material_link={material_link}
                setMaterial_link={setMaterial_link}
                id={`material_link${index}`}
              />
  
              <div className="flex pt-4">
                <button
                  type="submit"
                  className="primaryButton activePrimaryButton mx-auto"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </>
    );

}
export default UpdateMaterialModal;