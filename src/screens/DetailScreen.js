import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RatingStars from "../components/RatingStars";
import { addItem, getAll, updateItem } from "../storage/trackerStorage";
import { COLORS } from "../styles/colors";
import { SPACING, BORDER_RADIUS, SHADOWS } from "../styles/theme";

export default function DetailScreen({ route, navigation }) {
  const { item, mode } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const loadExisting = async () => {
      const items = await getAll();
      const existing = items.find((x) => x.id === `${mode}_${item.id}`);
      if (existing) {
        setRating(existing.rating || 0);
        setComment(existing.comment || "");
      }
    };
    loadExisting();
  }, []);

  async function handleAdd() {
    const newItem = {
      id: `${mode}_${item.id}`,
      type: mode,
      title: item.title,
      poster:
        mode === "movie"
          ? item.poster
          : item.thumbnail ||
            "https://via.placeholder.com/100x150?text=No+Cover",
      year: mode === "movie" ? item.year : item.publishedDate,
      description: item.overview || item.description || "",
      rating,
      comment,
      status: "want",
      addedAt: new Date().toISOString(),
      // TMDB specific data
      voteAverage: item.voteAverage,
      voteCount: item.voteCount,
      originalTitle: item.originalTitle,
    };
    await addItem(newItem);
    Alert.alert("✅ Đã Lưu!", "Đánh giá và nhận xét của bạn đã được lưu.");
    navigation.navigate("My List");
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
      >
        {/* Hero Section with Poster */}
        <View style={styles.heroSection}>
          <Image
            source={{
              uri:
                mode === "movie"
                  ? item.poster
                  : item.thumbnail ||
                    "https://via.placeholder.com/200x300?text=No+Cover",
            }}
            style={styles.posterImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", COLORS.background]}
            style={styles.gradient}
          />
        </View>

        {/* Content Section */}
        {/* Title Card */}
        <View style={styles.titleCard}>
          <View style={styles.titleHeader}>
            <Text style={styles.title}>{item.title}</Text>
            <View
              style={[
                styles.typeBadge,
                {
                  backgroundColor:
                    mode === "movie" ? COLORS.movie : COLORS.book,
                },
              ]}
            >
              <Text style={styles.typeBadgeText}>
                {mode === "movie" ? "🎬" : "📚"}
              </Text>
            </View>
          </View>

          <Text style={styles.year}>
            {mode === "movie" ? item.year : item.publishedDate}
          </Text>

          {/* TMDB Rating */}
          {mode === "movie" && item.voteAverage && item.voteAverage > 0 && (
            <View style={styles.tmdbRating}>
              <Text style={styles.tmdbRatingText}>
                ⭐ {item.voteAverage.toFixed(1)}/10
              </Text>
              <Text style={styles.tmdbVotes}>
                ({item.voteCount?.toLocaleString()} votes)
              </Text>
            </View>
          )}

          {item.authors && (
            <Text style={styles.authors}>
              Tác giả: {item.authors.join(", ")}
            </Text>
          )}
        </View>

        {/* Description */}
        {(item.overview || item.description) && (
          <View style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>📖 Mô tả</Text>
            <Text style={styles.description}>
              {item.overview || item.description}
            </Text>
          </View>
        )}

        {/* Rating Section */}
        <View style={styles.ratingCard}>
          <Text style={styles.sectionTitle}>⭐ Đánh giá của bạn</Text>
          <RatingStars rating={rating} onChange={setRating} />
        </View>

        {/* Comment Section */}
        <View style={styles.commentCard}>
          <Text style={styles.sectionTitle}>💬 Nhận xét của bạn</Text>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Chia sẻ suy nghĩ của bạn về bộ phim này..."
            placeholderTextColor={COLORS.textLight}
            style={styles.commentInput}
            multiline
            numberOfLines={4}
            scrollEnabled={false}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleAdd}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.saveButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.saveButtonText}>💾 Lưu vào Danh sách</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
  heroSection: {
    height: 300,
    position: "relative",
  },
  posterImage: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.surfaceLight,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  titleCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginTop: -SPACING.xl,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  titleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginRight: SPACING.md,
  },
  typeBadge: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.small,
  },
  typeBadgeText: {
    fontSize: 20,
  },
  year: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  tmdbRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  tmdbRatingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.warning,
    marginRight: SPACING.sm,
  },
  tmdbVotes: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  authors: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: "italic",
  },
  descriptionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  ratingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  commentCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  commentInput: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: 15,
    color: COLORS.textPrimary,
    minHeight: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  saveButtonGradient: {
    paddingVertical: SPACING.lg,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.surface,
  },
});
