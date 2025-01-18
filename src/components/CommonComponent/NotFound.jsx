const NotFound = ({ NotFoundText }) => {
  return (
    <div className="m-20 grid justify-items-center gap-3">
      <img src={"./notFound.svg"} alt={`not available`} className="w-[200px]" />
      <h3 className="font-extrabold text-center text-custom-primary">
        {NotFoundText}
      </h3>
    </div>
  );
};

export default NotFound;
