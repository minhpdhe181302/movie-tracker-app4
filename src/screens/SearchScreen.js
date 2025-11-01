import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import {
  searchMovies,
  getPopularMovies,
  getNowPlayingMovies,
} from "../api/tmdbApi";
import { searchBooks } from "../api/booksApi";
import ModeSelector from "../components/search/ModeSelector";
import SearchBar from "../components/search/SearchBar";
import MovieCard from "../components/search/MovieCard";
import MovieSection from "../components/search/MovieSection";
import {
  LoadingIndicator,
  EmptyState,
} from "../components/search/SearchStates";
import Pagination from "../components/search/Pagination";
import { COLORS } from "../styles/colors";
import { SPACING } from "../styles/theme";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("movie");
  const [results, setResults] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (mode === "movie") {
      loadPopularMovies();
      loadNowPlayingMovies();
    }
  }, [mode]);

  async function loadPopularMovies() {
    try {
      const data = await getPopularMovies(1);
      setPopularMovies(data.slice(0, 10));
    } catch (error) {
      console.error("Error loading popular movies:", error);
    }
  }

  async function loadNowPlayingMovies() {
    try {
      const data = await getNowPlayingMovies(1);
      setNowPlayingMovies(data.slice(0, 10));
    } catch (error) {
      console.error("Error loading now playing movies:", error);
    }
  }

  async function handleSearch(page = 1) {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      if (mode === "movie") {
        const data = await searchMovies(query, page);
        setResults(data.results);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } else {
        const data = await searchBooks(query);
        setResults(data);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
    handleSearch(newPage);
  }

  function handleModeChange(newMode) {
    setMode(newMode);
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setCurrentPage(1);
    setTotalPages(1);
  }

  function navigateToDetail(item) {
    navigation.navigate("Detail", { item, mode });
  }

  const renderSearchResults = () => {
    if (loading) {
      return <LoadingIndicator text="Đang tìm kiếm..." />;
    }

    if (hasSearched && results.length === 0) {
      return (
        <EmptyState
          icon="🔍"
          title="Không tìm thấy kết quả"
          subtitle="Thử từ khóa khác"
        />
      );
    }

    if (results.length > 0) {
      return (
        <>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.resultsList}
            renderItem={({ item }) => (
              <MovieCard item={item} onPress={() => navigateToDetail(item)} />
            )}
          />
          {mode === "movie" && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={loading}
            />
          )}
        </>
      );
    }

    return null;
  };

  const renderDiscoverContent = () => {
    if (mode !== "movie") {
      return (
        <EmptyState
          icon="📚"
          title="Tìm kiếm sách"
          subtitle="Nhập tên sách hoặc tác giả"
        />
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieSection
          title="🔥 Phim Phổ Biến"
          movies={popularMovies}
          onMoviePress={navigateToDetail}
        />
        <MovieSection
          title="⭐ Đang Chiếu"
          movies={nowPlayingMovies}
          onMoviePress={navigateToDetail}
        />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <ModeSelector mode={mode} onModeChange={handleModeChange} />

      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSearch={() => handleSearch(1)}
        placeholder={`Tìm kiếm ${mode === "movie" ? "phim" : "sách"}...`}
        loading={loading}
      />

      {hasSearched || results.length > 0
        ? renderSearchResults()
        : renderDiscoverContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  resultsList: {
    padding: SPACING.md,
  },
});
