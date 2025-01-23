import { Link } from "react-router-dom";
import UploadMaterialModal from "./UploadMaterialModal";

const SessionTutorButtonsSection = ({ session,incard=false }) => {
  const {
    _id,
    image,
    tutor,
    tutor_email,
    title,
    session_description,
    registration_start_date,
    registration_end_date,
    class_start_time,
    class_end_time,
    classDuration,
    status,
    registration_fee,
  } = session;
  return (
    <section className={`flex flex-wrap gap-4`}>
      {status === "Rejected" && (
        <Link
          to={`/dashboard/modify_session/${_id}`}
          className={`primaryButton activePrimaryButton !py-2.5  min-w-32 ${incard&&"flex-grow"}`} 
        >
          Resubmit
        </Link>
      )}
      <UploadMaterialModal session_id={_id} tutor_email={tutor_email} incard={incard} />
    </section>
  );
};

export default SessionTutorButtonsSection;
