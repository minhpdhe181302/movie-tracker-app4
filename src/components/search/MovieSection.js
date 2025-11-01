import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import MovieCard from "./MovieCard";
import { COLORS } from "../../styles/colors";
import { SPACING } from "../../styles/theme";

export default function MovieSection({ title, movies, onMoviePress }) {
  if (!movies || movies.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  list: {
    paddingHorizontal: SPACING.md,
  },
});
