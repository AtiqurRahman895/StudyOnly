import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import useSecureAxios from "../../Hooks/useSecureAxios";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import TitleSection from "../CommonComponent/TitleSection";
import NoteTitleInput from "./NoteTitleInput";
import NoteInput from "./NoteInput";

const CreatNote = () => {
  const { user } = useContext(AuthContext);
  const secureAxios = useSecureAxios();
  const [rowNoteText, setRowNoteText] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState(false);
  const [word_count, setWord_count] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(e.target)
    if (word_count < 5) {
      toast.warning(
        `Please lenghten note to 5 or more word! (Currently has ${word_count} words)`
      );
      return;
    }

    const credentials = { email: user.email, title, note };

    try {
      await secureAxios.post(`/addNote`, credentials);
      toast.success("Successfully added a note!");
      setTitle("");
      setRowNoteText("");
      setWord_count(0);
      setNote(false);
      // e.target.reset();
    } catch (error) {
      console.error("Failed to add note!", error);
      toast.error("Failed to add note!");
    }
  };

  return (
    <section className="">
      <TitleSection title={"Creat Note"} />
      <div className="container hero flex items-center justify-center">
        <div className="fromWrapper !space-y-8 max-w-lg">
          <h1 className="text-5xl font-bold">Write a note!</h1>
          <form onSubmit={handleSubmit} className="card-body p-0 space-y-4">

            <NoteTitleInput title={title} setTitle={setTitle}/>
            <NoteInput rowNoteText={rowNoteText} setRowNoteText={setRowNoteText} setNote={setNote} setWord_count={setWord_count} />

            <div className="lg:!pt-14">
              <button
                type="submit"
                className="primaryButton activePrimaryButton !bg-white hover:!bg-custom-primary !border-white !text-custom-primary hover:!text-white mx-auto"
              >
                Creat note
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default CreatNote;
