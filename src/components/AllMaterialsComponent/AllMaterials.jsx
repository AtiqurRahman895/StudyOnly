import { useContext } from "react";
import TitleSection from "../CommonComponent/TitleSection";
import AllMaterialsForAdminAndTutor from "./AllMaterialsForAdminAndTutor";
import AllMaterialsForStudent from "./AllMaterialsForStudent";
import { TransferLists } from "../../Contexts/TransferLists";

const AllMaterials = () => {
  const { role } = useContext(TransferLists);

  return (
    <main className=" mt-8">
      <TitleSection title={"All materials"} />

      {role === "student" ? (
        <AllMaterialsForStudent />
      ) : (
        <AllMaterialsForAdminAndTutor />
      )}
    </main>
  );
};

export default AllMaterials;
