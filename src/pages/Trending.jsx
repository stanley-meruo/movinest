import SearchBar from "../components/SearchBar";
import TrendingPage from "../components/TrendingComponents/TrendingPage";



const Trending = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-20">
        <SearchBar />
        <TrendingPage />
      </main>
    </>
  );
};
export default Trending;
