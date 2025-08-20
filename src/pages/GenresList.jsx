import GenreList from "../components/GenreComponents/GenreList";
import SearchBar from "../components/SearchBar";


const GenresList = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-20">
        <SearchBar/>
        <GenreList />
      </main>
    </>
  );
};
export default GenresList;
