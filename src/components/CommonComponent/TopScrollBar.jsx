import { useContext, useEffect, useState } from "react";
import { TbAdjustmentsFilled } from "react-icons/tb";
import { TransferLists } from "../../Contexts/TransferLists";

const TopScrollBar = ({ sessionCount }) => {
  const { searchQuery, setSearchQuery } = useContext(TransferLists);
  const [statusList, setStatusList] = useState([
    "All",
    "Onging",
    "Closed",
    "Pending",
    "Rejected",
  ]);
  const [status, setStatus] = useState([
    "All",
    "Onging",
    "Closed",
    "Pending",
    "Rejected",
  ]);

  useEffect(() => {
    const allStatusList = ["All", "Onging", "Closed", "Pending", "Rejected"];

    const remainingStatus = allStatusList.filter(
      (categoryName) => categoryName !== searchQuery
    );
    const selectedStatus = allStatusList.filter(
      (categoryName) => categoryName == searchQuery
    );

    setStatusList(remainingStatus);
    setStatus(selectedStatus);
  }, [searchQuery]);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.searchInput.value);
    e.target.reset();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearchInput} className="flex justify-center">
        {/* <div className="form-control max-w-md min-w-[280px]">
          <input type="search" name='searchInput' id='searchInput' placeholder="Search..." 
           className="input input-ghost !text-custom-primary rounded-sm outline-none focus:outline-none border-custom-primary 
           focus:border-custom-primary input-bordered" required />
        </div> */}

        <label
          className="input input-ghost !text-custom-primary border-custom-primary 
           focus:border-custom-primary input-bordered flex items-center gap-2"
        >
          <input
            type="search"
            name="searchInput"
            id="searchInput"
            placeholder="Search..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </form>

      <div className="flex justify-center">
        <div className="flex gap-2 items-center overflow-x-scroll hide-scrollbar rounded-md">
          <button
            tabIndex={0}
            type="button"
            className="flex items-center gap-1 primaryButton capitalize"
          >
            <TbAdjustmentsFilled className="text-[18px]" />
            Filter: {searchQuery === "All" ? "All" : status}
          </button>
          <div className="flex gap-2">
            {statusList.map((categoryName, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(categoryName)}
                className={`bg-gray-200 hover:bg-gray-200 hover:scale-105 text-sm text-black cursor-pointer px-4 py-[.56rem] duration-500 rounded-md border-none flex-shrink-0`}
              >
                {categoryName}
              </button>
            ))}
          </div>
        </div>
      </div>

      <h6 className="text-custom-primary">
        {searchQuery === "All"
          ? `All sessions(${sessionCount})`
          : `Result for ${searchQuery}(${sessionCount})`}
      </h6>
    </div>
  );
};

export default TopScrollBar;
