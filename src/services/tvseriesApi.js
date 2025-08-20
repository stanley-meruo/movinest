const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const getPopularTV = async () => {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
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

export const getAiringTV = async () => {
  const res = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`);
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

export const getOnTheAirTV = async () => {
  const res = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`);
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

export const getTopRatedTV = async () => {
  const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
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
