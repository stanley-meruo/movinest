import { MdOutlineArrowForwardIos, MdStar } from "react-icons/md";
import Button from "./Button";
import { Link } from "react-router-dom";
import { IoPlayForwardSharp } from "react-icons/io5";
import BookmarkButton from "./Auth/BookmarkButton";
import { motion } from "motion/react";

// Variants
const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const buttonVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: "easeOut" }, // comes after title+button
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.5, // wait for line before cards
      staggerChildren: 0.20,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};



const Section = ({ title, items, link = "/", parentPath, user }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="space-y-2 md:mb-8"
    >
      {/* Title + View All*/}
      <div className="flex items-center justify-between text-white gap-4 md:mb-2 lg:mb-4">
        <motion.h2
          className="text-lg font-bold font-montserrat uppercase md:text-xl xl:text-2xl"
          variants={titleVariants}
        >
          {title}
        </motion.h2>
        <motion.div variants={buttonVariants}>
          <Link
            to={link}
            className="flex items-center gap-1 hover:text-neutral-500"
          >
            <Button
              title="View All"
              className="text-sm font-montserrat font-medium md:text-base"
            />
            <MdOutlineArrowForwardIos className="text-xs" />
          </Link>
        </motion.div>
      </div>

      {/* Line */}
      <div className="relative md:mb-2 lg:mb-4">
        <div className="h-0.5 w-full bg-neutral-500 mt-2"></div>
        <motion.div
          className="absolute top-0 h-0.5 w-1/5 bg-red-500 origin-left"
          variants={lineVariants}
        ></motion.div>
      </div>

      {/* Section Card */}
      <motion.div
        className="flex gap-4 overflow-x-auto py-4 scrollbar-hide xmd:grid xmd:grid-cols-4 xmd:gap-6 lg:grid-cols-5"
        variants={containerVariants}
      >
        {items.map((item) => {
          const mediaType = item.media_type || (item.title ? "movie" : "tv");

          return (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="grid gap-2 relative"
            >
              <Link
                to={`${parentPath || ""}/${mediaType}/${item.id}`}
                key={item.id}
              >
                <div className="overflow-hidden transition duration-300 hover:scale-95 relative min-w-[150px] text-white font-montserrat">
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
                  <div className="p-1.5 md:p-2">
                    <p className="text-sm font-semibold text-center line-clamp-2 xl:text-base">
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
              <BookmarkButton
                user={user}
                media={{
                  id: item.id,
                  type: mediaType,
                  title: item.title || item.name,
                  poster_path: item.poster_path,
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Section;
