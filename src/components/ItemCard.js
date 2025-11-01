import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";
import { SPACING, BORDER_RADIUS, SHADOWS } from "../styles/theme";

export default function ItemCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.7}>
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: item.poster }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View
          style={[
            styles.typeBadge,
            {
              backgroundColor:
                item.type === "book" ? COLORS.book : COLORS.movie,
            },
          ]}
        >
          <Text style={styles.typeBadgeText}>
            {item.type === "book" ? "📚" : "🎬"}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.year}>{item.year}</Text>

        {/* ⭐ Hiển thị rating nếu có */}
        {item.rating ? (
          <View style={styles.ratingContainer}>
            <Text style={styles.stars}>
              {"★".repeat(item.rating)}
              {"☆".repeat(5 - item.rating)}
            </Text>
            <Text style={styles.ratingText}>({item.rating}/5)</Text>
          </View>
        ) : null}

        {/* 💬 Hiển thị bình luận nếu có */}
        {item.comment ? (
          <View style={styles.commentContainer}>
            <Text style={styles.commentIcon}>💬</Text>
            <Text numberOfLines={2} style={styles.comment}>
              {item.comment}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    marginVertical: SPACING.sm,
    overflow: "hidden",
    ...SHADOWS.small,
  },
  posterContainer: {
    position: "relative",
  },
  poster: {
    width: 80,
    height: 120,
    backgroundColor: COLORS.surfaceLight,
  },
  typeBadge: {
    position: "absolute",
    top: SPACING.xs,
    right: SPACING.xs,
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.small,
  },
  typeBadgeText: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  year: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  stars: {
    color: COLORS.star,
    fontSize: 14,
    letterSpacing: 1,
  },
  ratingText: {
    marginLeft: SPACING.xs,
    fontSize: 12,
    color: COLORS.textLight,
  },
  commentContainer: {
    flexDirection: "row",
    marginTop: SPACING.xs,
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  commentIcon: {
    marginRight: SPACING.xs,
  },
  comment: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: "italic",
  },
});
