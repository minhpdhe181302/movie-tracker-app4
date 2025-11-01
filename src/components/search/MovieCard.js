import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../styles/colors";
import { SPACING, BORDER_RADIUS, SHADOWS } from "../../styles/theme";

export default function MovieCard({ item, onPress, horizontal = false }) {
  if (horizontal) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.horizontalCard}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.poster }}
          style={styles.horizontalPoster}
          resizeMode="cover"
        />
        <View style={styles.horizontalContent}>
          <Text style={styles.horizontalTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {item.voteAverage > 0 && (
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
        source={{ uri: item.poster }}
        style={styles.verticalPoster}
        resizeMode="cover"
      />
      <View style={styles.verticalContent}>
        <Text style={styles.verticalTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.year}>{item.year}</Text>
        {item.voteAverage > 0 && (
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
  rating: {
    fontSize: 13,
    color: COLORS.warning,
    fontWeight: "600",
    marginTop: SPACING.xs / 2,
  },
});
