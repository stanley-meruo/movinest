import MoviePage from "../components/MovieComponents/MoviePage";
import SearchBar from "../components/SearchBar";


const Movies = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-18 lg:pt-20 xl:pt-24">
        <SearchBar />
        <MoviePage />
      </main>
    </>
  );
};
export default Movies;
