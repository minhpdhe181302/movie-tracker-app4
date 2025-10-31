import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { searchMovies } from "../api/omdbApi";
import { searchBooks } from "../api/booksApi";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("movie"); // movie | book
  const [results, setResults] = useState([]);

  async function handleSearch() {
    if (!query) return;
    const data =
      mode === "movie" ? await searchMovies(query) : await searchBooks(query);
    setResults(data);
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      {/* Mode switch */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        {["movie", "book"].map((m) => (
          <Pressable
            key={m}
            onPress={() => setMode(m)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              marginHorizontal: 4,
              borderRadius: 6,
              backgroundColor: mode === m ? "#007bff" : "#ccc",
            }}
          >
            <Text style={{ color: mode === m ? "white" : "black" }}>
              {m === "movie" ? "🎬 Movies" : "📚 Books"}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder={`Search ${mode === "movie" ? "movies" : "books"}...`}
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail", { item, mode })}
            style={{ flexDirection: "row", marginVertical: 8 }}
          >
            <Image
              source={{
                uri:
                  mode === "movie"
                    ? item.poster
                    : item.thumbnail ||
                      "https://via.placeholder.com/100x150?text=No+Cover",
              }}
              style={{ width: 60, height: 90, marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text style={{ color: "#555" }}>
                {mode === "movie"
                  ? item.year
                  : item.authors?.join(", ") || "Unknown author"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
