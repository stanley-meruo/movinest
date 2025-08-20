const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

// MOVIES - Now Playing
export const getLatestMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();
  return data.results;
};

// TRENDING 
export const getTrending = async () => {
  const res = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
  const data = await res.json();
  // return data.results;
  
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

// MOVIES - Popular
export const getMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

// TV Series - Popular
export const getSeries = async () => {
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

// TMDB doesn't have a direct anime category, so we can filter by genre
// GENRE-Anime
export const getAnime = async () => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`
  );
  const data = await res.json();
  return data.results;
};

