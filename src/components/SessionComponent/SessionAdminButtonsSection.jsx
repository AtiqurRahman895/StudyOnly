import RejectModal from "./RejectModal";
import ApproveModal from "./ApproveModal";
const SessionAdminButtonsSection = ({ session, refetch, incard=false }) => {
    const {_id, image, tutor, tutor_email, title, session_description, registration_start_date, registration_end_date, class_start_time, class_end_time, classDuration, status, registration_fee} = session;
    
    if (status!=="Closed"&&status!=="Rejected"){
      return (
        <section className={`flex flex-wrap gap-4`}>
          {
            (status!=="Ongoing")&&(
              <RejectModal _id={_id} status={status} refetch={refetch} incard={incard} />
            )
          }
          <ApproveModal _id={_id} registration_fee={registration_fee} status={status} refetch={refetch} incard={incard} />
          
        </section>
      );
    }
};

export default SessionAdminButtonsSection;