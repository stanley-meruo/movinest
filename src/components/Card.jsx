import { IoPlayForwardSharp } from "react-icons/io5";
import { MdStar } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import BookmarkButton from "./Auth/BookmarkButton";

const Card = ({ item, user }) => {
  const isMovie = item?.media_type === "movie" || item?.title;
  const mediaType = isMovie ? "movie" : "tv";

  const location = useLocation();
  const basePath = location.pathname.split("/")[1];
  const link = `/${basePath}/${isMovie ? "movie" : "tv"}/${item.id}`;
  const poster = item.poster_path
    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
    : "/no-image.jpg";
   

  return (
    <section className="relative">
      <Link to={link}>
        <div className="overflow-hidden transition duration-300 hover:scale-95 relative min-w-[140px] text-white">
          <img
            src={poster}
            alt={item.title || item.name}
            className="rounded-md w-full object-cover"
          />
          <div className="space-y-1 p-1.5 md:p-2 font-montserrat">
            <p className="text-[13px] font-semibold text-center line-clamp-2 xl:text-sm">
              {item.title || item.name}{" "}
              <span>
                (
                {(item.release_date || item.first_air_date || "").split(
                  "-"
                )[0] || "N/A"}
                )
              </span>
            </p>
            {item.last_episode_to_air && (
              <p className="text-[11px] text-orange-400 flex gap-1 items-center justify-center xl:text-xs">
                <IoPlayForwardSharp />S{item.last_episode_to_air.season_number}{" "}
                E{item.last_episode_to_air.episode_number} (complete)
              </p>
            )}
            <p className="absolute top-0 right-0 p-1 bg-black rounded-tr-md grid gap-1">
              <MdStar className="text-lg text-orange-400 xl:text-xl" />
              <span className="mx-auto text-[10px] xmd:text-xs xl:text-sm">
                {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
              </span>
            </p>
          </div>
        </div>
      </Link>
      <BookmarkButton
        user={user}
        media={{
          id: item.id,
          type: mediaType,
          title: item.title || item.name,
          poster_path: item.poster_path,
        }}
      />
    </section>
  );
};

export default Card;
