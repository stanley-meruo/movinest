import SearchBar from "../components/SearchBar";
import TrendingPage from "../components/TrendingComponents/TrendingPage";



const Trending = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-18 lg:pt-20 xl:pt-24">
        <SearchBar />
        <TrendingPage />
      </main>
    </>
  );
};
export default Trending;
