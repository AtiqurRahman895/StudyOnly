import { FaDownload } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import useModifyCloudinaryUrl from "../../Hooks/useModifyMaterialImage";

const ImageDownloadButton = ({imgUrl}) => {
    const imageUrl=useModifyCloudinaryUrl(imgUrl)
    return (
        <>
            <a
                href={imageUrl}
                className={`downloadImage primaryButton2 activePrimaryButton2 p-1.5 !w-fit`}
                download={"study-material-image.jpg"}
                // target="_blank"
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