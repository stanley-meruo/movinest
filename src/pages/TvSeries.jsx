import SearchBar from "../components/SearchBar";
import TvSeriesPage from "../components/TvSeriesComponents/TvSeriesPage";



const TvSeries = () => {
  return (
    <>
      <main className="min-h-screen bg-neutral-800 pt-18 lg:pt-20 xl:pt-24">
        <SearchBar />
        <TvSeriesPage />
      </main>
    </>
  );
};
export default TvSeries;
