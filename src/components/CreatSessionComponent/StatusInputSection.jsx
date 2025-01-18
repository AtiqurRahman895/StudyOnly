import { MdRateReview } from "react-icons/md";

const StatusInputSection = ({ status, setStatus }) => {
  const statusList = [
    "Maintenance",
    "Repairs",
    "DIY",
    "Seasonal",
    "Technology",
    "Stories",
  ];
  return (
    <div className="input-box flex relative">
      <div className="input-field form-control min-w-[250px] absolute focus-within:static scale-0 focus-within:scale-100">
        <select
          name="status"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          id="status"
          className="select my-2 select-ghost select-bordered"
          required
        >
          <option value={""} disabled hidden>
            Pick one
          </option>
          {statusList.map((statusName, index) => (
            <option key={index} value={statusName}>
              {statusName}
            </option>
          ))}
        </select>
      </div>
      <label
        htmlFor="status"
        className="input-label label py-0 gap-2 items-center [&_svg]:hover:animate-none [&_svg]:animate-pulse"
      >
        <b className="text-custom-primary">Status:</b>
        <p>
          {status ? `${status}` : "Pick status?"}
          <MdRateReview className="text-xl ![animation-duration:1.5s] inline ml-2 text-custom-primary " />
        </p>
      </label>
    </div>
  );
};

export default StatusInputSection;
