import { MdOutlineArrowForwardIos, MdStar } from "react-icons/md";
import Button from "./Button";
import { Link } from "react-router-dom";
import { IoPlayForwardSharp } from "react-icons/io5";



const Section = ({ title, items, link = "/", parentPath }) => {
  return (
    <div>
      <div className="flex items-center justify-between text-white gap-4 md:mb-2 lg:mb-4">
        <h2 className="text-xl font-bold uppercase md:text-2xl xl:text-3xl">
          {title}
        </h2>
        <Link to={link} className="flex items-center gap-1">
          <Button title="View All" className="text-sm md:text-base" />
          <MdOutlineArrowForwardIos className="text-xs" />
        </Link>
      </div>
      <div className="relative md:mb-2 lg:mb-4">
        <div className="h-0.5 w-full bg-neutral-500 mt-2"></div>
        <div className="absolute top-0 h-0.5 w-1/5 bg-red-500"></div>
      </div>

      <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide xmd:grid xmd:grid-cols-4 xmd:gap-6 lg:grid-cols-5">
        {items.map((item) => {
          const mediaType = item.media_type || (item.title ? "movie" : "tv");

          return (
            <div key={item.id} className="grid gap-2 relative">
              <Link
                to={`${parentPath || ""}/${mediaType}/${item.id}`}
                key={item.id}
              >
                <div className="overflow-hidden transition duration-300 hover:scale-95 relative min-w-[150px] text-white">
                  <img
                    src={
                      item.poster_path || item.backdrop_path
                        ? `https://image.tmdb.org/t/p/w300${
                            item.poster_path || item.backdrop_path
                          }`
                        : "/no-image.jpg"
                    }
                    alt={item.title || item.name}
                    className="rounded-md w-full object-cover"
                  />
                  <div className="space-y-1 p-1.5 md:p-2">
                    <p className="text-sm font-semibold text-center  line-clamp-2 xl:text-base">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Section;
