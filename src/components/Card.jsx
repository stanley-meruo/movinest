import { IoPlayForwardSharp } from "react-icons/io5";
import { MdStar } from "react-icons/md";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const isMovie = item?.media_type === "movie" || item?.title;
  const basePath = location.pathname.split("/")[1];
  const link = `/${basePath}/${isMovie ? "movie" : "tv"}/${item.id}`;
  const poster = item.poster_path
    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
    : "/no-image.jpg";
   

  return (
    <Link to={link}>
      <div className="overflow-hidden transition duration-300 hover:scale-95 relative min-w-[150px] text-white">
        <img
          src={poster}
          alt={item.title || item.name}
          className="rounded-md w-full object-cover"
        />
        <div className="space-y-1 p-1.5 md:p-2">
          <p className="text-sm font-semibold text-center  line-clamp-2 xl:text-base">
            {item.title || item.name}{" "}
            <span>
              (
              {(item.release_date || item.first_air_date || "").split("-")[0] ||
                "N/A"}
              )
            </span>
          </p>
          {item.last_episode_to_air && (
            <p className="text-xs text-orange-400 flex gap-1 items-center justify-center xl:text-sm">
              <IoPlayForwardSharp />S{item.last_episode_to_air.season_number} E
              {item.last_episode_to_air.episode_number} (complete)
            </p>
          )}
          <p className="absolute top-0 right-0 p-1.5 bg-black text-xs rounded-tr-md">
            <MdStar className="text-lg text-orange-400 xl:text-xl" />
            <span className="xl:text-sm">
              {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
