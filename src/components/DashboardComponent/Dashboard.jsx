import TitleSection from "../CommonComponent/TitleSection";
import useGetUserRole from "../../Hooks/useGetUserRole";

const Dashboard = () => {
  const {role}=useGetUserRole()
  return (
    <main className="">
      <TitleSection title={"Dashboard"} />
      <h1>you are {role}</h1>
    </main>
  );
};

export default Dashboard;
