import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import ItemCard from "../components/ItemCard";
import { COLORS } from "../styles/colors";
import { SPACING, BORDER_RADIUS, SHADOWS } from "../styles/theme";

export default function MyListScreen({ navigation }) {
  const [myList, setMyList] = useState([]);
  const [filterRating, setFilterRating] = useState(0);
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });

    loadData();

    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    const stored = await AsyncStorage.getItem("myList");
    if (stored) setMyList(JSON.parse(stored));
  };

  // 🔹 Lọc theo rating
  const filteredList =
    filterRating === 0
      ? myList
      : myList.filter((item) => (item.rating || 0) >= filterRating);

  // 🔹 Sắp xếp danh sách
  const sortedList = [...filteredList].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "year-asc":
        return (a.year || 0) - (b.year || 0);
      case "year-desc":
        return (b.year || 0) - (a.year || 0);
      case "rating-asc":
        return (a.rating || 0) - (b.rating || 0);
      case "rating-desc":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{myList.length}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {myList.filter((item) => item.type === "movie").length}
          </Text>
          <Text style={styles.statLabel}>🎬 Movies</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {myList.filter((item) => item.type === "book").length}
          </Text>
          <Text style={styles.statLabel}>📚 Books</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filterSection}>
        <View style={styles.filterCard}>
          <Text style={styles.filterLabel}>🎯 Filter by Rating</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={filterRating}
              onValueChange={(value) => setFilterRating(value)}
              style={styles.picker}
            >
              <Picker.Item label="All Ratings" value={0} />
              <Picker.Item label="⭐ 3+ Stars" value={3} />
              <Picker.Item label="⭐ 4+ Stars" value={4} />
              <Picker.Item label="⭐ 5 Stars" value={5} />
            </Picker>
          </View>
        </View>

        <View style={styles.filterCard}>
          <Text style={styles.filterLabel}>📊 Sort by</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sortOption}
              onValueChange={(value) => setSortOption(value)}
              style={styles.picker}
            >
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Title A → Z" value="title-asc" />
              <Picker.Item label="Title Z → A" value="title-desc" />
              <Picker.Item label="Year ↑ (Old → New)" value="year-asc" />
              <Picker.Item label="Year ↓ (New → Old)" value="year-desc" />
              <Picker.Item label="Rating ↑ (Low → High)" value="rating-asc" />
              <Picker.Item label="Rating ↓ (High → Low)" value="rating-desc" />
            </Picker>
          </View>
        </View>
      </View>

      {/* List */}
      {sortedList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>No items yet</Text>
          <Text style={styles.emptySubtitle}>
            Start searching for movies and books!
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedList}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onPress={() =>
                navigation.navigate("Detail", { item, mode: item.type })
              }
            />
          )}
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
  statsContainer: {
    flexDirection: "row",
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    ...SHADOWS.small,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  filterSection: {
    padding: SPACING.md,
    paddingTop: 0,
    gap: SPACING.md,
  },
  filterCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  pickerContainer: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.sm,
    overflow: "hidden",
  },
  picker: {
    color: COLORS.textPrimary,
  },
  listContent: {
    padding: SPACING.md,
    paddingTop: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
