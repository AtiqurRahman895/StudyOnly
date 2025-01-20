import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import ImageInputSection from "../CreatSessionComponent/ImageInputSection";
import TitleInputSection from "../CreatSessionComponent/TitleInputSection";
// import StatusInputSection from "../CreatSessionComponent/StatusInputSection";
import useSecureAxios from "../../Hooks/useSecureAxios";
import RegistrationStartDateSection from "../CreatSessionComponent/RegistrationStartDateSection";
import RegistrationEndDateSection from "../CreatSessionComponent/RegistrationEndDateSection";
import SessionDescriptionSection from "../CreatSessionComponent/SessionDescriptionSection";
import ClassStartTimeSection from "../CreatSessionComponent/ClassStartTimeSection";
import ClassEndTimeSection from "../CreatSessionComponent/ClassEndTimeSection";
import useClassDuration from "../../Hooks/useClassDuration";
import useGetSession from "../../Hooks/useGetSession";
import Loading from "../AuthenticationComponent/Loading";

const ResubmitSession = () => {
  const { _id } = useParams();
  const { session, loading, refetch, isError, error } = useGetSession(_id);
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  const secureAxios = useSecureAxios();
  const { duration, calculateDuration } = useClassDuration();
  const [image, setImage] = useState(session?.image);
  const tutor = session.tutor;
  const tutor_email = session.tutor_email;
  const [title, setTitle] = useState();
  const [session_description, setSession_description] = useState();
  const [registration_start_date, setRegistration_start_date] = useState();
  const [registration_end_date, setRegistration_end_date] = useState();
  const [class_start_time, setClass_start_time] = useState();
  const [class_end_time, setClass_end_time] = useState();
  const [classDuration, setClassDuration] = useState();
  const registration_fee = session.registration_fee;
  const status = "Pending";

  useEffect(() => {
    const {
      image,
      title,
      session_description,
      registration_start_date,
      registration_end_date,
      class_start_time,
      class_end_time,
      classDuration,
      status,
    } = session;
    if (status && status !== "Rejected") {
      logoutUser();
      toast.warning("Can't modify Approved session!");
    }
    setImage(image);
    setTitle(title);
    setSession_description(session_description);
    setRegistration_start_date(registration_start_date);
    setRegistration_end_date(registration_end_date);
    setClass_start_time(class_start_time);
    setClass_end_time(class_end_time);
    setClassDuration(classDuration);
  }, [session]);

  useEffect(() => {
    if ((class_start_time, class_end_time)) {
      calculateDuration(class_start_time, class_end_time);
    }
    if (duration) {
      setClassDuration(duration);
    }
  }, [calculateDuration, duration, class_start_time, class_end_time]);

  if (loading) {
    return <Loading />;
  }

  if (isError) {
    console.error(error);
    throw error;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const session_description_word_count = session_description
      .replace(/<[^>]*>/g, " ")
      .trim()
      .split(/\s+/).length;

    if (session_description_word_count < 10) {
      toast.warning(
        `Please lenghten Short Discription to 10 or more word! (Currently has ${session_description_word_count} words)`
      );
      return;
    } else if (!image) {
      toast.warning(
        "You must upload a image. Only JPG, PNG, GIF image files are allowed, and the maximum file size is 10MB. Please select an appropriate image file to proceed!"
      );
      return;
    }

    // console.log(image,status,title,tutor,tutor_email,published,session_description,long_discription,word_count)

    const resubmitCredentials = {
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
    };

    // console.log(resubmitCredentials);

    secureAxios
      .put(`/resubmitSession/${_id}`, resubmitCredentials)
      .then(() => {
        navigate(`/session/${_id}`);
        toast.success("You have successfully resubmitted this Session!");
      })
      .catch((error) => {
        console.error("Error resubmiting Session:", error);
        toast.error(
          error.response?.data?.message || `Failed to resubmit this Session!`
        );
      });
  };
  return (
    <section className="">

      <form onSubmit={handleSubmit} className="space-y-6">
        <ImageInputSection
          image={image}
          setImage={setImage}
          defaultValue={session?.image}
        />
        <TitleInputSection title={title} setTitle={setTitle} />

        <SessionDescriptionSection
          session_description={session_description}
          setSession_description={setSession_description}
        />

        {/* tutor and Date */}
        <div className="space-y-4">
          <div className="grid justify-start gap-y-4">
            <div className="flex gap-2">
              <b className="text-custom-primary">Tutor Name:</b>
              <p className="">{tutor}</p>
            </div>
            <div className="flex gap-2">
              <b className="text-custom-primary">Tutor email:</b>
              <p className="">{tutor_email}</p>
            </div>
          </div>

          <div className="grid justify-end gap-y-4">
            <RegistrationStartDateSection
              registration_start_date={registration_start_date}
              setRegistration_start_date={setRegistration_start_date}
            />
            <RegistrationEndDateSection
              registration_start_date={registration_start_date}
              registration_end_date={registration_end_date}
              setRegistration_end_date={setRegistration_end_date}
            />
          </div>

          <div className="grid justify-start gap-y-4">
            <ClassStartTimeSection
              class_start_time={class_start_time}
              setClass_start_time={setClass_start_time}
            />
            <ClassEndTimeSection
              class_start_time={class_start_time}
              class_end_time={class_end_time}
              setClass_end_time={setClass_end_time}
            />
          </div>

          <div className="grid justify-end gap-y-4">
            {classDuration && (
              <div className="flex gap-2">
                <b className="text-custom-primary">Class Duration:</b>
                <p className="">{classDuration}</p>
              </div>
            )}

            <div className="flex gap-2">
              <b className="text-custom-primary">Registration fee:</b>
              <p className="">{registration_fee} $</p>
            </div>

            <div className="flex gap-2">
              <b className="text-custom-primary">Status:</b>
              <p className="">{status}</p>
            </div>
          </div>

          {/* <div className="flex justify-between flex-wrap gap-y-4 gap-x-16">
                        <StatusInputSection
                        status={status}
                        setStatus={setStatus}
                        />
                    </div> */}
        </div>

        <div className="container text-center">
          <button type="submit" className="primaryButton activePrimaryButton">
            Resubmit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ResubmitSession;
