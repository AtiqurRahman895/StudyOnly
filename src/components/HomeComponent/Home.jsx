import TitleSection from "../CommonComponent/TitleSection";
// import AllTutorsSection from "./AllTutorsSection";
import HomeHeroSection from "./HomeHeroSection";
// import HomeSessionsSection from "./HomeSessionsSection";

const Home = () => {
  return (
    <main className="space-y-14">
      <TitleSection title={"Home"} />
      <HomeHeroSection />
      {/* <HomeSessionsSection />
      <AllTutorsSection /> */}
    </main>
  );
};

export default Home;
