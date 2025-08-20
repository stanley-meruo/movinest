import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
import { getLatestMovies } from "../../services/tmdb";
import Button from "../Button";
import { MdOutlineArrowForwardIos, MdStar } from "react-icons/md";
import { Link } from "react-router-dom";

const HeroSection = ({ parentPath }) => {
  const [movies, setMovies] = useState([]);

  const mediaType = movies.media_type || "movie";

  useEffect(() => {
    const fetch = async () => {
      const latest = await getLatestMovies();
      setMovies(latest.slice(0, 5)); // show top 5 latest
    };
    fetch();
  }, []);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000 }}
        navigation
        loop
        className="h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="size-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
              <div className="absolute grid bottom-10 px-5 xs:px-6 sm:pl-8 md:pl-10 lg:pl-16 xl:pl-20 xxl:pl-28 xs:max-w-xl text-white z-10 md:max-w-2xl xl:max-w-3xl">
                <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-[52px]">
                  {movie.title}
                </h2>
                <p className="text-sm mt-2 [text-shadow:_0px_2px_2px_rgb(0_0_0_/_0.8)] shadow-black line-clamp-3 w-62 xs:w-86 md:text-base md:w-[480px] xmd:w-full lg:line-clamp-4 lg:mt-4 xl:text-lg">
                  {movie.overview}
                </p>
                <Link
                  to={`${parentPath || ""}/${mediaType}/${movie.id}`}
                  key={movie.id}
                  className="flex items-center gap-1 px-3 py-2 mt-4 bg-red-600 text-white font-semibold rounded-md mr-auto md:mt-8 lg:px-8 lg:py-4"
                >
                  <Button
                    title="View Details"
                    className="text-sm cursor-pointer md:text-base lg:text-lg"
                  />
                  <MdOutlineArrowForwardIos className="mt-0.5" />
                </Link>
              </div>
              <p className="grid absolute bottom-10 right-5 p-1.5 bg-transparent backdrop-blur-xs border border-neutral-400 text-white rounded md:p-2 xs:right-6 sm:right-8 md:right-10 lg:right-16 xl:right-20 xxl:right-28 ">
                <MdStar className="text-4xl text-orange-400 mx-auto sm:text-5xl md:text-6xl" />
                <span className="mx-auto sm:text-lg md:text-xl">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
