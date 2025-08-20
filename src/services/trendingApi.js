const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const getTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const getTrendingTV = async () => {
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
  const data = await res.json();
  const detailedSeries = await Promise.all(
    data.results.map(async (show) => {
      try {
        const detailRes = await fetch(
          `${BASE_URL}/tv/${show.id}?api_key=${API_KEY}`
        );
        const details = await detailRes.json();

        return {
          ...show,
          last_episode_to_air: details.last_episode_to_air, // ✅
        };
      } catch (err) {
        console.error("Error fetching series details:", err);
        return show;
      }
    })
  );

  return detailedSeries;
};
