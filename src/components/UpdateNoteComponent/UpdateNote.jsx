import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import useSecureAxios from "../../Hooks/useSecureAxios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../AuthenticationComponent/Loading";
import useGetNote from "../../Hooks/useGetNote";
import NoteInput from "../CreatNoteComponent/NoteInput";
import NoteTitleInput from "../CreatNoteComponent/NoteTitleInput";

const UpdateNote = () => {
    const {_id}= useParams()
    const secureAxios =useSecureAxios()
    const {loading,userNote,refetch,isError,error}= useGetNote(_id)
    const [rowNoteText, setRowNoteText] = useState("");
    const [title, setTitle] = useState("");
    const [note, setNote] = useState(false);
    const [word_count, setWord_count] = useState();


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
            `Please lenghten note to 5 or more word! (Currently has ${word_count} words)`
            )
            return;
        }
        const credentials={email:userNote.email,title,note}

        try {
            await secureAxios.put(`/updateNote/${_id}`,credentials)
            toast.success("Successfully updated this note!")
            refetch()
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
        <section className="">
            <div className="container hero flex items-center justify-center">
                <div className="fromWrapper !space-y-8 max-w-lg">
                    <h1 className="text-5xl font-bold">Update this note!</h1>
                    <form onSubmit={handleSubmit} className="card-body p-0 space-y-4">

                    <NoteTitleInput title={title} setTitle={setTitle}/>
                    <NoteInput rowNoteText={rowNoteText} setRowNoteText={setRowNoteText} setNote={setNote} setWord_count={setWord_count} />

                    <div className="lg:!pt-14">
                        <button type="submit" className="primaryButton activePrimaryButton !bg-white hover:!bg-custom-primary !border-white !text-custom-primary hover:!text-white mx-auto">
                            Update note
                        </button>
                    </div>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default UpdateNote;