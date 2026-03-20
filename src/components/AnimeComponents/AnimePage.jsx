import { useEffect, useState } from "react";
import { getAnimeContent } from "../../services/animeApi";
import Card from "../Card";
import Pagination from "../Pagination";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import SkeletonLoading from "../SkeletonLoading";


const AnimePage = () => {
  const [anime, setAnime] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnimeContent(page);
      setAnime(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    };
    fetchData();
  }, [anime, page]);

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
      {/* Anime TV & Movies */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={containerVariants}
      >
        <div className="text-white">
          {/* Title */}
          <motion.h2
            variants={titleVariants}
            className="text-xl font-bold font-montserrat uppercase md:text-xl xl:text-2xl"
          >
            Anime (TV & Movies)
          </motion.h2>
          {/* Line */}
          <div className="relative mb-4 md:mb-6 lg:mb-8">
            <div className="h-0.5 w-full bg-neutral-500 mt-2"></div>
            <motion.div
              variants={lineVariants}
              className="absolute top-0 h-0.5 w-1/5 bg-red-500 origin-left"
            ></motion.div>
          </div>
        </div>

        <div>
          {/* Card */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 gap-x-4 xmd:gap-x-6 lg:grid-cols-5"
          >
            {anime.map((item) => (
              <motion.div key={item.id} variants={cardVariants}>
                <Card item={item} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </motion.div>
      <Outlet />
    </section>
  );
};;

export default AnimePage;
