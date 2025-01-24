import TitleSection from "../CommonComponent/TitleSection";
import AllMaterialsForAdminAndTutor from "./AllMaterialsForAdminAndTutor";
import AllMaterialsForStudent from "./AllMaterialsForStudent";

const AllMaterials = () => {
    const role=localStorage.getItem("role")

    return (
        <main className="mt-8">
            <TitleSection title={"All materials"} />

            {
                (role==="student")?(
                    <AllMaterialsForStudent />
                ):(
                    <AllMaterialsForAdminAndTutor />
                )
            }

        </main>

    )
};

export default AllMaterials;