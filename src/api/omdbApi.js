const API_KEY = "YOUR_OMDB_KEY";

export async function searchMovies(query) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
    query
  )}&type=movie`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.Search) return [];
  return data.Search.map((m) => ({
    id: m.imdbID,
    title: m.Title,
    year: m.Year,
    poster: m.Poster,
  }));
}
