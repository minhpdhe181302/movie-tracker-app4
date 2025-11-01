import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../styles/colors";
import { SPACING, BORDER_RADIUS, SHADOWS } from "../../styles/theme";

export default function MovieCard({ item, onPress, horizontal = false }) {
  // Handle both movies and books
  const displayTitle = item.title || 'Untitled';
  const displayYear = item.year || item.publishedDate?.split('-')[0] || 'N/A';
  const displayPoster = item.poster || item.thumbnail || 'https://via.placeholder.com/500x750?text=No+Image';
  const hasRating = item.voteAverage && item.voteAverage > 0;

  if (horizontal) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.horizontalCard}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: displayPoster }}
          style={styles.horizontalPoster}
          resizeMode="cover"
        />
        <View style={styles.horizontalContent}>
          <Text style={styles.horizontalTitle} numberOfLines={2}>
            {displayTitle}
          </Text>
          {hasRating && (
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>
                ⭐ {item.voteAverage.toFixed(1)}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.verticalCard}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: displayPoster }}
        style={styles.verticalPoster}
        resizeMode="cover"
      />
      <View style={styles.verticalContent}>
        <Text style={styles.verticalTitle} numberOfLines={2}>
          {displayTitle}
        </Text>
        <Text style={styles.year}>{displayYear}</Text>
        {item.authors && item.authors.length > 0 && (
          <Text style={styles.authors} numberOfLines={1}>
            {item.authors.join(', ')}
          </Text>
        )}
        {hasRating && (
          <Text style={styles.rating}>⭐ {item.voteAverage.toFixed(1)}/10</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Horizontal Card (for scrolling lists)
  horizontalCard: {
    width: 140,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
    marginRight: SPACING.md,
    ...SHADOWS.small,
  },
  horizontalPoster: {
    width: 140,
    height: 210,
    backgroundColor: COLORS.surfaceLight,
  },
  horizontalContent: {
    padding: SPACING.sm,
  },
  horizontalTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  ratingBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.warning,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.surface,
  },

  // Vertical Card (for search results)
  verticalCard: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    overflow: "hidden",
    ...SHADOWS.small,
  },
  verticalPoster: {
    width: 80,
    height: 120,
    backgroundColor: COLORS.surfaceLight,
  },
  verticalContent: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: "center",
  },
  verticalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  year: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  authors: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: SPACING.xs / 2,
  },
  rating: {
    fontSize: 13,
    color: COLORS.warning,
    fontWeight: "600",
    marginTop: SPACING.xs / 2,
  },
});
