import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useReactQuill from "../../Hooks/useReactQuill"
import { toast } from "react-toastify";
import useSecureAxios from "../../Hooks/useSecureAxios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../AuthenticationComponent/Loading";
import useGetNote from "../../Hooks/useGetNote";

const UpdateNote = () => {
    const {_id}= useParams()
    const secureAxios =useSecureAxios()
    const {loading,userNote,refetch,isError,error}= useGetNote(_id)
    const [rowNoteText, setRowNoteText] = useState("");
    const [title, setTitle] = useState("");
    const [note, setNote] = useState(false);
    const [word_count, setWord_count] = useState();

    const {modules,handleQuillChange}= useReactQuill(setRowNoteText,setNote,setWord_count)

    useEffect(() => {
        const {title,note } = userNote;

        setTitle(title);
        setRowNoteText(note);
        setNote(note);
    }, [userNote]);

    const handleSubmit= async (e)=>{
        e.preventDefault();

        if (word_count < 5) {
            toast.warning(
            `Please lenghten note to 3 or more word! (Currently has ${word_count} words)`
            )
            return;
        }
        const credentials={email:userNote.email,title,note}

        try {
            await secureAxios.put(`/updateNote/${_id}`,credentials)
            toast.success("Successfully updated this note!")
            refetch()
            // e.target.reset();
        } catch (error) {
            console.error("Failed to update this note!", error);
            toast.error(
            "Failed to update note!"
            );
        }

    }

    if (isError ) {
        console.error(error);
        throw error;
    }
    
    if (loading) {
    return <Loading />;
    }
    
    return (
        <section className="mt-16">
            <div className="container hero flex items-center justify-center">
                <div className="fromWrapper !space-y-8 max-w-lg">
                    <h1 className="text-5xl font-bold">Update this note!</h1>
                    <form onSubmit={handleSubmit} className="card-body p-0 space-y-4">

                        <div className="form-control">
                            {/* <label htmlFor="tilte" className="label">
                                <span className="">Note title</span>
                            </label> */}
                            <input
                                onChange={(e)=>setTitle(e.target.value)}
                                type="text"
                                placeholder="Write note title"
                                name="title"
                                id="title"
                                className="input input-ghost !border-custom-primary focus:outline-none input-bordered placeholder:text-custom-primary placeholder:text-[13px] placeholder:font-medium placeholder:italic"
                                value={title}
                                required
                            />
                        </div>

                        <div className="pb-16 lg:!pb-0">
                            <ReactQuill
                                onChange={handleQuillChange}
                                value={rowNoteText}
                                placeholder='Write your notes'
                                id="note" 
                                name="note"
                                modules={modules}
                                className='h-64 [&_.ql-toolbar.ql-snow]:!bg-custom-primary [&_.ql-toolbar.ql-snow]:!border-custom-primary [&_.ql-toolbar.ql-snow]:!rounded-t-lg [&_.ql-container.ql-snow]:!rounded-b-lg [&_.ql-container.ql-snow]:!border-custom-primary [&_.ql-editor.ql-blank::before]:!text-custom-primary'
                                theme="snow"
                            />
                        </div>

                        <div className="lg:!pt-14">
                            <button type="submit" className="primaryButton activePrimaryButton mx-auto">Update note</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default UpdateNote;