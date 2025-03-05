import { MdRateReview } from "react-icons/md";

const TitleInputSection = ({ title, setTitle, id="title", forModal=false }) => {
  let titleText
  if(forModal){
    titleText="Title?"
  }else{
    titleText="Session Title?"
  }
  return (
    <div className={`text-center input-box flex justify-center relative`}>
      <div className="input-field form-control min-w-[250px] absolute focus-within:static scale-0 focus-within:scale-100">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          type="text"
          minLength={3}
          name="title"
          id={id}
          className="input my-4 btn-ghost input-bordered"
          required
        />
      </div>
      <label
        htmlFor={id}
        className="input-label label py-0 gap-2 items-center [&_svg]:hover:animate-none [&_svg]:animate-pulse"
      >
        <h3 className={`font-Cinze ${forModal?"text-2xl text-white":"text-black dark:text-white"}`}>
          {title ? title : titleText}
          <MdRateReview className="text-custom-primary text-xl ![animation-duration:1.5s] inline ml-2" />
        </h3>
      </label>
    </div>
  );
};

export default TitleInputSection;
