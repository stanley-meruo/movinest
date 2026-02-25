import { useEffect, useState } from "react";
import {
  getTrending,
  getMovies,
  getSeries,
  getAnime,
} from "../../services/tmdb";
import Section from "../Section";
import SkeletonLoading from "../SkeletonLoading";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      // Create a delay promise
      const delay = new Promise((resolve) => setTimeout(resolve, 3000));
      const [tr, mv, tv, an] = await Promise.all([
        getTrending(),
        getMovies(),
        getSeries(),
        getAnime(),
        delay,
      ]);
      setTrending(tr);
      setMovies(mv);
      setSeries(tv);
      setAnime(an);
      setLoading(false);
    };

    fetchAll();
  }, []);

  if (loading) {
    return <SkeletonLoading />;
  }

  return (
    <>
      <div className="bg-neutral-800 py-12 px-5 xs:px-6 sm:px-8 md:py-14 md:px-10 lg:px-16 xl:px-20 xxl:px-28 sm:space-y-6 md:space-y-8 xmd:space-y-16">
        <Section
          title="🔥 Trending"
          items={trending}
          link="/trending"
          parentPath="/trending"
        />
        <Section
          title="🎬 Movies"
          items={movies}
          link="/movies"
          parentPath="/movies"
        />
        <Section
          title="🎌 Anime"
          items={anime}
          link="/anime"
          parentPath="/anime"
        />
        <Section
          title="📺 TV Series"
          items={series}
          link="/tv-series"
          parentPath="/tv-series"
        />
      </div>
    </>
  );
};

export default Home;
