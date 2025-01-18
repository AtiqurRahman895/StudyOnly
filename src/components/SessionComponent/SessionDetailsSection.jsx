
import Timer from "../CommonComponent/Timer";
import { normalAxios } from "../../Hooks/useNormalAxios";
import useConvertTo12HourFormat from "../../Hooks/useConvertTo12HourFormat";
// import { useState } from "react";
// import RejectModal from "./RejectModal";
// import ApproveModal from "./ApproveModal";

const SessionDetailsSection = ({ session, refetch }) => {
    const convertTo12HourFormat=useConvertTo12HourFormat()

  const {_id, image, tutor, tutor_email, title, session_description, registration_start_date, registration_end_date, class_start_time, class_end_time, classDuration, status, registration_fee} = session;

    const handleTimeOut=(status)=>{
        normalAxios.put('/ongingOrcloseSession',{_id,status})
        .then(()=>{
          refetch()
        })
        .catch((error)=>{
            console.error("Failed to update session status:", error);
        })
    }

    let classStartAt=convertTo12HourFormat(class_start_time)
    let classEndtAt=convertTo12HourFormat(class_end_time)

  return (
    <>
      <section className="">
        <div className={`xs:container mx-auto relative aspect-auto`}>
          <img
            src={image}
            alt=""
            className="bg-custom-primary max-w-full m-auto"
          />
        </div>
      </section>

      <section className="">
        <div className="container grid">
          {/* <h6 className="text-custom-primary">- {category} -</h6> */}
          <h3 className="text-custom-primary sectionHeaderWidth text-center">
            {title}
          </h3>
          {/* <div className="flex items-center gap-1">
            <p className="text-custom-primary">{tutor}</p>
            <p className="text-gray-500">/ {tutor_email}</p>
          </div> */}
        </div>
      </section>

      <section className="">
            <div className="container text-center xs:px-4">
              <p className="mt-2 font-bold first-letter:text-custom-primary first-letter:text-3xl first-letter:font-Cinzel">
                {session_description}
              </p>
            </div>
      </section>

      <section className="container flex justify-between lg:justify-center gap-x-16 lg:gap-x-20 gap-y-2.5 flex-wrap pt-2">
            <div className="space-y-2.5">

                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <b className="text-custom-primary">Registration start date:</b>
                    <p>{registration_start_date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <b className="text-custom-primary">Registration end date:</b>
                    <p>{registration_end_date}</p>
                  </div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <b className="text-custom-primary">Class start time:</b>
                        <p>{classStartAt}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <b className="text-custom-primary">Class end time:</b>
                        <p>{classEndtAt}</p>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <b className="text-custom-primary">Class duration:</b>
                        <p>{classDuration}</p>
                    </div>
                </div>

            </div>

            <div className="space-y-2.5">

                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <b className="text-custom-primary">Session status:</b>
                    <p>{status}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <b className="text-custom-primary">Registration fee:</b>
                    <p>{registration_fee===0?"Free":`${registration_fee}$`}</p>
                  </div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <b className="text-custom-primary">Tutor name:</b>
                        <p>{tutor}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <b className="text-custom-primary">Tutor email:</b>
                        <p>{tutor_email}</p>
                    </div>
                </div>

                <div className="w-fit">

                    {status == "Closed" || status == "Rejected"?"":
                        <>
                        {
                            status == "Onging"?
                            <div className="flex items-center gap-1">
                                <b className="text-custom-primary">Registration ends in</b>
                                <Timer date={registration_end_date} handleTimeOut={handleTimeOut} status={"Closed"} />
                            </div>
                            
                            :
                            <div className="flex items-center gap-1">
                                <b className="text-custom-primary">Registration starts in</b>
                                <Timer date={registration_start_date} handleTimeOut={handleTimeOut} status={"Onging"} />
                            </div>
                        }
                        </>
                    }
                </div>

            </div>
      </section>

      {/* <section className="container flex justify-center gap-x-8 pt-6">
        <RejectModal refetch={refetch}/>
        <ApproveModal registration_fee={registration_fee} refetch={refetch} />
      </section> */}
    </>
  );
};

export default SessionDetailsSection;
