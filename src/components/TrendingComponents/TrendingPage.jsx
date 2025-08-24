import { useEffect, useState } from "react";
import Card from "../Card";
import { FaSpinner } from "react-icons/fa6";
import { getTrendingMovies, getTrendingTV } from "../../services/trendingApi";
import { Outlet } from "react-router-dom";


const TrendingPage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [loading, setLoading] = useState(true)
  

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


  return (
    <section className="bg-neutral-800 py-12 px-5 xs:px-6 sm:px-8 md:px-10 lg:px-16 lg:py-16 xl:px-20 xxl:py-20 xxl:px-28">
      <div className="space-y-5 md:space-y-8 xmd:space-y-16">
        <div className="">
          <div className="flex items-center justify-between text-white gap-4 md:mb-2 lg:mb-4">
            <h2 className="text-xl font-bold font-montserrat uppercase md:text-2xl xl:text-3xl">
              🔥 Trending Movies
            </h2>
          </div>
          <div className="relative mb-4 md:mb-6 lg:mb-8">
            <div className="h-0.5 w-full bg-neutral-500 mt-2"></div>
            <div className="absolute top-0 h-0.5 w-1/5 bg-red-500"></div>
          </div>
          <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide xmd:grid xmd:grid-cols-4 xmd:gap-6 lg:grid-cols-5">
            {trendingMovies.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="">
          <div className="flex items-center justify-between text-white gap-4 md:mb-2 lg:mb-4">
            <h2 className="text-xl font-bold font-montserrat uppercase md:text-2xl xl:text-3xl">
              🔥 Trending TV Series
            </h2>
          </div>
          <div className="relative mb-4 md:mb-6 lg:mb-8">
            <div className="h-0.5 w-full bg-neutral-500 mt-2"></div>
            <div className="absolute top-0 h-0.5 w-1/5 bg-red-500"></div>
          </div>
          <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide xmd:grid xmd:grid-cols-4 xmd:gap-6 lg:grid-cols-5">
            {trendingTV.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default TrendingPage;
