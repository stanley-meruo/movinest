import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { MdStar } from "react-icons/md";
import { IoPlayForwardSharp } from "react-icons/io5";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const DetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

 const mediaType =
   location.pathname.includes("/movie") || location.pathname.includes("/movies")
     ? "movie"
     : "tv";


  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const [detailRes, creditsRes, videosRes, recsRes, simRes] =
          await Promise.all([
            fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`),
            fetch(`${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`),
            fetch(`${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}`),
            fetch(
              `${BASE_URL}/${mediaType}/${id}/recommendations?api_key=${API_KEY}`
            ),
            fetch(`${BASE_URL}/${mediaType}/${id}/similar?api_key=${API_KEY}`),
          ]);

          const enrichWithEpisodes = async (items) => {
          const enriched = await Promise.all(
            items.map(async (item) => {
              if (item.media_type === "tv" || mediaType === "tv") {
                try {
                  const res = await fetch(
                    `${BASE_URL}/tv/${item.id}?api_key=${API_KEY}`
                  );
                  const fullData = await res.json();
                  return {
                    ...item,
                    last_episode_to_air: fullData.last_episode_to_air,
                  };
                } catch {
                  return item;
                }
              }
              return item;
            })
          );
          return enriched;
        };
  
        const detailData = await detailRes.json();
        const creditsData = await creditsRes.json();
        const videosData = await videosRes.json();
        const recommendationsData = await recsRes.json();
        const similarData = await simRes.json();

        const enrichedRecs = await enrichWithEpisodes(
          recommendationsData.results
        );
        const enrichedSimilar = await enrichWithEpisodes(similarData.results);

        

        setData({
          ...detailData,
          credits: creditsData.cast,
          videos: videosData.results,
          recommendations: enrichedRecs,
          similar: enrichedSimilar,
        });
      } catch (err) {
        console.error("Failed to load details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, mediaType]);

  const languageMap = {
    en: { country: "us", name: "English" },
    ja: { country: "jp", name: "Japanese" },
    ko: { country: "kr", name: "Korean" },
    fr: { country: "fr", name: "French" },
    zh: { country: "cn", name: "Chinese" },
    hi: { country: "in", name: "Hindi" },
    es: { country: "es", name: "Spanish" },
    de: { country: "de", name: "German" },
    it: { country: "it", name: "Italian" },
    ru: { country: "ru", name: "Russian" },
  };

  const formatRuntime = (mins) => {
    if (!mins) return "N/A";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  const trailer = data?.videos?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  if (loading) {
    return (
      <section className="py-24 px-5 xs:px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xxl:px-28 animate-pulse">
        {/* Top section */}
        <div className="grid gap-8 sm:flex sm:gap-10">
          {/* Poster */}
          <div className="w-full sm:w-60 lg:w-80 h-[420px] bg-neutral-700 rounded-md" />

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="h-10 w-2/3 bg-neutral-700 rounded-md" />
            <div className="h-4 w-1/3 bg-neutral-700 rounded-md" />

            <div className="space-y-2.5">
              <div className="h-4 w-full bg-neutral-700 rounded" />
              <div className="h-4 w-full bg-neutral-700 rounded-md" />
              <div className="h-4 w-full bg-neutral-700 rounded-md" />
              <div className="h-4 w-5/6 bg-neutral-700 rounded-md" />
              <div className="h-4 w-4/6 bg-neutral-700 rounded-md" />
            </div>

            <div className="flex gap-3 items-center">
              <div className="h-4 w-18 bg-neutral-700 rounded-md" />
              <div className="h-4 w-30 bg-neutral-700 rounded-md" />
            </div>
            <div className="flex gap-3 items-center">
              <div className="h-4 w-18 bg-neutral-700 rounded-md" />
              <div className="h-4 w-30 bg-neutral-700 rounded-md" />
            </div>
            <div className="flex gap-3 items-center">
              <div className="h-4 w-18 bg-neutral-700 rounded-md" />
              <div className="h-4 w-30 bg-neutral-700 rounded-md" />
            </div>
          </div>
        </div>

        {/* Trailer */}
        <div className="mt-12 space-y-4">
          <div className="h-6 w-32 bg-neutral-700 rounded-md" />
          <div className="aspect-video w-full bg-neutral-700 rounded-md" />
        </div>

        {/* Cast */}
        <div className="mt-14 space-y-4">
          <div className="h-6 w-32 bg-neutral-700 rounded" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-neutral-700" />
                <div className="h-3 w-16 bg-neutral-700 rounded-md" />
                <div className="h-2 w-12 bg-neutral-700 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Grid sections */}
        {/* <div className="mt-16 space-y-6">
          <div className="h-6 w-56 bg-neutral-700 rounded-md" />
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="grid space-y-4">
                <div className="min-w-[150px] h-56 bg-neutral-700 rounded-md" />
                <div className="h-4 w-32 bg-neutral-700 rounded-md mx-auto" />
              </div>
            ))}
          </div>
        </div> */}
      </section>
    );
  }

  if (!data) {
    return <div className="text-center mt-10">No data found.</div>;
  }
  
  const imageUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

  return (
    <section className="text-white pt-20 font-montserrat">
      <div className="relative px-5 py-6 xs:px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xxl:px-28">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm bg-gradient-to-t from-transparent via-black to-transparent opacity-50"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="relative z-10 grid gap-8 sm:flex sm:justify-between md:py-4 xmd:pt-8 lg:pt-10 lg:gap-10 xl:pt-16">
          <div className="sm:mt-2 md:w-3/4 lg:w-2/4">
            <img
              src={data.poster_path ? `${imageUrl}` : "/no-image.jpg"}
              alt={data.title || data.name}
              loading="lazy"
              className="w-full rounded-md shadow object-cover"
            />
          </div>
          <div className="space-y-3 w-full sm:mt-1">
            <h1 className="text-3xl font-bebas tracking-wider font-bold xmd:text-4xl lg:text-[44px] xl:text-5xl">
              {data.title || data.name}
            </h1>

            {data.tagline && (
              <p className="text-sm text-neutral-300 italic lg:text-base">
                "{data.tagline}"
              </p>
            )}

            <p className="lg:text-lg">
              {data.overview || "No overview available."}
            </p>

            <p className="lg:text-lg">
              <strong>Genres:</strong>{" "}
              {data.genres && data.genres.length > 0
                ? data.genres.map((g) => g.name).join(", ")
                : "N/A"}
            </p>

            <p className="lg:text-lg">
              <strong>Release Date:</strong>{" "}
              {data.release_date || data.first_air_date}
            </p>

            <p className="lg:text-lg">
              <strong>Language:</strong>{" "}
              {languageMap[data.original_language]?.name ||
                data.original_language}
            </p>

            <p className="lg:text-lg flex items-center gap-2 flex-wrap">
              <strong>Country:</strong>{" "}
              {data.production_countries?.length > 0 ? (
                data.production_countries.map((country) => (
                  <span
                    key={country.iso_3166_1}
                    className="flex items-center gap-1"
                  >
                    <img
                      src={`https://flagcdn.com/w20/${country.iso_3166_1.toLowerCase()}.png`}
                      alt={country.name}
                      className="w-5 h-3 object-cover"
                    />
                    {country.name},
                  </span>
                ))
              ) : (
                <span>Unknown</span>
              )}
            </p>

            <div className="flex items-center gap-2">
              <strong>Rating:</strong>{" "}
              <MdStar className="text-orange-400 text-xl" />
              <span className="lg:text-lg">
                {data.vote_average?.toFixed(1)} / 10
              </span>
              <span className="text-neutral-400 text-sm lg:text-base">
                ({data.vote_count} votes)
              </span>
            </div>

            {mediaType === "tv" && (
              <p className="text-sm lg:text-base">
                <strong>Seasons:</strong> {data.number_of_seasons} &nbsp;|&nbsp;
                <strong>Episodes:</strong> {data.number_of_episodes}
              </p>
            )}

            {mediaType === "movie" && data.runtime && (
              <p className="lg:text-lg">
                <strong>Runtime:</strong> {formatRuntime(data.runtime)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 xs:px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xxl:px-28">
        {/* Trailer */}
        <div className="space-y-4 my-8 sm:my-10 md:my-12">
          <h2 className="text-xl font-semibold mb-2 sm:text-2xl md:mb-4 xmd:text-[28px] xl:text-[32px]">
            Watch Trailer
          </h2>
          <div className=" bg-neutral-900 grid rounded-md py-6">
            {trailer?.key ? (
              <div className="m-auto w-full px-1 sm:px-2 md:px-3 lg:px-5 xl:px-7">
                <iframe
                  className="aspect-video rounded-md"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Trailer"
                />
              </div>
            ) : (
              <p className="text-sm text-neutral-400 m-auto lg:text-base">
                No trailer available
              </p>
            )}
          </div>
        </div>

        {/* Cast */}
        <div>
          {data.credits && data.credits.length > 0 && (
            <div className="">
              <h2 className="text-xl font-semibold mb-2 sm:text-2xl md:mb-4 lg:text-3xl">
                Cast
              </h2>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide xmd:grid xmd:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
                {data.credits.slice(0, 10).map((actor) => (
                  <div
                    key={actor.id}
                    className="text-center grid min-w-[80px] sm:min-w-[100px] lg:min-w-[120px]"
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "/no-image.jpg"
                      }
                      alt={actor.name}
                      className="size-18 mx-auto rounded-full object-cover mb-1 sm:size-22 lg:size-24 xl:size-26"
                    />
                    <p className="text-xs font-medium lg:text-sm">
                      {actor.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 lg:text-xs">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-neutral-900 pb-24 pt-8 mt-14 space-y-14 px-5 xs:px-6 sm:px-8 md:px-10 md:mt-16 md:pt-10 lg:px-16 xl:px-20 xxl:px-28">
        {/* Recommendation */}
        {data.recommendations && data.recommendations.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 sm:text-2xl md:mb-4 lg:text-3xl">
              You Might Also Like 👇
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 gap-x-4 xmd:gap-x-6 lg:grid-cols-5">
              {data.recommendations.slice(0, 10).map((item) => (
                <Link
                  to={
                    location.pathname.startsWith("/movies")
                      ? `/movies/${mediaType}/${item.id}`
                      : location.pathname.startsWith("/tv-series")
                      ? `/tv-series/${mediaType}/${item.id}`
                      : `/trending/${mediaType}/${item.id}`
                  }
                  key={item.id}
                >
                  <div className="rounded overflow-hidden relative transition duration-300 hover:scale-95">
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : "/no-image.jpg"
                      }
                      alt={item.title || item.name}
                      className="rounded-md object-cover min-w-[150px] w-full"
                    />
                    <p className="text-sm font-semibold text-center p-2.5 line-clamp-2 xmd:pb-4 lg:pb-6 xl:text-base">
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
                    <p className="capitalize border border-neutral-500 rounded-md absolute top-2 left-2 p-1.5 bg-neutral-900 text-xs">
                      {item.media_type || mediaType}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies/TV */}
        {data.similar && data.similar.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 sm:text-2xl md:mb-4 lg:text-3xl">
              {mediaType === "movie" ? "Similar Movies" : "Similar TV Shows"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 gap-x-4 xmd:gap-x-6 lg:grid-cols-5">
              {data.similar.slice(0, 10).map((item) => (
                <Link
                  to={
                    location.pathname.startsWith("/movies")
                      ? `/movies/${mediaType}/${item.id}`
                      : location.pathname.startsWith("/tv-series")
                      ? `/tv-series/${mediaType}/${item.id}`
                      : `/trending/${mediaType}/${item.id}`
                  }
                  key={item.id}
                >
                  <div className="rounded overflow-hidden relative transition duration-300 hover:scale-95">
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : "/no-image.jpg"
                      }
                      alt={item.title || item.name}
                      className="rounded-md object-cover min-w-[150px] w-full"
                    />
                    <p className="text-sm font-semibold text-center p-2.5 line-clamp-2 xmd:pb-4 lg:pb-6 xl:text-base">
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
                    <p className="capitalize border border-neutral-500 rounded-md absolute top-2 left-2 p-1.5 bg-neutral-900 text-xs">
                      {item.media_type || mediaType}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailsPage;
