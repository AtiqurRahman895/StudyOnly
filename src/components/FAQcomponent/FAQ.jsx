import { useContext } from "react";
import CommonHeroSection from "../CommonComponent/CommonHeroSection";
import TitleSection from "../CommonComponent/TitleSection";
import { TransferLists } from "../../Contexts/TransferLists";

const FAQ = () => {
    const {faqData}=useContext(TransferLists)
            
    return (
        <main className="space-y-14 mb-12">

            <TitleSection title={"FAQ"} />
            <CommonHeroSection title={"FAQ"} subtext={"Find answers to common questions about StudyOnly, including tutoring, payments, and more. Need help? Contact us!"}/>

            <section className="">
                <div className="container space-y-12">
                    {
                        faqData?.map((eachFAQdata,index)=>(
                            <div key={index} className="space-y-12">
                                <div className="text-center">
                                    <h3 className="text-custom-primary">{eachFAQdata.category}</h3>
                                </div>
                                
                                <div className="space-y-4">
                                    {
                                        eachFAQdata.questions.map((questionData,index)=>(
                                            <div key={index} className="collapse collapse-plus bg-[rgba(131,124,133,.15)] text-black dark:text-white rounded-md p-2">
                                                <input type="radio" name={eachFAQdata.category} defaultChecked={index===0} />
                                                <div className="collapse-title text-lg">{questionData.question}</div>
                                                <div className="collapse-content text-custom-primary font-bold">
                                                    <p>{questionData.answer}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }

                </div>
            </section>

        </main>
    );
};

export default FAQ;