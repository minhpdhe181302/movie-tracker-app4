const API_KEY = "ffbc8d537064e9b3303bdab3d735f05e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// 🎬 Tìm kiếm phim
export async function searchMovies(query, page = 1) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=vi-VN&query=${encodeURIComponent(
    query
  )}&page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results) return { results: [], totalPages: 0, currentPage: 1 };

  return {
    results: data.results.map((m) => ({
      id: m.id.toString(),
      title: m.title,
      originalTitle: m.original_title,
      year: m.release_date ? m.release_date.split("-")[0] : "N/A",
      poster: m.poster_path
        ? `${IMAGE_BASE_URL}${m.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Poster",
      backdrop: m.backdrop_path ? `${IMAGE_BASE_URL}${m.backdrop_path}` : null,
      overview: m.overview || "Không có mô tả",
      voteAverage: m.vote_average,
      voteCount: m.vote_count,
      popularity: m.popularity,
      releaseDate: m.release_date,
    })),
    totalPages: data.total_pages > 500 ? 500 : data.total_pages, // TMDB limit 500 pages
    currentPage: data.page,
    totalResults: data.total_results,
  };
}

// 🔥 Lấy danh sách phim phổ biến
export async function getPopularMovies(page = 1) {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=vi-VN&page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results) return [];

  return data.results.map((m) => ({
    id: m.id.toString(),
    title: m.title,
    originalTitle: m.original_title,
    year: m.release_date ? m.release_date.split("-")[0] : "N/A",
    poster: m.poster_path
      ? `${IMAGE_BASE_URL}${m.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Poster",
    backdrop: m.backdrop_path ? `${IMAGE_BASE_URL}${m.backdrop_path}` : null,
    overview: m.overview || "Không có mô tả",
    voteAverage: m.vote_average,
    voteCount: m.vote_count,
    popularity: m.popularity,
    releaseDate: m.release_date,
  }));
}

// ⭐ Lấy phim đang chiếu
export async function getNowPlayingMovies(page = 1) {
  const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=vi-VN&page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results) return [];

  return data.results.map((m) => ({
    id: m.id.toString(),
    title: m.title,
    originalTitle: m.original_title,
    year: m.release_date ? m.release_date.split("-")[0] : "N/A",
    poster: m.poster_path
      ? `${IMAGE_BASE_URL}${m.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Poster",
    backdrop: m.backdrop_path ? `${IMAGE_BASE_URL}${m.backdrop_path}` : null,
    overview: m.overview || "Không có mô tả",
    voteAverage: m.vote_average,
    voteCount: m.vote_count,
    popularity: m.popularity,
    releaseDate: m.release_date,
  }));
}

// 🎯 Lấy chi tiết phim
export async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=vi-VN`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    id: data.id.toString(),
    title: data.title,
    originalTitle: data.original_title,
    year: data.release_date ? data.release_date.split("-")[0] : "N/A",
    poster: data.poster_path
      ? `${IMAGE_BASE_URL}${data.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Poster",
    backdrop: data.backdrop_path
      ? `${IMAGE_BASE_URL}${data.backdrop_path}`
      : null,
    overview: data.overview || "Không có mô tả",
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    popularity: data.popularity,
    releaseDate: data.release_date,
    runtime: data.runtime,
    genres: data.genres?.map((g) => g.name).join(", ") || "",
    tagline: data.tagline || "",
  };
}
