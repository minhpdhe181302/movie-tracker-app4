import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import MovieCard from "./MovieCard";
import { COLORS } from "../../styles/colors";
import { SPACING } from "../../styles/theme";

export default function MovieSection({ 
  title, 
  movies, 
  onMoviePress, 
  onSeeMore,
  showSeeMore = false 
}) {
  if (!movies || movies.length === 0) return null;

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showSeeMore && (
          <TouchableOpacity onPress={onSeeMore} style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>Xem thêm →</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            item={movie}
            horizontal={true}
            onPress={() => onMoviePress(movie)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  seeMoreButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.primary + "20",
  },
  seeMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  list: {
    paddingHorizontal: SPACING.md,
  },
});
