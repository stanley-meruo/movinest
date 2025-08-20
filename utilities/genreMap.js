const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;


export const getGenreMap = async () => {
  try {
    const [movieRes, tvRes] = await Promise.all([
      fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`),
    ]);

    const movieData = await movieRes.json();
    const tvData = await tvRes.json();

    const allGenres = [...movieData.genres, ...tvData.genres];
    const genreMap = {};

    allGenres.forEach((genre) => {
      genreMap[genre.id] = genre.name;
    });

    return genreMap;
  } catch (error) {
    console.error("Failed to fetch genre map", error);
    return {};
  }
};




