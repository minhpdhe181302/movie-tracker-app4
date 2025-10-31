import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import RatingStars from "../components/RatingStars";
import { addItem, getAll, updateItem } from "../storage/trackerStorage";

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
      description: item.description || "",
      rating,
      comment,
      status: "want",
      addedAt: new Date().toISOString(),
    };
    await addItem(newItem);
    Alert.alert("✅ Saved!", "Your rating and comment have been saved.");
    navigation.navigate("My List");
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Image
        source={{
          uri:
            mode === "movie"
              ? item.poster
              : item.thumbnail ||
                "https://via.placeholder.com/200x300?text=No+Cover",
        }}
        style={{
          width: 200,
          height: 300,
          alignSelf: "center",
          borderRadius: 10,
        }}
      />
      <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 16 }}>
        {item.title}
      </Text>
      <Text>{mode === "movie" ? item.year : item.publishedDate}</Text>
      {item.authors && <Text>By {item.authors.join(", ")}</Text>}

      <Text style={{ marginVertical: 10 }}>{item.description}</Text>

      {/* ⭐ Rating Section */}
      <Text style={{ fontWeight: "bold", marginTop: 16 }}>Your Rating:</Text>
      <RatingStars rating={rating} onChange={setRating} />

      {/* 💬 Comment Section */}
      <Text style={{ fontWeight: "bold", marginTop: 12 }}>Your Comment:</Text>
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Write your thoughts..."
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 8,
          marginTop: 6,
          minHeight: 80,
          textAlignVertical: "top",
        }}
        multiline
      />

      <Button title="💾 Save" onPress={handleAdd} />
    </ScrollView>
  );
}
