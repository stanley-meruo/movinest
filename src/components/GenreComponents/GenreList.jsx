import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { IoPlayForwardSharp } from "react-icons/io5";
import { MdStar } from "react-icons/md";
import { useParams, Link, useLocation } from "react-router-dom";
import Pagination from "../Pagination";
import BookmarkButton from "../Auth/BookmarkButton";
import SkeletonLoading from "../SkeletonLoading";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;


const GenresList = ({ user }) => {
  const { type, genreId } = useParams();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const genreName = query.get("name");

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
        );
        const data = await res.json();
        
        if (type === "tv") {
          // Fetch extra details for each TV item
          const detailedItems = await Promise.all(
            data.results.map(async (item) => {
              const res = await fetch(
                `${BASE_URL}/tv/${item.id}?api_key=${API_KEY}`
              );
              const fullDetails = await res.json();
              return { ...item, ...fullDetails };
            })
          );
          setItems(detailedItems);
        } else {
          setItems(data.results);
        }

        setTotalPages(data.total_pages);
        
        //scroll to top after data loads
        window.scrollTo({ top: 0, behavior: "smooth"});

      } catch (err) {
        console.error("Failed to fetch genre items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [type, genreId, page]);


  if (loading) {
    return <SkeletonLoading />;
  }

  
  return (
    <section className="bg-neutral-800 py-12 px-5 xs:px-6 sm:px-8 md:px-10 lg:px-16 lg:py-16 xl:px-20 xxl:py-20 xxl:px-28">
      {/* Genre List */}
      <div className="font-montserrat">
        <div className="flex items-center justify-between text-white gap-4 md:mb-2 lg:mb-4">
          <h2 className="text-lg font-bold font-montserrat uppercase md:text-xl xl:text-2xl">
            {genreName
              ? `${genreName} ${type === "movie" ? "Movies" : "TV Shows"}`
              : "Genre Results"}
          </h2>
        </div>
        <div className="relative mb-4 md:mb-6 lg:mb-8">
          <div className="h-0.5 w-full bg-neutral-500 mt-2"></div>
          <div className="absolute top-0 h-0.5 w-1/5 bg-red-500"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center gap-4 h-screen">
            <FaSpinner className="size-8 animate-spin text-red-600 sm:size-10 lg:size-12" />
            <p className="font-semibold font-montserrat text-neutral-500 sm:text-lg lg:text-xl">
              Loading content...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 gap-x-4 xmd:gap-x-6 lg:grid-cols-5">
              {items.map((item) => (
                <div key={item.id} className="grid gap-2 relative">
                  <Link
                    to={`/${
                      type === "movie" ? "movies" : "tv-series"
                    }/${type}/${item.id}`}
                    key={item.id}
                  >
                    <div className="overflow-hidden transition duration-300 hover:scale-95 relative min-w-[150px] text-white">
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                            : "/no-image.jpg"
                        }
                        alt={item.title || item.name}
                        className="w-full object-cover rounded-md"
                      />
                      <div className="space-y-1 p-1.5 md:p-2">
                        <p className="text-sm font-semibold text-center  line-clamp-2 xl:text-base">
                          {item.title || item.name}{" "}
                          <span>
                            (
                            {(
                              item.release_date ||
                              item.first_air_date ||
                              ""
                            ).split("-")[0] || "N/A"}
                            )
                          </span>
                        </p>
                        {item.last_episode_to_air && (
                          <p className="text-xs text-orange-400 flex gap-1 items-center justify-center xl:text-sm">
                            <IoPlayForwardSharp />S
                            {item.last_episode_to_air.season_number} E
                            {item.last_episode_to_air.episode_number} (complete)
                          </p>
                        )}
                        <p className="absolute top-0 right-0 p-1.5 bg-black text-xs rounded-tr-md">
                          <MdStar className="text-lg text-orange-400 xl:text-xl" />
                          <span className="xl:text-sm">
                            {item.vote_average
                              ? item.vote_average.toFixed(1)
                              : "N/A"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                  <BookmarkButton
                    user={user}
                    media={{
                      id: item.id,
                      type: type,
                      title: item.title || item.name,
                      poster_path: item.poster_path,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </>
        )}
      </div>
    </section>
  );
};

export default GenresList;
