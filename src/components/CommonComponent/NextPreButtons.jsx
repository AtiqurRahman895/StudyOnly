import { useContext, useEffect, useMemo, useState } from "react";
import UseUrlQuery from "../../Hooks/UseUrlQuery";
import { useNavigate } from "react-router-dom";
import { TransferLists } from "../../Contexts/TransferLists";

const NextPreButtons = ({limit,totalContents}) => {
  const navigate =useNavigate()  
  const {pageRef}=useContext(TransferLists)
  const {searchQuery,pageNo} = UseUrlQuery();
  const [maxPage,setMaxtPage] = useState()

  useMemo(()=>{
    setMaxtPage(Math.ceil(totalContents/limit)||1)
  },[totalContents,limit])

  const handlePreButton=()=>{
    navigate(`?searchQuery=${searchQuery}&page=${pageNo-1}`);
  }
  const handleNextButton=()=>{
    navigate(`?searchQuery=${searchQuery}&page=${pageNo+1}`);

  }
  useEffect(() => {
    const timer = setTimeout(() => {
      pageRef.current.scrollTo(0, 0);
      window.scrollTo(0,0)
    }, 200); 
    return () => clearTimeout(timer); // Cleanup the timeout
  }, [searchQuery, pageNo]);

  if(totalContents){
    return (
      <div className="flex justify-center items-center gap-4">
          <button type="button" onClick={handlePreButton} disabled={pageNo<=1} className={`${pageNo<=1?"opacity-50 cursor-not-allowed":""} primaryButton`}>
              Previous
          </button>
          <button type="button" onClick={handleNextButton} disabled={pageNo>=maxPage} className={`${pageNo>=maxPage?"opacity-50 cursor-not-allowed":""} primaryButton`}>
              Next
          </button>
      </div>
  );
  }
};

export default NextPreButtons;