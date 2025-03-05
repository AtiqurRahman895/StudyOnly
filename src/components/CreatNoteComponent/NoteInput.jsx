import ReactQuill from "react-quill";
import useReactQuill from "../../Hooks/useReactQuill";

const NoteInput = ({rowNoteText, setRowNoteText, setNote, setWord_count}) => {

    const { modules, handleQuillChange } = useReactQuill(
        setRowNoteText,
        setNote,
        setWord_count
    );

    return (
        <div className="pb-16 lg:!pb-0">
            <ReactQuill
            onChange={handleQuillChange}
            value={rowNoteText}
            placeholder="Write your notes"
            id="note"
            name="note"
            modules={modules}
            className="h-64 [&_.ql-toolbar.ql-snow]:!bg-white [&_.ql-toolbar.ql-snow]:!border-white [&_.ql-toolbar.ql-snow]:!rounded-t-lg [&_.ql-container.ql-snow]:!rounded-b-lg [&_.ql-container.ql-snow]:!border-white [&_.ql-editor.ql-blank::before]:!text-white"
            theme="snow"
            />
        </div>
    );
};

export default NoteInput;