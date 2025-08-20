import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

const Search = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-20">
        <SearchBar />
        <SearchResults />
      </main>
    </>
  );
};
export default Search;
