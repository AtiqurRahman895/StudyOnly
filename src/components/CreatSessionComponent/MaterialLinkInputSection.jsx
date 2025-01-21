import { MdRateReview } from "react-icons/md";

const MaterialLinkInputSection = ({ material_link, setMaterial_link, id="material_link"}) => {
  const temporary_material_link =
    "Write resources material Google Drive link. For example: google doc, google sheet etc";

  return (
    <div className="">
      <div className="input-box flex relative">
        <div className="input-field form-control w-full absolute focus-within:static scale-0 focus-within:scale-100">
          <input
          type="url"
            onChange={(e) => setMaterial_link(e.target.value)}
            value={material_link}
            placeholder="Material Link"
            name="material_link"
            id={id}
            className="input input-ghost input-bordered"
            required
          />
        </div>
        <label
          htmlFor={id}
          className="text-center max-w-full overflow-hidden input-label py-0 [&_svg]:hover:animate-none [&_svg]:animate-pulse"
        >
          <p>
            <MdRateReview className="text-custom-primary text-xl ![animation-duration:1.5s] inline mr-2" />
            <b>Material Link: </b>{" "}
            {material_link
              ? material_link
              : temporary_material_link}
          </p>
        </label>
      </div>
    </div>
  );
};

export default MaterialLinkInputSection;