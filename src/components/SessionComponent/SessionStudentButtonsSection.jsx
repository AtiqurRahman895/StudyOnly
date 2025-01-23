import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useBookSession from "../../Hooks/useBookSession";

const SessionStudentButtonsSection = ({ session }) => {
  const bookSession = useBookSession();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { _id, image, tutor, tutor_email, title, session_description, registration_start_date, registration_end_date, class_start_time, class_end_time, classDuration, status, registration_fee,
  } = session;

  const handleBookButton = () => {
    if (status === "Upcoming") {
      toast.info(
        `Registration will start from ${registration_start_date}. you can book this session when registration starts!`
      );
      return;
    }
    if(!user){
        toast.info("You must Login first to Book a session!")
        navigate("/login")
    }

    if (registration_fee === 0) {
      bookSession({session_id: _id, email: user.email});
    } else {
      navigate(`/payment/${registration_fee}/${_id}/${user.email}`);
    }
  };

  if (status === "Upcoming" || status === "Ongoing") {
    return (
      <section className="container flex justify-center gap-x-8">
        <button
          onClick={handleBookButton}
          className="primaryButton activePrimaryButton !py-2.5 !w-full max-w-40"
        >
          Book Now
        </button>
      </section>
    );
  }
};

export default SessionStudentButtonsSection;
