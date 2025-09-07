import { useEffect, useState } from "react";
import Card from "../Card";
import { FaSpinner } from "react-icons/fa6";
import { getTrendingMovies, getTrendingTV } from "../../services/trendingApi";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react";


const TrendingPage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 3000));
      const movies = await getTrendingMovies();
      const tv = await getTrendingTV();
      delay;
      setTrendingMovies(movies);
      setTrendingTV(tv);
      setLoading(false);
    };
    fetchData();
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
        {/* Trending Movies */}
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
              🔥 Trending Movies
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
            {trendingMovies.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </motion.div>
        </motion.div>

        {/* Trending Series */}
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
              🔥 Trending TV Series
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
            {trendingTV.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </motion.div>
        </motion.div>
      </div>
      <Outlet />
    </section>
  );
};

export default TrendingPage;
