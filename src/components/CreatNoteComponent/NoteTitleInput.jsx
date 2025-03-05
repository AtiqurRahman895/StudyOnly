
const NoteTitleInput = ({title,setTitle}) => {
    return (
        <div className="form-control">
            <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Write note title"
            name="title"
            id="title"
            className="input input-ghost !border-white focus:outline-none input-bordered placeholder:text-white placeholder:text-[13px] placeholder:font-medium placeholder:italic"
            value={title}
            required
            />
        </div>
    );
};

export default NoteTitleInput;