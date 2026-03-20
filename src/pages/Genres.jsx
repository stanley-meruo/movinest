import GenrePage from "../components/GenreComponents/GenrePage";
import SearchBar from "../components/SearchBar";

const Genres = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-18 lg:pt-20 xl:pt-24">
        <SearchBar />
        <GenrePage />
      </main>
    </>
  );
};
export default Genres;
