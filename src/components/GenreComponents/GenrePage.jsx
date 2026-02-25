import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllGenres } from "../../../utilities/genreList";
import { getGenrePosters } from "../../../utilities/getGenrePosters";
import { FaSpinner } from "react-icons/fa";


const GenrePage = () => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 5000));
      const { movieGenres, tvGenres } = await getAllGenres();
      delay;
      setMovieGenres(movieGenres);
      setTvGenres(tvGenres);
      setLoading(false);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      const { movieGenres, tvGenres } = await getAllGenres();

      const [movieWithPosters, tvWithPosters] = await Promise.all([
        getGenrePosters(movieGenres, "movie"),
        getGenrePosters(tvGenres, "tv"),
      ]);

      setMovieGenres(movieWithPosters);
      setTvGenres(tvWithPosters);
      setLoading(false);
    };

    fetchGenres();
  }, []);

  if (loading) {
      return (
        <div className="flex justify-center items-center gap-4 h-screen bg-neutral-800">
          <FaSpinner className="size-8 animate-spin text-red-600 sm:size-10 lg:size-12" />
          <p className="font-semibold font-montserrat text-neutral-500 sm:text-lg lg:text-xl">
            Loading content...
          </p>
        </div>
      );
    }

  return (
    <section className="bg-neutral-800 py-12 px-5 xs:px-6 sm:px-8 md:px-10 lg:px-16 lg:py-16 xl:px-20 xxl:py-20 xxl:px-28">
      {/* Genre Movie */}
      <div className="space-y-16 font-montserrat">
        <div>
          <div className="flex items-center justify-between text-white gap-4 md:mb-2 lg:mb-4">
            <h2 className="text-lg font-bold font-montserrat uppercase md:text-xl xl:text-2xl">
              Movie By Genre
            </h2>
          </div>
          <div className="relative mb-4 md:mb-6 lg:mb-8">
            <div className="h-0.5 w-full bg-neutral-500 mt-2"></div>
            <div className="absolute top-0 h-0.5 w-1/5 bg-red-500"></div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-10 sm:grid-cols-3 xmd:grid-cols-4 xl:grid-cols-5">
            {movieGenres.map((genre) => (
              <Link
                to={`/genre/movie/${genre.id}?name=${encodeURIComponent(
                  genre.name
                )}`}
                key={genre.id}
              >
                <div className="relative group rounded-md overflow-hidden shadow-lg h-40 xs:h-44 sm:h-48 md:h-52 lg:h-64 xxl:h-68">
                  {genre.poster && (
                    <img
                      src={genre.poster}
                      alt={genre.name}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  <p className="absolute bottom-0 w-full text-center text-sm text-white font-semibold p-1.5 bg-black/70 xs:text-base xxl:text-lg">
                    {genre.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Genre TV Series*/}
        <div>
          <div className="flex items-center justify-between text-white gap-4 md:mb-2 lg:mb-4">
            <h2 className="text-lg font-bold font-montserrat uppercase md:text-xl xl:text-2xl">
              Series By Genre
            </h2>
          </div>
          <div className="relative mb-4 md:mb-6 lg:mb-8">
            <div className="h-0.5 w-full bg-neutral-500 mt-2"></div>
            <div className="absolute top-0 h-0.5 w-1/5 bg-red-500"></div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-10 sm:grid-cols-3 xmd:grid-cols-4 xl:grid-cols-5">
            {tvGenres.map((genre) => (
              <Link
                to={`/genre/tv/${genre.id}?name=${encodeURIComponent(
                  genre.name
                )}`}
                key={genre.id}
              >
                <div className="relative group rounded-md overflow-hidden shadow-lg h-40 xs:h-44 sm:h-48 md:h-52 lg:h-64 xxl:h-68">
                  {genre.poster && (
                    <img
                      src={genre.poster}
                      alt={genre.name}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  <p className="absolute bottom-0 w-full text-center text-sm text-white font-semibold p-1.5 bg-black/70 xs:text-base xxl:text-lg">
                    {genre.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenrePage;
