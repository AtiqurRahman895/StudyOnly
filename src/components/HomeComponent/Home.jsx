import TitleSection from "../CommonComponent/TitleSection";
import useGetUserRole from "../../Hooks/useGetUserRole";

const Home = () => {
  const { role } = useGetUserRole();
  return (
    <main className="">
      <TitleSection title={"Home"} />
      <h1>you are {role}</h1>
    </main>
  );
};

export default Home;
