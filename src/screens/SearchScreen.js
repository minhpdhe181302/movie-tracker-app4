import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import {
  searchMovies,
  getPopularMovies,
  getNowPlayingMovies,
  getMoviesByGenre,
  GENRES,
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
  const [actionMovies, setActionMovies] = useState([]);
  const [animeMovies, setAnimeMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [scifiMovies, setScifiMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [crimeMovies, setCrimeMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (mode === "movie") {
      loadPopularMovies();
      loadNowPlayingMovies();
      loadGenreMovies();
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

  async function loadGenreMovies() {
    try {
      const [action, anime, romance, scifi, comedy, horror, crime] = await Promise.all([
        getMoviesByGenre(GENRES.ACTION.id, 1),
        getMoviesByGenre(GENRES.ANIMATION.id, 1),
        getMoviesByGenre(GENRES.ROMANCE.id, 1),
        getMoviesByGenre(GENRES.SCIFI.id, 1),
        getMoviesByGenre(GENRES.COMEDY.id, 1),
        getMoviesByGenre(GENRES.HORROR.id, 1),
        getMoviesByGenre(GENRES.CRIME.id, 1),
      ]);
      setActionMovies(action);
      setAnimeMovies(anime);
      setRomanceMovies(romance);
      setScifiMovies(scifi);
      setComedyMovies(comedy);
      setHorrorMovies(horror);
      setCrimeMovies(crime);
    } catch (error) {
      console.error("Error loading genre movies:", error);
    }
  }

  async function handleSearch(page = 1) {
    if (!query.trim()) {
      console.log("Empty query, skipping search");
      return;
    }

    console.log(`Searching for "${query}" on page ${page} in mode ${mode}`);
    setLoading(true);
    setHasSearched(true);

    try {
      if (mode === "movie") {
        console.log("Calling searchMovies API...");
        const data = await searchMovies(query, page);
        console.log(`Found ${data.results.length} results, total pages: ${data.totalPages}`);
        setResults(data.results);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } else {
        console.log("Calling searchBooks API...");
        const data = await searchBooks(query);
        console.log(`Found ${data.length} books`);
        setResults(data);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
      setTotalPages(1);
      setCurrentPage(1);
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
          showSeeMore={false}
        />
        <MovieSection
          title="⭐ Đang Chiếu"
          movies={nowPlayingMovies}
          onMoviePress={navigateToDetail}
          showSeeMore={false}
        />
        <MovieSection
          title={GENRES.SCIFI.name}
          movies={scifiMovies}
          onMoviePress={navigateToDetail}
          showSeeMore={true}
          onSeeMore={() => navigation.navigate('GenreMovies', { 
            genreId: GENRES.SCIFI.id, 
            genreName: GENRES.SCIFI.name 
          })}
        />
        <MovieSection
          title={GENRES.ACTION.name}
          movies={actionMovies}
          onMoviePress={navigateToDetail}
          showSeeMore={true}
          onSeeMore={() => navigation.navigate('GenreMovies', { 
            genreId: GENRES.ACTION.id, 
            genreName: GENRES.ACTION.name 
          })}
        />
        <MovieSection
          title={GENRES.ANIMATION.name}
          movies={animeMovies}
          onMoviePress={navigateToDetail}
          showSeeMore={true}
          onSeeMore={() => navigation.navigate('GenreMovies', { 
            genreId: GENRES.ANIMATION.id, 
            genreName: GENRES.ANIMATION.name 
          })}
        />
        <MovieSection
          title={GENRES.CRIME.name}
          movies={crimeMovies}
          onMoviePress={navigateToDetail}
          showSeeMore={true}
          onSeeMore={() => navigation.navigate('GenreMovies', { 
            genreId: GENRES.CRIME.id, 
            genreName: GENRES.CRIME.name 
          })}
        />
        <MovieSection
          title={GENRES.HORROR.name}
          movies={horrorMovies}
          onMoviePress={navigateToDetail}
          showSeeMore={true}
          onSeeMore={() => navigation.navigate('GenreMovies', { 
            genreId: GENRES.HORROR.id, 
            genreName: GENRES.HORROR.name 
          })}
        />
        <MovieSection
          title={GENRES.ROMANCE.name}
          movies={romanceMovies}
          onMoviePress={navigateToDetail}
          showSeeMore={true}
          onSeeMore={() => navigation.navigate('GenreMovies', { 
            genreId: GENRES.ROMANCE.id, 
            genreName: GENRES.ROMANCE.name 
          })}
        />
        <MovieSection
          title={GENRES.COMEDY.name}
          movies={comedyMovies}
          onMoviePress={navigateToDetail}
          showSeeMore={true}
          onSeeMore={() => navigation.navigate('GenreMovies', { 
            genreId: GENRES.COMEDY.id, 
            genreName: GENRES.COMEDY.name 
          })}
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
