import notFoundImg from "../../assets/notFoundContent.svg"

const NotFound = ({ NotFoundText }) => {
  return (
    <div className="m-20 grid justify-items-center gap-3">
      <img src={notFoundImg} alt={`not available`} className="w-[200px]" />
      <h4 className="font-extrabold text-center text-custom-primary">
        {NotFoundText}
      </h4>
    </div>
  );
};

export default NotFound;
