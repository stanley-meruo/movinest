import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

const Search = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-18 lg:pt-20 xl:pt-24">
        <SearchBar />
        <SearchResults />
      </main>
    </>
  );
};
export default Search;
