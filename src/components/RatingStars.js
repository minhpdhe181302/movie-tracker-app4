import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export default function RatingStars({ rating, onChange }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={{ flexDirection: "row", marginVertical: 6 }}>
      {stars.map((s) => (
        <TouchableOpacity key={s} onPress={() => onChange(s)}>
          <Text
            style={{ fontSize: 28, color: s <= rating ? "#FFD700" : "#ccc" }}
          >
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
