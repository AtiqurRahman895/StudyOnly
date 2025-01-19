import RejectModal from "./RejectModal";
import ApproveModal from "./ApproveModal";
const SessionAdminButtonsSection = ({ session, refetch }) => {
    const {_id, image, tutor, tutor_email, title, session_description, registration_start_date, registration_end_date, class_start_time, class_end_time, classDuration, status, registration_fee} = session;
    return (
      <section className="container flex justify-center gap-x-8">
        {
          status==="Closed"||status==="Rejected"||status==="Onging"?"":
          <RejectModal _id={_id} status={status} refetch={refetch}/>
      }
        {
          status==="Closed"||status==="Rejected"?"":
          <ApproveModal _id={_id} registration_fee={registration_fee} status={status} refetch={refetch} />
        }
        
      </section>
    );
};

export default SessionAdminButtonsSection;