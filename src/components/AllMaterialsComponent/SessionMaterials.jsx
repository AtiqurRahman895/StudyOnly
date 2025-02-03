import { useContext, useEffect, useState } from "react";
import useGetSessionMaterials from "../../Hooks/useGetSessionMaterials";
import Loading from "../AuthenticationComponent/Loading";
import useScreenWidth from "../../Hooks/useScreenWidth";
import Masonry from "react-responsive-masonry";
import MaterialCard from "../SessionComponent/MaterialCard";
import UploadMaterialModal from "../SessionComponent/UploadMaterialModal";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { TransferLists } from "../../Contexts/TransferLists";

const SessionMaterials = ({session,lastSession=false}) => {
    const {loading,materials,refetch,isError,error}=useGetSessionMaterials(session._id)
    const screenWidth = useScreenWidth();
    const { role } = useContext(TransferLists);
    const {user}=useContext(AuthContext)
    const [columnsCount, setColumnsCount] = useState();
    

    useEffect(() => {
        if (screenWidth >= 1280) {
            setColumnsCount(3);
        }else if (screenWidth >= 640) {
            setColumnsCount(2);
        } else {
            setColumnsCount(1);
        }

    }, [screenWidth]);

    if (isError ) {
        console.error(error);
    }

    if(loading){
        return <Loading/>
    }


    return(
        <div className={`space-y-10 ${lastSession||"border-b pb-8 mb-8"}`}>
            <div className="space-y-3">
                <h3 className="text-custom-primary">
                    {session.title}
                </h3>
                
                <p>{session.session_description}</p>

                <div className="flex flex-wrap gap-4">
                    <p className="text-white">
                        <b className="text-custom-primary">Status: </b>
                        {session.status}
                    </p>
                    <p className="text-white">
                        <b className="text-custom-primary">Total materials: </b>
                        {materials.length}
                    </p>
                </div>

                <section className={`flex flex-wrap gap-4`}>
                    {
                        (role==="tutor" && session.tutor_email===user?.email) &&(
                            <UploadMaterialModal session_id={session._id} tutor_email={session.tutor_email} />
                        ) 
                    }
                    <Link to={`/dashboard/session/${session._id}`} className="primaryButton activePrimaryButton min-w-32 !py-2.5 ">View Details</Link>
                </section>

            </div>

            {
                (materials.length !== 0)&&(
                    <Masonry columnsCount={columnsCount} gutter="24px">
                        {materials.map((material, index) => (
                            <div key={index} className="mb-8">
                                <MaterialCard index={index} material={material} refetch={refetch} />
                            </div>
                        ))}
                    </Masonry>
                )
            }
            
        </div>
    )
    
};

export default SessionMaterials;