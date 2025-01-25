import { useEffect, useState } from "react";
import useScreenWidth from "../../Hooks/useScreenWidth";
import useSecureAxios from "../../Hooks/useSecureAxios";
import Loading from "../AuthenticationComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import NotFound from "../CommonComponent/NotFound";
import Masonry from "react-responsive-masonry";
import { MdEditSquare } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import TitleSection from "../CommonComponent/TitleSection";

const AllNotes = () => {
    const secureAxios=useSecureAxios()
    const screenWidth = useScreenWidth();
    const [columnsCount, setColumnsCount] = useState();

    const fetchNotes=async()=>{
        const res=await secureAxios.get("/notes")
        return res.data
    }
    const {isLoading:loading, data:notes=[],refetch,isError,error}=useQuery(
            ['notes'],
            fetchNotes,
    )

    useEffect(() => {
         if (screenWidth >= 640) {
          setColumnsCount(2);
        } else {
          setColumnsCount(1);
        }
    }, [screenWidth]);

    const handleDeleteButton= async(_id)=>{
        const deleteNote = window.confirm(
            `Are you sure about deleting this note?`
          );
          if (deleteNote) {
            try {
                await secureAxios.delete(`/deleteNote/${_id}`)
                refetch()
                toast.info(`You have successfully deleted one note`);
            } catch (error) {
                toast.error(`Failed to delete one note`);
                console.error(error)
            }
          }
    }
    
    if (isError ) {
        console.error(error);
        // throw error;
    }
    return (
        <section className="">
            <TitleSection title={"All Notes"} />
            <div className="space-y-10">
                <h3 className="text-custom-primary sectionHeaderWidth text-center">
                    Your notes
                </h3>
                {
                    (loading) ? (<Loading/>) :(
                        (notes?.length === 0)? (
                            <NotFound  NotFoundText={"You have not added any notes yet!"}/>
                        ):
                        (
                            <div className="container space-y-4">
                                <h5 className="text-custom-primary">Total: {notes.length}</h5>

                                <Masonry columnsCount={columnsCount} gutter="20px">
                                    {notes.map((note, index) => (
                                        <div key={index} className="bg-custom-primary p-4 lg:p-6 space-y-1 rounded-md w-full">
                                            <h5 className="text-black">{note.title}</h5>
                                            <div
                                                className="!whitespace-pre-wrap itsLongDispriction text-white"
                                                dangerouslySetInnerHTML={{ __html: note.note }}
                                            ></div>
                                            <div className="flex justify-center gap-3 pt-4">

                                                <Link to={`/dashboard/update_note/${note._id}`}
                                                    className={`updateNote primaryButton2 activePrimaryButton2 !border-white !text-white p-1.5 !w-fit`}
                                                >
                                                    <MdEditSquare className={`text-lg`} />
                                                </Link>
                                                <Tooltip anchorSelect=".updateNote" className=""> Update this note </Tooltip>

                                                <button
                                                    onClick={()=>handleDeleteButton(note._id)}
                                                    className={`deleteNote primaryButton2 activePrimaryButton2 !border-white !text-white p-1.5 !w-fit`}
                                                >
                                                    <RiDeleteBin2Fill className={`text-lg`} />
                                                </button>
                                                <Tooltip anchorSelect=".deleteNote" className=""> Delete this note </Tooltip>

                                            </div>
                                        </div>
                                    ))}
                                </Masonry>
                            </div>

                        )
                    )    
                }
            </div>
        </section>
    );
};

export default AllNotes;