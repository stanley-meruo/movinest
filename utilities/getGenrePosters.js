// utilities/getGenrePosters.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const getGenrePosters = async (genres, type = "movie") => {
  const promises = genres.map(async (genre) => {
    try {
      const res = await fetch(
        `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre.id}`
      );
      const data = await res.json();
      const posterPath = data.results[0]?.poster_path || null;

      return {
        ...genre,
        poster: posterPath
          ? `https://image.tmdb.org/t/p/w500${posterPath}`
          : null,
      };
    } catch (error) {
      console.error(`Error fetching for genre ${genre.name}`, error);
      return { ...genre, poster: null };
    }
  });

  return Promise.all(promises);
};
