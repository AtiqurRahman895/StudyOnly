import Masonry from "react-responsive-masonry";
import useGetSessionMaterials from "../../Hooks/useGetSessionMaterials";
import Loading from "../AuthenticationComponent/Loading";
import { useEffect, useState } from "react";
import useScreenWidth from "../../Hooks/useScreenWidth";
import NotFound from "../CommonComponent/NotFound";
import MaterialCard from "./MaterialCard";

const MaterialsSection = ({session_id}) => {
    const {loading,materials,refetch,isError,error}=useGetSessionMaterials(session_id)
    const screenWidth = useScreenWidth();
    const [columnsCount, setColumnsCount] = useState();
    
    useEffect(() => {
        if (screenWidth >= 1024) {
            setColumnsCount(3);
        } else if (screenWidth >= 640) {
            setColumnsCount(2);
        } else {
            setColumnsCount(1);
        }
    }, [screenWidth]);
    
    if (isError ) {
        console.error(error);
        // throw error;
    }
    return (
        <section className="">
            <div className="container space-y-10">
                <h3 className="text-custom-primary sectionHeaderWidth text-center">
                    Session Study materials
                </h3>
                {
                    (loading) ? (<Loading/>) :(
                        (materials?.length === 0)? (
                            <NotFound  NotFoundText={"Tutor has not added any materials yet!"}/>
                        ):
                        (
                            (materials.length<=3)?(
                                <div className="flex flex-wrap justify-center !gap-4 md:!gap-6 ">
                                    {materials.map((material, index) => (
                                        <div key={index} className="mb-5">
                                            <MaterialCard index={index} material={material} refetch={refetch} fixedWidh={true} />
                                        </div>
                                    ))}
                                </div>
                            )
                            :(
                                <Masonry columnsCount={columnsCount} gutter="20px">
                                    {materials.map((material, index) => (
                                        <div key={index} className="mb-8">
                                            <MaterialCard index={index} material={material} refetch={refetch} />
                                        </div>
                                    ))}
                                </Masonry>
                            )
                        )
                    )    
                }
            </div>
        </section>
    );
};

export default MaterialsSection;