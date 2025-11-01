import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getMoviesByGenre } from "../api/tmdbApi";
import MovieCard from "../components/search/MovieCard";
import Pagination from "../components/search/Pagination";
import { COLORS } from "../styles/colors";
import { SPACING, TYPOGRAPHY } from "../styles/theme";

export default function GenreMoviesScreen({ route, navigation }) {
  const { genreId, genreName } = route.params;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadMovies(1);
  }, []);

  async function loadMovies(page) {
    setLoading(true);
    try {
      const data = await getMoviesByGenreWithPagination(genreId, page);
      setMovies(data.results);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("Error loading genre movies:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getMoviesByGenreWithPagination(genreId, page = 1) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=ffbc8d537064e9b3303bdab3d735f05e&language=vi-VN&sort_by=vote_average.desc&vote_count.gte=100&with_genres=${genreId}&page=${page}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (!data.results) {
      return { results: [], totalPages: 0, currentPage: 1 };
    }

    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    // Sắp xếp theo rating
    const sorted = data.results.sort((a, b) => {
      if (b.vote_average !== a.vote_average) {
        return b.vote_average - a.vote_average;
      }
      return b.popularity - a.popularity;
    });

    return {
      results: sorted.map((m) => ({
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
      totalPages: data.total_pages > 500 ? 500 : data.total_pages,
      currentPage: data.page,
    };
  }

  function handlePageChange(page) {
    loadMovies(page);
  }

  function navigateToDetail(item) {
    navigation.navigate("Detail", { item });
  }

  return (
    <View style={styles.container}>
      {/* Header với Gradient */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{genreName}</Text>
        <Text style={styles.headerSubtitle}>
          Trang {currentPage} / {totalPages}
        </Text>
      </LinearGradient>

      {/* Loading State */}
      {loading && movies.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Đang tải phim...</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.movieList}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.movieWrapper}>
              <MovieCard
                item={item}
                onPress={() => navigateToDetail(item)}
                variant="vertical"
              />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🎬</Text>
              <Text style={styles.emptyText}>Không có phim nào</Text>
            </View>
          }
          ListFooterComponent={
            totalPages > 1 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                loading={loading}
              />
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: SPACING.md,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: SPACING.md,
    top: 50,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  movieList: {
    padding: SPACING.md,
  },
  row: {
    justifyContent: "space-between",
  },
  movieWrapper: {
    width: "48%",
    marginBottom: SPACING.md,
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});
