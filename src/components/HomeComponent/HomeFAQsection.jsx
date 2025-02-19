import { useContext } from "react";
import { TransferLists } from "../../Contexts/TransferLists";
import { Link } from "react-router-dom";
import { MdDoubleArrow } from "react-icons/md";

const HomeFAQsection = () => {
    const {faqData}=useContext(TransferLists)
    
    return (
        <section className="">
            <div className="container space-y-12">
                <div className="sectionHeaderWidth text-center">
                    <h3 className="text-custom-primary">Frequently Asked Questions</h3>
                    <p>Common questions about our platform, tutoring sessions, payments, and more.</p>
                </div>

                <div className="space-y-4">
                {
                    faqData?.map((eachFAQdata,index)=>(
                        <div key={index} >
                            <div className="collapse collapse-plus bg-[rgba(131,124,133,.15)] text-black dark:text-white rounded-md p-2">
                                <input type="radio" name="faq" defaultChecked={index===0} />
                                <div className="collapse-title text-lg">{eachFAQdata.questions[0].question}</div>
                                <div className="collapse-content text-custom-primary font-bold">
                                    <p>{eachFAQdata.questions[0].answer}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>

                <div className="mt-2 flex justify-center">
                    <Link to={"/faq"} type="button" className="primaryButton activePrimaryButton flex items-center gap-[2px] hover:gap-[4px]" >
                        View More <MdDoubleArrow className="text-[18px]"/>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default HomeFAQsection;