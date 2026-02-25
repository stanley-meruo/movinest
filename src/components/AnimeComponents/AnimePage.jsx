import { useEffect, useState } from "react";
import { getAnimeContent } from "../../services/animeApi";
import Card from "../Card";
import { FaSpinner } from "react-icons/fa6";
import Pagination from "../Pagination";
import { Outlet } from "react-router-dom";
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
   return <SkeletonLoading/>;
  }

  return (
    <section className="bg-neutral-800 py-12 px-5 xs:px-6 sm:px-8 md:px-10 lg:px-16 lg:py-16 xl:px-20 xxl:py-20 xxl:px-28">
      <div>
        <div className="flex items-center justify-between text-white gap-4 md:mb-2 lg:mb-4">
          <h2 className="text-xl font-bold font-montserrat uppercase md:text-2xl xl:text-3xl">
            Anime (TV & Movies)
          </h2>
        </div>
        <div className="relative mb-4 md:mb-6 lg:mb-8">
          <div className="h-0.5 w-full bg-neutral-500 mt-2"></div>
          <div className="absolute top-0 h-0.5 w-1/5 bg-red-500"></div>
        </div>

        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 gap-x-4 xmd:gap-x-6 lg:grid-cols-5">
            {anime.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
      <Outlet/>
    </section>
  );
};

export default AnimePage;
