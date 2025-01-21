import { FaDownload } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const ImageDownloadButton = ({imgUrl}) => {
    return (
        <>
            <a
                href={imgUrl}
                className={`downloadImage primaryButton2 activePrimaryButton2 p-1.5 !w-fit`}
                download={"study-material-image.jpg"}
                target="_blank"
            >
                <FaDownload className={`text-lg`} />
            </a>
            <Tooltip
                anchorSelect=".downloadImage"
                className="!bg-custom-primary"
            >
                Download image
            </Tooltip>
        </>
    );
};

export default ImageDownloadButton;