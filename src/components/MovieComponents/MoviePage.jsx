import { useEffect, useState } from "react";
import Card from "../Card";
import { FaSpinner } from "react-icons/fa6";
import { getPopularMovie, getTopRatedMovie, getUpcomingMovie } from "../../services/moviesApi";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import SkeletonLoading from "../SkeletonLoading";


const MoviePage = () => {
  const [popularMovie, setPopularMovie] = useState([]);
  const [upcomingMovie, setUpcomingMovie] = useState([]);
   const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
  
    const fetchData = async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 3000));
      const popularMovie = await getPopularMovie();
      const upcomingMovie = await getUpcomingMovie();
      const topRatedMovie = await getTopRatedMovie();
      delay;
      setPopularMovie(popularMovie);
      setUpcomingMovie(upcomingMovie);
      setTopRatedMovie(topRatedMovie);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <SkeletonLoading/>;
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
    <section className="bg-neutral-800 py-12 px-5 xs:px-6 sm:px-8 md:px-10 lg:px-16 lg:py-16 xl:px-20 xxl:py-20 xxl:px-28">
      <div className="space-y-5 md:space-y-8 xmd:space-y-16">
        {/* Popular Movies */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className=""
        >
          <div className="text-white">
            {/* Title*/}
            <motion.h2
              className="text-lg font-bold font-montserrat uppercase md:text-xl xl:text-2xl"
              variants={titleVariants}
            >
              Popular Movies
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
          {/* Cards */}
          <motion.div
            variants={cardVariants}
            className="flex gap-4 overflow-x-auto py-4 scrollbar-hide xmd:grid xmd:grid-cols-4 xmd:gap-6 lg:grid-cols-5"
          >
            {popularMovie.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </motion.div>
        </motion.div>

        {/* Top Rated */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className=""
        >
          <div className="text-white">
            {/* Title*/}
            <motion.h2
              className="text-lg font-bold font-montserrat uppercase md:text-xl xl:text-2xl"
              variants={titleVariants}
            >
              ⭐ Top Rated
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
          {/* Cards */}
          <motion.div
            variants={cardVariants}
            className="flex gap-4 overflow-x-auto py-4 scrollbar-hide xmd:grid xmd:grid-cols-4 xmd:gap-6 lg:grid-cols-5"
          >
            {topRatedMovie.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </motion.div>
        </motion.div>

        {/* Upcoming Movies */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className=""
        >
          <div className="text-white">
            {/* Title*/}
            <motion.h2
              className="text-lg font-bold font-montserrat uppercase md:text-xl xl:text-2xl"
              variants={titleVariants}
            >
              Upcoming Movies
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
          {/* Cards */}
          <motion.div
            variants={cardVariants}
            className="flex gap-4 overflow-x-auto py-4 scrollbar-hide xmd:grid xmd:grid-cols-4 xmd:gap-6 lg:grid-cols-5"
          >
            {upcomingMovie.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </motion.div>
        </motion.div>
      </div>
      <Outlet />
    </section>
  );
};

export default MoviePage;