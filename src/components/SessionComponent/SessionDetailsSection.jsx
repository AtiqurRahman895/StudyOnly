import Timer from "../CommonComponent/Timer";
import { normalAxios } from "../../Hooks/useNormalAxios";
import useConvertTo12HourFormat from "../../Hooks/useConvertTo12HourFormat";
// import { useState } from "react";

const SessionDetailsSection = ({ session, refetch }) => {
  const convertTo12HourFormat = useConvertTo12HourFormat();

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

  const handleTimeOut = (statusToChange) => {
    normalAxios
      .put("/ongingORcloseSession", { _id, status: statusToChange })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error("Failed to update session status:", error);
      });
  };

  let classStartAt = convertTo12HourFormat(class_start_time);
  let classEndtAt = convertTo12HourFormat(class_end_time);

  return (
    <section className="space-y-4">
      <div className={`xs:container mx-auto relative aspect-auto rounded-md`}>
        <img
          src={image}
          alt=""
          className="bg-custom-primary max-w-full m-auto rounded-md"
        />
      </div>

      <div className="container space-y-2">
        <div className="grid">
          <h3 className="text-custom-primary sectionHeaderWidth text-center">
            {title}
          </h3>
        </div>

        <div className="text-center xs:px-4">
          <p className="mt-2 font-bold first-letter:text-custom-primary first-letter:text-3xl first-letter:font-Cinzel">
            {session_description}
          </p>
        </div>

        <div className="flex justify-between lg:justify-center gap-x-16 lg:gap-x-20 gap-y-2.5 flex-wrap pt-2">
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
                <p>
                  {registration_fee === 0 ? "Free" : `${registration_fee}$`}
                </p>
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
              {(status == "Closed" || status == "Rejected") ? (
                ""
              ) : (
                <>
                  {status == "Onging" ? (
                    <div className="flex items-center gap-1">
                      <b className="text-custom-primary">
                        Registration ends in
                      </b>
                      <Timer
                        date={registration_end_date}
                        handleTimeOut={handleTimeOut}
                        status={status}
                        statusToChange={"Closed"}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <b className="text-custom-primary">
                        Registration starts in
                      </b>
                      <Timer
                        date={registration_start_date}
                        handleTimeOut={handleTimeOut}
                        status={status}
                        statusToChange={"Onging"}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionDetailsSection;
