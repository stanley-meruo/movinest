import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { MdStar } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";
import { getGenreMap } from "../../utilities/genreMap";


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [genreMap, setGenreMap] = useState({});

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    setQuery(q);

    if (!q) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/search/multi?query=${q}&api_key=${API_KEY}`
        );
        const data = await res.json();
        const results = data.results || [];

        // Separate media types
        setMovies(results.filter((item) => item.media_type === "movie"));
        setTvShows(results.filter((item) => item.media_type === "tv"));
      } catch (error) {
        console.error("Fetch failed:", error);
        setMovies([]);
        setTvShows([]);
      } finally {
        setLoading(false);
      } 

      const loadGenres = async () => {
        const map = await getGenreMap();
        setGenreMap(map);
      };

      loadGenres();
    };

    fetchResults();
  }, [location.search]);

  const getGenreNames = (ids = []) =>
    ids
      .map((id) => genreMap[id])
      .filter(Boolean)
      .join(", ");


  const renderCard = (item) => (
    <Link
      to={`/search/${
        item.media_type === "movie"
          ? "movie"
          : item.media_type === "tv"
          ? "tv"
          : ""
      }/${item.id}`}
      key={item.id}
    >
      <div className="relative min-w-[150px] text-white aspect-[2/3] hover:scale-95 transition-all duration-300">
        <img
          src={
            item.poster_path || item.profile_path || item.backdrop_path
              ? `https://image.tmdb.org/t/p/w300${
                  item.poster_path || item.profile_path || item.backdrop_path
                }`
              : "/no-image.jpg"
          }
          alt={item.title || item.name}
          className="rounded-md w-full h-full object-cover"
        />
        <div className="p-3 space-y-1">
          <p className="text-sm font-semibold text-center line-clamp-3 xl:text-base">
            {item.title || item.name}
            {item.release_date || item.first_air_date ? (
              <span>
                {" "}
                (
                {(item.release_date || item.first_air_date).split("-")[0] ||
                  "N/A"}
                )
              </span>
            ) : null}
          </p>
          {item.genre_ids?.length > 0 && (
            <p className="text-xs text-neutral-400 text-center">
              [ {getGenreNames(item.genre_ids)} ]
            </p>
          )}

          {item.vote_average && (
            <p className="absolute top-0 right-0 p-1.5 bg-black text-xs rounded-tr-md">
              <MdStar className="text-lg text-orange-400" />
              <span>{item.vote_average.toFixed(1)}</span>
            </p>
          )}

          <p className="capitalize border border-neutral-500 rounded-md absolute top-2 left-2 p-1.5 bg-neutral-900 text-xs">
            {item.media_type}
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="min-h-screen bg-neutral-800 text-white py-12 px-5 xs:px-6 sm:px-8 md:px-10 sm:py-14 lg:px-16 lg:py-20 xl:px-20 xxl:px-28">
      <div className="mb-6 lg:mb-10">
        <h1 className="text-xl font-bold sm:text-2xl md:text-[28px] lg:text-[32px] xxl:text-4xl">
          Results for "{query}"
        </h1>
        <div className="relative my-2 xs:my-3 md:my-4 lg:my-6">
          <div className="h-0.5 w-full bg-neutral-500"></div>
          <div className="absolute top-0 h-0.5 w-1/5 bg-red-500"></div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center gap-4 h-screen bg-neutral-800">
          <FaSpinner className="size-8 animate-spin text-red-600 sm:size-10 lg:size-12" />
          <p className="font-semibold text-neutral-500 sm:text-lg lg:text-xl">
            Loading content...
          </p>
        </div>
      ) : movies.length + tvShows.length === 0 ? (
        <p className="text-neutral-500">No results found.</p>
      ) : (
        <div className="space-y-12">
          {movies.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 md:text-2xl xl:text-3xl">
                🎬 Movies
              </h2>
              <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {movies.map(renderCard)}
              </div>
            </div>
          )}

          {tvShows.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 md:text-2xl xl:text-3xl">
                📺 TV Series
              </h2>
              <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {tvShows.map(renderCard)}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SearchResults;

