import HeroSection from "../components/HomeComponents/HeroSection";
import HomePage from "../components/HomeComponents/HomePage";
import Search from "../components/SearchBar";

const Home = () => {
  return (
    <>
      <HeroSection parentPath="/movies" />
      <Search />
      <HomePage />
    </>
  );
};
export default Home;
