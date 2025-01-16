import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import ImageInputSection from "./ImageInputSection";
import TitleInputSection from "./TitleInputSection";
import StatusInputSection from "./StatusInputSection";
import useSecureAxios from "../../Hooks/useSecureAxios";
import RegistrationStartDateSection from "./RegistrationStartDateSection";
import RegistrationEndDateSection from "./RegistrationEndDateSection";
import SessionDescriptionSection from "./SessionDescriptionSection";
import ClassStartTimeSection from "./ClassStartTimeSection";
import ClassEndTimeSection from "./ClassEndTimeSection";
import useClassDuration from "../../Hooks/useClassDuration";


const CreatSession = () => {
    const navigate = useNavigate();
    const { user, logoutUser } = useContext(AuthContext);
    const {secureAxios}=useSecureAxios()
    const {duration, calculateDuration}=useClassDuration()

    const [image, setImage] = useState();
    const tutor = user?.displayName;
    const tutor_email = user?.email;
    const [title, setTitle] = useState("");
    const [session_description, setSession_description] = useState("");
    const [registration_start_date, setRegistration_start_date] = useState("");
    const [registration_end_date, setRegistration_end_date] = useState("");
    const [class_start_time,setClass_start_time] = useState("");
    const [class_end_time,setClass_end_time] = useState("");
    const [classDuration, setClassDuration] = useState();
    const registration_fee= 0
    const status = "Pending";
    
    useEffect(()=>{
        if(class_start_time,class_end_time){
            calculateDuration(class_start_time,class_end_time)
        }
        if(duration){
            setClassDuration(duration)
        }
    },[calculateDuration,duration,class_start_time,class_end_time])

  const handleSubmit = (e) => {
    const session_description_word_count = session_description
      .replace(/<[^>]*>/g, " ")
      .trim()
      .split(/\s+/).length;

    e.preventDefault();

    if (session_description_word_count < 10) {
      toast.warning(
        `Please lenghten Short Discription to 10 or more word! (Currently has ${session_description_word_count} words)`
      );
      return;
    }  else if (!image) {
      toast.warning("You must upload a image. Only JPG, PNG, GIF image files are allowed, and the maximum file size is 10MB. Please select an appropriate image file to proceed!");
      return;
    }

    // console.log(image,status,title,tutor,tutor_email,published,session_description,long_discription,word_count)

    const sessionCredentials = {
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

    console.log(sessionCredentials);

    secureAxios
    .post(
        "/creatSession",
        sessionCredentials
      )
      .then(() => {
        e.target.reset();
        toast.success("You have successfully created a Session!");
        // return secureAxios.put(
        //   "/UpdateSessionRating",
        //   { _id }
        // );
      })
      .catch((error) => {
        console.error("Error creating Session:", error);
        toast.error(
          error.response?.data?.message ||
            `Failed to creat Session`
        );
      });
  };
  return (
        <section className=''>
            {/* <div className="container hero flex items-center justify-center">
                <div className="fromWrapper lg:!my-0 max-w-md">
                    <h1 className="text-5xl font-bold">Creat a study session!</h1>
                    <form className="card-body p-0">

                        <div className="form-control">
                            <label htmlFor='name' className="label">
                                <span className="">Name</span>
                            </label>
                            <input type="text" name='name' id='name' className="input input-ghost input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label htmlFor='email' className="label">
                                <span className="">Email</span>
                            </label>
                            <input type="email" name='email' id='email' className="input input-ghost input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label htmlFor='description' className="label">
                                <span className="">Session Description</span>
                            </label>
                            <textarea name='description' id='description' rows={3} className="textarea textarea-ghost textarea-bordered" required />
                        </div>

                        <div className="mt-6">
                            <button className="formSubmitBtn">Creat</button>
                        </div>

                    </form>
                </div>
            </div> */}

            <form onSubmit={handleSubmit} className="space-y-6">
                <ImageInputSection
                image={image}
                setImage={setImage}
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
                        {/* {
                            classDuration&&
                            <div className="flex gap-2">
                                <b className="text-custom-primary">Class Duration:</b>
                                <p className="">{classDuration}</p>
                            </div>
                        } */}

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
                        Creat
                    </button>
                </div>
            </form>

        </section>
    );
};

export default CreatSession;