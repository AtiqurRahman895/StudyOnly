import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const useBannerHeightWidth = ({ BannerRef }) => {
    const [bannerSectionWidth, setBannerSectionWidth] = useState(0);
    const [bannerSectionHeight, setBannerSectionHeight] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        let counter=1

        const updateSectionHeightWidth = () => {
            if (BannerRef?.current) {
                setBannerSectionWidth(BannerRef.current.offsetWidth);
                setBannerSectionHeight(BannerRef.current.offsetHeight);
            }
        };

        // Initial update
        updateSectionHeightWidth();

        // Set up an interval to update dimensions
        const intervalId = setInterval(() => {
            updateSectionHeightWidth();
            counter++;
            if (counter >= 10) {
                // Stop the interval after 10 executions
                clearInterval(intervalId);
            }
            // console.log(counter)

        }, 1000);

        // Update screen width on resize
        const handleResize = () => {
            // counter=1
            setScreenWidth(window.innerWidth);
            updateSectionHeightWidth()
        };

        window.addEventListener("resize", handleResize);

        // Cleanup interval and event listener
        return () => {
            clearInterval(intervalId);
            window.removeEventListener("resize", handleResize);
        };
    }, [BannerRef]);

    return { screenWidth, bannerSectionWidth, bannerSectionHeight };
};

useBannerHeightWidth.propTypes = {
    BannerRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element),
    }).isRequired,
};

export default useBannerHeightWidth;
