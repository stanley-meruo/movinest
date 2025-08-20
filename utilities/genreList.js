const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const getAllGenres = async () => {
  try {
    const [movieRes, tvRes] = await Promise.all([
      fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`),
    ]);

    const movieData = await movieRes.json();
    const tvData = await tvRes.json();

    return {
      movieGenres: movieData.genres,
      tvGenres: tvData.genres,
    };
  } catch (error) {
    console.error("Failed to fetch genres", error);
    return { movieGenres: [], tvGenres: [] };
  }
};