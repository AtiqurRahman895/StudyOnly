import { useState } from "react";
import { toast } from "react-toastify";
import useSecureAxios from "../../Hooks/useSecureAxios";
import ImageInputSection from "../CreatSessionComponent/ImageInputSection";
import TitleInputSection from "../CreatSessionComponent/TitleInputSection";
import MaterialLinkInputSection from "../CreatSessionComponent/MaterialLinkInputSection";
import { useLocation, useNavigate } from "react-router-dom";

const UploadMaterialModal = ({ session_id, tutor_email, incard=false}) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const secureAxios = useSecureAxios();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [material_link, setMaterial_link] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.warning(
        "You must upload a image. Only JPG, PNG, GIF image files are allowed, and the maximum file size is 10MB. Please select an appropriate image file to proceed!"
      );
      return;
    }

    const credentials = {
      session_id,
      tutor_email,
      title,
      image,
      material_link,
    };
    try {
      await secureAxios.post("/addMaterial", credentials);
      toast.success("Successfully added a material!");
      e.target.reset();
      setOpenModal(false);
      navigate(0);
    } catch (error) {
      console.error("Failed to add this material!", error);
      toast.error("Failed to add this material!");
    }
  };
  return (
    <>
      <button
        className={`primaryButton activePrimaryButton !py-2.5 min-w-32 ${incard&&"flex-grow"}` }
        onClick={() => setOpenModal(true)}
      >
        Upload material
      </button>
      <dialog
        id="material_modal"
        className="!m-0 modal bg-[rgba(0,0,0,.4)]"
        open={openModal}
      >
        <div className="modal-box bg-black">
          <button
            onClick={() => setOpenModal(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <form onSubmit={handleSubmit} className="space-y-4 pt-6 overflow-hidden">
            <ImageInputSection image={image} setImage={setImage} />
            <TitleInputSection
              title={title}
              setTitle={setTitle}
              forModal={true}
            />
            <MaterialLinkInputSection
              material_link={material_link}
              setMaterial_link={setMaterial_link}
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
};

export default UploadMaterialModal;
