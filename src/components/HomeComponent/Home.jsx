import { useContext } from "react";
import TitleSection from "../CommonComponent/TitleSection";
import { TransferLists } from "../../Contexts/TransferLists";

const Home = () => {
  const {role}=useContext(TransferLists)
  return (
    <main className="">
      <TitleSection title={"Home"} />
      <h1>you are {role}</h1>
    </main>
  );
};

export default Home;
