import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { IoPlayForwardSharp } from "react-icons/io5";
import { MdStar } from "react-icons/md";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
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
          `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`,
        );
        const data = await res.json();

        if (type === "tv") {
          // Fetch extra details for each TV item
          const detailedItems = await Promise.all(
            data.results.map(async (item) => {
              const res = await fetch(
                `${BASE_URL}/tv/${item.id}?api_key=${API_KEY}`,
              );
              const fullDetails = await res.json();
              return { ...item, ...fullDetails };
            }),
          );
          setItems(detailedItems);
        } else {
          setItems(data.results);
        }

        setTotalPages(data.total_pages);

        //scroll to top after data loads
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  // Variants
  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: "easeOut" }, // comes after title
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.5, // wait for line before cards
        staggerChildren: 0.2,
      },
    },
  };


  return (
    <section className="bg-neutral-800 py-12 px-4 xs:px-6 sm:px-8 md:px-10 lg:px-16 lg:py-16 xl:px-20 xxl:py-20 xxl:px-28">
      {/* Genre List */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={containerVariants}
        className="font-montserrat"
      >
        <div className="text-white">
          {/* Title*/}
          <motion.h2
            variants={titleVariants}
            className="text-lg font-bold font-montserrat uppercase md:text-xl xl:text-2xl"
          >
            {genreName
              ? `${genreName} ${type === "movie" ? "Movies" : "TV Shows"}`
              : "Genre Results"}
          </motion.h2>
          {/* Line*/}
          <div className="relative mb-4 md:mb-6 lg:mb-8">
            <div className="h-0.5 w-full bg-neutral-500 mt-2"></div>
            <motion.div
              className="absolute top-0 h-0.5 w-1/5 bg-red-500 origin-left"
              variants={lineVariants}
            ></motion.div>
          </div>
        </div>

        <div>
          {/* Card */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 gap-x-4 xmd:gap-x-6 lg:grid-cols-5"
          >
            {items.map((item) => (
              <motion.div
                variants={cardVariants}
                key={item.id}
                className="grid gap-2 relative"
              >
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
                      <p className="text-[13px] font-semibold text-center  line-clamp-2 xl:text-sm">
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
                        <p className="text-[11px] text-orange-400 flex gap-1 items-center justify-center xl:text-xs">
                          <IoPlayForwardSharp />S
                          {item.last_episode_to_air.season_number} E
                          {item.last_episode_to_air.episode_number} (complete)
                        </p>
                      )}
                      <p className="absolute top-0 right-0 p-1 bg-black rounded-tr-md grid gap-1">
                        <MdStar className="text-lg text-orange-400 xl:text-xl" />
                        <span className="mx-auto text-[10px] xmd:text-xs xl:text-sm">
                          {item.vote_average
                            ? item.vote_average.toFixed(1)
                            : "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Bookmark */}
                <BookmarkButton
                  user={user}
                  media={{
                    id: item.id,
                    type: type,
                    title: item.title || item.name,
                    poster_path: item.poster_path,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </motion.div>
    </section>
  );
};;

export default GenresList;
