import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function ItemCard({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
        padding: 8,
      }}
    >
      <Image
        source={{ uri: item.poster }}
        style={{ width: 60, height: 90, marginRight: 10, borderRadius: 6 }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>
          {item.title} {item.type === "book" ? "📘" : "🎬"}
        </Text>
        <Text style={{ color: "#555" }}>{item.year}</Text>

        {/* ⭐ Hiển thị rating nếu có */}
        {item.rating ? (
          <Text style={{ color: "#FFD700", marginTop: 2 }}>
            {"★".repeat(item.rating)}{" "}
            <Text style={{ color: "#aaa" }}>({item.rating}/5)</Text>
          </Text>
        ) : null}

        {/* 💬 Hiển thị bình luận nếu có */}
        {item.comment ? (
          <Text
            numberOfLines={1}
            style={{ color: "#555", fontStyle: "italic", marginTop: 2 }}
          >
            💬 {item.comment}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
