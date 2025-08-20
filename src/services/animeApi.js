const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const getAnimeContent = async (page = 1) => {
  const [tvRes, movieRes] = await Promise.all([
    fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&page=${page}`
    ),
    fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&page=${page}`
    ),
  ]);

  const tvData = await tvRes.json();
  const movieData = await movieRes.json();

  // Fetch full TV details to get season/episode info
  const fullTV = await Promise.all(
    tvData.results.map(async (tv) => {
      const res = await fetch(`${BASE_URL}/tv/${tv.id}?api_key=${API_KEY}`);
      return await res.json();
    })
  );

  const combined = [...fullTV, ...movieData.results].sort(
    (a, b) => b.popularity - a.popularity
  );

  return {
    results: combined,
    total_pages: Math.min(tvData.total_pages, movieData.total_pages),
  };
};

