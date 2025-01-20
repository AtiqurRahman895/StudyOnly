import { Link } from 'react-router-dom';
import UploadMaterialsModal from './UploadMaterialsModal';

const SessionTutorButtonsSection = ({session}) => {
    const { _id, image, tutor, tutor_email, title, session_description, registration_start_date, registration_end_date, class_start_time, class_end_time, classDuration, status, registration_fee,
    } = session;
    return (
        <section className="container flex justify-center gap-x-8">
            {
                (status==="Rejected") &&(
                    <Link to={`/dashboard/modify_session/${_id}`} className="primaryButton activePrimaryButton !py-2.5 !w-full max-w-40">
                        Resubmit
                    </Link>
                )
            }
            {/* {
                status==="Closed" &&
                <Link to={`/dashboard/modify_session/:_id${_id}`} className="primaryButton activePrimaryButton !py-2.5 !w-full max-w-40">
                    Relaunch
                </Link>
            } */}
            <UploadMaterialsModal session_id={_id} tutor_email={tutor_email} />

        </section>
    );
};

export default SessionTutorButtonsSection;