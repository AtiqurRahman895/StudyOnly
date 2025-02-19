import TitleSection from "../CommonComponent/TitleSection";
import AllTutorsSection from "./AllTutorsSection";
import HomeFAQsection from "./HomeFAQsection";
import HomeHeroSection from "./HomeHeroSection";
import HomeSessionsSection from "./HomeSessionsSection";

const Home = () => {
  return (
    <main className="space-y-14 mb-12">
      <TitleSection title={"Home"} />
      <HomeHeroSection />
      <HomeSessionsSection />
      <AllTutorsSection />
      <HomeFAQsection />
    </main>
  );
};

export default Home;
