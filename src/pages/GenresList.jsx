import GenreList from "../components/GenreComponents/GenreList";
import SearchBar from "../components/SearchBar";


const GenresList = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-18 lg:pt-20 xl:pt-24">
        <SearchBar />
        <GenreList />
      </main>
    </>
  );
};
export default GenresList;
