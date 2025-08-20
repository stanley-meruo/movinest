import SearchBar from "../components/SearchBar";
import TvSeriesPage from "../components/TvSeries/TvSeriesPage";

const TVSeries = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-20">
        <SearchBar />
        <TvSeriesPage />
      </main>
    </>
  );
};
export default TVSeries;
