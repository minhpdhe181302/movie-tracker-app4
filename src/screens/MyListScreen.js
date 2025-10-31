import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import ItemCard from "../components/ItemCard";

export default function MyListScreen({ navigation }) {
  const [myList, setMyList] = useState([]);
  const [filterRating, setFilterRating] = useState(0);
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    const loadData = async () => {
      const stored = await AsyncStorage.getItem("myList");
      if (stored) setMyList(JSON.parse(stored));
    };
    loadData();
  }, []);

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
    <View style={{ flex: 1, padding: 10 }}>
      {/* Bộ lọc theo Rating */}
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
        🎯 Filter by Rating:
      </Text>
      <Picker
        selectedValue={filterRating}
        onValueChange={(value) => setFilterRating(value)}
        style={{ marginBottom: 10 }}
      >
        <Picker.Item label="All" value={0} />
        <Picker.Item label="⭐ 3+" value={3} />
        <Picker.Item label="⭐ 4+" value={4} />
        <Picker.Item label="⭐ 5" value={5} />
      </Picker>

      {/* Bộ sắp xếp */}
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>📊 Sort by:</Text>
      <Picker
        selectedValue={sortOption}
        onValueChange={(value) => setSortOption(value)}
        style={{ marginBottom: 10 }}
      >
        <Picker.Item label="None" value="none" />
        <Picker.Item label="Title A → Z" value="title-asc" />
        <Picker.Item label="Title Z → A" value="title-desc" />
        <Picker.Item label="Year ↑ (Old → New)" value="year-asc" />
        <Picker.Item label="Year ↓ (New → Old)" value="year-desc" />
        <Picker.Item label="Rating ↑ (Low → High)" value="rating-asc" />
        <Picker.Item label="Rating ↓ (High → Low)" value="rating-desc" />
      </Picker>

      {/* Danh sách */}
      <FlatList
        data={sortedList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => navigation.navigate("Detail", { item })}
          />
        )}
      />
    </View>
  );
}
