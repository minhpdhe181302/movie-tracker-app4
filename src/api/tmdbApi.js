const API_KEY = "ffbc8d537064e9b3303bdab3d735f05e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// 🎬 Tìm kiếm phim
export async function searchMovies(query, page = 1) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=vi-VN&query=${encodeURIComponent(
    query
  )}&page=${page}`;

  console.log("TMDB Search URL:", url);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    console.log("TMDB Response:", {
      total_results: data.total_results,
      total_pages: data.total_pages,
      page: data.page,
      results_count: data.results?.length || 0,
    });

    if (!data.results) {
      console.warn("No results in TMDB response");
      return { results: [], totalPages: 0, currentPage: 1 };
    }

    return {
      results: data.results.map((m) => ({
        id: m.id.toString(),
        title: m.title,
        originalTitle: m.original_title,
        year: m.release_date ? m.release_date.split("-")[0] : "N/A",
        poster: m.poster_path
          ? `${IMAGE_BASE_URL}${m.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Poster",
        backdrop: m.backdrop_path
          ? `${IMAGE_BASE_URL}${m.backdrop_path}`
          : null,
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
  } catch (error) {
    console.error("TMDB API Error:", error);
    return { results: [], totalPages: 0, currentPage: 1 };
  }
}

// 🔥 Lấy danh sách phim phổ biến
export async function getPopularMovies(page = 1) {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=vi-VN&page=${page}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  if (!data.results) return [];

  // Sắp xếp theo rating cao xuống thấp
  const sorted = data.results.sort((a, b) => b.vote_average - a.vote_average);

  return sorted.map((m) => ({
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

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  if (!data.results) return [];

  // Sắp xếp theo rating cao xuống thấp
  const sorted = data.results.sort((a, b) => b.vote_average - a.vote_average);

  return sorted.map((m) => ({
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

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
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

// 🎭 Lấy phim theo thể loại
// Genre IDs: https://api.themoviedb.org/3/genre/movie/list
// 28: Action, 16: Animation, 35: Comedy, 80: Crime, 99: Documentary
// 18: Drama, 10751: Family, 14: Fantasy, 36: History, 27: Horror
// 10402: Music, 9648: Mystery, 10749: Romance, 878: Science Fiction
// 10770: TV Movie, 53: Thriller, 10752: War, 37: Western
export async function getMoviesByGenre(genreId, page = 1) {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=vi-VN&sort_by=vote_average.desc&vote_count.gte=100&with_genres=${genreId}&page=${page}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  if (!data.results) return [];

  // Sắp xếp theo điểm rating (cao → thấp), sau đó theo popularity
  const sorted = data.results
    .sort((a, b) => {
      if (b.vote_average !== a.vote_average) {
        return b.vote_average - a.vote_average; // Rating cao hơn lên đầu
      }
      return b.popularity - a.popularity; // Cùng rating thì xem popularity
    })
    .slice(0, 10);

  return sorted.map((m) => ({
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

// 🎯 Thể loại phổ biến
export const GENRES = {
  ACTION: { id: 28, name: '🎬 Phim Hành Động', emoji: '💥' },
  ANIMATION: { id: 16, name: '🎨 Anime & Hoạt Hình', emoji: '🎨' },
  ROMANCE: { id: 10749, name: '💕 Phim Tình Cảm', emoji: '💕' },
  SCIFI: { id: 878, name: '🚀 Phim Khoa Học', emoji: '🚀' },
  COMEDY: { id: 35, name: '😂 Phim Hài', emoji: '😂' },
  HORROR: { id: 27, name: '👻 Phim Kinh Dị', emoji: '👻' },
  CRIME: { id: 80, name: '� Phim Hình Sự', emoji: '�' },
};
