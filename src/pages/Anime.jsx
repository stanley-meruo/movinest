import AnimePage from "../components/AnimeComponents/AnimePage";
import SearchBar from "../components/SearchBar";


const Anime = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-20">
        <SearchBar />
        <AnimePage />
      </main>
    </>
  );
};
export default Anime;
