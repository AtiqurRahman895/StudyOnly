import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

const ContactSection = () => {
    const contactInfoList=[
        {
            text: "Call us",
            link:"tel:+8801400447787",
            svg: "./bannerSvg/Phone.svg",
            info:"01400447787",
        },
        {
            text: "Drop an email",
            link:"mailto:studyOnly@gmail.com",
            svg: "./bannerSvg/Email.svg",
            info:"studyOnly@gmail.com",
        },
        {
            text: "Our Location",
            link:"http://maps.apple.com/?q=av.+Washington+165,+NY+CA+54003",
            svg: "./bannerSvg/Location.svg",
            info:"D-44 Dhamrai, Dhaka",
        },
    ]
    return (
        <section className="mb-12">
            <div className="container space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {
                    contactInfoList?.map((contactInfo,index)=>(
                        <Link key={index} to={contactInfo.link} target={index!==0?"_blank":""}
                            className="relative bg-custom-metalic-gray text-black dark:text-white rounded-md px-4 py-10 flex items-center gap-4 overflow-hidden"
                        >
                           
                           <ReactSVG src={contactInfo.svg} className='w-16 text-custom-primary mb-2'/>
                           <div className="">
                                <h4>{contactInfo.text}</h4>
                                <p>{contactInfo.info}</p>
                           </div>
                           <ReactSVG src={contactInfo.svg} className='absolute -right-0.5 -bottom-0.5 opacity-20 w-12'/>

                        </Link>
                    ))
                }
                </div>
            </div>
        </section>
    );
};

export default ContactSection;