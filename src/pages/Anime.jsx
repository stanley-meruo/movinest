import AnimePage from "../components/AnimeComponents/AnimePage";
import SearchBar from "../components/SearchBar";


const Anime = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-18 lg:pt-20 xl:pt-24">
        <SearchBar />
        <AnimePage />
      </main>
    </>
  );
};
export default Anime;
